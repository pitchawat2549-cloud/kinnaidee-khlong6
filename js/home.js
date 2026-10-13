// ===================================================
// home.js : หน้าแรก
// ===================================================
App.start(data => {
  const list = data.restaurants;
  const openNow = list.filter(r => openStatus(r).open);

  // สถานะใต้ช่องค้นหา
  const now = new Date();
  const time = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  $("#home-status").innerHTML = `ตอนนี้ ${time} น. · <a href="restaurant/restaurants.html?open=1"><b>${openNow.length}</b> ร้านเปิดอยู่</a> จากทั้งหมด ${list.length} ร้าน
    <a class="near-link" href="restaurant/restaurants.html?near=1"><img src="images/icons/pin.svg" alt=""> ร้านใกล้ฉัน</a>`;

  // ประเภทอาหาร + จำนวนร้าน
  $("#home-categories").innerHTML = data.categories.map(c => {
    const n = list.filter(r => r.category_id === c.id).length;
    return `
      <a class="category-card" data-cat="${esc(c.id)}" href="restaurant/restaurants.html?cat=${encodeURIComponent(c.id)}">
        <img src="${ROOT}${c.icon}" alt="">
        <span>${esc(c.name)}</span>
        <small>${n} ร้าน</small>
      </a>`;
  }).join("");

  // รูปตกแต่งแถบ "กินอะไรดี?"
  $("#pick-photos").innerHTML = shuffle(list.filter(r => r.images[0])).slice(0, 3)
    .map(r => `<img src="${esc(imgSrc(r.images[0].src))}" alt="">`).join("");

  // เปิดอยู่ตอนนี้
  if (openNow.length) {
    $("#open-section").hidden = false;
    $("#open-time").textContent = `ณ เวลา ${time} น.`;
    $("#home-open").innerHTML = shuffle(openNow).slice(0, 4).map(restaurantCard).join("");
  }

  // ร้านแนะนำ: สุ่มใหม่ทุกครั้ง
  $("#home-restaurants").innerHTML = shuffle(list).slice(0, 4).map(restaurantCard).join("");

  // ร้านที่ถูกใจ
  const renderFavs = () => {
    const favs = list.filter(r => Fav.has(r.id));
    $("#fav-section").hidden = !favs.length;
    $("#home-favs").innerHTML = favs.slice(0, 4).map(restaurantCard).join("");
  };
  renderFavs();
  document.addEventListener("favchange", renderFavs);
});
