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
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

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
@app.route(PREFIX + "/auth/login", methods=['POST'])
def login():
    auth = request.json

    if auth:
        user = users_collection.find_one({"email": auth['email']})
        if user is not None:
            if bcrypt.checkpw(bytes(auth['password'], 'UTF-8'), user['password']):
                token = jwt.encode({
                    "user": auth['email'],
                    "id": str(user['_id']),
                    "name": str(user['name']),
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, app.config['SECRET_KEY'])

                return make_response(jsonify({'token': token, 'message': "Successfully logged in!"}), 200)
            else:
                return make_response(jsonify({"message": "Password is incorrect"}), 401)
        else:
            return make_response(jsonify({"message": "Email or password does'nt match"}), 401)
    
    return make_response(jsonify({"message": "Authentication required"}), 401)

# POST logout


# POST register
@app.route(PREFIX + "/auth/register", methods=['POST'])
def register():

    if request.json['email']:
        email = request.json['email']

    if users_collection.count_documents({"email": email}) > 0:
        return make_response(jsonify({
            "message": "User already exists!"
        }), 401)

    # NEEDS UPADTING TO JSON
    if request.json['password']:
        password = request.json['password']

    if request.json['name']:
        name = request.json['name']
    
    users_collection.insert_one({
        "email": email,
        "password": bcrypt.hashpw(bytes(password, 'UTF-8'), bcrypt.gensalt()),
        "name": name,
    })
    return make_response(jsonify({
        "message": "User created successfully",
    }), 200)

# GET logout
@app.route(PREFIX + '/auth/logout', methods=['GET'])
@jwt_required
def logout():
    token = request.headers['Authorization']
    blacklist_collection.insert_one({"token": token})
    return make_response({"message": "Logout successful"}, 200)
        