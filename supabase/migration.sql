-- Run this in the Supabase SQL Editor to set up the database

-- Servers table
CREATE TABLE IF NOT EXISTS servers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  map TEXT NOT NULL,
  cluster TEXT NOT NULL CHECK (cluster IN ('pvp', 'pve')),
  host TEXT NOT NULL DEFAULT 'play.dodoark.com',
  port INTEGER NOT NULL,
  max_players INTEGER NOT NULL DEFAULT 50,
  status TEXT NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'restarting')),
  player_count INTEGER NOT NULL DEFAULT 0,
  uptime TEXT NOT NULL DEFAULT '0h',
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('update', 'maintenance', 'event', 'general')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public read access (anon key can read)
CREATE POLICY "Anyone can read servers" ON servers FOR SELECT USING (true);
CREATE POLICY "Anyone can read published announcements" ON announcements FOR SELECT USING (published = true);

-- Insert all 18 servers
INSERT INTO servers (id, name, map, cluster, port) VALUES
  ('pvp-island', 'DodoArk PvP - The Island', 'The Island', 'pvp', 7777),
  ('pvp-scorched', 'DodoArk PvP - Scorched Earth', 'Scorched Earth', 'pvp', 7779),
  ('pvp-center', 'DodoArk PvP - The Center', 'The Center', 'pvp', 7781),
  ('pvp-aberration', 'DodoArk PvP - Aberration', 'Aberration', 'pvp', 7783),
  ('pvp-extinction', 'DodoArk PvP - Extinction', 'Extinction', 'pvp', 7785),
  ('pvp-astraeos', 'DodoArk PvP - Astraeos', 'Astraeos', 'pvp', 7787),
  ('pvp-ragnarok', 'DodoArk PvP - Ragnarok', 'Ragnarok', 'pvp', 7789),
  ('pvp-valguero', 'DodoArk PvP - Valguero', 'Valguero', 'pvp', 7791),
  ('pvp-lostcolony', 'DodoArk PvP - Lost Colony', 'Lost Colony', 'pvp', 7793),
  ('pve-island', 'DodoArk PvE - The Island', 'The Island', 'pve', 7795),
  ('pve-scorched', 'DodoArk PvE - Scorched Earth', 'Scorched Earth', 'pve', 7797),
  ('pve-center', 'DodoArk PvE - The Center', 'The Center', 'pve', 7799),
  ('pve-aberration', 'DodoArk PvE - Aberration', 'Aberration', 'pve', 7801),
  ('pve-extinction', 'DodoArk PvE - Extinction', 'Extinction', 'pve', 7803),
  ('pve-astraeos', 'DodoArk PvE - Astraeos', 'Astraeos', 'pve', 7805),
  ('pve-ragnarok', 'DodoArk PvE - Ragnarok', 'Ragnarok', 'pve', 7807),
  ('pve-valguero', 'DodoArk PvE - Valguero', 'Valguero', 'pve', 7809),
  ('pve-lostcolony', 'DodoArk PvE - Lost Colony', 'Lost Colony', 'pve', 7811)
ON CONFLICT (id) DO NOTHING;

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_servers_cluster ON servers (cluster);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements (published, created_at DESC);
