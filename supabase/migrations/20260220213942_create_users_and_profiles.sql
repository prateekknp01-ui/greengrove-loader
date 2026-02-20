/*
  # Create Users and Profiles System

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `username` (text, not null)
      - `phone` (text)
      - `language` (text)
      - `has_disability` (boolean, default false)
      - `disability_type` (text)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
      - `avatar_url` (text)
      - `location` (text)
      - `farm_size` (text)
      - `primary_crops` (text[])
      
  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for authenticated users to read/update their own profile
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  username text NOT NULL,
  phone text,
  language text DEFAULT 'english',
  has_disability boolean DEFAULT false,
  disability_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  avatar_url text,
  location text,
  farm_size text,
  primary_crops text[]
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can read own profile by email"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  WITH CHECK (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
