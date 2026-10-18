create table if not exists categories (
  id    text primary key,
  name  text not null,
  icon  text not null,
  sort  int  not null default 0
);

create table if not exists areas (
  id    text primary key,
  name  text not null,
  soi   text not null default '',
  sort  int  not null default 0
);

create table if not exists restaurants (
  id            text primary key,
  name          text not null,
  category_id   text references categories(id) on update cascade on delete set null,
  area_id       text references areas(id)      on update cascade on delete set null,
  address       text not null default '',
  landmark      text not null default '',
  open_time     time,
  close_time    time,
  price_min     int  check (price_min is null or price_min >= 0),
  price_max     int  check (price_max is null or price_max >= 0),
  phone         text not null default '',
  tags          text[] not null default '{}',
  map_url       text not null default '',
  lat           double precision,
  lng           double precision,
  closed_days   int[] not null default '{}',
  verified_at   date,
  images        jsonb not null default '[]',
  image_credit  text not null default '',
  menu          jsonb not null default '[]',
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table restaurants add column if not exists lat double precision;
alter table restaurants add column if not exists lng double precision;
alter table restaurants add column if not exists closed_days int[] not null default '{}';
alter table restaurants add column if not exists verified_at date;

create table if not exists suggestions (
  id             bigint generated always as identity primary key,
  kind           text not null check (kind in ('new', 'fix')),
  restaurant_id  text,
  name           text not null default '',
  message        text not null check (char_length(message) between 3 and 1000),
  contact        text not null default '' check (char_length(contact) <= 200),
  status         text not null default 'new' check (status in ('new', 'done')),
  created_at     timestamptz not null default now()
);

create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists restaurants_updated_at on restaurants;
create trigger restaurants_updated_at before update on restaurants
for each row execute function set_updated_at();

alter table categories  enable row level security;
alter table areas       enable row level security;
alter table restaurants enable row level security;
alter table suggestions enable row level security;

drop policy if exists "อ่านหมวดหมู่" on categories;
create policy "อ่านหมวดหมู่" on categories for select using (true);
drop policy if exists "แอดมินจัดการหมวดหมู่" on categories;
create policy "แอดมินจัดการหมวดหมู่" on categories for all to authenticated using (true) with check (true);

drop policy if exists "อ่านพื้นที่" on areas;
create policy "อ่านพื้นที่" on areas for select using (true);
drop policy if exists "แอดมินจัดการพื้นที่" on areas;
create policy "แอดมินจัดการพื้นที่" on areas for all to authenticated using (true) with check (true);

drop policy if exists "อ่านร้านที่เผยแพร่" on restaurants;
create policy "อ่านร้านที่เผยแพร่" on restaurants for select using (published or auth.role() = 'authenticated');
drop policy if exists "แอดมินจัดการร้าน" on restaurants;
create policy "แอดมินจัดการร้าน" on restaurants for all to authenticated using (true) with check (true);

drop policy if exists "ทุกคนส่งข้อความได้" on suggestions;
create policy "ทุกคนส่งข้อความได้" on suggestions for insert to anon, authenticated with check (status = 'new');
drop policy if exists "แอดมินอ่านข้อความ" on suggestions;
create policy "แอดมินอ่านข้อความ" on suggestions for select to authenticated using (true);
drop policy if exists "แอดมินแก้ข้อความ" on suggestions;
create policy "แอดมินแก้ข้อความ" on suggestions for update to authenticated using (true) with check (true);
drop policy if exists "แอดมินลบข้อความ" on suggestions;
create policy "แอดมินลบข้อความ" on suggestions for delete to authenticated using (true);

insert into storage.buckets (id, name, public)
values ('restaurant-images', 'restaurant-images', true)
on conflict (id) do nothing;

drop policy if exists "ดูรูปร้าน" on storage.objects;
create policy "ดูรูปร้าน" on storage.objects for select using (bucket_id = 'restaurant-images');
drop policy if exists "แอดมินอัปโหลดรูป" on storage.objects;
create policy "แอดมินอัปโหลดรูป" on storage.objects for insert to authenticated with check (bucket_id = 'restaurant-images');
drop policy if exists "แอดมินแก้รูป" on storage.objects;
create policy "แอดมินแก้รูป" on storage.objects for update to authenticated using (bucket_id = 'restaurant-images');
drop policy if exists "แอดมินลบรูป" on storage.objects;
create policy "แอดมินลบรูป" on storage.objects for delete to authenticated using (bucket_id = 'restaurant-images');
