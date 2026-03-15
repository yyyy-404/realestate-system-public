from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.property import Property

property_bp = Blueprint(
    "property",
    __name__,
    url_prefix="/api/property"
)


# 创建房源
@property_bp.route("/", methods=["POST"])
@jwt_required()
def create_property():
    data = request.get_json() or {}
    user_id = get_jwt_identity()
    try:
        price = float(data.get("price", 0))
    except (TypeError, ValueError):
        return jsonify({"msg": "Invalid price"}), 400

    prop = Property(
        title=data.get("title"),
        description=data.get("description"),
        price=price,
        location=data.get("location"),
        owner_id=int(user_id)
    )

    db.session.add(prop)
    db.session.commit()

    return jsonify({
        "code": 0,
        "message": "Property created",
        "data": {"property_id": prop.id}
    })


# 房源列表（支持搜索 + 分页 + 排序 + 价格区间）
@property_bp.route("/", methods=["GET"])
def get_properties():
    keyword = request.args.get("keyword")
    location = request.args.get("location")
    min_price = request.args.get("min_price")
    max_price = request.args.get("max_price")
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))
    sort = request.args.get("sort", "new")

    query = Property.query

    if keyword:
        query = query.filter(Property.title.contains(keyword))

    if location:
        query = query.filter(Property.location.contains(location))

    if min_price:
        try:
            query = query.filter(Property.price >= float(min_price))
        except ValueError:
            pass

    if max_price:
        try:
            query = query.filter(Property.price <= float(max_price))
        except ValueError:
            pass

    if sort == "price_asc":
        query = query.order_by(Property.price.asc())
    elif sort == "price_desc":
        query = query.order_by(Property.price.desc())
    else:
        query = query.order_by(Property.id.desc())

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    items = pagination.items

    result = []
    for p in items:
        result.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "location": p.location,
            "owner_id": p.owner_id
        })

    return jsonify({
        "code": 0,
        "message": "success",
        "data": {
            "total": pagination.total,
            "page": page,
            "per_page": per_page,
            "items": result
        }
    })


# 房源详情
@property_bp.route("/<int:property_id>", methods=["GET"])
def get_property(property_id):
    p = Property.query.get_or_404(property_id)
    return jsonify({
        "code": 0,
        "message": "success",
        "data": {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "location": p.location,
            "owner_id": p.owner_id
        }
    })


# 更新房源
@property_bp.route("/<int:property_id>", methods=["PUT"])
@jwt_required()
def update_property(property_id):
    user_id = get_jwt_identity()
    prop = Property.query.get_or_404(property_id)

    if prop.owner_id != int(user_id):
        return jsonify({"code": 1, "message": "Permission denied"}), 403

    data = request.get_json() or {}
    if "title" in data:
        prop.title = data.get("title")
    if "description" in data:
        prop.description = data.get("description")
    if "price" in data:
        try:
            prop.price = float(data.get("price"))
        except (TypeError, ValueError):
            return jsonify({"msg": "Invalid price"}), 400
    if "location" in data:
        prop.location = data.get("location")

    db.session.commit()
    return jsonify({"code": 0, "message": "Property updated"})


# 删除房源
@property_bp.route("/<int:property_id>", methods=["DELETE"])
@jwt_required()
def delete_property(property_id):
    user_id = get_jwt_identity()
    prop = Property.query.get_or_404(property_id)

    if prop.owner_id != int(user_id):
        return jsonify({"code": 1, "message": "Permission denied"}), 403

    db.session.delete(prop)
    db.session.commit()
    return jsonify({"code": 0, "message": "Property deleted"})


# 房源统计
@property_bp.route("/stats", methods=["GET"])
def property_stats():
    total = Property.query.count()
    avg_price = db.session.query(db.func.avg(Property.price)).scalar() or 0
    max_price = db.session.query(db.func.max(Property.price)).scalar() or 0
    min_price = db.session.query(db.func.min(Property.price)).scalar() or 0

    return jsonify({
        "code": 0,
        "message": "success",
        "data": {
            "total_properties": total,
            "avg_price": avg_price,
            "max_price": max_price,
            "min_price": min_price
        }
    })