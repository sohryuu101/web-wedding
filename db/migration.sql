-- Migration script to add missing columns to existing invitations table
-- Run this if you have an existing database without the new columns

-- Add couple profile fields
ALTER TABLE invitations ADD COLUMN bride_photo TEXT;
ALTER TABLE invitations ADD COLUMN groom_photo TEXT;
ALTER TABLE invitations ADD COLUMN bride_parents_father TEXT;
ALTER TABLE invitations ADD COLUMN bride_parents_mother TEXT;
ALTER TABLE invitations ADD COLUMN groom_parents_father TEXT;
ALTER TABLE invitations ADD COLUMN groom_parents_mother TEXT;
ALTER TABLE invitations ADD COLUMN bride_social_media_instagram TEXT;
ALTER TABLE invitations ADD COLUMN groom_social_media_instagram TEXT;
ALTER TABLE invitations ADD COLUMN bride_birth_order TEXT DEFAULT 'first';
ALTER TABLE invitations ADD COLUMN groom_birth_order TEXT DEFAULT 'first';
ALTER TABLE invitations ADD COLUMN bride_description TEXT;
ALTER TABLE invitations ADD COLUMN groom_description TEXT;

-- Add cover video field
ALTER TABLE invitations ADD COLUMN cover_video TEXT; 