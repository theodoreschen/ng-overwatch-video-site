from flask import (
    Flask,
    jsonify,
    request
)
from flask_cors import CORS
from OverwatchDB import TinyDBHandler as DBHandler
from OverwatchDB import (
    TODAY,
    OWRELEASEDATE,
    OverwatchHeroes,
    get_overwatch_hero
)
import signal
import logging
import datetime
import traceback

logging.basicConfig(
    format="[%(asctime)s] - %(levelname)s/%(name)s: %(message)s",
    level=logging.DEBUG
)
LOG = logging.getLogger(__name__)
LOG.setLevel(logging.INFO)

app = Flask(__name__, static_url_path='')
CORS(app)
DB = None

# @app.route("/")
# def react_page():
    # return app.send_static_file("react-index.html")


@app.route("/retrieve")
def retrieve_records():
    """
    GET /retrieve?start_date=YYYY-MM-DD&end_date=YYY-MM-DD&hero=HERO
    """
    try:
        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")
        hero = request.args.get("hero")
        LOG.info(f"start date: {start_date}; "
                 f"end date: {end_date}; "
                 f"hero: {hero}")
        if start_date == '':
            start_date = OWRELEASEDATE
        else:
            start_date = datetime.date.fromisoformat(start_date)
        if end_date == '':
            end_date = TODAY
        else:
            end_date = datetime.date.fromisoformat(end_date)
        query_results = DB.fetch_by_multiple(
            start_date=start_date,
            end_date=end_date,
            hero_name=get_overwatch_hero(hero)
        )
        return jsonify(query_results), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify([]), 500


@app.route("/retrieve/tag")
def retrieve_records_by_tag():
    """
    GET /retrieve/tag?label=TAG
    """
    try:
        tag_label = request.args.get("label")
        LOG.info(f"tag: {tag_label}")
        if tag_label == '':
            return jsonify([]), 400
        query_results = DB.fetch_by_tag(tag_label)
        return jsonify(query_results), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify([]), 500


@app.route("/retrieve/url")
def retrieve_records_by_url():
    """
    GET /retrieve/url?video-url=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fdeadbeef
    """
    try:
        url = request.args.get("video-url")
        LOG.info(f"url: {url}")
        query_results = DB.fetch_by_url(url)
        return jsonify(query_results), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify([]), 500



@app.route("/populate-db", methods=["post"])
def populate_db():
    try:
        data = request.get_json()
        LOG.debug(data)
        return DB.insert(data)
    except Exception as e:
        return str(e), 500


@app.route("/update-db", methods=["post"])
def update_db():
    try:
        data = request.get_json()
        LOG.debug(data)
        DB.update_by_video_url(data["video_url"], data)
        return '', 200
    except Exception as e:
        return str(e), 500


def shutdown(*_):
    if DB is not None:
        DB.close()


if __name__ == "__main__":
    DB = DBHandler(db="video-metadata.json", schemafile="schemas/db_form.json")
    DB.open()
    try:
        app.run(host="127.0.0.1", debug=True)
        # app.run(host="0.0.0.0", debug=True)
    except KeyboardInterrupt:
        shutdown()