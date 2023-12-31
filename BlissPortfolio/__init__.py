import os
import pathlib
import flask
from BlissPortfolio.blueprints.main import main_bp
from flask import jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import redis
import os

app = flask.Flask(__name__)
app.config.from_object('BlissPortfolio.config')

redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
redis_client = redis.from_url(redis_url)

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["60 per minute"],
    storage_uri=redis_url
)

app.register_blueprint(main_bp, url_prefix='/portfolio')
# app.register_blueprint(api_bp, url_prefix='/portfolio/api')

app.static_folder = 'static'
app.template_folder = 'templates'

@app.errorhandler(429)
def ratelimit_error(e):
     return jsonify(error="ratelimit exceeded", message=str(e.description)), 429


if __name__ == "__main__":
    app.run()
