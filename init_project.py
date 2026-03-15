#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
前端项目结构初始化脚本
安全创建目录和文件，不会覆盖已存在的内容
"""

import os
from pathlib import Path

BASE_DIR = Path("frontend/src")

# 需要创建的目录列表
DIRS = [
    "api",
    "assets",
    "components",
    "layouts",
    "router",
    "stores",
    "views/auth",
    "views/property",
    "views/favorite",
    "views/contract",
    "views/user",
    "views/stats",
]

# 需要创建的文件列表
FILES = [
    "api/auth.js",
    "api/property.js",
    "api/contract.js",
    "api/favorite.js",
    "api/user.js",
    "components/Navbar.vue",
    "components/PropertyCard.vue",
    "components/PropertyForm.vue",
    "layouts/MainLayout.vue",
    "router/index.js",
    "stores/auth.js",
    "views/Home.vue",
    "views/auth/Login.vue",
    "views/property/PropertyList.vue",
    "views/property/PropertyDetail.vue",
    "views/property/PropertyCreate.vue",
    "views/property/PropertyEdit.vue",
    "views/favorite/FavoriteList.vue",
    "views/contract/ContractList.vue",
    "views/contract/ContractCreate.vue",
    "views/user/UserProfile.vue",
    "views/stats/Dashboard.vue",
    "App.vue",
    "main.js",
]


def create_directory(dir_path: Path):
    """创建目录，如果已存在则跳过"""
    if dir_path.exists():
        print(f"跳过 (已存在): {dir_path}/")
        return False
    else:
        dir_path.mkdir(parents=True, exist_ok=True)
        print(f"✅ 创建目录：{dir_path}/")
        return True


def create_file(file_path: Path):
    """创建空文件，如果已存在则跳过（不覆盖）"""
    if file_path.exists():
        print(f"⚠️  跳过 (已存在): {file_path}")
        return False
    else:
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.touch()
        print(f"✅ 创建文件：{file_path}")
        return True


def main():
    print("=" * 60)
    print("🚀 前端项目结构初始化")
    print("=" * 60)
    print(f"📁 目标目录：{BASE_DIR.absolute()}\n")

    created_dirs = 0
    created_files = 0
    skipped = 0

    # 创建目录
    print("📂 创建目录结构...")
    for dir_name in DIRS:
        dir_path = BASE_DIR / dir_name
        if create_directory(dir_path):
            created_dirs += 1
        else:
            skipped += 1

    print()

    # 创建文件
    print("📄 创建文件...")
    for file_name in FILES:
        file_path = BASE_DIR / file_name
        if create_file(file_path):
            created_files += 1
        else:
            skipped += 1

    print()
    print("=" * 60)
    print("✅ 初始化完成！")
    print(f"   新建目录：{created_dirs} 个")
    print(f"   新建文件：{created_files} 个")
    print(f"   跳过存在：{skipped} 个")
    print("=" * 60)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n⚠️  操作已取消")
    except Exception as e:
        print(f"\n❌ 发生错误：{e}")
        raise