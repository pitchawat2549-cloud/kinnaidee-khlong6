-- อัปเดตรวม (13 ต.ค. รอบ 3): โซน + ที่อยู่ + พิกัด + เวลาเปิด-ปิด + วันหยุด + เบอร์โทร + ราคาเท่าที่หาได้
-- รันใน Supabase > SQL Editor ได้เลย รันซ้ำได้ (รวมของรอบ 2 ไว้แล้ว)

alter table restaurants add column if not exists lat double precision;
alter table restaurants add column if not exists lng double precision;
alter table restaurants add column if not exists closed_days int[] not null default '{}';

insert into areas (id,name,soi,sort) values ('canal-south','ข้าง มทร. ประตู 3','ซอยอีสเทิร์น - ตะวันออก 10',0) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('canal-lagoon','ย่านหอลากูน','ริมคลองหก ซอยตะวันออก 12',1) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('pink-bridge','สะพานชมพู','ยูเพลินมอลล์',2) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('phonthisan','ซอยพรธิสาร 3','ฝั่งตะวันออกของ มทร.',3) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;

update restaurants set area_id='canal-lagoon', address='ถนนเลียบคลองหก', landmark='หน้าหอพักลากูนแมนชั่น', lat=14.042844, lng=100.732481, open_time='12:00', close_time='22:00', closed_days='{}'::int[], phone='061-484-4971' where id='kaprao-mae';
update restaurants set area_id='phonthisan', address='ถนนพรธิสาร 3', landmark='ตรงข้ามร้านเอสโตว์', lat=14.0385824, lng=100.7391773, open_time='11:30', close_time='22:00', closed_days='{}'::int[], phone='084-087-4685' where id='kaitod-baimai';
update restaurants set area_id='phonthisan', address='ปากซอยพรธิสาร 3 ติดถนนรังสิต-นครนายก', landmark='ห่างร้านไก่ทอดใบไม้ประมาณ 150 ม.', lat=14.0382342, lng=100.7377156, open_time='10:00', close_time='04:00', closed_days='{}'::int[], phone='063-823-3360', price_min=coalesce(price_min,60), price_max=coalesce(price_max,70) where id='khaomankai-lungpiak';
update restaurants set area_id='canal-south', address='ถนนเลียบคลองหก', landmark='ตรงข้ามปากซอยอีสเทิร์น', lat=14.034003, lng=100.7319235, open_time='10:30', close_time='21:00', closed_days='{}'::int[], price_min=coalesce(price_min,15), price_max=coalesce(price_max,30) where id='boat-noodle-ayutthaya';
update restaurants set area_id='canal-south', address='ซอยตะวันออก 6', landmark='ร้านริมทาง ติดคลองหก', lat=14.0387365, lng=100.7324389, open_time='14:00', close_time='22:00', closed_days='{}'::int[], phone='095-141-9644' where id='crepe-krob-paktaek';
update restaurants set area_id='phonthisan', address='ซอยหมู่บ้านพรธิสาร 3', landmark='ห่างร้านไก่ทอดใบไม้ประมาณ 300 ม.', lat=14.0397335, lng=100.7415645, open_time='10:00', close_time='21:00', closed_days=array[6]::int[], phone='090-378-6752' where id='krua-khunyai';
update restaurants set area_id='canal-south', address='160 ซอยคลองหกตะวันออก 10 (ซอยหอพักซูม)', landmark='ตรงข้ามสะพานสูง ริมคลองหก', lat=14.0399305, lng=100.7324838, open_time='00:00', close_time='00:00', closed_days='{}'::int[], phone='092-674-3567' where id='jok-siam';
update restaurants set area_id='canal-south', address='ชั้น 1 หอพักไพลินเพลส ซอยอีสเทิร์น (ซอยบัญชาปราณี)', landmark='ห่างร้านก๋วยเตี๋ยวเรืออยุธยาประมาณ 60 ม.', lat=14.0343355, lng=100.7324788, open_time='11:00', close_time='23:00', closed_days='{}'::int[], phone='081-859-1467' where id='chuang-chuang-wei-mala';
update restaurants set area_id='canal-lagoon', address='29/4 ถนนเลียบคลองหก', landmark='อาคารเดียวกับร้านก๋วยเตี๋ยวเรือรสเด็ด ๗๙', lat=14.0412794, lng=100.7325037, open_time='17:00', close_time='01:00', closed_days='{}'::int[], phone='087-546-8668' where id='kwanjai-mala';
update restaurants set area_id='pink-bridge', address='98-99 หมู่ 2 ย่านยูเพลินมอลล์', landmark='ใกล้สะพานชมพู มีที่จอดรถหน้าร้าน', lat=14.0455829, lng=100.7341706, open_time='11:30', close_time='21:00', closed_days='{}'::int[], phone='081-448-4443' where id='nai-waen-yentafo';
update restaurants set area_id='canal-lagoon', address='29/4 ถนนเลียบคลองหก', landmark='อาคารเดียวกับร้านขวัญใจ หม่าล่า', lat=14.0411522, lng=100.7327359, closed_days='{}'::int[], phone='095-765-2241' where id='boat-noodle-rosdet79';
update restaurants set area_id='pink-bridge', address='99 หมู่ 2 โครงการยูเพลินมอลล์', landmark='สะพานชมพู', lat=14.045747, lng=100.7338779, open_time='17:00', close_time='23:00', closed_days='{}'::int[], phone='093-493-3411' where id='dekchai-a-milk';
update restaurants set area_id='canal-lagoon', address='ซอยมาลี ย่านซอยตะวันออก 12', landmark='เข้าซอยจากถนนเลียบคลองหกประมาณ 350 ม.', lat=14.0428342, lng=100.7359779, open_time='13:00', close_time='22:30', closed_days=array[4]::int[], phone='098-182-1828' where id='bingsu-cafe';
update restaurants set area_id='pink-bridge', address='ถนนเลียบคลองหก', landmark='ร้านเล็กริมคลอง เลยยูเพลินมอลล์ไปทางเหนือประมาณ 400 ม.', lat=14.0496653, lng=100.7317761, open_time='07:00', close_time='17:00', closed_days='{}'::int[], phone='095-489-0999' where id='olive-cafe';
update restaurants set area_id='pink-bridge', address='99 หมู่ 2 โครงการยูเพลินมอลล์', landmark='สะพานชมพู', lat=14.0455133, lng=100.7324152, open_time='09:30', close_time='20:00', closed_days='{}'::int[], phone='098-619-9955' where id='meecha-cafe';
update restaurants set area_id='canal-lagoon', address='29 ซอยตะวันออก 12', landmark='ห่างร้านกะเพราแม่ประมาณ 100 ม.', lat=14.0425558, lng=100.7334052, closed_days='{}'::int[], phone='093-439-4098' where id='makocha';
update restaurants set area_id='canal-lagoon', address='29/1 ถนนเลียบคลองหก', landmark='ใกล้ร้านขวัญใจ หม่าล่า', lat=14.0417179, lng=100.7324487, open_time='07:00', close_time='17:00', closed_days='{}'::int[], phone='092-661-4892' where id='sweet-home-coffee';

delete from areas where id in ('canal','rmutt');
