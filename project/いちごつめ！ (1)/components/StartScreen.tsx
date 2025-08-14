import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (name: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('名前を入力してください！');
      return;
    }
    if (name.length > 12) {
      setError('名前は12文字までです。');
      return;
    }
    onStart(name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-pop-in">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-4xl font-extrabold text-pink-500 mr-3">いちごつめ！</h1>
        <span className="text-5xl" role="img" aria-label="strawberry">🍓</span>
      </div>
      <p className="text-gray-600 mb-6">時間内にいちごをたくさんつめよう！</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="名前を入力 (12文字まで)"
            maxLength={12}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-md hover:bg-red-600 active:scale-95 transform transition-all duration-150"
        >
          ゲーム開始！
        </button>
      </form>
    </div>
  );
};

export default StartScreen;