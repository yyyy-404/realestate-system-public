from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models.user import User
from app.extensions import db

user_bp = Blueprint(
    "user",
    __name__,
    url_prefix="/api/user"
)


# 用户列表（需要 admin 权限可在此扩展）
@user_bp.route("/", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()
    result = [{"id": u.id, "username": u.username, "role": u.role} for u in users]
    return jsonify({"code": 0, "message": "success", "data": result})


# 用户详情
@user_bp.route("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    u = User.query.get_or_404(user_id)
    return jsonify({"code": 0, "message": "success", "data": {"id": u.id, "username": u.username, "role": u.role}})


# 删除用户
@user_bp.route("/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    u = User.query.get_or_404(user_id)
    db.session.delete(u)
    db.session.commit()
    return jsonify({"code": 0, "message": "User deleted"})