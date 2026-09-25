// หมวดหมู่อาหาร 5 หมวด (ตามสไลด์หลัก ตัดของทอดออก รวมไว้ในขนม)
const CATEGORIES = [
  { id: "rice",    name: "อาหารจานเดียว", icon: "images/icons/rice.svg" },
  { id: "noodle",  name: "เมนูเส้น",       icon: "images/icons/noodle.svg" },
  { id: "dessert", name: "ขนม",           icon: "images/icons/snack.svg" },   // รวมของทอด/ของกินเล่นไว้ในหมวดนี้
  { id: "fruit",   name: "ผลไม้",          icon: "images/icons/fruit.svg" },
  { id: "drink",   name: "เครื่องดื่ม",      icon: "images/icons/cafe.svg" }
];

// พื้นที่ 3 โซน
const AREAS = [
  { id: "pink-bridge", name: "สะพานชมพู",       soi: "ซอย 18 - 20" },
  { id: "canal",       name: "เลียบคลองหก",     soi: "ซอย 22 - 26" },
  { id: "rmutt",       name: "หน้า มทร.ธัญบุรี", soi: "ซอย 28 - 30" }
];

// รายชื่อร้าน
// - price = ราคาเฉลี่ย (บาท) เช่น "50 - 90"
// - price / hours / phone / tags ที่ยังไม่มีข้อมูล ให้เว้นว่าง ("" หรือ [])
// - ไม่ใช้ดาวรีวิว (ตามสไลด์: ตัดดาวรีวิวออก)
// - area ที่ยังไม่แน่ใจ ให้เว้นว่าง "" ไว้ก่อน (ร้านจะโชว์เฉพาะตอนเลือก "ทั้งหมด")
// - menu (ไม่ใส่ก็ได้) = กลุ่มเมนู แต่ละกลุ่มมี title และ items: [ชื่อเมนู, ราคา]
const RESTAURANTS = [
  {
    id: "kaitod-baimai",
    name: "ไก่ทอดใบไม้ สูตรปักษ์ใต้ คลอง6",
    category: "dessert",
    area: "rmutt",
    address: "ตรงข้ามเอสโตว์ หน้า ม.ราชมงคลธัญบุรี ถ.พรธิสาร 3",
    hours: "11:30 - 22:00",
    price: "",
    phone: "",
    tags: ["ไก่ทอด", "สูตรปักษ์ใต้", "หมักสมุนไพร"],
    map: "https://maps.app.goo.gl/xrEfb6QPAbHDkW3z9",
    images: ["images/rice/kaitod-baimai/main-dish.png", "images/rice/kaitod-baimai/atmosphere.png", "images/rice/kaitod-baimai/menu.png"]
  },
  {
    id: "khaomankai-lungpiak",
    name: "ข้าวมันไก่ลุงเปี๊ยกน้ำข้น",
    category: "rice",
    area: "",
    address: "ซอยพรธิสาร 3 คลองหก คลองหลวง ปทุมธานี",
    hours: "10:00 - 04:00",
    price: "",
    phone: "",
    tags: ["ไก่ตอนเนื้อล้วน", "ข้าวมันนุ่มหอม"],
    map: "https://maps.app.goo.gl/5DRATxCEc79dX5ay8",
    images: ["images/rice/khaomankai-lungpiak/main-dish.png", "images/rice/khaomankai-lungpiak/front.png", "images/rice/khaomankai-lungpiak/atmosphere.png"]
  },
  {
    id: "kaprao-mae",
    name: "กะเพราแม่",
    category: "rice",
    area: "",
    address: "หน้าหอ ลากูนแมนชั่น คลองหก คลองหลวง ปทุมธานี",
    hours: "12:00 - 22:00",
    price: "50 - 90",
    phone: "0614844971",
    tags: ["เมนูยอดนิยม", "ข้าวราดกะเพราไข่ดาว"],
    map: "https://maps.app.goo.gl/Tg3NaXvmZK7YWzgq8",
    images: ["images/rice/kaprao-mae/kaprao-moosap.png", "images/rice/kaprao-mae/rice-box.png", "images/rice/kaprao-mae/atmosphere.png", "images/rice/kaprao-mae/menu.png"],
    menu: [
      { title: "เนื้อสัตว์", items: [
        ["หมูกรอบ", "60.- / 80.-"],
        ["เนื้อเปื่อย / เนื้อชิ้น", "60.- / 80.-"],
        ["เนื้อสับ", "60.- / 80.-"],
        ["ทะเล", "70.- / 90.-"],
        ["หอยแมลงภู่", "50.- / 60.-"],
        ["ไก่กรอบ / สามชั้น", "60.- / 70.-"],
        ["ไก่ชิ้น / เครื่องในไก่", "50.- / 60.-"],
        ["เป็ด", "60.- / 70.-"]
      ]},
      { title: "เมนูผัด", items: [
        ["กะเพรา", "ตามราคาเนื้อสัตว์"],
        ["ผัดพริกเผา", "ตามราคาเนื้อสัตว์"],
        ["ผัดพริกแกง", "ตามราคาเนื้อสัตว์"],
        ["ผัดกะหล่ำปลี", "+10.-"],
        ["ผัดคะน้า", "+10.-"],
        ["ผัดพริกอ่อน", "+10.-"],
        ["ข้าวผัด", "+10.-"]
      ]},
      { title: "ท็อปปิ้ง", items: [
        ["ไข่ดาว / ไข่เจียว", "10.-"],
        ["ไข่เยี่ยวม้า / ไข่เค็ม", "10.-"],
        ["ไก่กรอบ / หมูยอ", "10.-"],
        ["กุนเชียง / ไส้กรอก", "10.-"],
        ["หน่อไม้ / ถั่วฝักยาว", "10.-"]
      ]}
    ]
  },
  {
    id: "boat-noodle-ayutthaya",
    name: "ก๋วยเตี๋ยวเรืออยุธยา",
    category: "noodle",
    area: "",
    address: "อยู่ตรงข้ามกับซอยอีสเทิร์น คลองหก คลองหลวง ปทุมธานี",
    hours: "10:30 - 21:00",
    price: "",
    phone: "",
    tags: ["น้ำซุปเข้มข้นสูตรดั้งเดิม"],
    map: "https://maps.app.goo.gl/NHe3NJFkSAvh4fxFA",
    images: ["images/noodle/boat-noodle-ayutthaya/boat-noodle.png", "images/noodle/boat-noodle-ayutthaya/khanom-thuay.png", "images/noodle/boat-noodle-ayutthaya/front.png"]
  },
  {
    id: "crepe-krob-paktaek",
    name: "เครปกรอบปากแตก",
    category: "dessert",
    area: "canal",
    address: "ซอยตะวันออก 6 ริมคลอง คลองหก คลองหลวง ปทุมธานี",
    hours: "14:00 - 22:00",
    price: "",
    phone: "",
    tags: ["เครปไส้ทะลัก", "แป้งกรอบ"],
    map: "https://maps.app.goo.gl/6v1HqUktG1xKeegQ6",
    images: ["images/snack/crepe-krob-paktaek/crepe-corn-cheese-choc.png", "images/snack/crepe-krob-paktaek/menu-sample.png", "images/snack/crepe-krob-paktaek/front.png"]
  },
  {
    id: "krua-khunyai",
    name: "ครัวคุณยาย",
    category: "rice",
    area: "",
    address: "ซอยพรธิสาร 3 คลองหก คลองหลวง ปทุมธานี",
    hours: "",
    price: "",
    phone: "",
    tags: [],
    map: "https://maps.app.goo.gl/kpUe4S2VJjVy6Nre9",
    images: ["images/rice/krua-khunyai/kaprao-seafood.png", "images/rice/krua-khunyai/fried-rice-chili.png", "images/rice/krua-khunyai/front.png"]
  },
  {
    id: "jok-siam",
    name: "โจ๊กสยาม",
    category: "rice",
    area: "canal",
    address: "ตรงข้ามสะพานสูง ฝั่งเลียบคลอง คลองหก คลองหลวง ปทุมธานี",
    hours: "",
    price: "",
    phone: "",
    tags: [],
    map: "https://maps.app.goo.gl/bM1jYnSp31JqwAUo7",
    images: ["images/rice/jok-siam/jok.png", "images/rice/jok-siam/front.png", "images/rice/jok-siam/inside.png"]
  },
  {
    id: "chuang-chuang-wei-mala",
    name: "ชวง ชวง เว่ย หม่าล่าเสฉวน",
    category: "dessert",
    area: "",
    address: "ซอยอีสเทิร์น คลองหก คลองหลวง ปทุมธานี",
    hours: "",
    price: "",
    phone: "",
    tags: [],
    map: "https://maps.app.goo.gl/GEU9oJGm31Fv7QZE8",
    images: ["images/snack/chuang-chuang-wei-mala/mala.png", "images/snack/chuang-chuang-wei-mala/ingredients.png", "images/snack/chuang-chuang-wei-mala/front.png"]
  },
  {
    id: "kwanjai-mala",
    name: "ขวัญใจ หม่าล่า",
    category: "dessert",
    area: "canal",
    address: "เลียบคลอง คลองหก คลองหลวง ปทุมธานี",
    hours: "",
    price: "",
    phone: "",
    tags: [],
    map: "https://maps.app.goo.gl/VzH64uX3DPk2ZP41A",
    images: ["images/snack/kwanjai-mala/menu.png", "images/snack/kwanjai-mala/front.png", "images/snack/kwanjai-mala/atmosphere.png"]
  }
];