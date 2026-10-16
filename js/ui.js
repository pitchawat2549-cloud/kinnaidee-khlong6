// ===================================================
// ui.js : ส่วนที่ทุกหน้าใช้ร่วมกัน
// - เมนูด้านบน / ท้ายเว็บ
// - การ์ดร้าน, ป้ายเปิด-ปิด, ราคา, ที่อยู่
// - ร้านที่ถูกใจ (เก็บในเครื่องผู้ใช้)
// - ดูรูปเต็มจอ (lightbox)
// - ปุ่ม "กินอะไรดี?" สุ่มร้านตามงบ
// - หน้าต่างแจ้งข้อมูล / แนะนำร้าน
// ต้องโหลด config.js, seed-data.js, api.js ก่อนไฟล์นี้
// ===================================================

// หน้าในโฟลเดอร์ย่อยใส่ <body data-root="../">
const ROOT = document.body.dataset.root || "";
const PAGE = document.body.dataset.page || "";

// ---------- ฟังก์ชันช่วย ----------
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// รูปในเครื่อง (images/...) ต้องเติม ROOT, รูปจาก Supabase เป็นลิงก์เต็มอยู่แล้ว
function imgSrc(src) {
  return /^https?:\/\//.test(src) ? src : ROOT + src;
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- ข้อความมาตรฐาน ----------
const AREA_ADDRESS = "ต.คลองหก อ.คลองหลวง จ.ปทุมธานี 12120";
const AREA_SHORT = "ต.คลองหก อ.คลองหลวง";

// แพทเทิร์นที่อยู่ (ใช้เหมือนกันทุกร้าน):
//   [เลขที่ / ซอย / ถนน] · [จุดสังเกต] · ต.คลองหก อ.คลองหลวง จ.ปทุมธานี 12120
function addressText(r, withArea = true) {
  const parts = [r.address, r.landmark].filter(Boolean);
  if (withArea) parts.push(AREA_ADDRESS);
  return parts.join(" · ");
}

// ที่อยู่แบบหลายบรรทัด (หน้ารายละเอียดร้าน)
function addressHtml(r) {
  return [
    r.address && `<span class="addr-main">${esc(r.address)}</span>`,
    r.landmark && `<span class="addr-landmark">จุดสังเกต: ${esc(r.landmark)}</span>`,
    `<span class="addr-area">${AREA_ADDRESS}</span>`
  ].filter(Boolean).join("");
}

// วันที่แบบไทย เช่น 16 ต.ค. 2569
function thaiDate(d) {
  if (!d) return "";
  const t = new Date(`${String(d).slice(0, 10)}T00:00:00`);
  return isNaN(t) ? "" : t.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
}

// ---------- ระยะทางจากผู้ใช้ (ร้านใกล้ฉัน) ----------
const Geo = {
  KEY: "kinnaidee-location",
  get() {
    try {
      const g = JSON.parse(sessionStorage.getItem(this.KEY));
      if (g && Date.now() - g.at < 30 * 60 * 1000) return g;   // จำตำแหน่งไว้ 30 นาที
    } catch (e) { /* ไม่มี */ }
    return null;
  },
  request() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("เบราว์เซอร์นี้หาตำแหน่งไม่ได้"));
      navigator.geolocation.getCurrentPosition(p => {
        const g = { lat: p.coords.latitude, lng: p.coords.longitude, at: Date.now() };
        try { sessionStorage.setItem(this.KEY, JSON.stringify(g)); } catch (e) { /* ข้าม */ }
        resolve(g);
      }, err => reject(new Error(err.code === 1
        ? "ไม่ได้รับอนุญาตให้ใช้ตำแหน่ง ลองกดอนุญาตที่แถบที่อยู่เว็บ"
        : "หาตำแหน่งไม่สำเร็จ ลองใหม่อีกครั้ง")), { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
    });
  },
  // ระยะทางเป็นเมตร (สูตร haversine)
  distance(r, g = this.get()) {
    if (!g || r.lat == null || r.lng == null) return null;
    const rad = d => d * Math.PI / 180, R = 6371000;
    const dLat = rad(r.lat - g.lat), dLng = rad(r.lng - g.lng);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(g.lat)) * Math.cos(rad(r.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  },
  text(m) {
    if (m == null) return "";
    return m < 1000 ? `ห่าง ${Math.round(m / 10) * 10} ม.` : `ห่าง ${(m / 1000).toFixed(1).replace(/\.0$/, "")} กม.`;
  }
};

const hasPrice = r => Boolean(r.price_min || r.price_max);

function priceText(r) {
  if (r.price_min && r.price_max && r.price_min !== r.price_max) return `${r.price_min} - ${r.price_max} บาท`;
  if (r.price_min || r.price_max) return `${r.price_min || r.price_max} บาท`;
  return "ไม่ระบุ";
}

const DAY_NAMES = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const is24h = r => r.open_time && r.open_time === r.close_time;   // เวลาเปิด = เวลาปิด คือเปิด 24 ชม.

// วันหยุดประจำสัปดาห์ เช่น "หยุดทุกวันเสาร์"
function closedDaysText(r) {
  const d = (r.closed_days || []).slice().sort();
  return d.length ? `หยุดทุกวัน${d.map(i => DAY_NAMES[i]).join(" และวัน")}` : "";
}

function hoursText(r) {
  if (!r.open_time || !r.close_time) return "ไม่ระบุ";
  const t = is24h(r) ? "เปิด 24 ชั่วโมง" : `${r.open_time} - ${r.close_time} น.`;
  const off = closedDaysText(r);
  return off ? `${t} (${off})` : t;
}

// สถานะเปิด-ปิด ณ เวลาปัจจุบัน (รองรับร้านที่ปิดหลังเที่ยงคืน)
function openStatus(r, now = new Date()) {
  if (!r.open_time || !r.close_time) return { state: "unknown", label: "ไม่ระบุเวลา" };
  if ((r.closed_days || []).includes(now.getDay())) return { state: "closed", label: "วันนี้ร้านหยุด" };
  if (is24h(r)) return { state: "open", open: true, label: "เปิด 24 ชั่วโมง" };
  const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const o = toMin(r.open_time), c = toMin(r.close_time);
  const n = now.getHours() * 60 + now.getMinutes();
  const open = o < c ? n >= o && n < c : n >= o || n < c;
  const until = t => (t - n + 1440) % 1440;          // อีกกี่นาทีถึงเวลา t
  const mins = m => m >= 60 ? `${Math.floor(m / 60)} ชม. ${m % 60 ? `${m % 60} นาที` : ""}`.trim() : `${m} นาที`;
  if (open) {
    const left = until(c);
    return left <= 60
      ? { state: "soon", open: true, label: `ใกล้ปิด · อีก ${mins(left)}`, mins: left }
      : { state: "open", open: true, label: `เปิดอยู่ · ปิด ${r.close_time} น.` };
  }
  const wait = until(o);
  return wait <= 60
    ? { state: "closed", label: `ใกล้เปิด · อีก ${mins(wait)}`, mins: wait }
    : { state: "closed", label: `ปิดแล้ว · เปิด ${r.open_time} น.` };
}

// อัปเดตข้อความป้ายสถานะที่อยู่บนหน้า โดยไม่ต้องวาดการ์ดใหม่
function refreshStatus(list) {
  $$("[data-status]").forEach(el => {
    const r = list.find(x => x.id === el.dataset.status);
    if (!r) return;
    const st = openStatus(r);
    el.textContent = st.label;
    el.className = el.className.replace(/badge-(open|closed|soon)/, `badge-${st.state}`);
  });
}

// ---------- ร้านที่ถูกใจ (เก็บในเบราว์เซอร์ของผู้ใช้) ----------
const Fav = {
  KEY: "kinnaidee-favorites",
  all() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; }
  },
  has(id) { return this.all().includes(id); },
  clear() {
    try { localStorage.removeItem(this.KEY); } catch { /* โหมดไม่ระบุตัวตน */ }
  },
  toggle(id) {
    const list = this.all();
    const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
    try { localStorage.setItem(this.KEY, JSON.stringify(next)); } catch { /* โหมดไม่ระบุตัวตน */ }
    return next.includes(id);
  }
};

// ---------- ข้อมูลหมวด / พื้นที่ ----------
let LOOKUP = { categories: [], areas: [] };
const getCategory = id => LOOKUP.categories.find(c => c.id === id) || { id: "", name: "ไม่ระบุหมวด", icon: "images/icons/rice.svg" };
const getArea = id => LOOKUP.areas.find(a => a.id === id);

// ---------- การ์ดร้าน ----------
function heartSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.1C.9 8.6 3 5 6.5 5c2 0 3.3 1.1 4 2.2.2.3.8.3 1 0C12.2 6.1 13.5 5 15.5 5 19 5 21.1 8.6 19.6 11.9 17.5 16.4 12 21 12 21z"/></svg>`;
}

function restaurantCard(r) {
  const cat = getCategory(r.category_id);
  const st = openStatus(r);
  const cover = r.images[0];
  const fav = Fav.has(r.id);
  const where = r.address || r.landmark || "คลองหก";
  const dist = Geo.distance(r);
  return `
    <article class="r-card">
      <a class="r-card-link" href="${ROOT}restaurant/detail.html?id=${encodeURIComponent(r.id)}" aria-label="ดูรายละเอียด ${esc(r.name)}"></a>
      <div class="r-card-media">
        ${cover ? `<div class="r-card-blur" style="background-image:url('${esc(imgSrc(cover.src))}')"></div>
        <img src="${esc(imgSrc(cover.src))}" alt="${esc(cover.alt || r.name)}" loading="lazy">` : `<div class="r-card-noimg">ยังไม่มีรูป</div>`}
        ${st.state !== "unknown" ? `<span class="badge badge-${st.state}" data-status="${esc(r.id)}">${esc(st.label)}</span>` : ""}
        ${dist != null ? `<span class="dist-chip">${esc(Geo.text(dist))}</span>` : ""}
        <button type="button" class="fav-btn ${fav ? "on" : ""}" data-fav="${esc(r.id)}" aria-pressed="${fav}" aria-label="ถูกใจร้าน ${esc(r.name)}">${heartSvg()}</button>
      </div>
      <div class="r-card-body">
        <p class="r-card-cat"><img src="${ROOT}${cat.icon}" alt=""> ${esc(cat.name)}</p>
        <h3>${esc(r.name)}</h3>
        ${hasPrice(r) ? `<p class="r-card-price">ช่วงราคา <b>${esc(priceText(r))}</b></p>` : ""}
        <p class="r-card-meta"><img src="${ROOT}images/icons/pin.svg" alt=""> <span>${esc(where)}<small class="r-card-area">${AREA_SHORT}</small></span></p>
        ${r.open_time ? `<p class="r-card-meta"><img src="${ROOT}images/icons/clock.svg" alt=""> ${esc(hoursText(r))}</p>` : ""}
        ${r.tags.length ? `<div class="tags">${r.tags.slice(0, 3).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
      </div>
    </article>`;
}

// ปุ่มถูกใจ (ใช้ได้ทุกหน้า)
document.addEventListener("click", e => {
  const b = e.target.closest("[data-fav]");
  if (!b) return;
  e.preventDefault();
  const on = Fav.toggle(b.dataset.fav);
  $$(`[data-fav="${CSS.escape(b.dataset.fav)}"]`).forEach(x => {
    x.classList.toggle("on", on);
    x.setAttribute("aria-pressed", on);
  });
  toast(on ? "เพิ่มในร้านที่ถูกใจแล้ว" : "เอาออกจากร้านที่ถูกใจแล้ว");
  document.dispatchEvent(new CustomEvent("favchange"));
});

// ---------- แจ้งเตือนสั้นๆ ----------
function toast(msg) {
  let t = $("#toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

// ---------- หน้าต่าง (modal) ----------
function openModal(html, cls = "") {
  closeModal();
  const wrap = document.createElement("div");
  wrap.className = "modal-backdrop";
  wrap.innerHTML = `<div class="modal ${cls}" role="dialog" aria-modal="true">
      <button type="button" class="modal-close" aria-label="ปิด">×</button>${html}</div>`;
  document.body.appendChild(wrap);
  document.body.classList.add("no-scroll");
  wrap.addEventListener("click", e => {
    if (e.target === wrap || e.target.closest(".modal-close")) closeModal();
  });
  requestAnimationFrame(() => wrap.classList.add("show"));
  return wrap.querySelector(".modal");
}

function closeModal() {
  $$(".modal-backdrop").forEach(m => m.remove());
  document.body.classList.remove("no-scroll");
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(); Lightbox.close(); }
});

// ---------- ดูรูปเต็มจอ ----------
const Lightbox = {
  list: [], index: 0, credit: "",
  open(images, index = 0, credit = "") {
    this.list = images; this.index = index; this.credit = credit;
    let lb = $("#lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "lightbox";
      lb.innerHTML = `
        <button type="button" class="lb-close" aria-label="ปิด">×</button>
        <button type="button" class="lb-nav lb-prev" aria-label="รูปก่อนหน้า">‹</button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button type="button" class="lb-nav lb-next" aria-label="รูปถัดไป">›</button>`;
      document.body.appendChild(lb);
      lb.addEventListener("click", e => {
        if (e.target.closest(".lb-prev")) this.go(-1);
        else if (e.target.closest(".lb-next")) this.go(1);
        else if (e.target === lb || e.target.closest(".lb-close")) this.close();
      });
      // ปัดซ้าย-ขวาบนมือถือ
      let x0 = null;
      lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener("touchend", e => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) this.go(dx < 0 ? 1 : -1);
        x0 = null;
      });
      document.addEventListener("keydown", e => {
        if (!lb.classList.contains("show")) return;
        if (e.key === "ArrowRight") this.go(1);
        if (e.key === "ArrowLeft") this.go(-1);
      });
    }
    this.render();
    lb.classList.add("show");
    document.body.classList.add("no-scroll");
  },
  go(step) {
    this.index = (this.index + step + this.list.length) % this.list.length;
    this.render();
  },
  render() {
    const lb = $("#lightbox");
    const im = this.list[this.index];
    $("img", lb).src = imgSrc(im.src);
    $("img", lb).alt = im.alt || "";
    $("figcaption", lb).innerHTML = `<b>${esc(im.alt || "")}</b> <span>${this.index + 1} / ${this.list.length}</span>${this.credit ? `<small>ที่มาภาพ: ${esc(this.credit)}</small>` : ""}`;
    $$(".lb-nav", lb).forEach(b => (b.hidden = this.list.length < 2));
  },
  close() {
    const lb = $("#lightbox");
    if (lb && lb.classList.contains("show")) {
      lb.classList.remove("show");
      document.body.classList.remove("no-scroll");
    }
  }
};

// ---------- ปุ่ม "กินอะไรดี?" สุ่มร้านตามงบ ----------
const Picker = {
  budget: 0, cat: "", openOnly: false,
  async open() {
    const data = await DB.loadAll();
    const m = openModal(`
      <div class="picker">
        <p class="eyebrow">ไม่รู้จะกินอะไร ให้เราช่วยเลือก</p>
        <h2>กินอะไรดี?</h2>
        <div class="picker-opts">
          <label class="field">งบต่อมื้อ
            <select id="pk-budget">
              <option value="0">ไม่จำกัดงบ</option>
              <option value="50">ไม่เกิน 50 บาท</option>
              <option value="80">ไม่เกิน 80 บาท</option>
              <option value="120">ไม่เกิน 120 บาท</option>
            </select>
          </label>
          <label class="field">หมวด
            <select id="pk-cat">
              <option value="">ทุกหมวด</option>
              ${LOOKUP.categories.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")}
            </select>
          </label>
          <label class="check"><input type="checkbox" id="pk-open"> เฉพาะร้านที่เปิดอยู่ตอนนี้</label>
        </div>
        <div class="picker-stage" id="pk-stage">
          <div class="picker-empty">กดปุ่มด้านล่างเพื่อสุ่มร้าน</div>
        </div>
        <div class="picker-actions">
          <button type="button" class="btn btn-lg" id="pk-spin">สุ่มร้านเลย</button>
        </div>
      </div>`, "modal-picker");
    $("#pk-budget", m).value = this.budget;
    $("#pk-cat", m).value = this.cat;
    $("#pk-open", m).checked = this.openOnly;
    $("#pk-spin", m).addEventListener("click", () => this.spin(data.restaurants));
  },
  pool(list) {
    this.budget = Number($("#pk-budget").value);
    this.cat = $("#pk-cat").value;
    this.openOnly = $("#pk-open").checked;
    return list.filter(r =>
      (!this.budget || (r.price_min && r.price_min <= this.budget)) &&
      (!this.cat || r.category_id === this.cat) &&
      (!this.openOnly || openStatus(r).open));
  },
  spin(list) {
    const pool = this.pool(list);
    const stage = $("#pk-stage");
    const btn = $("#pk-spin");
    if (!pool.length) {
      stage.innerHTML = `<div class="picker-empty">ไม่มีร้านที่ตรงเงื่อนไข<br><small>ลองเพิ่มงบ หรือเลือก "ทุกหมวด" (ร้านที่ยังไม่ระบุราคา จะสุ่มได้เฉพาะตอนเลือก "ไม่จำกัดงบ")</small></div>`;
      return;
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const winner = pool[Math.floor(Math.random() * pool.length)];
    const show = (r, final) => {
      const cover = r.images[0];
      stage.innerHTML = `
        <div class="picker-card ${final ? "final" : ""}">
          ${cover ? `<img src="${esc(imgSrc(cover.src))}" alt="">` : ""}
          <div>
            <h3>${esc(r.name)}</h3>
            <p>${esc(getCategory(r.category_id).name)}${hasPrice(r) ? ` · ช่วงราคา ${esc(priceText(r))}` : ""}</p>
            ${openStatus(r).state !== "unknown" ? `<p class="badge-inline badge-${openStatus(r).state}">${esc(openStatus(r).label)}</p>` : ""}
          </div>
        </div>`;
    };
    btn.disabled = true;
    let i = 0;
    const steps = reduce ? 0 : 14;
    const order = shuffle(pool);
    const tick = () => {
      if (i < steps) {
        show(order[i % order.length], false);
        i++;
        setTimeout(tick, 60 + i * 12);
      } else {
        show(winner, true);
        btn.disabled = false;
        btn.textContent = "สุ่มใหม่";
        stage.insertAdjacentHTML("beforeend",
          `<a class="btn btn-ghost picker-go" href="${ROOT}restaurant/detail.html?id=${encodeURIComponent(winner.id)}">ดูร้านนี้ →</a>`);
      }
    };
    tick();
  }
};

document.addEventListener("click", e => {
  if (e.target.closest("[data-picker]")) { e.preventDefault(); Picker.open(); }
});

// ---------- หน้าต่างแจ้งข้อมูลผิด / แนะนำร้าน ----------
function openSuggestForm({ kind = "new", restaurant = null } = {}) {
  const isFix = kind === "fix";
  const m = openModal(`
    <form class="suggest-form" novalidate>
      <h2>${isFix ? "แจ้งข้อมูลไม่ถูกต้อง" : "แนะนำร้านอาหาร"}</h2>
      <p class="muted">${isFix
        ? `ร้าน <b>${esc(restaurant.name)}</b> มีข้อมูลตรงไหนผิด บอกทีมงานได้เลย`
        : "รู้จักร้านอร่อยในคลองหกที่ยังไม่มีในเว็บ ส่งชื่อร้านมาได้เลย"}</p>
      ${isFix ? "" : `<label class="field">ชื่อร้าน <input id="sg-name" maxlength="120" required></label>`}
      <label class="field">${isFix ? "ข้อมูลที่ถูกต้อง" : "อยู่ตรงไหน ขายอะไร"}
        <textarea id="sg-msg" rows="4" maxlength="1000" required placeholder="${isFix ? "เช่น ร้านย้ายไปอยู่ซอยพรธิสาร 2 แล้ว / เปิด 10:00 - 20:00 น." : "เช่น ซอยพรธิสาร 4 ตรงข้ามเซเว่น ขายข้าวขาหมู"}"></textarea>
      </label>
      <label class="field">ช่องทางติดต่อกลับ (ไม่บังคับ) <input id="sg-contact" maxlength="200" placeholder="อีเมล หรือ LINE ID"></label>
      <p class="form-msg" role="alert"></p>
      <button class="btn btn-lg" type="submit">ส่งข้อมูล</button>
    </form>`);
  const form = $("form", m);
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const msgEl = $(".form-msg", form);
    const name = isFix ? "" : $("#sg-name", form).value.trim();
    const message = $("#sg-msg", form).value.trim();
    if (!isFix && !name) { msgEl.textContent = "กรุณาใส่ชื่อร้าน"; return; }
    if (message.length < 3) { msgEl.textContent = "กรุณาเขียนรายละเอียดอย่างน้อย 3 ตัวอักษร"; return; }
    const btn = $("button[type=submit]", form);
    btn.disabled = true;
    btn.textContent = "กำลังส่ง…";
    try {
      await DB.sendSuggestion({ kind, restaurant_id: restaurant?.id || null, name, message, contact: $("#sg-contact", form).value.trim() });
      form.innerHTML = `<h2>ส่งข้อมูลแล้ว</h2><p class="muted">ขอบคุณที่ช่วยทำให้ข้อมูลถูกต้อง ทีมงานจะตรวจสอบและอัปเดตในเว็บ</p>`;
    } catch (err) {
      msgEl.textContent = err.message;
      btn.disabled = false;
      btn.textContent = "ส่งข้อมูล";
    }
  });
}

// ---------- เมนูด้านบน + ท้ายเว็บ (ทุกหน้าใช้ชุดเดียวกัน) ----------
function renderChrome() {
  const nav = [
    ["home", "index.html", "หน้าแรก"],
    ["restaurants", "restaurant/restaurants.html", "ร้านอาหาร"],
    ["favorites", "restaurant/favorites.html", "ร้านที่ถูกใจ"],
    ["about", "about/about.html", "เกี่ยวกับเรา"]
  ];
  const header = $("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="nav-inner">
        <a href="${ROOT}index.html" class="logo"><img src="${ROOT}images/logo.png" alt="กินไหนดีคลองหก หน้าแรก"></a>
        <nav class="menu" aria-label="เมนูหลัก">
          ${nav.map(([id, href, label]) =>
            `<a href="${ROOT}${href}" class="${PAGE === id ? "active" : ""}"${PAGE === id ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <button type="button" class="btn btn-pick" data-picker>กินอะไรดี?</button>
      </div>`;
    const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="${ROOT}images/logo.png" alt="">
          <div>
            <b>กินไหนดีคลองหก</b>
            <p>รวมร้านอาหารรอบ มทร.ธัญบุรี<br>ต.คลองหก อ.คลองหลวง จ.ปทุมธานี</p>
          </div>
        </div>
        <div>
          <h4>เมนู</h4>
          <a href="${ROOT}index.html">หน้าแรก</a>
          <a href="${ROOT}restaurant/restaurants.html">ร้านอาหารทั้งหมด</a>
          <a href="${ROOT}restaurant/favorites.html">ร้านที่ถูกใจ</a>
          <a href="${ROOT}about/about.html">เกี่ยวกับเรา</a>
          <a href="${ROOT}admin/login.html">สำหรับผู้ดูแลระบบ</a>
        </div>
      </div>
      <p class="copyright">© 2026 กินไหนดีคลองหก</p>`;
  }
}

document.addEventListener("click", e => {
  const s = e.target.closest("[data-suggest]");
  if (s) openSuggestForm({ kind: s.dataset.suggest });
});

// ---------- เริ่มทำงาน ----------
const App = {
  // ทุกหน้าเรียก App.start(ฟังก์ชันของหน้านั้น)
  async start(pageFn) {
    renderChrome();
    try {
      const data = await DB.loadAll();
      // ซ่อนหมวดที่ยังไม่มีร้าน
      data.categories = data.categories.filter(c => data.restaurants.some(r => r.category_id === c.id));
      LOOKUP = { categories: data.categories, areas: data.areas };
      await pageFn(data);
      // อัปเดตป้ายเปิด-ปิดทุก 1 นาที (นับถอยหลังเวลาปิด)
      setInterval(() => refreshStatus(data.restaurants), 60 * 1000);
    } catch (e) {
      console.error(e);
      const main = $("main");
      if (main) main.insertAdjacentHTML("afterbegin", `<p class="error-box">โหลดข้อมูลไม่สำเร็จ กรุณารีเฟรชหน้าอีกครั้ง</p>`);
    }
  }
};
