-- 17 ต.ค.: เปลี่ยนรูปแบบเบอร์มือถือเป็น 2-4-4 (เช่น 08-1234-5678) ตามที่อาจารย์กำหนด
-- รันใน Supabase > SQL Editor ได้เลย รันซ้ำได้ (แก้เฉพาะเบอร์มือถือ 10 หลัก)
update restaurants
set phone = substr(d, 1, 2) || '-' || substr(d, 3, 4) || '-' || substr(d, 7, 4)
from (select id as rid, regexp_replace(phone, '[^0-9]', '', 'g') as d from restaurants) x
where restaurants.id = x.rid and x.d ~ '^0[689][0-9]{8}$';

-- ตรวจผล
select name, phone from restaurants order by name;
