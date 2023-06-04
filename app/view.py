from flask import Blueprint, request, redirect
from flask.templating import render_template
from flask_sqlalchemy import SQLAlchemy
from app.models import Profile
from app import db

view = Blueprint("view", __name__)

# function to render index page
@view.route('/', methods=["GET"])
def index():
	profiles = Profile.query.all()
	return render_template('index.html', profiles=profiles)

# @app.route('/add_data')
# def add_data():
# 	return render_template('add_profile.html')

# function to add profiles
@view.route('/', methods=["POST"])
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

@view.route('/delete/<int:id>')
def erase(id):
	
	# deletes the data on the basis of unique id and
	# directs to home page
	data = Profile.query.get(id)
	db.session.delete(data)
	db.session.commit()
	return redirect('/')


@view.route('/view/<int:id>', methods=["GET"])
def view_cr(id):
	data = Profile.query.get(id)
	return render_template('view.html', data=data)



@view.route('/update', methods=["POST"])
def update_status():
    json_data=request.get_json()
    print(json_data)
    id=json_data['id']
    data=Profile.query.get(id)
    data.status=json_data['status']
    print(data.status)
    db.session.commit()
    return redirect('/')
