import jwt
from api import app, PREFIX
from flask import jsonify, make_response, request
from api.dbconn import books_collection, discussions_collection, users_collection
from bson import ObjectId
from api.routes.auth import jwt_required
import datetime

# GET discussions on book


@app.route(PREFIX + '/books/<string:id>/discussions', methods=['GET'])
# @jwt_required
def all_discussions(id):
    book = books_collection.find_one({'_id': ObjectId(id)})
    if book is not None:
        book['_id'] = str(book['_id'])

    all_discussions = []
    for discussion in discussions_collection.find({"book": ObjectId(book['_id'])}):
        discussion['_id'] = str(discussion['_id'])
        discussion['book'] = str(discussion['book'])
        discussion['user'] = str(discussion['user'])
        all_discussions.append(discussion)

    return make_response(jsonify(all_discussions), 200)

# POST add discussion on book


@app.route(PREFIX + '/books/<string:id>/discussions', methods=['POST'])
@jwt_required
def add_discussion(id):
    
    # Retrieve token
    token = request.headers['Authorization']

    # If token does not exist, return with error
    if not token:
        return make_response(jsonify({
            "message": "You are not authorised!",
        }), 401)

    # decode token
    token_decoded = jwt.decode(
        token, app.config['SECRET_KEY'], algorithms="HS256")

    # get text and book id from request body
    discussion_text = request.json['d_text']
    book_id = request.json['bid']

    # look for the book with the id from the request
    book = books_collection.find_one({'_id': ObjectId(book_id)})

    # look for the user with the decoded jwt token
    user = users_collection.find_one(
        {'_id': ObjectId(token_decoded['id'])})

    # assemble the data to post
    data = {
        "text": discussion_text,
        "book": ObjectId(book['_id']),
        "user": ObjectId(user['_id']),
        "user_name": user['name'],
        "timestamp": datetime.datetime.utcnow(),
    }

    # error handling
    if not discussion_text:
        return make_response(jsonify({
            "message": "Ooops, you forgot to enter your comment"
        }), 400)

    if not book_id:
        return make_response(jsonify({
            "message": "There is no book assoicated with these discussions"
        }), 400)

    if not book:
        return make_response(jsonify({
            "message": "That book doesn't exist!"
        }), 404)

    # add book if no errors were recieved
    discussions_collection.insert_one(data)

    # return with successful response
    return make_response(jsonify({
        "message": "Thanks for joining the discussion!"
    }), 200)


# PUT update discussion on book
@app.route(PREFIX + '/books/<string:id>/discussions/<string:d_id>', methods=['PUT'])
@jwt_required
def update_discussion(id, d_id):
    token = request.headers['Authorization']
    token_decoded = jwt.decode(
        token, app.config['SECRET_KEY'], algorithms="HS256")

    book = books_collection.find_one({'_id': ObjectId(id)})
    user = users_collection.find_one({'_id': ObjectId(token_decoded['id'])})
    discussion = discussions_collection.find_one({'_id': ObjectId(d_id)})

    discussion_text = request.json['d_text']

    data = {
        "text": discussion_text,
        "timestamp": datetime.datetime.utcnow(),
    }
    discussions_collection.update_one({
        "_id": ObjectId(discussion['_id']),
        "user": ObjectId(user['_id']),
        "book": ObjectId(book['_id'])
    }, {"$set": data})

    return make_response(jsonify({"message": "Discussion has been updated!"}), 200)

# DELETE discussion on book


@app.route(PREFIX + '/books/<string:id>/discussions/<string:d_id>', methods=['DELETE'])
@jwt_required
def remove_discussion(id, d_id):
    token = request.headers['Authorization']
    token_decoded = jwt.decode(
        token, app.config['SECRET_KEY'], algorithms="HS256")

    book = books_collection.find_one({'_id': ObjectId(id)})
    user = users_collection.find_one({'_id': ObjectId(token_decoded['id'])})
    discussion = discussions_collection.find_one({'_id': ObjectId(d_id)})

    discussions_collection.delete_one({
        "_id": ObjectId(discussion['_id']),
        "user": ObjectId(user['_id']),
        "book": ObjectId(book['_id'])
    })

    return make_response(jsonify({"message": "Discussion has been deleted!"}), 200)
