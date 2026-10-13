-- อัปเดตโซนพื้นที่ + ที่อยู่ร้าน + พิกัด ตามตำแหน่งจริง (13 ต.ค. รอบ 2) : รันใน Supabase > SQL Editor (รันซ้ำได้)

alter table restaurants add column if not exists lat double precision;
alter table restaurants add column if not exists lng double precision;

insert into areas (id,name,soi,sort) values ('canal-south','ข้าง มทร. ประตู 3','ซอยอีสเทิร์น - ตะวันออก 10',0) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('canal-lagoon','ย่านหอลากูน','ริมคลองหก ซอยตะวันออก 12',1) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('pink-bridge','สะพานชมพู','ยูเพลินมอลล์',2) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('phonthisan','ซอยพรธิสาร 3','ฝั่งตะวันออกของ มทร.',3) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;

update restaurants set area_id='canal-lagoon', address='ถนนเลียบคลองหก', landmark='หน้าหอพักลากูนแมนชั่น', lat=14.042844, lng=100.732481 where id='kaprao-mae';
update restaurants set area_id='phonthisan', address='ถนนพรธิสาร 3', landmark='ตรงข้ามร้านเอสโตว์', lat=14.0385824, lng=100.7391773 where id='kaitod-baimai';
update restaurants set area_id='phonthisan', address='ปากซอยพรธิสาร 3 ติดถนนรังสิต-นครนายก', landmark='ห่างร้านไก่ทอดใบไม้ประมาณ 150 ม.', lat=14.0382342, lng=100.7377156 where id='khaomankai-lungpiak';
update restaurants set area_id='canal-south', address='ถนนเลียบคลองหก', landmark='ตรงข้ามปากซอยอีสเทิร์น', lat=14.034003, lng=100.7319235 where id='boat-noodle-ayutthaya';
update restaurants set area_id='canal-south', address='ซอยตะวันออก 6', landmark='ร้านริมทาง ติดคลองหก', lat=14.0387365, lng=100.7324389 where id='crepe-krob-paktaek';
update restaurants set area_id='phonthisan', address='ซอยหมู่บ้านพรธิสาร 3', landmark='ห่างร้านไก่ทอดใบไม้ประมาณ 300 ม.', lat=14.0397335, lng=100.7415645 where id='krua-khunyai';
update restaurants set area_id='canal-south', address='160 ซอยคลองหกตะวันออก 10 (ซอยหอพักซูม)', landmark='ตรงข้ามสะพานสูง ริมคลองหก', lat=14.0399305, lng=100.7324838 where id='jok-siam';
update restaurants set area_id='canal-south', address='ชั้น 1 หอพักไพลินเพลส ซอยอีสเทิร์น (ซอยบัญชาปราณี)', landmark='ห่างร้านก๋วยเตี๋ยวเรืออยุธยาประมาณ 60 ม.', lat=14.0343355, lng=100.7324788 where id='chuang-chuang-wei-mala';
update restaurants set area_id='canal-lagoon', address='29/4 ถนนเลียบคลองหก', landmark='อาคารเดียวกับร้านก๋วยเตี๋ยวเรือรสเด็ด ๗๙', lat=14.0412794, lng=100.7325037 where id='kwanjai-mala';
update restaurants set area_id='pink-bridge', address='98-99 หมู่ 2 ย่านยูเพลินมอลล์', landmark='ใกล้สะพานชมพู มีที่จอดรถหน้าร้าน', lat=14.0455829, lng=100.7341706 where id='nai-waen-yentafo';
update restaurants set area_id='canal-lagoon', address='29/4 ถนนเลียบคลองหก', landmark='อาคารเดียวกับร้านขวัญใจ หม่าล่า', lat=14.0411522, lng=100.7327359 where id='boat-noodle-rosdet79';
update restaurants set area_id='pink-bridge', address='99 หมู่ 2 โครงการยูเพลินมอลล์', landmark='สะพานชมพู', lat=14.045747, lng=100.7338779 where id='dekchai-a-milk';
update restaurants set area_id='canal-lagoon', address='ซอยมาลี ย่านซอยตะวันออก 12', landmark='เข้าซอยจากถนนเลียบคลองหกประมาณ 350 ม.', lat=14.0428342, lng=100.7359779 where id='bingsu-cafe';
update restaurants set area_id='pink-bridge', address='ถนนเลียบคลองหก', landmark='ร้านเล็กริมคลอง เลยยูเพลินมอลล์ไปทางเหนือประมาณ 400 ม.', lat=14.0496653, lng=100.7317761 where id='olive-cafe';
update restaurants set area_id='pink-bridge', address='99 หมู่ 2 โครงการยูเพลินมอลล์', landmark='สะพานชมพู', lat=14.0455133, lng=100.7324152 where id='meecha-cafe';
update restaurants set area_id='canal-lagoon', address='29 ซอยตะวันออก 12', landmark='ห่างร้านกะเพราแม่ประมาณ 100 ม.', lat=14.0425558, lng=100.7334052 where id='makocha';
update restaurants set area_id='canal-lagoon', address='29/1 ถนนเลียบคลองหก', landmark='ใกล้ร้านขวัญใจ หม่าล่า', lat=14.0417179, lng=100.7324487 where id='sweet-home-coffee';

delete from areas where id in ('canal','rmutt');
