
-- Таблица пользователей
create table users (
  id uuid primary key default gen_random_uuid(),
  telegram_id text unique,
  username text,
  name text,
  birthdate date,
  zodiac text,
  height text,
  bio text,
  avatar_url text,
  photos text[],
  is_verified boolean default false,
  is_premium boolean default false,
  is_banned boolean default false,
  badge text
);

-- Таблица лайков
create table likes (
  id uuid primary key default gen_random_uuid(),
  from_user text,
  to_user text,
  is_like boolean,
  created_at timestamp default now()
);

-- Таблица логов админа
create table admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id text,
  action text,
  target_user text,
  created_at timestamp default now()
);
