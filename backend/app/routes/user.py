from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models.user import User


# 用户管理模块
user_bp = Blueprint(
    "user",
    __name__,
    url_prefix="/api/user"
)


# 用户列表
@user_bp.route("/", methods=["GET"])
@jwt_required()
def get_users():

    users = User.query.all()

    result = []

    for u in users:
        result.append({
            "id": u.id,
            "username": u.username,
            "role": u.role
        })

    return jsonify(result)


# 用户详情
@user_bp.route("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):

    u = User.query.get_or_404(user_id)

    return jsonify({
        "id": u.id,
        "username": u.username,
        "role": u.role
    })


# 删除用户
@user_bp.route("/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):

    u = User.query.get_or_404(user_id)

    from app.extensions import db

    db.session.delete(u)
    db.session.commit()

    return jsonify({"msg": "User deleted"})