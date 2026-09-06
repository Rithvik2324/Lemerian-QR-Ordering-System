-- Supabase schema for Lemerian QR Ordering System
-- Tables: menu_items, orders, order_items, admins, tables

create table if not exists menu_items (
  id text primary key,
  name text not null,
  description text,
  price numeric not null,
  veg boolean default true,
  category text,
  image text
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  table_number int,
  status text default 'confirmed',
  total numeric,
  gst numeric,
  created_at timestamptz default now(),
  notes text
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id text references menu_items(id),
  qty int,
  price numeric,
  notes text
);

create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  name text,
  password_hash text
);

create table if not exists tables (
  id int primary key,
  code text
);
