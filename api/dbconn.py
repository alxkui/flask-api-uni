from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017")
db = client.bookDB
books_collection = db.books
users_collection = db.users
blacklist_collection = db.blacklist