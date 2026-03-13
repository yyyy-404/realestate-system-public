from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models.property_image import PropertyImage

image_bp = Blueprint(
    "image",
    __name__,
    url_prefix="/api/image"
)


# 添加图片
@image_bp.route("/", methods=["POST"])
@jwt_required()
def add_image():

    data = request.json

    image = PropertyImage(
        property_id=data["property_id"],
        image_url=data["image_url"]
    )

    db.session.add(image)
    db.session.commit()

    return jsonify({"msg": "Image added"})


# 获取房源图片
@image_bp.route("/property/<int:property_id>", methods=["GET"])
def get_images(property_id):

    images = PropertyImage.query.filter_by(
        property_id=property_id
    ).all()

    result = []

    for img in images:
        result.append({
            "id": img.id,
            "image_url": img.image_url
        })

    return jsonify(result)


# 删除图片
@image_bp.route("/<int:image_id>", methods=["DELETE"])
@jwt_required()
def delete_image(image_id):

    image = PropertyImage.query.get_or_404(image_id)

    db.session.delete(image)
    db.session.commit()

    return jsonify({"msg": "Image deleted"})