import os

class Config:

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        # 默认：本地数据库
        "mysql+pymysql://root:123456@localhost:3306/realestate"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "realestate-secret-key"
    )