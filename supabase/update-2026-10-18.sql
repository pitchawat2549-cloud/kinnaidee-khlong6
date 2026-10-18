update restaurants set name='Olive Cafe' where id='olive-cafe';
update restaurants set name='Sweet Home Coffee' where id='sweet-home-coffee';
update restaurants set name='ไก่ทอดใบไม้ สูตรปักษ์ใต้ คลอง 6' where id='kaitod-baimai';
update restaurants set name='ก๋วยเตี๋ยวเรือรสเด็ด 79' where id='boat-noodle-rosdet79';
update restaurants set landmark='อาคารเดียวกับร้านก๋วยเตี๋ยวเรือรสเด็ด 79' where id='kwanjai-mala';
update restaurants set category_id='noodle' where id='chuang-chuang-wei-mala';
update restaurants set menu = replace(menu::text, 'ชีสยั่วๆ', 'ชีสยืด')::jsonb where id = 'crepe-krob-paktaek';

select name, category_id from restaurants order by category_id, name;
