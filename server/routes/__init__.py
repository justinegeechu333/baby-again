# from server.config import db
from flask_restful import Resource
# from flask_restful import reqparse, abort, Api, Resource
from server.models.customers import Customer
from server.models.babyproducts import BabyProduct
from server.models.rents import Rent


class Customers(Resource):
    def get(self):
        users = [user.to_dict() for user in Customer.query.all()]
        return users


class BabyProducts(Resource):
    def get(self):
        books = [book.to_dict() for book in BabyProduct.query.all()]
        return books


class Rents(Resource):
    def get(self):
        rents = [rent.to_dict() for rent in Rent.query.all()]
        return rents
