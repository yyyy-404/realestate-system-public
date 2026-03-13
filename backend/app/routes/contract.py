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


# 创建合同
@contract_bp.route("/", methods=["POST"])
@jwt_required()
def create_contract():

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role not in ["admin", "seller"]:
        return jsonify({"msg": "Permission denied"}), 403

    data = request.get_json()

    property_obj = Property.query.get(data["property_id"])

    if not property_obj:
        return jsonify({"msg": "Property not found"}), 404

    if property_obj.status == "sold":
        return jsonify({"msg": "Property already sold"}), 400

    contract = Contract(
        property_id=data["property_id"],
        seller_id=user.id,
        buyer_id=data["buyer_id"],
        price=data["price"]
    )

    property_obj.status = "sold"

    db.session.add(contract)
    db.session.commit()

    return jsonify({
        "msg": "Contract created",
        "contract_id": contract.id
    })


# 查看合同
@contract_bp.route("/", methods=["GET"])
@jwt_required()
def get_contracts():

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role == "admin":
        contracts = Contract.query.all()

    elif user.role == "seller":
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

    return jsonify(result)


# 完成交易
@contract_bp.route("/<int:id>/complete", methods=["PUT"])
@jwt_required()
def complete_contract(id):

    contract = Contract.query.get_or_404(id)

    contract.status = "completed"

    db.session.commit()

    return jsonify({"msg": "Transaction completed"})


# 取消合同
@contract_bp.route("/<int:id>/cancel", methods=["PUT"])
@jwt_required()
def cancel_contract(id):

    contract = Contract.query.get_or_404(id)

    contract.status = "cancelled"

    property_obj = Property.query.get(contract.property_id)
    property_obj.status = "available"

    db.session.commit()

    return jsonify({"msg": "Contract cancelled"})