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


@app.route("/angular-page")
def angular_page():
    return app.send_static_file("ng-index.html")


@app.route("/")
def react_page():
    return app.send_static_file("react-index.html")


@app.route("/retrieve")
def retrieve_records():
    """
    GET /retrieve?start_date=YYYY-MM-DD&end_date=YYY-MM-DD&hero=HERO
    """
    retobj = {}
    retobj["success"] = False
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
        retobj["success"] = True
        retobj["result"] = query_results
        return jsonify(retobj), 200
    except Exception as e:
        traceback.print_exc()
        retobj["result"] = str(e)
        return jsonify(retobj), 500


@app.route("/retrieve/tag")
def retrieve_records_by_tag():
    """
    GET /retrieve/tag?label=TAG
    """
    retobj = {}
    retobj["success"] = False
    try:
        tag_label = request.args.get("label")
        LOG.info(f"tag: {tag_label}")
        if tag_label == '':
            retobj["result"] = "Tag label is required"
            return jsonify(retobj), 400
        query_results = DB.fetch_by_tag(tag_label)
        retobj["success"] - True
        retobj["result"] = query_results
        return jsonify(retobj), 200
    except Exception as e:
        traceback.print_exc()
        retobj["result"] = str(e)
        return jsonify(retobj), 500


@app.route("/populate-db", methods=["post"])
def populate_db():
    try:
        data = request.get_json()
        LOG.debug(data)
        return DB.insert(data)
    except Exception as e:
        return str(e), 500


@app.route("/db-form")
def db_form_page():
    return app.send_static_file("react-dbform.html")


@app.route("/update-db", methods=["post"])
def update_db():
    try:
        data = request.get_json()
        LOG.debug(data)
        DB.update_by_video_url(data["video_url"], data)
        return '', 200
    except Exception as e:
        return str(e), 500


@app.route("/db-form/update")
def db_form_update_page():
    return app.send_static_file("react-dbupdate.html")


def shutdown(*_):
    if DB is not None:
        DB.close()


if __name__ == "__main__":
    # signal.signal(signal.SIGINT, shutdown)

    DB = DBHandler(db="video-metadata.json", schemafile="schemas/db_form.json")
    DB.open()
    try:
        app.run(host="127.0.0.1", debug=True)
        # app.run(host="0.0.0.0", debug=True)
    except KeyboardInterrupt:
        shutdown()