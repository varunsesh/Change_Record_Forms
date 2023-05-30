from flask import Flask, request, redirect
from flask.templating import render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
from sqlalchemy.sql import func

app = Flask(__name__)
app.debug = True

# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)

# Settings for migrations
migrate = Migrate(app, db)

# Models
class Profile(db.Model):
	# Id : Field which stores unique id for every row in
	# database table.
	# first_name: Used to store the first name if the user
	# last_name: Used to store last name of the user
	# Age: Used to store the age of the user
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), unique=False, nullable=False)
	title = db.Column(db.String(20), unique=False, nullable=False)
	summary = db.Column(db.String(500), unique=False, nullable=False)
	created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

	# repr method represents how one object of this datatable
	# will look like
	def __repr__(self):
		return f"Name : {self.username}, created_at: {self.created_at}, summary:{self.summary}"



# function to render index page
@app.route('/', methods=["GET"])
def index():
	profiles = Profile.query.all()
	return render_template('index.html', profiles=profiles)

# @app.route('/add_data')
# def add_data():
# 	return render_template('add_profile.html')

# function to add profiles
@app.route('/', methods=["POST"])
def profile():
	# In this function we will input data from the
	# form page and store it in our database. Remember
	# that inside the get the name should exactly be the same
	# as that in the html input fields
	username = request.form.get("username")
	title = request.form.get("title")
	summary = request.form.get("summary")
	

	# create an object of the Profile class of models and
	# store data as a row in our datatable
	if username != '' and summary != '' and title != '':
		p = Profile(username=username, title=title, summary=summary)
		db.session.add(p)
		db.session.commit()
		return redirect('/')
	else:
		return redirect('/')

@app.route('/delete/<int:id>')
def erase(id):
	
	# deletes the data on the basis of unique id and
	# directs to home page
	data = Profile.query.get(id)
	db.session.delete(data)
	db.session.commit()
	return redirect('/')

@app.route('/view/<int:id>', methods=["GET"])
def view(id):
	data = Profile.query.get(id)
	return render_template('view.html', data=data)



if __name__ == '__main__':
	app.run()
