interface GameOverScreenProps {
  score: number;
  playerName: string;
  ranking: Array<{
    score: number;
    date: string;
    id?: string;
    playerName?: string;
  }>;
  onRestart: () => void;
}

import React from 'react';

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, playerName, ranking, onRestart }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-12 text-center flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">{playerName}さん</h1>
      <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500 mb-4">タイムアップ！</h2>
      
      <div className="text-lg text-gray-600 mb-2">今回のスコア</div>
      <p className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">{score}</p>
      
      <div className="text-lg text-gray-600 mb-2">あなたの記録がランキングに保存されました！</div>
      
      <button
        onClick={onRestart}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        もう一度プレイ
      </button>
    </div>
  );
};

export default GameOverScreen;