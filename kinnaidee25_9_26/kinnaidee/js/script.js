// ===================================================
// script.js : สร้างการ์ดร้าน, ค้นหา, กรอง, หน้ารายละเอียด
// ต้องโหลด data.js ก่อนไฟล์นี้เสมอ
// ===================================================

// ---------- ตำแหน่งโฟลเดอร์ ----------
// หน้าในโฟลเดอร์ย่อย (restaurant/, about/) ใส่ <body data-root="../">
// เพื่อให้ลิงก์รูปและลิงก์หน้าอื่นถูกต้อง
const ROOT = document.body.dataset.root || "";

// ---------- ฟังก์ชันช่วย ----------
function getCategory(id) {
  return CATEGORIES.find(c => c.id === id);
}

function getArea(id) {
  return AREAS.find(a => a.id === id);
}

// อ่านค่าจากลิงก์ เช่น detail.html?id=kaprao-mae
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---------- การ์ดร้าน (ใช้ทั้งหน้าแรกและหน้าร้านอาหาร) ----------
function restaurantCard(restaurant) {
  const cat = getCategory(restaurant.category);

  const rating = restaurant.rating
    ? `<p class="rating">${restaurant.rating} <span class="star">★</span> <span class="reviews">(${restaurant.reviews} รีวิว)</span></p>`
    : `<p class="rating no-data">ยังไม่มีคะแนน</p>`;

  const tags = restaurant.tags.map(t => `<span class="tag">${t}</span>`).join("");

  return `
    <a class="restaurant-card" href="${ROOT}restaurant/detail.html?id=${restaurant.id}">
      <img class="card-icon" src="${ROOT}${cat.icon}" alt="">
      <h3>${restaurant.name}</h3>
      <img class="card-img" src="${ROOT}${restaurant.images[0]}" alt="${restaurant.name}">
      ${rating}
      <p class="address"><img src="${ROOT}images/icons/pin.svg" alt=""> ${restaurant.address}</p>
      <div class="tags">${tags}</div>
      <div class="card-bottom">
        <span class="hours"><img src="${ROOT}images/icons/clock.svg" alt=""> ${restaurant.hours || "ไม่ระบุเวลา"}</span>
        <span class="more">ดูรายละเอียด</span>
      </div>
    </a>`;
}

// ===================================================
// หน้าแรก (index.html)
// ===================================================
function renderHome() {
  // ประเภทอาหาร
  const catBox = document.getElementById("home-categories");
  catBox.innerHTML = CATEGORIES.map(c => `
    <a class="category-card" href="${ROOT}restaurant/restaurants.html?cat=${c.id}">
      <img src="${ROOT}${c.icon}" alt="">
      <span>${c.name}</span>
    </a>`).join("");

  // ร้านแนะนำ = 5 ร้านที่คะแนนสูงสุด
  const top = RESTAURANTS.filter(s => s.rating)
                   .sort((a, b) => b.rating - a.rating)
                   .slice(0, 5);
  document.getElementById("home-restaurants").innerHTML = top.map(restaurantCard).join("");
}

// ===================================================
// หน้าร้านอาหาร (restaurant/restaurants.html)
// ===================================================
const PER_PAGE = 5;                 // จำนวนร้านต่อหน้า
let state = {
  cat: getParam("cat") || "all",
  area: "all",
  search: "",
  sort: "rating",
  page: 1
};

function renderRestaurantsPage() {
  // ปุ่มประเภทอาหาร
  const catBtns = [{ id: "all", name: "ทั้งหมด" }, ...CATEGORIES];
  document.getElementById("filter-category").innerHTML = catBtns.map(c =>
    `<button class="chip ${state.cat === c.id ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`
  ).join("");

  // ปุ่มพื้นที่
  const areaBtns = [{ id: "all", name: "ทั้งหมด" }, ...AREAS];
  document.getElementById("filter-area").innerHTML = areaBtns.map(a =>
    `<button class="chip ${state.area === a.id ? "active" : ""}" data-area="${a.id}">${a.name}</button>`
  ).join("");

  // กรองร้าน
  const word = state.search.trim().toLowerCase();
  let list = RESTAURANTS.filter(s =>
    (state.cat === "all" || s.category === state.cat) &&
    (state.area === "all" || s.area === state.area) &&
    (word === "" || s.name.toLowerCase().includes(word) || s.tags.join(" ").toLowerCase().includes(word))
  );

  // เรียงลำดับ
  if (state.sort === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (state.sort === "name")   list.sort((a, b) => a.name.localeCompare(b.name, "th"));
  if (state.sort === "random") list.sort(() => Math.random() - 0.5);

  document.getElementById("restaurant-count").textContent = `พบทั้งหมด ${list.length} ร้าน`;

  // แบ่งหน้า
  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * PER_PAGE;
  const pageList = list.slice(start, start + PER_PAGE);

  document.getElementById("restaurant-list").innerHTML = pageList.length
    ? pageList.map(restaurantCard).join("")
    : `<p class="empty">ไม่พบร้านที่ค้นหา ลองเปลี่ยนคำค้นหรือเลือก "ทั้งหมด"</p>`;

  // ปุ่มเลขหน้า
  let pager = `<button data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""}>&lt;</button>`;
  for (let i = 1; i <= totalPages; i++) {
    pager += `<button data-page="${i}" class="${i === state.page ? "active" : ""}">${i}</button>`;
  }
  pager += `<button data-page="${state.page + 1}" ${state.page === totalPages ? "disabled" : ""}>&gt;</button>`;
  document.getElementById("pagination").innerHTML = pager;
}

function setupRestaurantsPage() {
  renderRestaurantsPage();

  // กดปุ่มประเภท / พื้นที่ / เลขหน้า
  document.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.cat)  { state.cat = b.dataset.cat;   state.page = 1; }
    if (b.dataset.area) { state.area = b.dataset.area; state.page = 1; }
    if (b.dataset.page) { state.page = Number(b.dataset.page); }
    renderRestaurantsPage();
  });

  // ช่องค้นหา
  document.getElementById("search-form").addEventListener("submit", e => {
    e.preventDefault();
    state.search = document.getElementById("search-input").value;
    state.page = 1;
    renderRestaurantsPage();
  });

  // เรียงตาม
  document.getElementById("sort").addEventListener("change", e => {
    state.sort = e.target.value;
    state.page = 1;
    renderRestaurantsPage();
  });
}

// ===================================================
// หน้ารายละเอียดร้าน (restaurant/detail.html?id=...)
// ===================================================
function renderDetail() {
  const restaurant = RESTAURANTS.find(s => s.id === getParam("id")) || RESTAURANTS[0];
  document.title = restaurant.name + " | กินไหนดีคลองหก";

  document.getElementById("detail-img").src = ROOT + restaurant.images[0];
  document.getElementById("detail-img").alt = restaurant.name;
  document.getElementById("detail-name").textContent = restaurant.name;
  document.getElementById("detail-rating").textContent = restaurant.rating ? `${restaurant.rating}/5.0 ★ (${restaurant.reviews} รีวิว)` : "ยังไม่มีคะแนน";
  document.getElementById("detail-category").textContent = getCategory(restaurant.category).name;
  document.getElementById("detail-address").textContent = restaurant.address;
  document.getElementById("detail-phone").textContent = restaurant.phone ? "เบอร์โทร " + restaurant.phone : "เบอร์โทร ไม่ระบุ";
  document.getElementById("detail-hours").textContent = "เวลาเปิด-ปิด " + (restaurant.hours ? restaurant.hours + " น." : "ไม่ระบุ");

  // รูปเพิ่มเติม
  document.getElementById("detail-gallery").innerHTML =
    restaurant.images.slice(1).map(src => `<img src="${ROOT}${src}" alt="${restaurant.name}">`).join("");

  // แผนที่ (Google Maps แบบฝัง ค้นจากชื่อร้าน + ที่อยู่)
  const q = encodeURIComponent(restaurant.name + " " + restaurant.address);
  document.getElementById("detail-map").src = `https://www.google.com/maps?q=${q}&output=embed`;
  document.getElementById("detail-route").href = restaurant.map;
}

// ===================================================
// เลือกว่าจะรันฟังก์ชันไหน ตามหน้าที่เปิดอยู่
// ===================================================
if (document.getElementById("home-restaurants")) renderHome();
if (document.getElementById("restaurant-list"))  setupRestaurantsPage();
if (document.getElementById("detail-name")) renderDetail();
