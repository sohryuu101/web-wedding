-- Users table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Invitations table (ONE per user)
DROP TABLE IF EXISTS invitations;
CREATE TABLE invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE NOT NULL, -- UNIQUE constraint ensures one invitation per user
  slug TEXT UNIQUE NOT NULL,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  venue TEXT,
  cover_image TEXT,
  main_title TEXT DEFAULT 'Save The Date',
  subtitle TEXT DEFAULT 'We''re Getting Married!',
  message TEXT DEFAULT 'Join us for our special day...',
  theme TEXT DEFAULT 'Modern Elegance',
  -- Couple profile fields
  bride_photo TEXT,
  groom_photo TEXT,
  bride_parents_father TEXT,
  bride_parents_mother TEXT,
  groom_parents_father TEXT,
  groom_parents_mother TEXT,
  bride_social_media_instagram TEXT,
  groom_social_media_instagram TEXT,
  bride_birth_order TEXT DEFAULT 'first',
  groom_birth_order TEXT DEFAULT 'first',
  bride_description TEXT,
  groom_description TEXT,
  -- Cover video field
  cover_video TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  rsvps INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- RSVP responses table
DROP TABLE IF EXISTS rsvp_responses;
CREATE TABLE rsvp_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invitation_id INTEGER NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  attendance TEXT CHECK(attendance IN ('yes', 'no', 'maybe')) NOT NULL,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invitation_id) REFERENCES invitations (id)
);

-- Insert test data
INSERT INTO users (email, password, name) VALUES 
('demo@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Demo User');

INSERT INTO invitations (user_id, slug, bride_name, groom_name, wedding_date, venue, theme) VALUES 
(1, 'sarah-john-wedding', 'Sarah Johnson', 'John Smith', '2024-06-15', 'Grand Oak Gardens', 'Modern Elegance');