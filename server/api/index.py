from flask import Flask
from flask import make_response, request
from flask_migrate import Migrate
from server.config import db
from flask_restful import Api, Resource
from server.models.customers import Customer
from server.models.babyproducts import BabyProduct
from server.models.rents import Rent
from server.models.review import Review
from sqlalchemy import and_, or_, not_
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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
        params = request.json
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
        params = request.json
        for attr in params:
            setattr(baby_product, attr, params[attr])
        db.session.commit()
        return make_response(baby_product.to_dict(), 200)


api.add_resource(BabyProductsByIdRoutes, "/baby_products/<int:id>")


class CustomerRoute(Resource):
    def post(self):
        params = request.json

        # try:
        existing_customer = (
            db.session.query(Customer)
            .where(
                or_(
                    Customer.email == str(params["email"]).lower(),
                    Customer.phone_number == params["phone_number"],
                    Customer.login_id == str(params["login_id"]).lower(),
                )
            )
            .first()
        )
        if existing_customer:
            return make_response({"error": "Already exists"}, 403)

        new_customer = Customer(
            name=str(params["name"]).lower(),
            phone_number=params["phone_number"],
            email=str(params["email"]).lower(),
            login_id=str(params["login_id"]).lower(),
            password=params["password"],
        )
        db.session.add(new_customer)
        db.session.commit()
        return make_response(new_customer.to_dict(), 201)
        # except:
        #     return make_response({"error": "internal error"}, 500)

    def patch(self):
        params = request.json
        print("patch:", params)

        existing_customer = None

        try:
            # The code block you provided is handling the PATCH request for updating customer information.
            existing_customer = (
                db.session.query(Customer)
                .where(Customer.email == str(params["email"]).lower())
                .first()
            )
        except:
            return make_response({"error": "User Does not exist"}, 403)

        if params["password"] != existing_customer.password:
            return make_response({"error": "Password does not match"}, 403)

        try:
            for key in params:
                if key == "email":
                    continue
                if params[key]:
                    setattr(existing_customer, key, params[key])

            db.session.commit()
            return make_response(existing_customer.to_dict(), 200)

        except:
            return make_response({"error": "internal error"}, 500)


api.add_resource(CustomerRoute, "/customer")


class SignInRoutes(Resource):
    def post(self):
        params = request.json
        print("sign-in", params)
        try:
            found_customer = (
                db.session.query(Customer)
                .where(
                    and_(
                        Customer.email == str(params["email"]).lower(),
                        Customer.password == params["password"],
                    )
                )
                .first()
            )

            return make_response(found_customer.to_dict(), 201)
        except:
            return make_response({"error": "cannot find user"}, 406)


api.add_resource(SignInRoutes, "/sign_in")


class AdminSignInRoutes(Resource):
    def post(self):
        params = request.json
        print(params)
        if (
            str(params["email"]).lower() == "admin@babyagain.com"
            and params["password"] == "admin"
        ):
            admin = Customer(
                email="admin@babyagain.com",
                name="admin",
                phone_number="999-999-9999",
                id=-1,
            )
            return make_response(admin.to_dict(), 201)
        else:
            return make_response({"error": "cannot find user"}, 406)


api.add_resource(AdminSignInRoutes, "/admin/sign_in")


class RentByIdRoutes(Resource):
    # def get(self):
    #     baby_products = [
    #         baby_product.to_dict() for baby_product in BabyProduct.query.all()
    #     ]
    #     return make_response(baby_products, 200)

    def post(self, id):
        new_baby_product = BabyProduct.query.where(BabyProduct.id == int(id)).first()

        if new_baby_product == None:
            return make_response({"error": "no such item found"}, 404)

        customer_id = request.json["customer_id"]

        new_rent = Rent(customer_id=int(customer_id), baby_product_id=int(id))

        # try:
        db.session.add(new_rent)
        db.session.commit()
        return make_response(new_rent.to_dict(), 201)
        # except:
        #     return make_response({"error": "server error"}, 500)

    def delete(self, id):
        customer_id = request.json["customer_id"]
        print("trying to delete", id, customer_id)
        try:
            Rent.query.filter(
                and_(Rent.id == int(id), Rent.customer_id == int(customer_id))
            ).delete()
            db.session.commit()
            # if existing_rent == None:
            return make_response("succeed", 204)
            # return make_response({"error": "no such rent found"}, 404)
        # print("deleting...", existing_rent)
        # try:
        #     db.session.delete(existing_rent)
        #     db.session.commit()
        #     return make_response("succeed", 204)
        except:
            return make_response({"error": "server error"}, 500)


api.add_resource(RentByIdRoutes, "/rent/<int:id>")


class RentedRoutes(Resource):
    def get(self):
        customer_id = request.args["customer_id"]
        rents = [
            rent.to_dict()
            for rent in Rent.query.where(Rent.customer_id == int(customer_id))
        ]
        print("rents:", rents)
        return make_response(rents, 200)


api.add_resource(RentedRoutes, "/rent")


class ReviewRoutes(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.order_by(Review.id.desc()).limit(3).all()]
        return make_response(reviews, 200)
    
    def post(self):
        params = request.json
        print("review:", params)
        new_review = Review(
            customer_id=params["customer_id"],
            comments=params["comments"],
            rate=params["rate"],
        )
        # try:
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)
        # except:
        #     return make_response({"error": "server error"}, 500)
        
api.add_resource(ReviewRoutes, "/reviews")        