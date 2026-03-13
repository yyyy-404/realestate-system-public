from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token
)
from app.extensions import db
from app.models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


# 注册接口
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"msg": "User already exists"}), 400

    user = User(
        username=data["username"],
        role=data.get("role", "tenant")
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created"})


# 登录接口
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(username=data["username"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify(access_token=access_token)