from app.extensions import db
from datetime import datetime


class Contract(db.Model):

    __tablename__ = "contracts"

    id = db.Column(db.Integer, primary_key=True)

    property_id = db.Column(
        db.Integer,
        db.ForeignKey("properties.id"),
        nullable=False
    )

    seller_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    buyer_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    price = db.Column(db.Float, nullable=False)

    status = db.Column(
        db.Enum("pending", "completed", "cancelled"),
        default="pending"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )