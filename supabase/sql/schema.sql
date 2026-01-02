CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT DEFAULT 'Guest',
  points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bins
CREATE TABLE bins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location GEOGRAPHY(POINT) NOT NULL,
  bin_type TEXT CHECK (bin_type IN ('Recyclable', 'General Waste', 'Organic')),
  coastal BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read bins" ON bins FOR SELECT TO anon USING (true);