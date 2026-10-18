App.start(data => {
  $("#area-list").innerHTML = data.areas.map(a => {
    const n = data.restaurants.filter(r => r.area_id === a.id).length;
    return `
      <a class="about-card area-card" href="../restaurant/restaurants.html?area=${encodeURIComponent(a.id)}">
        <h3><img src="../images/icons/pin.svg" alt=""> ${esc(a.name)}</h3>
        <p>${esc(a.soi)}</p>
        <small>${n} ร้าน · ดูร้านในโซนนี้ →</small>
      </a>`;
  }).join("");
});
