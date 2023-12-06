from flask import Flask
from flask_migrate import Migrate
from server.config import db
from flask_restful import Api
from server.routes import Customers, BabyProducts, Rents

app = Flask(__name__)
migrate = Migrate(app, db)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
api = Api(app)


api.add_resource(Customers, '/customers')
api.add_resource(BabyProducts, '/baby_products')
api.add_resource(Rents, '/rents')
