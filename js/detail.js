// ===================================================
// detail.js : หน้ารายละเอียดร้าน (restaurant/detail.html?id=...)
// ===================================================
App.start(data => {
  const r = data.restaurants.find(x => x.id === getParam("id"));
  if (!r) {
    $("#detail").innerHTML = `
      <div class="empty not-found">
        <h1>ไม่พบร้านนี้</h1>
        <p>ร้านอาจถูกลบหรือลิงก์ไม่ถูกต้อง</p>
        <a class="btn" href="restaurants.html">ดูร้านอาหารทั้งหมด</a>
      </div>`;
    return;
  }

  const cat = getCategory(r.category_id);
  const area = getArea(r.area_id);
  const st = openStatus(r);
  document.title = `${r.name} | กินไหนดีคลองหก`;

  $("#crumb-name").textContent = r.name;
  $("#detail-cat").innerHTML = `<a href="restaurants.html?cat=${encodeURIComponent(cat.id)}"><img src="${ROOT}${cat.icon}" alt=""> ${esc(cat.name)}</a>`;
  $("#detail-name").textContent = r.name;
  $("#detail-status").innerHTML = st.state !== "unknown" ? `<span class="badge-inline badge-${st.state}">${esc(st.label)}</span>` : "";
  $("#detail-price").textContent = priceText(r);
  $("#detail-hours").textContent = hoursText(r);
  $("#detail-address").textContent = addressText(r);
  $("#detail-area").textContent = area ? `${area.name} (${area.soi})` : "ไม่ระบุ";
  $("#detail-phone").innerHTML = r.phone ? `<a href="tel:${esc(r.phone.replace(/[^0-9+]/g, ""))}">${esc(r.phone)}</a>` : "ไม่ระบุ";
  // ซ่อนแถวที่ยังไม่มีข้อมูล
  $("#row-price").hidden = !hasPrice(r);
  $("#row-hours").hidden = !r.open_time;
  $("#row-area").hidden = !area;
  $("#row-phone").hidden = !r.phone;
  $("#detail-tags").innerHTML = r.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("");

  // ---------- รูป ----------
  const imgs = r.images;
  const credit = r.image_credit || "";
  let current = 0;
  const show = i => {
    current = i;
    const im = imgs[i];
    $("#gallery-img").src = imgSrc(im.src);
    $("#gallery-img").alt = im.alt || r.name;
    $("#gallery-blur").style.backgroundImage = `url("${imgSrc(im.src)}")`;
    $$(".thumb").forEach((t, k) => t.classList.toggle("active", k === i));
  };
  if (imgs.length) {
    $("#gallery-thumbs").innerHTML = imgs.map((im, i) => `
      <button type="button" class="thumb" data-i="${i}" aria-label="ดูรูป ${esc(im.alt || i + 1)}">
        <img src="${esc(imgSrc(im.src))}" alt="" loading="lazy">
        <span>${esc(im.alt || "")}</span>
      </button>`).join("");
    show(0);
    $("#gallery-main").addEventListener("click", () => Lightbox.open(imgs, current, credit));
    $("#gallery-thumbs").addEventListener("click", e => {
      const t = e.target.closest(".thumb");
      if (t) show(Number(t.dataset.i));
    });
    $("#gallery-thumbs").addEventListener("dblclick", e => {
      const t = e.target.closest(".thumb");
      if (t) Lightbox.open(imgs, Number(t.dataset.i), credit);
    });
  } else {
    $("#gallery-main").outerHTML = `<div class="gallery-main empty">ยังไม่มีรูปร้านนี้</div>`;
  }
  $("#detail-credit").textContent = credit ? `ที่มาภาพ: ${credit}` : "";

  // ---------- ปุ่ม ----------
  const mapsUrl = r.map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " " + addressText(r))}`;
  $("#detail-route").href = mapsUrl;
  $("#detail-route2").href = mapsUrl;
  if (r.phone) {
    $("#detail-call").hidden = false;
    $("#detail-call").href = `tel:${r.phone.replace(/[^0-9+]/g, "")}`;
  }

  const favBtn = $("#detail-fav");
  const paintFav = () => {
    const on = Fav.has(r.id);
    favBtn.textContent = on ? "♥ ถูกใจแล้ว" : "♡ ถูกใจ";
    favBtn.classList.toggle("on", on);
    favBtn.setAttribute("aria-pressed", on);
  };
  favBtn.dataset.fav = r.id;
  paintFav();
  document.addEventListener("favchange", paintFav);

  $("#detail-share").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      toast("คัดลอกลิงก์ร้านแล้ว ส่งให้เพื่อนได้เลย");
    } catch {
      prompt("คัดลอกลิงก์นี้", location.href);
    }
  });
  $("#detail-report").addEventListener("click", () => openSuggestForm({ kind: "fix", restaurant: r }));

  // ---------- เมนู ----------
  // เมนู (ไม่มีข้อมูล = ซ่อนทั้งกล่อง)
  $("#menu-panel").hidden = !r.menu.length;
  $("#detail-menu").innerHTML = r.menu.map(g => `
    <div class="menu-group">
      <h3>${esc(g.title)}</h3>
      ${g.items.map(i => `<div class="menu-row"><span>${esc(i[0])}</span><span class="price">${esc(i[1])}</span></div>`).join("")}
    </div>`).join("");

  // ---------- แผนที่ ----------
  $("#map-address").textContent = addressText(r);
  $("#detail-map").src = `https://www.google.com/maps?q=${encodeURIComponent(r.name + " " + addressText(r))}&output=embed`;

  // ---------- ร้านอื่นในหมวดเดียวกัน ----------
  const related = shuffle(data.restaurants.filter(x => x.category_id === r.category_id && x.id !== r.id)).slice(0, 4);
  if (related.length) {
    $("#related-section").hidden = false;
    $("#related-cat").textContent = cat.name;
    $("#related-list").innerHTML = related.map(restaurantCard).join("");
  }
});
