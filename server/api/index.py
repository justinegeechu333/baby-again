from flask import Flask
from flask import make_response, request
from flask_migrate import Migrate
from server.config import db
from flask_restful import Api, Resource
from server.models.customers import Customer
from server.models.babyproducts import BabyProduct
from server.models.rents import Rent
from sqlalchemy import and_, or_, not_

app = Flask(__name__)
migrate = Migrate(app, db)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
api = Api(app)


class BabyProductsRoutes(Resource):
    def get(self):
        baby_products = [
            baby_product.to_dict() for baby_product in BabyProduct.query.all()
        ]
        return make_response(baby_products, 200)

    def post(self):
        params = request.form.to_dict()
        new_baby_product = BabyProduct(
            category=params["category"],
            age_group=params["age_group"],
            name=params["name"],
            details=params["details"],
            price=params["price"],
            image=params["image"],
        )
        try:
            db.session.add(new_baby_product)
            db.session.commit()
            return make_response(new_baby_product.to_dict(), 201)
        except:
            return make_response({"error": "server error"}, 500)


api.add_resource(BabyProductsRoutes, "/baby_products")


class BabyProductsByIdRoutes(Resource):
    def get(self, id):
        baby_product = BabyProduct.query.get(id)
        if not baby_product:
            return make_response({"error": "Baby product not found"}, 406)
        return make_response(baby_product.to_dict(), 200)

    def delete(self, id):
        baby_product = BabyProduct.query.get(id)
        if not baby_product:
            return make_response({"error": "Baby product not found"}, 406)
        db.session.delete(baby_product)
        db.session.commit()
        return make_response("", 204)

    def patch(self, id):
        baby_product = BabyProduct.query.get(id)
        if not baby_product:
            return make_response({"error": "Baby product not found"}, 406)
        params = request.form.to_dict()
        for attr in params:
            setattr(baby_product, attr, params[attr])
        db.session.commit()
        return make_response(baby_product.to_dict(), 200)


api.add_resource(BabyProductsByIdRoutes, "/baby_products/<int:id>")


class SignUpRoutes(Resource):
    def post(self):
        params = request.form.to_dict()
        try:
            existing_customer = (
                db.session.query(Customer)
                .where(
                    or_(
                        Customer.email == params["email"],
                        Customer.phone_number == params["phone_number"],
                        Customer.login_id == params["login_id"],
                    )
                )
                .first()
            )
            if existing_customer:
                return make_response({"error": "Already exists"}, 403)

            new_customer = Customer(
                name=params["name"],
                phone_number=params["phone_number"],
                email=params["email"],
                login_id=params["login_id"],
                password=params["password"],
            )
            db.session.add(new_customer)
            db.session.commit()
            return make_response(new_customer.to_dict(), 201)
        except:
            return make_response({"error": "internal error"}, 500)


api.add_resource(SignUpRoutes, "/sign_up")


class SignInRoutes(Resource):
    def post(self):
        params = request.form.to_dict()
        try:
            found_customer = (
                db.session.query(Customer)
                .where(
                    and_(
                        Customer.login_id == params["login_id"],
                        Customer.password == params["password"],
                    )
                )
                .first()
            )

            return make_response(found_customer.to_dict(), 201)
        except:
            return make_response({"error": "cannot find user"}, 406)


api.add_resource(SignInRoutes, "/sign_in")
