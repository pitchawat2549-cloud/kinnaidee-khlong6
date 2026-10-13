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
      "id": "canal-south",
      "name": "ข้าง มทร. ประตู 3",
      "soi": "ซอยอีสเทิร์น - ตะวันออก 10",
      "sort": 0
    },
    {
      "id": "canal-lagoon",
      "name": "ย่านหอลากูน",
      "soi": "ริมคลองหก ซอยตะวันออก 12",
      "sort": 1
    },
    {
      "id": "pink-bridge",
      "name": "สะพานชมพู",
      "soi": "ยูเพลินมอลล์",
      "sort": 2
    },
    {
      "id": "phonthisan",
      "name": "ซอยพรธิสาร 3",
      "soi": "ฝั่งตะวันออกของ มทร.",
      "sort": 3
    }
  ],
  "restaurants": [
    {
      "id": "kaprao-mae",
      "name": "กะเพราแม่",
      "category_id": "rice",
      "area_id": "canal-lagoon",
      "address": "ถนนเลียบคลองหก",
      "landmark": "หน้าหอพักลากูนแมนชั่น",
      "open_time": "12:00",
      "close_time": "22:00",
      "price_min": 50,
      "price_max": 90,
      "phone": "061-484-4971",
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
      "closed_days": [],
      "lat": 14.042844,
      "lng": 100.732481,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "kaitod-baimai",
      "name": "ไก่ทอดใบไม้ สูตรปักษ์ใต้ คลอง6",
      "category_id": "rice",
      "area_id": "phonthisan",
      "address": "ถนนพรธิสาร 3",
      "landmark": "ตรงข้ามร้านเอสโตว์",
      "open_time": "11:30",
      "close_time": "22:00",
      "price_min": null,
      "price_max": null,
      "phone": "084-087-4685",
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
      "closed_days": [],
      "lat": 14.0385824,
      "lng": 100.7391773,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "khaomankai-lungpiak",
      "name": "ข้าวมันไก่ลุงเปี๊ยกน้ำข้น",
      "category_id": "rice",
      "area_id": "phonthisan",
      "address": "ปากซอยพรธิสาร 3 ติดถนนรังสิต-นครนายก",
      "landmark": "ห่างร้านไก่ทอดใบไม้ประมาณ 150 ม.",
      "open_time": "10:00",
      "close_time": "04:00",
      "price_min": 60,
      "price_max": 70,
      "phone": "063-823-3360",
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
      "closed_days": [],
      "lat": 14.0382342,
      "lng": 100.7377156,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "boat-noodle-ayutthaya",
      "name": "ก๋วยเตี๋ยวเรืออยุธยา",
      "category_id": "noodle",
      "area_id": "canal-south",
      "address": "ถนนเลียบคลองหก",
      "landmark": "ตรงข้ามปากซอยอีสเทิร์น",
      "open_time": "10:30",
      "close_time": "21:00",
      "price_min": 15,
      "price_max": 30,
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
      "closed_days": [],
      "lat": 14.034003,
      "lng": 100.7319235,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "crepe-krob-paktaek",
      "name": "เครปกรอบปากแตก",
      "category_id": "dessert",
      "area_id": "canal-south",
      "address": "ซอยตะวันออก 6",
      "landmark": "ร้านริมทาง ติดคลองหก",
      "open_time": "14:00",
      "close_time": "22:00",
      "price_min": null,
      "price_max": null,
      "phone": "095-141-9644",
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
      "closed_days": [],
      "lat": 14.0387365,
      "lng": 100.7324389,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "krua-khunyai",
      "name": "ครัวคุณยาย",
      "category_id": "rice",
      "area_id": "phonthisan",
      "address": "ซอยหมู่บ้านพรธิสาร 3",
      "landmark": "ห่างร้านไก่ทอดใบไม้ประมาณ 300 ม.",
      "open_time": "10:00",
      "close_time": "21:00",
      "price_min": null,
      "price_max": null,
      "phone": "090-378-6752",
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
      "closed_days": [
        6
      ],
      "lat": 14.0397335,
      "lng": 100.7415645,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "jok-siam",
      "name": "โจ๊กสยาม",
      "category_id": "rice",
      "area_id": "canal-south",
      "address": "160 ซอยคลองหกตะวันออก 10 (ซอยหอพักซูม)",
      "landmark": "ตรงข้ามสะพานสูง ริมคลองหก",
      "open_time": "00:00",
      "close_time": "00:00",
      "price_min": null,
      "price_max": null,
      "phone": "092-674-3567",
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
      "closed_days": [],
      "lat": 14.0399305,
      "lng": 100.7324838,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "chuang-chuang-wei-mala",
      "name": "ชวง ชวง เว่ย หม่าล่าเสฉวน",
      "category_id": "dessert",
      "area_id": "canal-south",
      "address": "ชั้น 1 หอพักไพลินเพลส ซอยอีสเทิร์น (ซอยบัญชาปราณี)",
      "landmark": "ห่างร้านก๋วยเตี๋ยวเรืออยุธยาประมาณ 60 ม.",
      "open_time": "11:00",
      "close_time": "23:00",
      "price_min": null,
      "price_max": null,
      "phone": "081-859-1467",
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
      "closed_days": [],
      "lat": 14.0343355,
      "lng": 100.7324788,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "kwanjai-mala",
      "name": "ขวัญใจ หม่าล่า",
      "category_id": "dessert",
      "area_id": "canal-lagoon",
      "address": "29/4 ถนนเลียบคลองหก",
      "landmark": "อาคารเดียวกับร้านก๋วยเตี๋ยวเรือรสเด็ด ๗๙",
      "open_time": "17:00",
      "close_time": "01:00",
      "price_min": null,
      "price_max": null,
      "phone": "087-546-8668",
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
      "closed_days": [],
      "lat": 14.0412794,
      "lng": 100.7325037,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "nai-waen-yentafo",
      "name": "นายแว่น เย็นตาโฟ",
      "category_id": "noodle",
      "area_id": "pink-bridge",
      "address": "98-99 หมู่ 2 ย่านยูเพลินมอลล์",
      "landmark": "ใกล้สะพานชมพู มีที่จอดรถหน้าร้าน",
      "open_time": "11:30",
      "close_time": "21:00",
      "price_min": null,
      "price_max": null,
      "phone": "081-448-4443",
      "tags": [
        "เย็นตาโฟ",
        "ร้านติดแอร์"
      ],
      "map_url": "https://maps.app.goo.gl/2zFpdwYK38oamJTN7",
      "images": [
        {
          "src": "images/noodle/nai-waen-yentafo/yentafo.jpg",
          "alt": "เย็นตาโฟ"
        },
        {
          "src": "images/noodle/nai-waen-yentafo/front.jpg",
          "alt": "หน้าร้าน"
        },
        {
          "src": "images/noodle/nai-waen-yentafo/inside.jpg",
          "alt": "ที่นั่งในร้าน"
        }
      ],
      "menu": [],
      "closed_days": [],
      "lat": 14.0455829,
      "lng": 100.7341706,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "boat-noodle-rosdet79",
      "name": "ก๋วยเตี๋ยวเรือรสเด็ด ๗๙",
      "category_id": "noodle",
      "area_id": "canal-lagoon",
      "address": "29/4 ถนนเลียบคลองหก",
      "landmark": "อาคารเดียวกับร้านขวัญใจ หม่าล่า",
      "open_time": null,
      "close_time": null,
      "price_min": null,
      "price_max": null,
      "phone": "095-765-2241",
      "tags": [
        "ก๋วยเตี๋ยวเรือ"
      ],
      "map_url": "https://maps.app.goo.gl/wfdpqL9Q2qqr3pmQ8",
      "images": [
        {
          "src": "images/noodle/boat-noodle-rosdet79/boat-noodle.jpg",
          "alt": "ก๋วยเตี๋ยวเรือ"
        },
        {
          "src": "images/noodle/boat-noodle-rosdet79/noodle-bowls.jpg",
          "alt": "ก๋วยเตี๋ยวชามเล็ก"
        },
        {
          "src": "images/noodle/boat-noodle-rosdet79/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "closed_days": [],
      "lat": 14.0411522,
      "lng": 100.7327359,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "dekchai-a-milk",
      "name": "เด็กชายเอ - ร้านนม อารมณ์ดี",
      "category_id": "dessert",
      "area_id": "pink-bridge",
      "address": "99 หมู่ 2 โครงการยูเพลินมอลล์",
      "landmark": "สะพานชมพู",
      "open_time": "17:00",
      "close_time": "23:00",
      "price_min": null,
      "price_max": null,
      "phone": "093-493-3411",
      "tags": [
        "นมสด",
        "ขนมปังปิ้ง"
      ],
      "map_url": "https://maps.app.goo.gl/1gZypeugFapZF2BV6",
      "images": [
        {
          "src": "images/snack/dekchai-a-milk/toast.jpg",
          "alt": "ขนมปังปิ้ง"
        },
        {
          "src": "images/snack/dekchai-a-milk/front.jpg",
          "alt": "หน้าร้าน"
        },
        {
          "src": "images/snack/dekchai-a-milk/seating.jpg",
          "alt": "ที่นั่งนอกร้าน"
        }
      ],
      "menu": [],
      "closed_days": [],
      "lat": 14.045747,
      "lng": 100.7338779,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "bingsu-cafe",
      "name": "บิงซูคาเฟ่",
      "category_id": "dessert",
      "area_id": "canal-lagoon",
      "address": "ซอยมาลี ย่านซอยตะวันออก 12",
      "landmark": "เข้าซอยจากถนนเลียบคลองหกประมาณ 350 ม.",
      "open_time": "13:00",
      "close_time": "22:30",
      "price_min": null,
      "price_max": null,
      "phone": "098-182-1828",
      "tags": [
        "บิงซู",
        "ฮันนี่โทสต์"
      ],
      "map_url": "https://maps.app.goo.gl/EUu6bxgPAU73sMfE6",
      "images": [
        {
          "src": "images/snack/bingsu-cafe/strawberry-bingsu.jpg",
          "alt": "บิงซูสตรอว์เบอร์รี"
        },
        {
          "src": "images/snack/bingsu-cafe/honey-toast.jpg",
          "alt": "ฮันนี่โทสต์ผลไม้"
        },
        {
          "src": "images/snack/bingsu-cafe/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "closed_days": [
        4
      ],
      "lat": 14.0428342,
      "lng": 100.7359779,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "olive-cafe",
      "name": "OLIVE CAFE",
      "category_id": "drink",
      "area_id": "pink-bridge",
      "address": "ถนนเลียบคลองหก",
      "landmark": "ร้านเล็กริมคลอง เลยยูเพลินมอลล์ไปทางเหนือประมาณ 400 ม.",
      "open_time": "07:00",
      "close_time": "17:00",
      "price_min": null,
      "price_max": null,
      "phone": "095-489-0999",
      "tags": [
        "คาเฟ่",
        "มัทฉะ",
        "กาแฟ"
      ],
      "map_url": "https://maps.app.goo.gl/Tfn4UYECfpYzS9so9",
      "images": [
        {
          "src": "images/drink/olive-cafe/matcha-orange.jpg",
          "alt": "มัทฉะส้ม"
        },
        {
          "src": "images/drink/olive-cafe/iced-americano.jpg",
          "alt": "อเมริกาโน่เย็น"
        },
        {
          "src": "images/drink/olive-cafe/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "closed_days": [],
      "lat": 14.0496653,
      "lng": 100.7317761,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "meecha-cafe",
      "name": "MeeCha Cafe",
      "category_id": "drink",
      "area_id": "pink-bridge",
      "address": "99 หมู่ 2 โครงการยูเพลินมอลล์",
      "landmark": "สะพานชมพู",
      "open_time": "09:30",
      "close_time": "20:00",
      "price_min": null,
      "price_max": null,
      "phone": "098-619-9955",
      "tags": [
        "ชานมไข่มุก",
        "คาเฟ่"
      ],
      "map_url": "https://maps.app.goo.gl/yZ1xAnBYyfuC1kNT9",
      "images": [
        {
          "src": "images/drink/meecha-cafe/signature-drink.jpg",
          "alt": "เครื่องดื่มเมนูแนะนำ"
        },
        {
          "src": "images/drink/meecha-cafe/front.jpg",
          "alt": "หน้าร้าน"
        },
        {
          "src": "images/drink/meecha-cafe/inside.jpg",
          "alt": "ภายในร้าน"
        }
      ],
      "menu": [],
      "closed_days": [],
      "lat": 14.0455133,
      "lng": 100.7324152,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "makocha",
      "name": "Makocha",
      "category_id": "drink",
      "area_id": "canal-lagoon",
      "address": "29 ซอยตะวันออก 12",
      "landmark": "ห่างร้านกะเพราแม่ประมาณ 100 ม.",
      "open_time": null,
      "close_time": null,
      "price_min": null,
      "price_max": null,
      "phone": "093-439-4098",
      "tags": [
        "ชาเขียวนม",
        "โยเกิร์ตปั่น"
      ],
      "map_url": "https://maps.app.goo.gl/sj4YV3UudPAV3qN78",
      "images": [
        {
          "src": "images/drink/makocha/green-milk-tea.jpg",
          "alt": "ชาเขียวนม"
        },
        {
          "src": "images/drink/makocha/strawberry-yoghurt.jpg",
          "alt": "สตรอว์เบอร์รีโยเกิร์ต"
        },
        {
          "src": "images/drink/makocha/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "closed_days": [],
      "lat": 14.0425558,
      "lng": 100.7334052,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    },
    {
      "id": "sweet-home-coffee",
      "name": "Sweet home coffee",
      "category_id": "drink",
      "area_id": "canal-lagoon",
      "address": "29/1 ถนนเลียบคลองหก",
      "landmark": "ใกล้ร้านขวัญใจ หม่าล่า",
      "open_time": "07:00",
      "close_time": "17:00",
      "price_min": null,
      "price_max": null,
      "phone": "092-661-4892",
      "tags": [
        "กาแฟ"
      ],
      "map_url": "https://maps.app.goo.gl/d38HCAYMEFQYuyWC7",
      "images": [
        {
          "src": "images/drink/sweet-home-coffee/iced-coffee.jpg",
          "alt": "กาแฟเย็น"
        },
        {
          "src": "images/drink/sweet-home-coffee/takeaway.jpg",
          "alt": "แก้วกลับบ้าน"
        },
        {
          "src": "images/drink/sweet-home-coffee/front.jpg",
          "alt": "หน้าร้าน"
        }
      ],
      "menu": [],
      "closed_days": [],
      "lat": 14.0417179,
      "lng": 100.7324487,
      "image_credit": "ทีมงานกินไหนดีคลองหก",
      "published": true
    }
  ]
};
