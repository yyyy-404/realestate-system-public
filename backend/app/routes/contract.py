from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.contract import Contract
from app.models.property import Property
from app.models.user import User

contract_bp = Blueprint(
    "contract",
    __name__,
    url_prefix="/api/contract"
)


# 创建合同（卖家发起或由 seller 创建）
@contract_bp.route("/", methods=["POST"])
@jwt_required()
def create_contract():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"code": 1, "message": "User not found"}), 404

    # 权限：允许 seller 或 admin 创建合同
    if user.role not in ["admin", "seller", "owner"]:
        return jsonify({"code": 1, "message": "Permission denied"}), 403

    data = request.get_json() or {}
    property_obj = Property.query.get(data.get("property_id"))
    if not property_obj:
        return jsonify({"code": 1, "message": "Property not found"}), 404

    if property_obj.status == "sold":
        return jsonify({"code": 1, "message": "Property already sold"}), 400

    contract = Contract(
        property_id=data.get("property_id"),
        seller_id=user.id,
        buyer_id=data.get("buyer_id"),
        price=data.get("price")
    )

    property_obj.status = "sold"

    db.session.add(contract)
    db.session.commit()

    return jsonify({"code": 0, "message": "Contract created", "data": {"contract_id": contract.id}}), 201


# 获取合同（根据角色返回不同集合）
@contract_bp.route("/", methods=["GET"])
@jwt_required()
def get_contracts():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role == "admin":
        contracts = Contract.query.all()
    elif user.role in ["seller", "owner"]:
        contracts = Contract.query.filter_by(seller_id=user.id).all()
    else:
        contracts = Contract.query.filter_by(buyer_id=user.id).all()

    result = []
    for c in contracts:
        result.append({
            "id": c.id,
            "property_id": c.property_id,
            "seller_id": c.seller_id,
            "buyer_id": c.buyer_id,
            "price": c.price,
            "status": c.status,
            "created_at": str(c.created_at)
        })

    return jsonify({"code": 0, "message": "success", "data": result})


# 完成合同
@contract_bp.route("/<int:contract_id>/complete", methods=["PUT"])
@jwt_required()
def complete_contract(contract_id):
    user_id = get_jwt_identity()
    contract = Contract.query.get_or_404(contract_id)

    # 只有 seller 或 admin 可以将合同标记为完成
    if contract.seller_id != int(user_id) and User.query.get(user_id).role != "admin":
        return jsonify({"code": 1, "message": "Permission denied"}), 403

    contract.status = "completed"
    db.session.commit()
    return jsonify({"code": 0, "message": "Contract completed"})


# 取消合同
@contract_bp.route("/<int:contract_id>/cancel", methods=["PUT"])
@jwt_required()
def cancel_contract(contract_id):
    user_id = get_jwt_identity()
    contract = Contract.query.get_or_404(contract_id)

    # 只有 seller 或 admin 可以取消
    if contract.seller_id != int(user_id) and User.query.get(user_id).role != "admin":
        return jsonify({"code": 1, "message": "Permission denied"}), 403

    contract.status = "cancelled"
    prop = Property.query.get(contract.property_id)
    if prop:
        prop.status = "available"

    db.session.commit()
    return jsonify({"code": 0, "message": "Contract cancelled"})