from app.extensions import db
from datetime import datetime


class Property(db.Model):

    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(200))

    status = db.Column(
        db.Enum("available", "sold"),
        default="available",
        nullable=False
    )

    owner_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )