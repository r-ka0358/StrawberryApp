import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (playerName: string) => void;
  ranking: Array<{
    score: number;
    date: string;
    id?: string;
    playerName?: string;
  }>;
  isLoading?: boolean;
  isLoading?: boolean;
}

const rankIcons = ['🥇', '🥈', '🥉'];

const StartScreen: React.FC<StartScreenProps> = ({ onStart, ranking, isLoading = false }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = playerName.trim();
    
    if (!trimmedName) {
      setError('名前を入力してください');
      return;
    }
    
    if (trimmedName.length > 20) {
      setError('名前は20文字以内で入力してください');
      return;
    }
    
    onStart(trimmedName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    if (error) setError('');
  };

  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = playerName.trim();
    
    if (!trimmedName) {
      setError('名前を入力してください');
      return;
    }
    
    if (trimmedName.length > 20) {
      setError('名前は20文字以内で入力してください');
      return;
    }
    
    onStart(trimmedName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-10 text-center flex flex-col items-center animate-fade-in">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-500 tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        🍰 ケーキ記憶ゲーム 🍰
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 mt-4 font-medium">
        ケーキの順番を覚えて、同じ順番でクリックしよう！
      </p>
      
      <div className="w-full max-w-sm bg-pink-100/50 rounded-2xl p-4 mb-8 shadow-inner">
        <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-3">🏆 ランキング 🏆</h2>
        {isLoading ? (
          <p className="text-gray-500 py-2">読み込み中...</p>
        ) : ranking.length > 0 ? (
          <p className="text-gray-500 py-2">読み込み中...</p>
        ) : ranking.length > 0 ? (
          <ol className="space-y-1 text-left">
            {ranking.map((entry, index) => (
              <li key={index} className="flex justify-between items-baseline bg-white/50 rounded-lg px-3 py-1">
                <span className="font-bold text-lg text-yellow-600 w-10">{rankIcons[index] || `${index + 1}位`}</span>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-gray-800 text-lg">{entry.score}点</span>
                  {entry.playerName && <span className="text-xs text-gray-400">{entry.playerName}</span>}
                </div>
                  <span className="font-semibold text-gray-800 text-lg">{entry.score}点</span>
                  {entry.playerName && <span className="text-xs text-gray-400">{entry.playerName}</span>}
                </div>
                <span className="text-xs text-gray-500">{entry.date}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500 py-2">まだ記録がありません</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            placeholder="プレイヤー名を入力"
            maxLength={20}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full text-xl md:text-2xl font-bold bg-red-500 text-white rounded-full py-3 px-8 md:py-4 md:px-10 shadow-lg transform transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          スタート！
        </button>
      </form>
            placeholder="プレイヤー名を入力"
            maxLength={20}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full text-xl md:text-2xl font-bold bg-red-500 text-white rounded-full py-3 px-8 md:py-4 md:px-10 shadow-lg transform transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          スタート！
        </button>
      </form>
    </div>
  );
};

export default StartScreen;