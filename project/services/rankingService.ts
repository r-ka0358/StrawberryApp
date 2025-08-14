import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type RankingRow = Database['public']['Tables']['rankings']['Row'];
type RankingInsert = Database['public']['Tables']['rankings']['Insert'];

export interface RankingEntry {
  id: string;
  playerName: string;
  score: number;
  gameType: string;
  createdAt: string;
}

const GAME_TYPE = 'strawberry_rush';
const RANKING_LIMIT = 10;

// データベースの行をRankingEntryに変換
const mapRowToRankingEntry = (row: RankingRow): RankingEntry => ({
  id: row.id,
  playerName: row.player_name,
  score: row.score,
  gameType: row.game_type,
  createdAt: row.created_at,
});

// ランキングを取得
export const fetchRankings = async (): Promise<RankingEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('rankings')
      .select('*')
      .eq('game_type', GAME_TYPE)
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(RANKING_LIMIT);

    if (error) {
      console.error('Error fetching rankings:', error);
      throw error;
    }

    return data?.map(mapRowToRankingEntry) || [];
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    return [];
  }
};

// 新しいスコアを保存
export const saveScore = async (playerName: string, score: number): Promise<RankingEntry | null> => {
  try {
    const insertData: RankingInsert = {
      player_name: playerName.trim(),
      score,
      game_type: GAME_TYPE,
    };

    const { data, error } = await supabase
      .from('rankings')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error saving score:', error);
      throw error;
    }

    return data ? mapRowToRankingEntry(data) : null;
  } catch (error) {
    console.error('Failed to save score:', error);
    return null;
  }
};

// プレイヤーの最高スコアを取得
export const getPlayerBestScore = async (playerName: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('rankings')
      .select('score')
      .eq('game_type', GAME_TYPE)
      .eq('player_name', playerName.trim())
      .order('score', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching player best score:', error);
      return 0;
    }

    return data?.score || 0;
  } catch (error) {
    console.error('Failed to fetch player best score:', error);
    return 0;
  }
};