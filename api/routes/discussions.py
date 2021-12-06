import jwt
from api import app, PREFIX
from flask import jsonify, make_response, request
from api.dbconn import books_collection, discussions_collection, users_collection
from bson import ObjectId
from api.routes.auth import jwt_required
import datetime

# All discussions without filter
@app.route(PREFIX + '/books/discussions', methods=['GET'])
def all_discussions_wo_filter():
    # find all discussions and aggregate with the book id
    discussions = discussions_collection.aggregate([{
         "$lookup": {
            "from": "books",
            "localField": "book",
            "foreignField": "_id",
            "as": "book"
        }},
        { "$unwind": "$book" },
        { "$project": {
            "book.author": 0,
            "book.description": 0,
            "book.image": 0,
            "book.meta": 0,
            "book.stores": 0,
            "book.book_data": 0,
            "book.book_url": 0,
        }}
    ])
    all_discussions = []
    for discussion in discussions:
        discussion["_id"] = str(discussion["_id"])
        discussion["user"] = str(discussion["user"])
        discussion["book"]["_id"] = str(discussion["book"]["_id"])
        all_discussions.append({
            "discussion": discussion
        })
    
    return make_response(jsonify({
        "message": "Discussions found",
        "data": all_discussions
    }), 200)

# GET discussions on book
@app.route(PREFIX + '/books/<string:id>/discussions', methods=['GET'])
# @jwt_required
def all_discussions(id):
    # Try to find book with specific id
    book = books_collection.find_one({'_id': ObjectId(id)})

    if not book:
        return make_response(jsonify({
            "message": "The book with the specified ID cannot be found"
        }), 404)

    # If there is a book, convert the id to a normal string
    if book is not None:
        book['_id'] = str(book['_id'])

    # find all discussion that contains that book id
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

    if not user:
        return make_response(jsonify({"message": "That user does not exist"}), 404)

    if not book:
        return make_response(jsonify({"message": "That book does not exist"}), 404)

    if not discussion_text:
        return make_response(jsonify({"message": "No text was provided"}), 400)

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

    if not user:
        return make_response(jsonify({"message": "That user does not exist"}), 404)

    if not book:
        return make_response(jsonify({"message": "That book does not exist"}), 404)

    if not discussion:
        return make_response(jsonify({"message": "That discussion does not exist"}), 404)

    discussions_collection.delete_one({
        "_id": ObjectId(discussion['_id']),
        "user": ObjectId(user['_id']),
        "book": ObjectId(book['_id'])
    })

    return make_response(jsonify({"message": "Discussion has been deleted!"}), 200)
