
class Config:
    def __init__(self, app):
        self.app = app
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'


        