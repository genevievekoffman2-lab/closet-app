-- Tables
create table items (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('primary', 'outerwear', 'accessory')),
  description  text not null,
  image_url    text,
  warmth       real not null default 0,
  waterproof   boolean not null default false,
  occupies     text[] not null default '{}',
  requires     text[] not null default '{}',
  category     text,
  check (type <> 'accessory' or category is not null)
);

create table tags (
  id     uuid primary key default gen_random_uuid(),
  key    text not null,
  value  text not null,
  unique (key, value)
);

create table item_tags (
  item_id  uuid references items(id) on delete cascade,
  tag_id   uuid references tags(id)  on delete cascade,
  primary key (item_id, tag_id)
);

-- Row Level Security: anyone can read, nobody can write yet
alter table items     enable row level security;
alter table tags      enable row level security;
alter table item_tags enable row level security;

create policy "Public read" on items     for select using (true);
create policy "Public read" on tags      for select using (true);
create policy "Public read" on item_tags for select using (true);