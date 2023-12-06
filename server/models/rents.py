from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, ForeignKey
from server.config import db
from sqlalchemy_serializer import SerializerMixin


# class Rent(db.Model, SerializerMixin):
#     __tablename__ = "rents"
#     serialize_rules = (
#         '-renter.rented_records',
#         '-book.rented_records',
#         '-renter.owned_books',
#         '-renter.rented_books',
#         '-book.owner',
#         '-book.rented_records',
#         '-book.rented_users',
#     )
#     id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
#     renter_id: Mapped[Integer] = mapped_column(
#         ForeignKey('users.id'), nullable=False)
#     book_id: Mapped[Integer] = mapped_column(
#         ForeignKey('books.id'), nullable=False)

#     renter = relationship("User", back_populates="rented_records")
#     book = db.relationship('Book', back_populates='rented_records')
    
class Rent(db.Model, SerializerMixin):
    __tablename__ = 'rents'
    serialize_rules=('-baby_product.rents', '-customer.rents')
    id = db.Column(db.Integer, primary_key = True)
    baby_product_id = db.Column(db.Integer, db.ForeignKey('baby_products.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

    baby_product = db.relationship('BabyProduct', back_populates = 'rents')
    customer = db.relationship('Customer', back_populates = 'rents')

