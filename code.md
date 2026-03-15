很好，这个方向是对的。

你现在的目标很明确：

> ✅ 借鉴现有项目
> ✅ 但做成单体架构
> ✅ 尽量可复制代码
> ✅ Vue + Flask + MySQL
> ✅ 适合毕设答辩

我直接给你一套 **可落地的完整毕业设计模板架构**，并且给你核心代码骨架（可直接用）。

---

# 一、最终成品架构（简化单体版）

```
realestate-system/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   ├── router/
│   │   ├── api/
│   │   └── components/
│   └── package.json
│
└── docker-compose.yml
```

---

# 二、数据库设计（MySQL）

## 核心表设计

### 1️⃣ 用户表

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','landlord','tenant') DEFAULT 'tenant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 2️⃣ 房源表

```sql
CREATE TABLE properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    address VARCHAR(255),
    rent DECIMAL(10,2),
    status ENUM('available','rented') DEFAULT 'available',
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

---

### 3️⃣ 合同表

```sql
CREATE TABLE contracts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    tenant_id INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id)
);
```

---

### 4️⃣ 收租记录表

```sql
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contract_id INT,
    amount DECIMAL(10,2),
    pay_date DATE,
    status ENUM('paid','unpaid') DEFAULT 'unpaid',
    FOREIGN KEY (contract_id) REFERENCES contracts(id)
);
```

---

# 三、Flask 后端核心代码（可直接复制）

## 1️⃣ requirements.txt

```txt
Flask
Flask-SQLAlchemy
Flask-JWT-Extended
Flask-Cors
pymysql
```

---

## 2️⃣ app.py

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@db/realestate'
    app.config['JWT_SECRET_KEY'] = 'super-secret-key'

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    from routes.auth import auth_bp
    from routes.property import property_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(property_bp, url_prefix='/api/property')

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

---

## 3️⃣ 用户模型 models/user.py

```python
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(255))
    role = db.Column(db.String(20))

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
```

---

## 4️⃣ 登录接口 routes/auth.py

```python
from flask import Blueprint, request, jsonify
from app import db
from models.user import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and user.check_password(data['password']):
        token = create_access_token(identity={
            "id": user.id,
            "role": user.role
        })
        return jsonify(access_token=token)

    return jsonify({"msg": "Bad credentials"}), 401
```

---

# 四、Vue 前端结构

推荐使用：

```
Vue 3 + Vite + Element Plus
```

## 登录页面示例

```vue
<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  const res = await axios.post('http://localhost:5000/api/auth/login', {
    username: username.value,
    password: password.value
  })
  localStorage.setItem('token', res.data.access_token)
  router.push('/dashboard')
}
</script>
```

---

# 五、Docker 部署（两容器版）

## docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: realestate
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db
```

---

# 六、答辩时你可以讲的技术点

✔ JWT 认证机制
✔ RBAC 权限控制
✔ RESTful API 设计
✔ ORM 数据库映射
✔ 前后端分离架构
✔ Docker 容器化部署

老师一听：

“结构清晰，设计合理”

---

# 七、如果你想

我可以直接给你：

1. 完整可运行 GitHub 风格项目结构
2. 打包成一个压缩包结构说明
3. 带角色权限控制完整代码
4. 带图表 Dashboard
5. 带毕业论文技术架构图

你告诉我：

👉 你要“基础版”还是“高分版”？

我给你一套毕业设计成品级方案。



## 管理后台布局

## ✔ 登录态保持

## ✔ 权限控制

## ✔ 房源发布

## ✔ 图片上传

## ✔ 收藏

## ✔ 合同入口

## ✔ 管理员界面

## ✔ 数据统计图