from server.models.customers import Customer
from server.models.babyproducts import BabyProduct
from server.models.rents import Rent

from server.config import db
from server.api.index import app
from sqlalchemy import delete

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
        statement = delete(BabyProduct)
        db.session.execute(statement)
        # db.session.query(BabyProduct).all().delete()
        # db.session.commit()

        babyproducts = []

        babyproducts.append(
            BabyProduct(
                category="strollers",
                age_group="0-24 months",
                name="stroller",
                details="bed for infants to 2 years of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_06b2a6c9-97ce-45f0-9f29-6fe8e042e022?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="strollers",
                age_group="0-24 months",
                name="stroller",
                details="bed for infants to 2 years of age",
                price="$30 for 3 months",
                image="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/716I83vpPjL._SX679_.jpg",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="strollers",
                age_group="0-24 months",
                name="stroller",
                details="bed for infants to 2 years of age",
                price="$30 for 3 months",
                image="https://i5.walmartimages.com/seo/Pamo-Babe-2-Seat-Wagon-Stroller-Folding-Baby-Stroller-with-Adjustable-Canopy_348b871b-313c-4d54-b317-9d6a7892f9c8.cda0f9c1a3c02139a37757613a9c2359.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="beds",
                age_group="0-24 months",
                name="crib",
                details="bed for infants to 2 years of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_5aa30c7e-86fd-43a2-882a-9d25866e6661?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="beds",
                age_group="0-24 months",
                name="crib",
                details="bed for infants to 2 years of age",
                price="$30 for 3 months",
                image="data:image/jpeg;base64,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",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="beds",
                age_group="0-12 months",
                name="bassinet",
                details="bassinet for infants to 1 years of age",
                price="$30 for 3 months",
                image="data:image/jpeg;base64,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",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="beds",
                age_group="0-24 months",
                name="bassinet",
                details="bassinet for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtuDSmajdjJq6va8waJ3ypWWGDpv-llYAMzw&usqp=CAU",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="beds",
                age_group="0-12 months",
                name="snooze bassinet",
                details="bed for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://i.ebayimg.com/images/g/o6oAAOSw4u5k~-rO/s-l1600.jpg",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="beds",
                age_group="0-12 months",
                name="bassinet",
                details="bassinet for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://media.kohlsimg.com/is/image/kohls/5856466_Brown?wid=800&hei=800&op_sharpen=1",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="swings/bouncers",
                age_group="0-12 months",
                name="swing",
                details="swing for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_76ed3404-9130-427b-b035-e0a3e59bae8d?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="swings/bouncers",
                age_group="0-12 months",
                name="swing",
                details="swing for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_94f73603-0a54-4f29-b564-d0071c024a65?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="swings/bouncers",
                age_group="0-12 months",
                name="bouncer",
                details="swing for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_8906f52f-b677-4842-b62f-c2aa9f907d08?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="swings/bouncers",
                age_group="0-12 months",
                name="bouncer",
                details="bouncer for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2EwZ7fuLKpZTSONcJk0K14A6DEZ6eHDVgiQ&usqp=CAU",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="swings/bouncers",
                age_group="0-24 months",
                name="bouncer",
                details="bouncer for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://www.munchkin.com/media/catalog/product/cache/410ff09f38645e77b4a16edbbc3f8410/s/w/swing_1_2__1_1.jpg",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="swings/bouncers",
                age_group="0-12 months",
                name="bouncer",
                details="bouncer for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://m.media-amazon.com/images/I/41ndCyQFYYL._SL500_.jpg",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="car seat",
                age_group="0-12 months",
                name="car seat",
                details="bed for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1qkquhNv3X-0xzpZL2GbTgGwcE7nk56CAg&usqp=CAU",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="car seat",
                age_group="0-12 months",
                name="car seat",
                details="bed for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71iNQA--1wL._SX679_.jpg",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="car seat",
                age_group="0-12 months",
                name="car seat",
                details="car seat for infants to 1 years of age",
                price="$30 for 3 months",
                image="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81Qn4oPjBFL._AC_UF894,1000_QL80_.jpg",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="car seat",
                age_group="0-24 months",
                name="car seat",
                details="car seat for infants to 2 years of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_6ee1d90e-3c1e-4619-b1e0-64eaf657ab05?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="car seat",
                age_group="0-24 months",
                name="car seat",
                details="car seat for infants to 2 years of age",
                price="$30 for 3 months",
                image="https://n.nordstrommedia.com/id/sr3/2a7cc5fd-baef-41fa-ac9e-aced2a45dfc9.jpeg?h=365&w=240&dpr=2",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="car seat",
                age_group="0-24 months",
                name="car seat",
                details="car seat for infants to 2 years of age",
                price="$30 for 3 months",
                image="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1668809922-41q8ZISZh-S._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="recreation",
                age_group="3-12 months",
                name="floor mat",
                details="floor mat for infants to 3 to 12 months of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_63ac67a4-5d22-4071-9297-1f8ca354dbe7?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="recreation",
                age_group="3-12 months",
                name="floor mat",
                details="floor mat for infants to 3 to 12 months of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_dee2c604-f7e4-4cf7-a645-a0d0dd215041?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="recreation",
                age_group="3-12 months",
                name="floor mat",
                details="floor mat for infants to 3 to 12 months of age",
                price="$30 for 3 months",
                image="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71lj5wansZL._SX679_.jpg",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="recreation",
                age_group="6-12 months",
                name="jumper",
                details="jumper for infants to 6 to 12 months of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_382b18fe-82c4-46e0-b6af-bf1c87fd6701?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="recreation",
                age_group="6-12 months",
                name="jumper",
                details="jumper for infants to 6 to 12 months of age",
                price="$30 for 3 months",
                image="https://target.scene7.com/is/image/Target/GUEST_49cf3d0b-ac82-4031-88a7-cb61b40ed594?wid=1200&hei=1200&qlt=80&fmt=webp",
            )
        )
        babyproducts.append(
            BabyProduct(
                category="recreation",
                age_group="6-12 months",
                name="jumper",
                details="jumper for infants to 6 to 12 months of age",
                price="$30 for 3 months",
                image="https://qvc.scene7.com/is/image/QVC/h/98/h450698_202.102?$aempdzoom$",
            )
        )

        db.session.add_all(babyproducts)
        db.session.commit()

        # rent1 = Rent(baby_product_id=babyproduct.id, customer_id=user1.id)
        # db.session.add(rent1)
        # db.session.commit()
except ValueError:
    print("ValueError")
