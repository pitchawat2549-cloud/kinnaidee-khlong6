// ===================================================
// admin.js : ระบบจัดการร้าน (admin/index.html)
// เพิ่ม / แก้ไข / ลบร้าน, อัปโหลดรูป, อ่านข้อความจากผู้ใช้
// ต้องล็อกอินก่อน (สิทธิ์คุมด้วย RLS ใน Supabase)
// ===================================================
let RESTAURANTS = [];
let SUGGESTIONS = [];
let LOOK = { categories: [], areas: [] };

// ---------- เมนู: แปลงข้อความ <-> ข้อมูล ----------
// รูปแบบในช่องกรอก:
//   # ชื่อหมวด
//   ชื่อเมนู | ราคา
function menuToText(menu) {
  return (menu || []).map(g => `# ${g.title}\n` + g.items.map(i => `${i[0]} | ${i[1]}`).join("\n")).join("\n\n");
}

function textToMenu(text) {
  const groups = [];
  let cur = null;
  text.split("\n").map(l => l.trim()).filter(Boolean).forEach(line => {
    if (line.startsWith("#")) {
      cur = { title: line.replace(/^#+/, "").trim(), items: [] };
      groups.push(cur);
    } else {
      if (!cur) { cur = { title: "เมนู", items: [] }; groups.push(cur); }
      const [name, price = ""] = line.split("|").map(s => s.trim());
      cur.items.push([name, price]);
    }
  });
  return groups;
}

const fmtDate = d => d ? new Date(d).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" }) : "-";

// ---------- ตารางร้าน ----------
function renderRows() {
  const q = $("#admin-search").value.trim().toLowerCase();
  const rows = RESTAURANTS.filter(r => !q || r.name.toLowerCase().includes(q) || r.id.includes(q));
  $("#count-restaurants").textContent = RESTAURANTS.length;
  $("#restaurant-rows").innerHTML = rows.length ? rows.map(r => `
    <tr>
      <td>${r.images[0] ? `<img src="${esc(imgSrc(r.images[0].src))}" alt="">` : `<span class="noimg">ไม่มีรูป</span>`}</td>
      <td><b>${esc(r.name)}</b><br><small class="muted">${esc(r.id)}</small></td>
      <td>${esc(LOOK.categories.find(c => c.id === r.category_id)?.name || "-")}</td>
      <td>${esc(hoursText(r))}</td>
      <td>${r.published ? `<span class="pill on">เผยแพร่</span>` : `<span class="pill">ซ่อนอยู่</span>`}</td>
      <td><small>${esc(fmtDate(r.updated_at))}</small></td>
      <td class="row-actions">
        <a class="link-btn" href="../restaurant/detail.html?id=${encodeURIComponent(r.id)}" target="_blank" rel="noopener">ดู</a>
        <button type="button" class="link-btn" data-edit="${esc(r.id)}">แก้ไข</button>
        <button type="button" class="link-btn danger" data-del="${esc(r.id)}">ลบ</button>
      </td>
    </tr>`).join("") : `<tr><td colspan="7" class="muted center">ไม่พบร้าน</td></tr>`;
}

// "14.0428, 100.7325" -> { lat, lng } / ว่าง -> null / ผิดรูปแบบ -> undefined
function parseLatLng(text) {
  const t = text.trim();
  if (!t) return { lat: null, lng: null };
  const m = t.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (!m) return { lat: undefined, lng: undefined };
  const lat = Number(m[1]), lng = Number(m[2]);
  if (lat < 5 || lat > 21 || lng < 97 || lng > 106) return { lat: undefined, lng: undefined };   // นอกประเทศไทย
  return { lat, lng };
}

// ---------- ฟอร์มเพิ่ม / แก้ไขร้าน ----------
function openEditor(r) {
  const isNew = !r;
  r = r || { id: "", name: "", category_id: LOOK.categories[0]?.id || "", area_id: null, address: "", landmark: "",
             open_time: "", close_time: "", price_min: null, price_max: null, phone: "", tags: [], map_url: "", lat: null, lng: null,
             images: [], image_credit: "", menu: [], published: true };
  let images = r.images.map(i => ({ ...i }));

  const opt = (list, val, empty) =>
    (empty ? `<option value="">${empty}</option>` : "") +
    list.map(x => `<option value="${esc(x.id)}" ${x.id === val ? "selected" : ""}>${esc(x.name)}${x.soi ? ` (${esc(x.soi)})` : ""}</option>`).join("");

  const m = openModal(`
    <form class="editor" novalidate>
      <h2>${isNew ? "เพิ่มร้านใหม่" : "แก้ไขร้าน"}</h2>
      <div class="editor-grid">
        <label class="field">ชื่อร้าน * <input id="e-name" value="${esc(r.name)}" required maxlength="120"></label>
        <label class="field">รหัสร้าน (ใช้ในลิงก์) *
          <input id="e-id" value="${esc(r.id)}" ${isNew ? "" : "disabled"} placeholder="เช่น kaprao-mae" pattern="[a-z0-9-]+">
          <small class="hint">ภาษาอังกฤษตัวเล็ก ตัวเลข และขีด (-) เท่านั้น ตั้งแล้วแก้ไม่ได้</small>
        </label>
        <label class="field">หมวดหมู่ <select id="e-cat">${opt(LOOK.categories, r.category_id)}</select></label>
        <label class="field">โซน <select id="e-area">${opt(LOOK.areas, r.area_id, "ไม่ระบุ")}</select></label>
        <label class="field">ที่อยู่ (เลขที่ / ซอย / ถนน) * <input id="e-address" value="${esc(r.address)}" placeholder="เช่น 12/3 ซอยพรธิสาร 3 ถนนรังสิต-นครนายก"></label>
        <label class="field">จุดสังเกต <input id="e-landmark" value="${esc(r.landmark)}" placeholder="เช่น ตรงข้ามร้านเอสโตว์ ห่างประตู มทร. 200 ม."></label>
        <label class="field">เวลาเปิด <input type="time" id="e-open" value="${esc(r.open_time || "")}"></label>
        <label class="field">เวลาปิด <input type="time" id="e-close" value="${esc(r.close_time || "")}"></label>
        <label class="field">ราคาต่ำสุด (บาท) <input type="number" min="0" id="e-pmin" value="${r.price_min ?? ""}"></label>
        <label class="field">ราคาสูงสุด (บาท) <input type="number" min="0" id="e-pmax" value="${r.price_max ?? ""}"></label>
        <label class="field">เบอร์โทร <input id="e-phone" value="${esc(r.phone)}" placeholder="เช่น 081-234-5678"></label>
        <label class="field">ลิงก์ Google Maps <input id="e-map" value="${esc(r.map_url)}" placeholder="https://maps.app.goo.gl/..."></label>
        <label class="field span2">พิกัด (ละติจูด, ลองจิจูด) สำหรับ "ร้านใกล้ฉัน" และหมุดในแผนที่
          <input id="e-latlng" value="${r.lat != null ? `${r.lat}, ${r.lng}` : ""}" placeholder="เช่น 14.0428, 100.7325" inputmode="decimal">
          <small class="hint">เปิด Google Maps คลิกขวาที่ตำแหน่งร้าน แล้วกดตัวเลขบรรทัดแรกเพื่อคัดลอก มาวางที่นี่</small>
        </label>
        <label class="field span2">แท็ก (คั่นด้วยจุลภาค ,) <input id="e-tags" value="${esc(r.tags.join(", "))}" placeholder="เช่น เมนูยอดนิยม, ไข่ดาวกรอบ"></label>
      </div>
      <p class="muted small">ที่อยู่จะแสดงเป็น: <b id="e-preview"></b></p>

      <h3>รูปร้าน</h3>
      <div class="img-manager" id="e-images"></div>
      <div class="img-upload">
        <label class="btn btn-ghost">อัปโหลดรูป <input type="file" id="e-files" accept="image/*" multiple hidden></label>
        <small class="hint">รูปแรกคือรูปหน้าปก กด ↑ ↓ เพื่อเรียงลำดับ</small>
      </div>
      <label class="field">ที่มาภาพ (เครดิต) * <input id="e-credit" value="${esc(r.image_credit)}" placeholder="เช่น ถ่ายโดยทีมงาน / เพจร้าน / Google Maps"></label>

      <h3>เมนูและราคา</h3>
      <label class="field">
        <textarea id="e-menu" rows="8" placeholder="# เนื้อสัตว์&#10;หมูกรอบ | 60 / 80 บาท&#10;&#10;# ท็อปปิ้ง&#10;ไข่ดาว | 10 บาท">${esc(menuToText(r.menu))}</textarea>
        <small class="hint">ขึ้นบรรทัดด้วย # = ชื่อหมวด, บรรทัดอื่น = ชื่อเมนู | ราคา</small>
      </label>

      <label class="check"><input type="checkbox" id="e-pub" ${r.published ? "checked" : ""}> เผยแพร่บนหน้าเว็บ</label>
      <p class="form-msg" role="alert"></p>
      <div class="editor-actions">
        <button type="button" class="btn btn-ghost" data-close>ยกเลิก</button>
        <button type="submit" class="btn btn-lg">บันทึก</button>
      </div>
    </form>`, "modal-wide");

  const form = $("form", m);
  const msg = $(".form-msg", form);

  const preview = () => {
    $("#e-preview").textContent = addressText({ address: $("#e-address").value.trim(), landmark: $("#e-landmark").value.trim() });
  };
  ["#e-address", "#e-landmark"].forEach(s => $(s, form).addEventListener("input", preview));
  preview();

  // จัดการรูป
  const paintImages = () => {
    $("#e-images").innerHTML = images.length ? images.map((im, i) => `
      <div class="img-item">
        <img src="${esc(imgSrc(im.src))}" alt="">
        <input value="${esc(im.alt || "")}" data-alt="${i}" placeholder="คำอธิบายรูป เช่น หน้าร้าน" aria-label="คำอธิบายรูป">
        <div class="img-btns">
          <button type="button" data-up="${i}" ${i === 0 ? "disabled" : ""} aria-label="เลื่อนขึ้น">↑</button>
          <button type="button" data-down="${i}" ${i === images.length - 1 ? "disabled" : ""} aria-label="เลื่อนลง">↓</button>
          <button type="button" data-rm="${i}" class="danger" aria-label="ลบรูป">×</button>
        </div>
        ${i === 0 ? `<span class="cover-tag">หน้าปก</span>` : ""}
      </div>`).join("") : `<p class="muted">ยังไม่มีรูป</p>`;
  };
  paintImages();
  $("#e-images").addEventListener("input", e => {
    if (e.target.dataset.alt !== undefined) images[e.target.dataset.alt].alt = e.target.value;
  });
  $("#e-images").addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    const i = Number(b.dataset.up ?? b.dataset.down ?? b.dataset.rm);
    if (b.dataset.up !== undefined) [images[i - 1], images[i]] = [images[i], images[i - 1]];
    if (b.dataset.down !== undefined) [images[i + 1], images[i]] = [images[i], images[i + 1]];
    if (b.dataset.rm !== undefined) images.splice(i, 1);
    paintImages();
  });
  $("#e-files").addEventListener("change", async e => {
    const id = isNew ? $("#e-id").value.trim() : r.id;
    if (!/^[a-z0-9-]+$/.test(id)) { msg.textContent = "ตั้งรหัสร้านก่อนอัปโหลดรูป"; e.target.value = ""; return; }
    const files = [...e.target.files];
    msg.textContent = `กำลังอัปโหลด ${files.length} รูป…`;
    try {
      for (const f of files) {
        if (f.size > 5 * 1024 * 1024) throw new Error(`รูป ${f.name} ใหญ่เกิน 5 MB`);
        const url = await DB.admin.uploadImage(f, id);
        images.push({ src: url, alt: "" });
        paintImages();
      }
      msg.textContent = "";
      toast("อัปโหลดรูปแล้ว อย่าลืมกดบันทึก");
    } catch (err) {
      msg.textContent = err.message;
    }
    e.target.value = "";
  });

  form.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const num = s => (s.value === "" ? null : Number(s.value));
    const row = {
      id: isNew ? $("#e-id").value.trim() : r.id,
      name: $("#e-name").value.trim(),
      category_id: $("#e-cat").value || null,
      area_id: $("#e-area").value || null,
      address: $("#e-address").value.trim(),
      landmark: $("#e-landmark").value.trim(),
      open_time: $("#e-open").value || null,
      close_time: $("#e-close").value || null,
      price_min: num($("#e-pmin")),
      price_max: num($("#e-pmax")),
      phone: $("#e-phone").value.trim(),
      map_url: $("#e-map").value.trim(),
      ...parseLatLng($("#e-latlng").value),
      tags: $("#e-tags").value.split(",").map(s => s.trim()).filter(Boolean),
      images: images.map(i => ({ src: i.src, alt: (i.alt || "").trim() })),
      image_credit: $("#e-credit").value.trim(),
      menu: textToMenu($("#e-menu").value),
      published: $("#e-pub").checked
    };
    // ตรวจข้อมูล
    if (!row.name) return (msg.textContent = "กรุณาใส่ชื่อร้าน");
    if (!/^[a-z0-9-]+$/.test(row.id)) return (msg.textContent = "รหัสร้านใช้ได้เฉพาะ a-z, 0-9 และ - เท่านั้น");
    if (!row.address) return (msg.textContent = "กรุณาใส่ที่อยู่ (เลขที่ / ซอย / ถนน)");
    if (row.lat === undefined) return (msg.textContent = "พิกัดไม่ถูกต้อง ใส่แบบ 14.0428, 100.7325");
    if ((row.open_time && !row.close_time) || (!row.open_time && row.close_time)) return (msg.textContent = "ใส่เวลาเปิดและเวลาปิดให้ครบทั้งคู่");
    if (row.price_min && row.price_max && row.price_min > row.price_max) return (msg.textContent = "ราคาต่ำสุดต้องไม่มากกว่าราคาสูงสุด");
    if (row.images.length && !row.image_credit) return (msg.textContent = "กรุณาระบุที่มาภาพ (เครดิต)");

    const btn = $("button[type=submit]", form);
    btn.disabled = true; btn.textContent = "กำลังบันทึก…";
    try {
      await DB.admin.saveRestaurant(row, isNew);
      closeModal();
      toast(isNew ? "เพิ่มร้านแล้ว" : "บันทึกแล้ว");
      await loadRestaurants();
    } catch (err) {
      msg.textContent = err.message;
      btn.disabled = false; btn.textContent = "บันทึก";
    }
  });
}

function confirmDelete(r) {
  const m = openModal(`
    <h2>ลบร้านนี้?</h2>
    <p>ร้าน <b>${esc(r.name)}</b> จะถูกลบออกจากเว็บถาวร กู้คืนไม่ได้<br>
    ถ้าแค่อยากซ่อนชั่วคราว ให้กด "แก้ไข" แล้วเอาเครื่องหมาย "เผยแพร่" ออกแทน</p>
    <p class="form-msg" role="alert"></p>
    <div class="editor-actions">
      <button type="button" class="btn btn-ghost" data-close>ยกเลิก</button>
      <button type="button" class="btn btn-danger" id="do-delete">ลบถาวร</button>
    </div>`);
  m.addEventListener("click", async e => {
    if (e.target.closest("[data-close]")) closeModal();
    if (e.target.closest("#do-delete")) {
      try {
        await DB.admin.deleteRestaurant(r.id);
        closeModal();
        toast("ลบร้านแล้ว");
        await loadRestaurants();
      } catch (err) {
        $(".form-msg", m).textContent = err.message;
      }
    }
  });
}

// ---------- ข้อความจากผู้ใช้ ----------
function renderSuggestions() {
  const fresh = SUGGESTIONS.filter(s => s.status === "new").length;
  $("#count-new").textContent = fresh ? fresh : "";
  $("#count-new").classList.toggle("alert", fresh > 0);
  $("#suggestion-list").innerHTML = SUGGESTIONS.length ? SUGGESTIONS.map(s => {
    const shop = RESTAURANTS.find(r => r.id === s.restaurant_id);
    return `
      <article class="sg ${s.status}">
        <header>
          <span class="pill ${s.kind === "new" ? "on" : "warn"}">${s.kind === "new" ? "แนะนำร้านใหม่" : "แจ้งข้อมูลผิด"}</span>
          <b>${s.kind === "new" ? esc(s.name) : shop ? `<a href="../restaurant/detail.html?id=${encodeURIComponent(shop.id)}" target="_blank" rel="noopener">${esc(shop.name)}</a>` : esc(s.restaurant_id || "-")}</b>
          <small class="muted">${esc(fmtDate(s.created_at))}</small>
        </header>
        <p>${esc(s.message)}</p>
        ${s.contact ? `<p class="muted small">ติดต่อกลับ: ${esc(s.contact)}</p>` : ""}
        <div class="row-actions">
          ${s.status === "new"
            ? `<button type="button" class="link-btn" data-done="${s.id}">ทำแล้ว</button>`
            : `<span class="muted small">ทำแล้ว</span> <button type="button" class="link-btn" data-undo="${s.id}">ย้อนกลับ</button>`}
          ${shop ? `<button type="button" class="link-btn" data-edit="${esc(shop.id)}">แก้ไขร้านนี้</button>` : ""}
          <button type="button" class="link-btn danger" data-sgdel="${s.id}">ลบ</button>
        </div>
      </article>`;
  }).join("") : `<div class="empty">ยังไม่มีข้อความจากผู้ใช้</div>`;
}

// ---------- โหลดข้อมูล ----------
async function loadRestaurants() {
  RESTAURANTS = await DB.admin.listRestaurants();
  renderRows();
}

async function loadSuggestions() {
  SUGGESTIONS = await DB.admin.listSuggestions();
  renderSuggestions();
}

// ---------- เริ่มทำงาน ----------
(async () => {
  if (!DB.configured) { location.replace("login.html"); return; }
  const session = await DB.admin.session();
  if (!session) { location.replace("login.html"); return; }
  $("#admin-email").textContent = session.user.email;

  try {
    LOOK = await DB.admin.lookups();
    LOOKUP = LOOK;            // ให้ฟังก์ชันใน ui.js ใช้ชื่อหมวดได้
    await Promise.all([loadRestaurants(), loadSuggestions()]);
  } catch (err) {
    $(".admin-main").insertAdjacentHTML("afterbegin", `<p class="error-box">${esc(err.message)}</p>`);
  }

  // แท็บ
  $(".admin-tabs").addEventListener("click", e => {
    const t = e.target.closest("[data-tab]");
    if (!t) return;
    $$(".admin-tabs [data-tab]").forEach(b => {
      const on = b === t;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on);
    });
    $("#tab-restaurants").hidden = t.dataset.tab !== "restaurants";
    $("#tab-suggestions").hidden = t.dataset.tab !== "suggestions";
  });

  $("#admin-search").addEventListener("input", renderRows);
  $("#add-restaurant").addEventListener("click", () => openEditor(null));
  $("#logout").addEventListener("click", async () => { await DB.admin.signOut(); location.replace("login.html"); });

  document.addEventListener("click", async e => {
    const b = e.target.closest("button");
    if (!b) return;
    try {
      if (b.dataset.edit) openEditor(RESTAURANTS.find(r => r.id === b.dataset.edit));
      if (b.dataset.del) confirmDelete(RESTAURANTS.find(r => r.id === b.dataset.del));
      if (b.dataset.done) { await DB.admin.setSuggestionStatus(b.dataset.done, "done"); await loadSuggestions(); }
      if (b.dataset.undo) { await DB.admin.setSuggestionStatus(b.dataset.undo, "new"); await loadSuggestions(); }
      if (b.dataset.sgdel) { await DB.admin.deleteSuggestion(b.dataset.sgdel); await loadSuggestions(); toast("ลบข้อความแล้ว"); }
    } catch (err) {
      toast(err.message);
    }
  });
})();
