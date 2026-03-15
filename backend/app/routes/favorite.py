from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.favorite import Favorite
from app.models.property import Property

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
    prop = Property.query.get_or_404(property_id)

    # 防止重复收藏
    existing = Favorite.query.filter_by(user_id=user_id, property_id=property_id).first()
    if existing:
        return jsonify({"code": 0, "message": "Already favorited"}), 200

    favorite = Favorite(user_id=user_id, property_id=property_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"code": 0, "message": "Property favorited"})


# 我的收藏
@favorite_bp.route("/", methods=["GET"])
@jwt_required()
def my_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    result = []
    for f in favorites:
        prop = Property.query.get(f.property_id)
        if not prop:
            continue
        result.append({
            "favorite_id": f.id,
            "property_id": prop.id,
            "title": prop.title,
            "price": prop.price,
            "location": prop.location
        })
    return jsonify({"code": 0, "message": "success", "data": result})


# 取消收藏
@favorite_bp.route("/<int:property_id>", methods=["DELETE"])
@jwt_required()
def remove_favorite(property_id):
    user_id = get_jwt_identity()
    favorite = Favorite.query.filter_by(user_id=user_id, property_id=property_id).first()
    if not favorite:
        return jsonify({"code": 1, "message": "Not favorited"}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"code": 0, "message": "Favorite removed"})