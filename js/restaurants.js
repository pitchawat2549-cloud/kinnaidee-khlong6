const PER_PAGE = 8;

App.start(data => {
  const all = data.restaurants;
  const p = new URLSearchParams(location.search);
  const state = {
    q: p.get("q") || "",
    cat: p.get("cat") || "all",
    area: p.get("area") || "all",
    open: p.get("open") === "1",
    budget: Number(p.get("budget")) || 0,
    sort: p.get("sort") === "near" && !Geo.get() ? "random" : (p.get("sort") || "random"),
    near: p.get("near") === "1" && Boolean(Geo.get()),
    radius: p.has("r") ? Number(p.get("r")) : 1000,
    page: Number(p.get("page")) || 1
  };
  let randomOrder = shuffle(all);

  const haystack = r => [
    r.name, ...r.tags, getCategory(r.category_id).name, r.address, r.landmark,
    ...r.menu.flatMap(g => g.items.map(i => i[0]))
  ].join(" ").toLowerCase();

  const els = {
    input: $("#search-input"), cat: $("#filter-category"), area: $("#filter-area"),
    open: $("#f-open"), budget: $("#f-budget"), sort: $("#sort"),
    near: $("#near-btn"), radius: $("#near-radius"),
    list: $("#restaurant-list"), count: $("#restaurant-count"), pager: $("#pagination"), clear: $("#clear-filters")
  };

  function syncUrl() {
    const q = new URLSearchParams();
    if (state.q.trim()) q.set("q", state.q.trim());
    if (state.cat !== "all") q.set("cat", state.cat);
    if (state.area !== "all") q.set("area", state.area);
    if (state.open) q.set("open", "1");
    if (state.budget) q.set("budget", state.budget);
    if (state.near) { q.set("near", "1"); if (state.radius !== 1000) q.set("r", state.radius); }
    if (state.sort !== "random") q.set("sort", state.sort);
    if (state.page > 1) q.set("page", state.page);
    history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : ""));
  }

  function render() {
    const chip = (key, id, label, n) =>
      `<button type="button" class="chip ${state[key] === id ? "active" : ""}" data-${key}="${esc(id)}" aria-pressed="${state[key] === id}">${esc(label)}${n !== undefined ? ` <small>${n}</small>` : ""}</button>`;
    els.cat.innerHTML = chip("cat", "all", "ทั้งหมด", all.length) +
      data.categories.map(c => chip("cat", c.id, c.name, all.filter(r => r.category_id === c.id).length)).join("");
    els.area.innerHTML = chip("area", "all", "ทั้งหมด") +
      data.areas.map(a => chip("area", a.id, `${a.name} (${a.soi})`)).join("");

    els.open.checked = state.open;
    els.budget.value = state.budget;
    els.sort.value = state.sort;
    els.near.classList.toggle("active", state.near);
    els.near.setAttribute("aria-pressed", state.near);
    els.radius.hidden = !state.near;
    els.radius.value = state.radius;

    const word = state.q.trim().toLowerCase();
    let list = (state.sort === "random" ? randomOrder : all.slice()).filter(r =>
      (state.cat === "all" || r.category_id === state.cat) &&
      (state.area === "all" || r.area_id === state.area) &&
      (!state.open || openStatus(r).open) &&
      (!state.budget || (r.price_min && r.price_min <= state.budget)) &&
      (!state.near || !state.radius || (Geo.distance(r) ?? Infinity) <= state.radius) &&
      (!word || haystack(r).includes(word))
    );

    if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "th"));
    if (state.sort === "price") list.sort((a, b) => (a.price_min || 9999) - (b.price_min || 9999));
    if (state.sort === "near") {
      const d = r => Geo.distance(r) ?? Infinity;
      list.sort((a, b) => d(a) - d(b));
    }
    if (state.sort === "open") {
      const rank = r => ({ open: 0, soon: 0, closed: 1, unknown: 2 })[openStatus(r).state];
      list.sort((a, b) => rank(a) - rank(b));
    }

    const filtered = state.q.trim() || state.cat !== "all" || state.area !== "all" || state.open || state.budget || state.near;
    els.clear.hidden = !filtered;
    els.count.textContent = `พบ ${list.length} ร้าน` + (word ? ` สำหรับ "${state.q.trim()}"` : "");

    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    state.page = Math.min(Math.max(1, state.page), pages);
    const pageList = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

    els.list.innerHTML = pageList.length
      ? pageList.map(restaurantCard).join("")
      : `<div class="empty">
           <b>ไม่พบร้านที่ตรงกับเงื่อนไข</b><br>
           ${state.near && state.radius ? `ไม่มีร้านในระยะ ${Geo.text(state.radius).replace("ห่าง ", "")} จากตำแหน่งของคุณ ลองเพิ่มระยะ หรือกด "ล้างตัวกรอง"` : `ลองเปลี่ยนคำค้น หรือกด "ล้างตัวกรอง"`}
         </div>`;

    if (pages > 1) {
      let h = `<button type="button" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="หน้าก่อนหน้า">‹</button>`;
      for (let i = 1; i <= pages; i++) h += `<button type="button" data-page="${i}" class="${i === state.page ? "active" : ""}" aria-current="${i === state.page}">${i}</button>`;
      h += `<button type="button" data-page="${state.page + 1}" ${state.page === pages ? "disabled" : ""} aria-label="หน้าถัดไป">›</button>`;
      els.pager.innerHTML = h;
    } else {
      els.pager.innerHTML = "";
    }
    syncUrl();
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.cat) { state.cat = b.dataset.cat; state.page = 1; render(); }
    else if (b.dataset.area) { state.area = b.dataset.area; state.page = 1; render(); }
    else if (b.dataset.page) {
      state.page = Number(b.dataset.page);
      render();
      $(".result-head").scrollIntoView({ behavior: "smooth" });
    }
  });

  $("#search-form").addEventListener("submit", e => {
    e.preventDefault();
    state.q = els.input.value;
    state.page = 1;
    render();
  });
  els.input.addEventListener("input", () => { state.q = els.input.value; state.page = 1; render(); });

  els.open.addEventListener("change", () => { state.open = els.open.checked; state.page = 1; render(); });
  els.budget.addEventListener("change", () => { state.budget = Number(els.budget.value); state.page = 1; render(); });
  async function ensureLocation() {
    if (Geo.get()) return true;
    const label = $("span", els.near);
    els.near.disabled = true;
    label.textContent = "กำลังหาตำแหน่ง…";
    try {
      await Geo.request();
      return true;
    } catch (err) {
      toast(err.message);
      return false;
    } finally {
      els.near.disabled = false;
      label.textContent = "ร้านใกล้ฉัน";
    }
  }
  els.near.addEventListener("click", async () => {
    state.near = state.near ? false : await ensureLocation();
    if (state.near && state.radius && !all.some(r => (Geo.distance(r) ?? Infinity) <= state.radius)) {
      state.radius = 0;
      state.sort = "near";
      toast("ไม่มีร้านในระยะที่เลือก แสดงทุกร้านเรียงจากใกล้ไปไกลแทน");
    }
    state.page = 1;
    render();
  });
  els.radius.addEventListener("change", () => { state.radius = Number(els.radius.value); state.page = 1; render(); });
  els.sort.addEventListener("change", async () => {
    state.sort = els.sort.value;
    if (state.sort === "near" && !(await ensureLocation())) state.sort = "random";
    if (state.sort === "random") randomOrder = shuffle(all);
    state.page = 1;
    render();
  });
  els.clear.addEventListener("click", () => {
    Object.assign(state, { q: "", cat: "all", area: "all", open: false, budget: 0, near: false, page: 1 });
    els.input.value = "";
    render();
  });

  if (p.get("near") === "1" && !state.near) setTimeout(() => els.near.click(), 0);

  els.input.value = state.q;
  render();
});
