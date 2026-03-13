import os


class Config:

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "mysql+pymysql://root:123456@host.docker.internal:3306/realestate"
    )# 如果用Docker，DATABASE_URL改成：mysql+pymysql://root:123456@db:3306/realestate

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "realestate-super-secret-key-2026"
    )

    JSON_AS_ASCII = False