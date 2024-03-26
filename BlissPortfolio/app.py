import os
import pathlib
import flask
from blueprints import main_bp
from config import Config
from flask import jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import redis
import os

app = flask.Flask(__name__)
app.config.from_object(Config)

redis_url = os.getenv('REDIS_URL', 'redis://redis:6379/0')
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
