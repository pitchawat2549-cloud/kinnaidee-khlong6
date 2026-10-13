// ===================================================
// favorites.js : หน้าร้านที่ถูกใจ (restaurant/favorites.html)
// รายการเก็บในเบราว์เซอร์ของผู้ใช้ (localStorage) ผ่าน Fav ใน ui.js
// ===================================================
App.start(data => {
  const render = () => {
    const ids = Fav.all();
    const list = data.restaurants.filter(r => ids.includes(r.id));
    $("#fav-count").textContent = list.length ? `${list.length} ร้าน` : "";
    $("#fav-tools").hidden = !list.length;
    $("#fav-list").innerHTML = list.length
      ? list.map(restaurantCard).join("")
      : `<div class="empty">
           <b>ยังไม่มีร้านที่ถูกใจ</b><br>
           กดรูปหัวใจ ♡ บนการ์ดร้าน เพื่อเก็บร้านไว้ดูทีหลัง<br><br>
           <a class="btn" href="restaurants.html">ไปดูร้านอาหาร</a>
         </div>`;
  };

  render();
  document.addEventListener("favchange", render);

  // ล้างทั้งหมด (ยืนยันก่อน)
  $("#fav-clear").addEventListener("click", () => {
    const m = openModal(`
      <h2>ล้างร้านที่ถูกใจทั้งหมด?</h2>
      <p>ร้านที่ถูกใจทั้งหมดจะถูกเอาออกจากรายการ</p>
      <div class="editor-actions">
        <button type="button" class="btn btn-ghost" data-close>ยกเลิก</button>
        <button type="button" class="btn" id="do-clear">ล้างทั้งหมด</button>
      </div>`);
    m.addEventListener("click", e => {
      if (e.target.closest("[data-close]")) closeModal();
      if (e.target.closest("#do-clear")) {
        Fav.clear();
        closeModal();
        toast("ล้างร้านที่ถูกใจแล้ว");
        render();
      }
    });
  });

  // สุ่มเฉพาะร้านที่ถูกใจ
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-picker-fav]")) return;
    const list = data.restaurants.filter(r => Fav.has(r.id));
    const r = list[Math.floor(Math.random() * list.length)];
    if (r) location.href = `detail.html?id=${encodeURIComponent(r.id)}`;
  });
});
