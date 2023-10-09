from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import sys
import os

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)  

app = Flask(__name__)

# Configure database URI based on whether running as a frozen executable or not
if getattr(sys, 'frozen', False):
    template_folder = resource_path('templates')
    static_folder = resource_path('static')
    executable_dir = os.path.dirname(sys.executable)
    database_path = os.path.join(executable_dir, 'instance', 'site.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

CORS(app)
app.debug = False
app.config['JSON_SORT_KEYS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)

def create_app():
    # Settings for migrations
    Migrate(app, db)

    from app.view import view
    app.register_blueprint(view, url_prefix='')

    return app
