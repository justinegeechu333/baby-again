"""init"


Revision ID: f247b2f7defc
Revises: 
Create Date: 2023-12-06 17:33:20.003068

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f247b2f7defc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('baby_products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('age_group', sa.Integer(), nullable=True),
    sa.Column('details', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_baby_products'))
    )
    op.create_table('customers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('login_id', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_customers'))
    )
    op.create_table('rents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('baby_product_id', sa.Integer(), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['baby_product_id'], ['baby_products.id'], name=op.f('fk_rents_baby_product_id_baby_products')),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], name=op.f('fk_rents_customer_id_customers')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_rents'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rents')
    op.drop_table('customers')
    op.drop_table('baby_products')
    # ### end Alembic commands ###
