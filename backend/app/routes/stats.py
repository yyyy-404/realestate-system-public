from flask import Blueprint, jsonify
from app.models.user import User
from app.models.property import Property
from app.models.contract import Contract
from app.extensions import db

stats_bp = Blueprint(
    "stats",
    __name__,
    url_prefix="/api/stats"
)


# 系统概览
@stats_bp.route("/overview", methods=["GET"])
def overview():

    users = User.query.count()
    properties = Property.query.count()
    contracts = Contract.query.count()

    return jsonify({
        "users": users,
        "properties": properties,
        "contracts": contracts
    })


# 城市房源统计
@stats_bp.route("/property_by_city", methods=["GET"])
def property_by_city():

    data = db.session.query(
        Property.location,
        db.func.count(Property.id)
    ).group_by(Property.location).all()

    result = []

    for city, count in data:
        result.append({
            "city": city,
            "count": count
        })

    return jsonify(result)