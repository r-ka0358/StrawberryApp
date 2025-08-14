import React from 'react';
import { RankingEntry } from '../types';
import { RANKING_SIZE } from '../constants';

interface GameOverScreenProps {
  score: number;
  ranking: RankingEntry[];
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, ranking, onRestart }) => {
  const topScore = ranking.length > 0 ? ranking[0].score : 0;
  const isNewHighScore = score > 0 && score > topScore;
  
  // Find if the new score would make it into the ranking
  const lastRankedScore = ranking.length === RANKING_SIZE ? ranking[RANKING_SIZE - 1].score : -1;
  const isRankedIn = score > 0 && (ranking.length < RANKING_SIZE || score > lastRankedScore);
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-12 text-center flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500 mb-4">タイムアップ！</h2>
      
      {isNewHighScore ? (
        <p className="text-2xl font-bold text-yellow-500 animate-bounce mb-4">
          🎉 ハイスコア更新！ 🎉
        </p>
      ) : isRankedIn && (
        <p className="text-xl font-bold text-green-500 mb-4">
          🎊 ランキング入り！ 🎊
        </p>
      )}

      <div className="text-lg text-gray-600 mb-2">今回のスコア</div>
      <p className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">{score}</p>
      
      <div className="text-lg text-gray-600 mb-2">トップスコア</div>
      <p className="text-3xl font-bold text-gray-700 mb-8">{topScore > 0 ? topScore : '-'}</p>
      
      <button
        onClick={onRestart}
        className="text-xl md:text-2xl font-bold bg-red-500 text-white rounded-full py-3 px-8 md:py-4 md:px-10 shadow-lg transform transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        もう一度プレイ
      </button>
    </div>
  );
};

export default GameOverScreen;
