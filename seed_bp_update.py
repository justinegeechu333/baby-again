from server.models.customers import Customer
from server.models.babyproducts import BabyProduct
from server.models.rents import Rent

from server.config import db
from server.api.index import app

try:
    with app.app_context():
        # user1 = Customer(
        #     name="Justine",
        #     email="user1@gmail.com",
        #     phone_number="512-919-6838",
        #     password="1234",
        #     login_id="justinechu",
        # )
        # db.session.add(user1)
        # db.session.commit()
        babyproducts = db.session.query(BabyProduct).all()
        for bp in babyproducts:
            bp.image = "https://target.scene7.com/is/image/Target/GUEST_5aa30c7e-86fd-43a2-882a-9d25866e6661?wid=1200&hei=1200&qlt=80&fmt=webp"

        db.session.commit()

        # rent1 = Rent(baby_product_id=babyproduct.id, customer_id=user1.id)
        # db.session.add(rent1)
        # db.session.commit()
except ValueError:
    print("ValueError")
