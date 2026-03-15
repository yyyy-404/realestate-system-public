## 最终目录结构（请按这个重建）

```
frontend/src
│
├─ api/                ⭐ 所有接口调用
│    auth.js
│    property.js
│    contract.js
│    favorite.js
│    user.js
│
├─ assets/             静态资源
│
├─ components/         公共组件
│    Navbar.vue
│    PropertyCard.vue
│    PropertyForm.vue
│
├─ layouts/            页面布局
│    MainLayout.vue
│
├─ router/             路由
│    index.js
│
├─ stores/             （可选 Pinia）
│    auth.js
│
├─ views/              ⭐ 页面（核心）
│
│   ├─ auth/
│   │    Login.vue
│   │
│   ├─ property/
│   │    PropertyList.vue
│   │    PropertyDetail.vue
│   │    PropertyCreate.vue
│   │    PropertyEdit.vue
│   │
│   ├─ favorite/
│   │    FavoriteList.vue
│   │
│   ├─ contract/
│   │    ContractList.vue
│   │    ContractCreate.vue
│   │
│   ├─ user/
│   │    UserProfile.vue
│   │
│   ├─ stats/
│   │    Dashboard.vue
│   │
│   └─ Home.vue
│
├─ App.vue
└─ main.js
```