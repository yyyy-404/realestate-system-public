const KEY = {
  token: "rs_token",
  user: "rs_user",
  users: "rs_users",
  properties: "rs_properties",
  favorites: "rs_favorites",
  contracts: "rs_contracts",
  drafts: "rs_property_drafts",
};

const DEFAULT_PROPERTIES = [
  {
    id: 1,
    title: "朝南两居室",
    price: 128,
    location: "市中心 · 金桂路",
    area: "86㎡",
    status: "在售",
    desc: "采光通透，玻璃阳台，地铁步行8分钟。",
    owner: "张先生",
  },
  {
    id: 2,
    title: "学区改善三居",
    price: 245,
    location: "城西 · 文澜街",
    area: "118㎡",
    status: "在售",
    desc: "配套成熟，适合家庭改善居住。",
    owner: "李女士",
  },
  {
    id: 3,
    title: "精装小户型",
    price: 89,
    location: "城南 · 云栖路",
    area: "58㎡",
    status: "待发布",
    desc: "适合首套上车，支持拎包入住。",
    owner: "王先生",
  },
];

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUser() {
  return loadJSON(KEY.user, null);
}

function setUser(user) {
  saveJSON(KEY.user, user);
  localStorage.setItem(KEY.token, user.token || "demo-token");
}

function clearAuth() {
  localStorage.removeItem(KEY.token);
  localStorage.removeItem(KEY.user);
}

function ensureBootstrap() {
  if (!localStorage.getItem(KEY.properties)) saveJSON(KEY.properties, DEFAULT_PROPERTIES);
  if (!localStorage.getItem(KEY.favorites)) saveJSON(KEY.favorites, []);
  if (!localStorage.getItem(KEY.contracts)) saveJSON(KEY.contracts, []);
  if (!localStorage.getItem(KEY.drafts)) saveJSON(KEY.drafts, []);
  if (!localStorage.getItem(KEY.users)) saveJSON(KEY.users, []);
}

function toast(message, type = "info") {
  let el = document.querySelector(".toast");

  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }

  el.className = `toast ${type}`;
  el.textContent = message;
  el.classList.add("show");

  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.classList.remove("show");
  }, 2000);
}

function showToast(message, type = "info") {
  toast(message, type);
}

function requireAuth() {
  const token = localStorage.getItem(KEY.token);
  if (!token) {
    toast("请先登录", "error");
    setTimeout(() => {
      location.href = "login.html";
    }, 700);
    return false;
  }
  return true;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderUserBox() {
  const host = document.querySelector("[data-userbox]");
  if (!host) return;

  let slot = host.querySelector(":scope > .userbox-slot");
  if (!slot) {
    slot = document.createElement("div");
    slot.className = "userbox-slot";
    host.prepend(slot);
  }

  const user = getUser();
  slot.innerHTML = user
    ? `
      <div class="userbox">
        <strong>${escapeHtml(user.username || "用户")}</strong>
        <span class="muted">角色：${escapeHtml(user.role || "buyer")}</span>
      </div>
    `
    : `
      <div class="userbox">
        <strong>未登录</strong>
        <span class="muted">请先登录后使用全部功能</span>
      </div>
    `;
}

function getProperties() {
  return loadJSON(KEY.properties, DEFAULT_PROPERTIES);
}

function setProperties(v) {
  saveJSON(KEY.properties, v);
}

function getFavorites() {
  return loadJSON(KEY.favorites, []);
}

function setFavorites(v) {
  saveJSON(KEY.favorites, v);
}

function getContracts() {
  return loadJSON(KEY.contracts, []);
}

function setContracts(v) {
  saveJSON(KEY.contracts, v);
}

function getDrafts() {
  return loadJSON(KEY.drafts, []);
}

function setDrafts(v) {
  saveJSON(KEY.drafts, v);
}

function getUsers() {
  return loadJSON(KEY.users, []);
}

function setUsers(v) {
  saveJSON(KEY.users, v);
}

function addFavorite(propertyId) {
  const favs = getFavorites();
  if (favs.includes(propertyId)) {
    toast("已收藏", "info");
    return;
  }
  favs.push(propertyId);
  setFavorites(favs);
  toast("收藏成功", "success");
}

function removeFavorite(propertyId) {
  setFavorites(getFavorites().filter((id) => id !== propertyId));
  toast("已移除收藏", "success");
}

function createContract(property) {
  const contracts = getContracts();
  contracts.unshift({
    id: Date.now(),
    propertyId: property.id,
    title: property.title,
    buyer: getUser()?.username || "匿名买家",
    seller: property.owner,
    status: "待确认",
    createdAt: new Date().toLocaleString(),
  });
  setContracts(contracts);
  toast("合同已生成", "success");
}

function renderProperties(listEl, onlyFavorites = false) {
  const properties = getProperties();
  const favorites = new Set(getFavorites());
  const data = onlyFavorites ? properties.filter((p) => favorites.has(p.id)) : properties;

  if (!listEl) return;

  listEl.innerHTML =
    data
      .map(
        (p) => `
    <div class="item">
      <div class="item-top">
        <div>
          <h4>${escapeHtml(p.title)}</h4>
          <div class="muted">${escapeHtml(p.location)} · ${escapeHtml(p.area)}</div>
        </div>
        <div class="price">${p.price} 万</div>
      </div>
      <p class="muted" style="margin-top:10px">${escapeHtml(p.desc)}</p>
      <div class="meta">
        <span class="tag">${escapeHtml(p.status)}</span>
        <span class="tag">房主：${escapeHtml(p.owner)}</span>
        <span class="tag">编号：${p.id}</span>
      </div>
      <div class="actions-row">
        <button class="btn btn-secondary" data-fav="${p.id}">${favorites.has(p.id) ? "已收藏" : "收藏房源"}</button>
        <button class="btn" data-contract="${p.id}">发起合同</button>
      </div>
    </div>`
      )
      .join("") || `<div class="card"><p>暂无数据</p></div>`;

  listEl.querySelectorAll("[data-fav]").forEach((btn) =>
    btn.addEventListener("click", () => {
      addFavorite(Number(btn.dataset.fav));
      renderProperties(listEl, onlyFavorites);
    })
  );

  listEl.querySelectorAll("[data-contract]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const property = getProperties().find((p) => p.id === Number(btn.dataset.contract));
      if (property) {
        createContract(property);
        location.href = "contracts.html";
      }
    })
  );
}

function renderFavorites(listEl) {
  const favs = new Set(getFavorites());
  const properties = getProperties().filter((p) => favs.has(p.id));

  if (!listEl) return;

  listEl.innerHTML =
    properties
      .map(
        (p) => `
    <div class="item">
      <div class="item-top">
        <div>
          <h4>${escapeHtml(p.title)}</h4>
          <div class="muted">${escapeHtml(p.location)} · ${escapeHtml(p.area)}</div>
        </div>
        <div class="price">${p.price} 万</div>
      </div>
      <p class="muted" style="margin-top:10px">${escapeHtml(p.desc)}</p>
      <div class="actions-row">
        <button class="btn btn-secondary" data-remove="${p.id}">取消收藏</button>
        <button class="btn" data-contract="${p.id}">发起合同</button>
      </div>
    </div>`
      )
      .join("") || `<div class="card"><p>还没有收藏房源</p></div>`;

  listEl.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeFavorite(Number(btn.dataset.remove));
      renderFavorites(listEl);
    })
  );

  listEl.querySelectorAll("[data-contract]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const property = getProperties().find((p) => p.id === Number(btn.dataset.contract));
      if (property) {
        createContract(property);
        location.href = "contracts.html";
      }
    })
  );
}

function renderContracts(listEl) {
  const contracts = getContracts();
  if (!listEl) return;

  listEl.innerHTML =
    contracts
      .map(
        (c) => `
    <div class="item">
      <div class="item-top">
        <div>
          <h4>${escapeHtml(c.title)}</h4>
          <div class="muted">买家：${escapeHtml(c.buyer)} · 卖家：${escapeHtml(c.seller)}</div>
        </div>
        <div class="price">${escapeHtml(c.status)}</div>
      </div>
      <div class="meta">
        <span class="tag">编号：${c.id}</span>
        <span class="tag">生成时间：${escapeHtml(c.createdAt)}</span>
      </div>
      <div class="actions-row">
        <button class="btn btn-secondary" data-confirm="${c.id}">确认完成</button>
      </div>
    </div>`
      )
      .join("") || `<div class="card"><p>暂无合同记录</p></div>`;

  listEl.querySelectorAll("[data-confirm]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.confirm);
      setContracts(getContracts().map((c) => (c.id === id ? { ...c, status: "已完成" } : c)));
      toast("合同状态已更新", "success");
      renderContracts(listEl);
    })
  );
}

function setupAuthLogin() {
  ensureBootstrap();

  const form = document.querySelector("#loginForm");
  const error = document.querySelector("[data-error]");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (error) {
      error.textContent = "";
      error.style.display = "none";
    }

    const formData = new FormData(form);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!username || !password) {
      if (error) {
        error.textContent = "用户名和密码不能为空";
        error.style.display = "block";
      }
      toast("用户名和密码不能为空", "error");
      return;
    }

    const users = getUsers();
    const validUser = users.find((u) => u.username === username && u.password === password);

    if (!validUser) {
      if (error) {
        error.textContent = "用户名或密码错误";
        error.style.display = "block";
      }
      toast("用户名或密码错误", "error");
      return;
    }

    setUser({ ...validUser, token: "demo-token-" + Date.now() });
    toast("登录成功", "success");
    location.href = "home.html";
  });
}

function setupAuthRegister() {
  ensureBootstrap();

  const form = document.querySelector("#registerForm");
  const error = document.querySelector("[data-error]");
  const roleItems = document.querySelectorAll("[data-role]");

  roleItems.forEach((item) => {
    item.addEventListener("click", () => {
      roleItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      if (form?.role) form.role.value = item.dataset.role;
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (error) {
      error.textContent = "";
      error.style.display = "none";
    }

    const formData = new FormData(form);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const confirm = String(formData.get("confirmPassword") || "").trim();
    const role = String(formData.get("role") || "buyer").trim();

    if (!username || !password || !confirm) {
      if (error) {
        error.textContent = "请完整填写注册信息";
        error.style.display = "block";
      }
      toast("请完整填写注册信息", "error");
      return;
    }

    if (password !== confirm) {
      if (error) {
        error.textContent = "两次输入的密码不一致";
        error.style.display = "block";
      }
      toast("两次输入的密码不一致", "error");
      return;
    }

    if (password.length < 6) {
      if (error) {
        error.textContent = "密码长度至少 6 位";
        error.style.display = "block";
      }
      toast("密码长度至少 6 位", "error");
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.username === username)) {
      if (error) {
        error.textContent = "用户名已存在";
        error.style.display = "block";
      }
      toast("用户名已存在", "error");
      return;
    }

    users.push({ username, password, role });
    setUsers(users);
    toast("注册成功", "success");
    location.href = "login.html";
  });
}

function setupPropertyPublish() {
  ensureBootstrap();
  if (!requireAuth()) return;

  renderUserBox();

  const form = document.querySelector("#publishForm");
  if (!form) return;

  const drafts = getDrafts();
  if (drafts[0]) {
    form.title.value = drafts[0].title || "";
    form.price.value = drafts[0].price || "";
    form.location.value = drafts[0].location || "";
    form.area.value = drafts[0].area || "";
    form.desc.value = drafts[0].desc || "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const properties = getProperties();
    const user = getUser();

    const item = {
      id: Date.now(),
      title: form.title.value.trim(),
      price: Number(form.price.value),
      location: form.location.value.trim(),
      area: form.area.value.trim(),
      status: form.status.value,
      desc: form.desc.value.trim(),
      owner: user?.username || "匿名卖家",
    };

    if (!item.title || !item.price || !item.location || !item.area || !item.desc) {
      toast("请补全房源信息", "error");
      return;
    }

    properties.unshift(item);
    setProperties(properties);
    setDrafts([{ ...item }]);
    toast("房源发布成功", "success");
    location.href = "properties.html";
  });
}

function setupHome() {
  ensureBootstrap();
  if (!requireAuth()) return;

  renderUserBox();

  const stats = document.querySelector("#stats");
  if (stats) {
    const properties = getProperties();
    const favorites = getFavorites().length;
    const contracts = getContracts().length;

    stats.innerHTML = `
      <div class="stat"><span>房源总数</span><strong>${properties.length}</strong></div>
      <div class="stat"><span>收藏数量</span><strong>${favorites}</strong></div>
      <div class="stat"><span>合同数量</span><strong>${contracts}</strong></div>
    `;
  }
}

function setupListPage() {
  ensureBootstrap();
  if (!requireAuth()) return;

  renderUserBox();

  const list = document.querySelector("#propertyList");
  const keyword = document.querySelector("#keyword");
  const status = document.querySelector("#status");
  const price = document.querySelector("#price");

  const run = () => {
    const kw = keyword?.value.trim() || "";
    const st = status?.value || "";
    const p = price?.value || "";

    let data = getProperties();

    if (kw) {
      data = data.filter((i) =>
        [i.title, i.location, i.desc, i.owner].join(" ").includes(kw)
      );
    }

    if (st) {
      data = data.filter((i) => i.status === st);
    }

    if (p) {
      data = data.filter((i) => Number(i.price) <= Number(p));
    }

    const favs = new Set(getFavorites());

    if (!list) return;

    list.innerHTML =
      data
        .map(
          (p) => `
      <div class="item">
        <div class="item-top">
          <div>
            <h4>${escapeHtml(p.title)}</h4>
            <div class="muted">${escapeHtml(p.location)} · ${escapeHtml(p.area)}</div>
          </div>
          <div class="price">${p.price} 万</div>
        </div>
        <p class="muted" style="margin-top:10px">${escapeHtml(p.desc)}</p>
        <div class="meta">
          <span class="tag">${escapeHtml(p.status)}</span>
          <span class="tag">房主：${escapeHtml(p.owner)}</span>
        </div>
        <div class="actions-row">
          <button class="btn btn-secondary" data-fav="${p.id}">${favs.has(p.id) ? "已收藏" : "收藏房源"}</button>
          <button class="btn" data-contract="${p.id}">发起合同</button>
        </div>
      </div>`
        )
        .join("") || `<div class="card"><p>没有符合条件的房源</p></div>`;

    list.querySelectorAll("[data-fav]").forEach((btn) =>
      btn.addEventListener("click", () => {
        addFavorite(Number(btn.dataset.fav));
        run();
      })
    );

    list.querySelectorAll("[data-contract]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const property = getProperties().find((p) => p.id === Number(btn.dataset.contract));
        if (property) {
          createContract(property);
          location.href = "contracts.html";
        }
      })
    );
  };

  [keyword, status, price].forEach((el) => el?.addEventListener("input", run));
  [status, price].forEach((el) => el?.addEventListener("change", run));

  run();
}

function setupFavoritesPage() {
  ensureBootstrap();
  if (!requireAuth()) return;

  renderUserBox();
  renderFavorites(document.querySelector("#favoriteList"));
}

function setupContractsPage() {
  ensureBootstrap();
  if (!requireAuth()) return;

  renderUserBox();
  renderContracts(document.querySelector("#contractList"));
}

function setupIndex() {
  ensureBootstrap();
  renderUserBox();
}

window.RS = {
  toast,
  showToast,
  clearAuth,
  getUser,
  setUser,
  getProperties,
  setProperties,
  getFavorites,
  setFavorites,
  getContracts,
  setContracts,
  getDrafts,
  setDrafts,
  setupAuthLogin,
  setupAuthRegister,
  setupHome,
  setupListPage,
  setupPropertyPublish,
  setupFavoritesPage,
  setupContractsPage,
  setupIndex,
  renderUserBox,
  addFavorite,
  removeFavorite,
  createContract,
};