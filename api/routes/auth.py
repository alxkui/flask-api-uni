from api import app, PREFIX
import jwt
import datetime
from flask import jsonify, make_response, request
from functools import wraps
from api.dbconn import users_collection, blacklist_collection
import bcrypt

def jwt_required(func):
    @wraps(func)
    def jwt_required_wrapper(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

            b1_token = blacklist_collection.find_one({"token": token})
            if b1_token is not None:
                return make_response(jsonify({"message": "Token is blacklisted"}), 401)
            
        if not token:
            return jsonify({'message': 'Token is missing'}, 401)

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
        except:
            return jsonify({'message': 'Token is invalid'}, 401)

        return func(*args, **kwargs)
    return jwt_required_wrapper

# GET login
@app.route(PREFIX + "/login", methods=['GET'])
def login():
    auth = request.authorization

    if auth:
        user = users_collection.find_one({"email": auth.username})
        if user is not None:
            if bcrypt.checkpw(bytes(auth.password, 'UTF-8'), user['password']):
                token = jwt.encode({
                    "user": auth.username,
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, app.config['SECRET_KEY'])

                return make_response(jsonify({'token': token}), 200)
            else:
                return make_response(jsonify({"message": "Bad password"}), 401)
        else:
            return make_response(jsonify({"message": "Email does not exist"}), 401)
    
    return make_response(jsonify({"message": "Authentication required"}), 401)

# POST logout


# POST register
@app.route(PREFIX + "/register", methods=['POST'])
def register():

    if request.form['email']:
        email = request.form['email']

    if users_collection.count_documents({"email": email}) > 0:
        return make_response(jsonify({
            "message": "User already exists!"
        }), 401)

    if request.form['password']:
        password = request.form['password']

    if request.form['name']:
        name = request.form['name']
    
    users_collection.insert_one({
        "email": email,
        "password": bcrypt.hashpw(bytes(password, 'UTF-8'), bcrypt.gensalt()),
        "name": name,
        "favourite_books": [],
        "favourite_authors": [],
        "bio": "",
        "reviews": [],
    })
    return make_response(jsonify({
        "message": "User created successfully",
    }), 200)

# GET logout
@app.route(PREFIX + '/logout', methods=['GET'])
@jwt_required
def logout():
    token = request.headers['x-access-token']
    blacklist_collection.insert_one({"token": token})
    return make_response({"message": "Logout successful"}, 200)
        