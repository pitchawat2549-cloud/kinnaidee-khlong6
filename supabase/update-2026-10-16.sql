-- 16 ต.ค.: เพิ่มช่อง "วันที่ยืนยันข้อมูลกับร้าน" (ต้องรันก่อนอัปโหลดไฟล์เว็บชุดใหม่ขึ้น GitHub)
-- รันใน Supabase > SQL Editor ได้เลย รันซ้ำได้
alter table restaurants add column if not exists verified_at date;
