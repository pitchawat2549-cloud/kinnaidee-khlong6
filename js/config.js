// ===================================================
// config.js : ตั้งค่าการเชื่อมต่อฐานข้อมูล Supabase
// ---------------------------------------------------
// เอาค่ามาจาก Supabase > Project Settings > API
//   SUPABASE_URL      = Project URL
//   SUPABASE_ANON_KEY = anon public key (ใส่ในเว็บได้ ปลอดภัย เพราะสิทธิ์คุมด้วย RLS)
// ถ้าเว้นว่าง เว็บจะใช้ข้อมูลสำรองใน js/seed-data.js แทน (หน้าแอดมินจะใช้ไม่ได้)
// ===================================================
window.APP_CONFIG = {
  SUPABASE_URL: "https://imxnxxbrnwbcqzeauhxu.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_xvY8JEI2StVDIYBZv3xNUA_r5h82RAm"
};
