from app.extensions import db
from datetime import datetime


class Favorite(db.Model):

    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    property_id = db.Column(
        db.Integer,
        db.ForeignKey("properties.id"),   # 这里也必须是 properties
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )