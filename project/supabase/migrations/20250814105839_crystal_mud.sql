/*
  # ランキングテーブルの作成

  1. 新しいテーブル
    - `rankings`
      - `id` (uuid, primary key)
      - `player_name` (text, プレイヤー名)
      - `score` (integer, スコア)
      - `game_type` (text, ゲームタイプ - 将来の拡張用)
      - `created_at` (timestamp, 作成日時)

  2. セキュリティ
    - RLSを有効化
    - 全ユーザーが読み取り可能
    - 全ユーザーが新規作成可能（匿名ゲームのため）
*/

CREATE TABLE IF NOT EXISTS rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  game_type text NOT NULL DEFAULT 'strawberry_rush',
  created_at timestamptz DEFAULT now()
);

-- インデックスを追加してクエリパフォーマンスを向上
CREATE INDEX IF NOT EXISTS idx_rankings_score_desc ON rankings (game_type, score DESC, created_at DESC);

-- RLSを有効化
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;

-- 全ユーザーがランキングを読み取り可能
CREATE POLICY "Anyone can read rankings"
  ON rankings
  FOR SELECT
  TO public
  USING (true);

-- 全ユーザーがランキングを作成可能（匿名ゲームのため）
CREATE POLICY "Anyone can create rankings"
  ON rankings
  FOR INSERT
  TO public
  WITH CHECK (true);