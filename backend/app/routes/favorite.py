from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.favorite import Favorite
from app.models.property import Property


#收藏模块
favorite_bp = Blueprint(
    "favorite",
    __name__,
    url_prefix="/api/favorite"
)


# 收藏房源
@favorite_bp.route("/<int:property_id>", methods=["POST"])
@jwt_required()
def add_favorite(property_id):

    user_id = get_jwt_identity()

    property = Property.query.get_or_404(property_id)

    favorite = Favorite(
        user_id=user_id,
        property_id=property.id
    )

    db.session.add(favorite)
    db.session.commit()

    return jsonify({"msg": "Property favorited"})


# 我的收藏
@favorite_bp.route("/", methods=["GET"])
@jwt_required()
def my_favorites():

    user_id = get_jwt_identity()

    favorites = Favorite.query.filter_by(
        user_id=user_id
    ).all()

    result = []

    for f in favorites:

        property = Property.query.get(f.property_id)

        result.append({
            "favorite_id": f.id,
            "property_id": property.id,
            "title": property.title,
            "price": property.price,
            "location": property.location
        })

    return jsonify(result)


# 取消收藏
@favorite_bp.route("/<int:property_id>", methods=["DELETE"])
@jwt_required()
def remove_favorite(property_id):

    user_id = get_jwt_identity()

    favorite = Favorite.query.filter_by(
        user_id=user_id,
        property_id=property_id
    ).first()

    if not favorite:
        return jsonify({"msg": "Not favorited"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"msg": "Favorite removed"})