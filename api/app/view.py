from flask import Blueprint, request, redirect, jsonify
from flask.templating import render_template
from flask_sqlalchemy import SQLAlchemy
from app.models import Profile
from flask_cors import cross_origin
from app import db
import jwt
import json


view = Blueprint("view", __name__)

@view.route('/', methods=['GET', 'POST', 'OPTIONS'])
def index():
#     if request.method=='OPTIONS':
#          return {'message':'OPTIONS received'}
    print(f"request type = {request.method}")
    if request.method=='POST' :
        print(f"request type = {request.method}")
        data = request.get_json()
        print(type(data))
        username = data['username']
        title = data['title']
        summary = data['summary']
        status = 'Review'
        if username != '' and summary != '' and title != '':
                p = Profile(username=username, title=title, summary=summary, status=status)
                db.session.add(p)
                db.session.commit()
                return jsonify({"db": "Updated"}), 200
    profiles = Profile.query.all()
    profile_json = {}
    #{"id":id, "username":username, ...}
    profile_list = []
    for profile in profiles:
         profile_json = {"id":profile.id, "username":profile.username, "title":profile.title, "summary":profile.summary, "date":profile.created_at, "status":profile.status}
         profile_list.append(profile_json)
    
    return jsonify(profile_list), 200


@view.route('/delete', methods=["POST", "OPTIONS"])
def delete_record():
     # if request.method=='OPTIONS':
     #      return {'message':'OPTIONS received'}
     if(request.method=="POST"):
        data = request.get_json()
        id = Profile.query.get(data["id"])
        db.session.delete(id)
        db.session.commit()
        print(data)     
     
     

     return {}



@view.route('/update', methods=["POST", "OPTIONS"])
def update():
    if request.method =="OPTIONS":
        return {},200
    if(request.method=="POST"):
        data = request.get_json()
        print(data)
        db_entry = Profile.query.get(data["id"])
        db_entry.status = data['status']
        db.session.commit()
        
        return{"message":"Successfully updated"}