from app import db
from sqlalchemy.sql import func


# Models
class Profile(db.Model):
	# Id : Field which stores unique id for every row in
	# database table.
	# first_name: Used to store the first name if the user
	# last_name: Used to store last name of the user
	# Age: Used to store the age of the user
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), unique=False, nullable=False)
	title = db.Column(db.String(100), unique=False, nullable=False)
	summary = db.Column(db.String(500), unique=False, nullable=False)
	status=db.Column(db.String(20), unique=False)
	created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

	# repr method represents how one object of this datatable
	# will look like
	def __repr__(self):
		return f"Name : {self.username}, created_at: {self.created_at}, summary:{self.title}"