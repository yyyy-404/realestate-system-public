from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models.property_image import PropertyImage
from app.models.property import Property

image_bp = Blueprint(
    "image",
    __name__,
    url_prefix="/api/image"
)


# 添加图片（这里只接受 image_url 字符串；若要上传文件，请改成 file upload）
@image_bp.route("/", methods=["POST"])
@jwt_required()
def add_image():
    data = request.get_json() or {}
    property_id = data.get("property_id")
    image_url = data.get("image_url")
    if not property_id or not image_url:
        return jsonify({"code": 1, "message": "property_id and image_url required"}), 400

    # optional: check property exists
    Property.query.get_or_404(property_id)

    img = PropertyImage(property_id=property_id, image_url=image_url)
    db.session.add(img)
    db.session.commit()
    return jsonify({"code": 0, "message": "Image added", "data": {"image_id": img.id}})


# 获取房源图片
@image_bp.route("/property/<int:property_id>", methods=["GET"])
def get_images(property_id):
    images = PropertyImage.query.filter_by(property_id=property_id).all()
    result = [{"id": img.id, "image_url": img.image_url} for img in images]
    return jsonify({"code": 0, "message": "success", "data": result})


# 删除图片
@image_bp.route("/<int:image_id>", methods=["DELETE"])
@jwt_required()
def delete_image(image_id):
    img = PropertyImage.query.get_or_404(image_id)
    db.session.delete(img)
    db.session.commit()
    return jsonify({"code": 0, "message": "Image deleted"})