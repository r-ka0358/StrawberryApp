/*
  # Create rankings table for strawberry rush game

  1. New Tables
    - `rankings`
      - `id` (uuid, primary key)
      - `player_name` (text, not null)
      - `score` (integer, default 0)
      - `game_type` (text, default 'strawberry_rush')
      - `created_at` (timestamp with time zone, default now())

  2. Security
    - Enable RLS on `rankings` table
    - Add policies for public read and insert access
    - Add index for efficient score queries
*/

CREATE TABLE IF NOT EXISTS rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer DEFAULT 0,
  game_type text DEFAULT 'strawberry_rush',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read rankings
CREATE POLICY "Anyone can read rankings"
  ON rankings
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to create rankings
CREATE POLICY "Anyone can create rankings"
  ON rankings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for efficient ranking queries
CREATE INDEX IF NOT EXISTS idx_rankings_score_desc 
  ON rankings (game_type, score DESC, created_at DESC);