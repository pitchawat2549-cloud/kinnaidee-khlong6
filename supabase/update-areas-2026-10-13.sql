-- อัปเดตโซนพื้นที่ + ที่อยู่ร้าน ตามตำแหน่งจริง (13 ต.ค.) : รันใน Supabase > SQL Editor

insert into areas (id,name,soi,sort) values ('canal-south','ข้าง มทร. ริมคลองหก','ซอยอีสเทิร์น - ตะวันออก 10',0) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('canal-lagoon','ย่านหอลากูน','ริมคลองหก ซอยตะวันออก 12',1) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('pink-bridge','สะพานชมพู','ยูเพลินมอลล์',2) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;
insert into areas (id,name,soi,sort) values ('phonthisan','ซอยพรธิสาร 3','ฝั่งตะวันออกของ มทร.',3) on conflict (id) do update set name=excluded.name, soi=excluded.soi, sort=excluded.sort;

update restaurants set area_id='canal-lagoon', address='ถนนเลียบคลองหก', landmark='หน้าหอพักลากูนแมนชั่น' where id='kaprao-mae';
update restaurants set area_id='phonthisan', address='ถนนพรธิสาร 3', landmark='ตรงข้ามร้านเอสโตว์' where id='kaitod-baimai';
update restaurants set area_id='phonthisan', address='ปากซอยพรธิสาร 3 ติดถนนรังสิต-นครนายก', landmark='ห่างร้านไก่ทอดใบไม้ประมาณ 150 ม.' where id='khaomankai-lungpiak';
update restaurants set area_id='canal-south', address='ถนนเลียบคลองหก', landmark='ตรงข้ามปากซอยอีสเทิร์น' where id='boat-noodle-ayutthaya';
update restaurants set area_id='canal-south', address='ซอยตะวันออก 6', landmark='ร้านริมทาง ติดคลองหก' where id='crepe-krob-paktaek';
update restaurants set area_id='phonthisan', address='ซอยหมู่บ้านพรธิสาร 3', landmark='' where id='krua-khunyai';
update restaurants set area_id='canal-south', address='160 ซอยคลองหกตะวันออก 10 (ซอยหอพักซูม)', landmark='ตรงข้ามสะพานสูง ริมคลองหก' where id='jok-siam';
update restaurants set area_id='canal-south', address='ชั้น 1 หอพักไพลินเพลส ซอยอีสเทิร์น (ซอยบัญชาปราณี)', landmark='' where id='chuang-chuang-wei-mala';
update restaurants set area_id='canal-lagoon', address='29/4 ถนนเลียบคลองหก', landmark='อาคารเดียวกับร้านก๋วยเตี๋ยวเรือรสเด็ด ๗๙' where id='kwanjai-mala';
update restaurants set area_id='pink-bridge', address='98-99 หมู่ 2', landmark='ใกล้ยูเพลินมอลล์ มีที่จอดรถหน้าร้าน' where id='nai-waen-yentafo';
update restaurants set area_id='canal-lagoon', address='29/4 ถนนเลียบคลองหก', landmark='อาคารเดียวกับร้านขวัญใจ หม่าล่า' where id='boat-noodle-rosdet79';
update restaurants set area_id='pink-bridge', address='99 หมู่ 2 โครงการยูเพลินมอลล์', landmark='สะพานชมพู' where id='dekchai-a-milk';
update restaurants set area_id='canal-lagoon', address='ซอยมาลี ย่านซอยตะวันออก 12', landmark='' where id='bingsu-cafe';
update restaurants set area_id='pink-bridge', address='ถนนเลียบคลองหก', landmark='ร้านเล็กริมคลอง เลยยูเพลินมอลล์ไปทางเหนือประมาณ 400 ม.' where id='olive-cafe';
update restaurants set area_id='pink-bridge', address='99 ยูเพลินมอลล์', landmark='สะพานชมพู' where id='meecha-cafe';
update restaurants set area_id='canal-lagoon', address='29 ซอยตะวันออก 12', landmark='' where id='makocha';
update restaurants set area_id='canal-lagoon', address='29/1 ถนนเลียบคลองหก', landmark='ใกล้ร้านขวัญใจ หม่าล่า' where id='sweet-home-coffee';

delete from areas where id in ('canal','rmutt');
