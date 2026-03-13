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

    data = request.json
    user_id = get_jwt_identity()

    property = Property(
        title=data.get("title"),
        description=data.get("description"),
        price=data.get("price"),
        location=data.get("location"),
        owner_id=user_id
    )

    db.session.add(property)
    db.session.commit()

    return jsonify({
        "msg": "Property created",
        "property_id": property.id
    })


# 房源列表（支持搜索 + 分页 + 排序）
@property_bp.route("/", methods=["GET"])
def get_properties():

    keyword = request.args.get("keyword")
    location = request.args.get("location")

    min_price = request.args.get("min_price")
    max_price = request.args.get("max_price")

    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))

    sort = request.args.get("sort", "id")

    query = Property.query

    # 关键词搜索
    if keyword:
        query = query.filter(Property.title.contains(keyword))

    # 地区过滤
    if location:
        query = query.filter(Property.location.contains(location))

    # 价格过滤
    if min_price:
        query = query.filter(Property.price >= min_price)

    if max_price:
        query = query.filter(Property.price <= max_price)

    # 排序
    if sort == "price_asc":
        query = query.order_by(Property.price.asc())

    elif sort == "price_desc":
        query = query.order_by(Property.price.desc())

    elif sort == "new":
        query = query.order_by(Property.id.desc())

    # 分页
    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    properties = pagination.items

    result = []

    for p in properties:
        result.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "location": p.location,
            "owner_id": p.owner_id
        })

    return jsonify({
        "total": pagination.total,
        "page": page,
        "per_page": per_page,
        "data": result
    })


# 房源详情
@property_bp.route("/<int:property_id>", methods=["GET"])
def get_property(property_id):

    p = Property.query.get_or_404(property_id)

    return jsonify({
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "price": p.price,
        "location": p.location,
        "owner_id": p.owner_id
    })


# 更新房源
@property_bp.route("/<int:property_id>", methods=["PUT"])
@jwt_required()
def update_property(property_id):

    user_id = get_jwt_identity()

    property = Property.query.get_or_404(property_id)

    # 只能修改自己的房源
    if property.owner_id != int(user_id):
        return jsonify({"msg": "Permission denied"}), 403

    data = request.json

    property.title = data.get("title", property.title)
    property.description = data.get("description", property.description)
    property.price = data.get("price", property.price)
    property.location = data.get("location", property.location)

    db.session.commit()

    return jsonify({"msg": "Property updated"})


# 删除房源
@property_bp.route("/<int:property_id>", methods=["DELETE"])
@jwt_required()
def delete_property(property_id):

    user_id = get_jwt_identity()

    property = Property.query.get_or_404(property_id)

    if property.owner_id != int(user_id):
        return jsonify({"msg": "Permission denied"}), 403

    db.session.delete(property)
    db.session.commit()

    return jsonify({"msg": "Property deleted"})


# 房源统计
@property_bp.route("/stats", methods=["GET"])
def property_stats():

    total = Property.query.count()

    avg_price = db.session.query(
        db.func.avg(Property.price)
    ).scalar()

    max_price = db.session.query(
        db.func.max(Property.price)
    ).scalar()

    min_price = db.session.query(
        db.func.min(Property.price)
    ).scalar()

    return jsonify({
        "total_properties": total,
        "avg_price": avg_price,
        "max_price": max_price,
        "min_price": min_price
    })