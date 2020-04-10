from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import jsonschema
import signal
import datetime
import logging
from tinydb import TinyDB, Query

logging.basicConfig(
    format="[%(asctime)s] - %(levelname)s/%(name)s: %(message)s",
    level=logging.DEBUG
)
LOG = logging.getLogger(__name__)

app = Flask(__name__, static_url_path='')
CORS(app)

DB = None
try:
    with open("schemas/db_form.json") as fd:
        POPULATE_DB_SCHEMA = json.loads(fd.read())
except Exception as e:
    POPULATE_DB_SCHEMA = None


def url_check(url: str) -> bool:
    if DB is not None:
        return DB.contains(Query().video_url == url)
    else:
        raise ValueError("No database found")


def validate_date(date_prototype: str) -> str:
    # Expected prototype ISO 8601 (yyyy-mm-dd)
    candidate = datetime.date.fromisoformat(date_prototype)
    if candidate > datetime.date.today():
        raise ValueError(f"{date_prototype} is after today")
    if candidate < datetime.date(2016, 5, 24):
        raise ValueError(f"{date_prototype} is before Overwatch release day")
    return candidate.isoformat()


def parse_tags(tags: str) -> list:
    if tags is None:
        return []
    # Expected tags to be space separated, and start with "#"
    prototypes = tags.split()
    return [tag for tag in prototypes if tag.startswith("#")]


# @app.route("/", methods=['GET'])
# def main_page():
    # return app.send_static_file("react-dbform.html")


@app.route("/populate-db", methods=['POST'])
def populate_db():
    try:
        data = request.get_json()
        LOG.debug(data)
        jsonschema.validate(data, POPULATE_DB_SCHEMA)
        data["video_date"] = validate_date(data["video_date"])
        data["tags"] = parse_tags(data["tags"])
        if data["video_title"] is None:
            data["video_title"] = f"{data['video_date'].replace('-','')}_{data['hero']}"
        if data["type"] is None:
            data["type"] = "highlight"
        if url_check(data["video_url"]) is True:
            raise ValueError(f"{data['video_url']} already tracked")
        if DB is not None:
            DB.insert(data)
        else:
            raise ValueError("No database found")
        return '', 200
    except ValueError as e:
        return f"Error: {e!s}", 400
    except jsonschema.ValidationError as e:
        return f"Invalid JSON: {e!s}", 400
    except Exception as e:
        return str(e), 500


def shutdown (*_):
    if DB is not None:
        DB.close()


if __name__ == "__main__":
    DB = TinyDB("video-metadata.json")
    app.run(host="127.0.0.1", debug=True)