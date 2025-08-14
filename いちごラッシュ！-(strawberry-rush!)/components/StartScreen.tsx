import React from 'react';
import { RankingEntry } from '../types';

interface StartScreenProps {
  onStart: () => void;
  ranking: RankingEntry[];
}

const rankIcons = ['🥇', '🥈', '🥉'];

const StartScreen: React.FC<StartScreenProps> = ({ onStart, ranking }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-10 text-center flex flex-col items-center animate-fade-in">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-500 tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        いちごラッシュ！
      </h1>
      <div className="text-7xl sm:text-8xl my-4 md:my-6" style={{ animation: 'bounce 2s infinite' }}>🍓</div>
      
      <p className="text-md sm:text-lg text-gray-500 mb-6">2つのうち、いちごをすばやく選んでね！</p>
      
      <div className="w-full max-w-sm bg-pink-100/50 rounded-2xl p-4 mb-8 shadow-inner">
        <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-3">🏆 ランキング 🏆</h2>
        {ranking.length > 0 ? (
          <ol className="space-y-1 text-left">
            {ranking.map((entry, index) => (
              <li key={index} className="flex justify-between items-baseline bg-white/50 rounded-lg px-3 py-1">
                <span className="font-bold text-lg text-yellow-600 w-10">{rankIcons[index] || `${index + 1}位`}</span>
                <span className="font-semibold text-gray-800 text-lg">{entry.score}点</span>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500 py-2">まだ記録がありません。</p>
        )}
      </div>

      <button
        onClick={onStart}
        className="text-xl md:text-2xl font-bold bg-red-500 text-white rounded-full py-3 px-8 md:py-4 md:px-10 shadow-lg transform transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        スタート！
      </button>
    </div>
  );
};

export default StartScreen;
