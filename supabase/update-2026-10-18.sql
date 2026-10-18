update restaurants
set menu = replace(menu::text, 'ชีสยั่วๆ', 'ชีสยืด')::jsonb
where id = 'crepe-krob-paktaek';

select name, menu from restaurants where id = 'crepe-krob-paktaek';
