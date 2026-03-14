from flask import Flask
from .config import Config
from .extensions import db, jwt, cors


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    # 注册蓝图
    from app.routes.auth import auth_bp
    from app.routes.property import property_bp
    from app.routes.contract import contract_bp
    from app.routes.favorite import favorite_bp
    from app.routes.property_image import image_bp
    from app.routes.user import user_bp
    from app.routes.stats import stats_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(property_bp)
    app.register_blueprint(contract_bp)
    app.register_blueprint(favorite_bp)
    app.register_blueprint(image_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(stats_bp)

    # 自动创建表
    with app.app_context():
        db.create_all()

    return app