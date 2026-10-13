// ===================================================
// seed-data.js : ข้อมูลสำรอง (ใช้ตอนยังไม่ได้เชื่อม Supabase หรือเชื่อมไม่ได้)
// ไฟล์นี้สร้างจากข้อมูลชุดเดียวกับ supabase/seed.sql
// เมื่อเชื่อม Supabase แล้ว ให้แก้ข้อมูลร้านในหน้าแอดมินแทน
// ===================================================
window.SEED = {
  "categories": [
    {
      "id": "rice",
      "name": "อาหารจานเดียว",
      "icon": "images/icons/rice.svg",
      "sort": 0
    },
    {
      "id": "noodle",
      "name": "เมนูเส้น",
      "icon": "images/icons/noodle.svg",
      "sort": 1
    },
    {
      "id": "dessert",
      "name": "ของกินเล่น & ขนม",
      "icon": "images/icons/snack.svg",
      "sort": 2
    },
    {
      "id": "fruit",
      "name": "ผลไม้",
      "icon": "images/icons/fruit.svg",
      "sort": 3
    },
    {
      "id": "drink",
      "name": "เครื่องดื่ม",
      "icon": "images/icons/cafe.svg",
      "sort": 4
    }
  ],
  "areas": [
    {
      "id": "pink-bridge",
      "name": "สะพานชมพู",
      "soi": "ซอย 18 - 20",
      "sort": 0
    },
    {
      "id": "canal",
      "name": "เลียบคลองหก",
      "soi": "ซอย 22 - 26",
      "sort": 1
    },
    {
      "id": "rmutt",
      "name": "หน้า มทร.ธัญบุรี",
      "soi": "ซอย 28 - 30",
      "sort": 2
    }
  ],
  "restaurants": [
    {
      "id": "kaprao-mae",
      "name": "กะเพราแม่",
      "category_id": "rice",
      "area_id": null,
      "address": "",
      "landmark": "หน้าหอพักลากูนแมนชั่น",
      "open_time": "12:00",
      "close_time": "22:00",
      "price_min": 50,
      "price_max": 90,
      "phone": "0614844971",
      "tags": [
        "เมนูยอดนิยม",
        "ข้าวราดกะเพราไข่ดาว"
      ],
      "map_url": "https://maps.app.goo.gl/Tg3NaXvmZK7YWzgq8",
      "images": [
        {
          "src": "images/rice/kaprao-mae/kaprao-moosap.jpg",
          "alt": "กะเพราหมูสับ"
        },
        {
          "src": "images/rice/kaprao-mae/rice-box.jpg",
          "alt": "ข้าวกล่องกะเพรา"
        },
        {
          "src": "images/rice/kaprao-mae/atmosphere.jpg",
          "alt": "บรรยากาศหน้าร้าน"
        },
        {
          "src": "images/rice/kaprao-mae/menu.jpg",
          "alt": "ป้ายเมนู"
        }
      ],
      "menu": [
        {
          "title": "เนื้อสัตว์ (ธรรมดา / พิเศษ)",
          "items": [
            [
              "หมูกรอบ",
              "60 / 80 บาท"
            ],
            [
              "เนื้อเปื่อย / เนื้อชิ้น",
              "60 / 80 บาท"
            ],
            [
              "เนื้อสับ",
              "60 / 80 บาท"
            ],
            [
              "ทะเล",
              "70 / 90 บาท"
            ],
            [
              "หอยแมลงภู่",
              "50 / 60 บาท"
            ],
            [
              "ไก่กรอบ / สามชั้น",
              "60 / 70 บาท"
            ],
            [
              "ไก่ชิ้น / เครื่องในไก่",
              "50 / 60 บาท"
            ],
            [
              "เป็ด",
              "60 / 70 บาท"
            ]
          ]
        },
        {
          "title": "เมนูผัด",
          "items": [
            [
              "กะเพรา",
              "ตามราคาเนื้อสัตว์"
            ],
            [
              "ผัดพริกเผา",
              "ตามราคาเนื้อสัตว์"
            ],
            [
              "ผัดพริกแกง",
              "ตามราคาเนื้อสัตว์"
            ],
            [
              "ผัดกะหล่ำปลี",
              "+10 บาท"
            ],
            [
              "ผัดคะน้า",
              "+10 บาท"
            ],
            [
              "ผัดพริกอ่อน",
              "+10 บาท"
            ],
            [
              "ข้าวผัด",
              "+10 บาท"
            ]
          ]
        },
        {
          "title": "ท็อปปิ้ง",
          "items": [
            [
              "ไข่ดาว / ไข่เจียว",
              "10 บาท"
            ],
            [
              "ไข่เยี่ยวม้า / ไข่เค็ม",
              "10 บาท"
            ],
            [
              "ไก่กรอบ / หมูยอ",
              "10 บาท"
            ],
            [
              "กุนเชียง / ไส้กรอก",
              "10 บาท"
            ],
            [
              "หน่อไม้ / ถั่วฝักยาว",
              "10 บาท"
            ]
          ]
        }
      ],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "kaitod-baimai",
      "name": "ไก่ทอดใบไม้ สูตรปักษ์ใต้ คลอง6",
      "category_id": "dessert",
      "area_id": "rmutt",
      "address": "ถนนพรธิสาร 3",
      "landmark": "ตรงข้ามร้านเอสโตว์ หน้ามหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี",
      "open_time": "11:30",
      "close_time": "22:00",
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [
        "ไก่ทอด",
        "สูตรปักษ์ใต้",
        "หมักสมุนไพร"
      ],
      "map_url": "https://maps.app.goo.gl/xrEfb6QPAbHDkW3z9",
      "images": [
        {
          "src": "images/rice/kaitod-baimai/main-dish.jpg",
          "alt": "ไก่ทอดสูตรปักษ์ใต้"
        },
        {
          "src": "images/rice/kaitod-baimai/atmosphere.jpg",
          "alt": "หน้าร้าน"
        },
        {
          "src": "images/rice/kaitod-baimai/menu.jpg",
          "alt": "ป้ายเมนู"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "khaomankai-lungpiak",
      "name": "ข้าวมันไก่ลุงเปี๊ยกน้ำข้น",
      "category_id": "rice",
      "area_id": null,
      "address": "ซอยพรธิสาร 3",
      "landmark": "",
      "open_time": "10:00",
      "close_time": "04:00",
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [
        "ไก่ตอนเนื้อล้วน",
        "ข้าวมันนุ่มหอม"
      ],
      "map_url": "https://maps.app.goo.gl/5DRATxCEc79dX5ay8",
      "images": [
        {
          "src": "images/rice/khaomankai-lungpiak/main-dish.jpg",
          "alt": "ข้าวมันไก่"
        },
        {
          "src": "images/rice/khaomankai-lungpiak/front.jpg",
          "alt": "หน้าร้าน"
        },
        {
          "src": "images/rice/khaomankai-lungpiak/atmosphere.jpg",
          "alt": "บรรยากาศในร้าน"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "boat-noodle-ayutthaya",
      "name": "ก๋วยเตี๋ยวเรืออยุธยา",
      "category_id": "noodle",
      "area_id": null,
      "address": "",
      "landmark": "ตรงข้ามซอยอีสเทิร์น",
      "open_time": "10:30",
      "close_time": "21:00",
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [
        "น้ำซุปเข้มข้นสูตรดั้งเดิม"
      ],
      "map_url": "https://maps.app.goo.gl/NHe3NJFkSAvh4fxFA",
      "images": [
        {
          "src": "images/noodle/boat-noodle-ayutthaya/boat-noodle.jpg",
          "alt": "ก๋วยเตี๋ยวเรือ"
        },
        {
          "src": "images/noodle/boat-noodle-ayutthaya/khanom-thuay.jpg",
          "alt": "ขนมถ้วย"
        },
        {
          "src": "images/noodle/boat-noodle-ayutthaya/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "crepe-krob-paktaek",
      "name": "เครปกรอบปากแตก",
      "category_id": "dessert",
      "area_id": "canal",
      "address": "ซอยตะวันออก 6",
      "landmark": "ริมคลองหก",
      "open_time": "14:00",
      "close_time": "22:00",
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [
        "เครปไส้ทะลัก",
        "แป้งกรอบ"
      ],
      "map_url": "https://maps.app.goo.gl/6v1HqUktG1xKeegQ6",
      "images": [
        {
          "src": "images/snack/crepe-krob-paktaek/crepe-corn-cheese-choc.jpg",
          "alt": "เครปข้าวโพดชีสช็อกโกแลต"
        },
        {
          "src": "images/snack/crepe-krob-paktaek/menu-sample.jpg",
          "alt": "ตัวอย่างเมนู"
        },
        {
          "src": "images/snack/crepe-krob-paktaek/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "krua-khunyai",
      "name": "ครัวคุณยาย",
      "category_id": "rice",
      "area_id": null,
      "address": "ซอยพรธิสาร 3",
      "landmark": "",
      "open_time": null,
      "close_time": null,
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [],
      "map_url": "https://maps.app.goo.gl/kpUe4S2VJjVy6Nre9",
      "images": [
        {
          "src": "images/rice/krua-khunyai/kaprao-seafood.jpg",
          "alt": "กะเพราทะเล"
        },
        {
          "src": "images/rice/krua-khunyai/fried-rice-chili.jpg",
          "alt": "ข้าวผัดพริกแกง"
        },
        {
          "src": "images/rice/krua-khunyai/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "jok-siam",
      "name": "โจ๊กสยาม",
      "category_id": "rice",
      "area_id": "canal",
      "address": "",
      "landmark": "ตรงข้ามสะพานสูง ฝั่งริมคลองหก",
      "open_time": null,
      "close_time": null,
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [],
      "map_url": "https://maps.app.goo.gl/bM1jYnSp31JqwAUo7",
      "images": [
        {
          "src": "images/rice/jok-siam/jok.jpg",
          "alt": "โจ๊ก"
        },
        {
          "src": "images/rice/jok-siam/front.jpg",
          "alt": "หน้าร้าน"
        },
        {
          "src": "images/rice/jok-siam/inside.jpg",
          "alt": "ภายในร้าน"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "chuang-chuang-wei-mala",
      "name": "ชวง ชวง เว่ย หม่าล่าเสฉวน",
      "category_id": "dessert",
      "area_id": null,
      "address": "ซอยอีสเทิร์น",
      "landmark": "",
      "open_time": null,
      "close_time": null,
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [],
      "map_url": "https://maps.app.goo.gl/GEU9oJGm31Fv7QZE8",
      "images": [
        {
          "src": "images/snack/chuang-chuang-wei-mala/mala.jpg",
          "alt": "หม่าล่า"
        },
        {
          "src": "images/snack/chuang-chuang-wei-mala/ingredients.jpg",
          "alt": "วัตถุดิบ"
        },
        {
          "src": "images/snack/chuang-chuang-wei-mala/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "kwanjai-mala",
      "name": "ขวัญใจ หม่าล่า",
      "category_id": "dessert",
      "area_id": "canal",
      "address": "",
      "landmark": "ริมคลองหก",
      "open_time": null,
      "close_time": null,
      "price_min": null,
      "price_max": null,
      "phone": "",
      "tags": [],
      "map_url": "https://maps.app.goo.gl/VzH64uX3DPk2ZP41A",
      "images": [
        {
          "src": "images/snack/kwanjai-mala/menu.jpg",
          "alt": "ไม้หม่าล่า"
        },
        {
          "src": "images/snack/kwanjai-mala/front.jpg",
          "alt": "หน้าร้าน"
        },
        {
          "src": "images/snack/kwanjai-mala/atmosphere.jpg",
          "alt": "บรรยากาศ"
        }
      ],
      "menu": [],
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    }
  ]
};
