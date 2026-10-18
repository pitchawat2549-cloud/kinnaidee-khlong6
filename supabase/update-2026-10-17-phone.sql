update restaurants
set phone = substr(d, 1, 2) || '-' || substr(d, 3, 4) || '-' || substr(d, 7, 4)
from (select id as rid, regexp_replace(phone, '[^0-9]', '', 'g') as d from restaurants) x
where restaurants.id = x.rid and x.d ~ '^0[689][0-9]{8}$';

select name, phone from restaurants order by name;
