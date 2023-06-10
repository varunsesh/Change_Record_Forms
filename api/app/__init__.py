from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JSON_SORT_KEYS'] = False
# Creating an SQLAlchemy instance

db = SQLAlchemy(app)

def create_app():
    

    # Settings for migrations
    Migrate(app, db)

    from app.view import view
    app.register_blueprint(view, url_prefix='')
    
    return app