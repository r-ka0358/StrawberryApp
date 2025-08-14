import React from 'react';
import { RankingEntry } from '../types';

interface GameOverScreenProps {
  ranking: RankingEntry[];
  currentPlayer: RankingEntry;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ ranking, currentPlayer, onRestart }) => {
  // Find the first occurrence of the current player's score in the ranking for highlighting
  const rankIndexToHighlight = ranking.findIndex(
    entry => entry.name === currentPlayer.name && entry.score === currentPlayer.score
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-pop-in">
      <h1 className="text-5xl font-extrabold text-pink-500 mb-2">タイムアップ！</h1>
      <p className="text-xl text-gray-700 mb-6">
        {currentPlayer.name}さんのスコアは <span className="font-bold text-3xl text-red-500">{currentPlayer.score}</span> 個でした！
      </p>

      <div className="bg-pink-50 rounded-lg p-4 mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">ランキング</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {ranking.length > 0 ? (
             ranking.map((entry, index) => (
              <li key={`${entry.name}-${index}`} className={`flex justify-between items-center p-3 rounded-lg text-lg ${index === rankIndexToHighlight ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-white'}`}>
                <span className="font-bold text-gray-700">{index + 1}. {entry.name}</span>
                <span className="font-bold text-pink-500">{entry.score} 個</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">まだランキングがありません。</p>
          )}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-md hover:bg-red-600 active:scale-95 transform transition-all duration-150"
      >
        もう一度プレイ
      </button>
    </div>
  );
};

export default GameOverScreen;