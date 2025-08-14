import React, { useState, useEffect, useCallback } from 'react';
import { GameState, RankingEntry } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import { RANKING_KEY, RANKING_SIZE } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    try {
      const savedRanking = localStorage.getItem(RANKING_KEY);
      if (savedRanking) {
        setRanking(JSON.parse(savedRanking));
      }
    } catch (error) {
      console.error("Failed to parse ranking from localStorage", error);
      setRanking([]);
    }
  }, []);

  const handleStart = useCallback(() => {
    setScore(0);
    setGameState('playing');
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore);

    const newEntry: RankingEntry = { 
      score: finalScore, 
      date: new Date().toLocaleDateString('ja-JP') 
    };

    const updatedRanking = [...ranking, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, RANKING_SIZE);
    
    setRanking(updatedRanking);
    localStorage.setItem(RANKING_KEY, JSON.stringify(updatedRanking));

    setGameState('gameOver');
  }, [ranking]);
  
  const handleRestart = useCallback(() => {
      setGameState('start');
  }, []);

  const renderScreen = () => {
    switch (gameState) {
      case 'playing':
        return <GameScreen onGameOver={handleGameOver} />;
      case 'gameOver':
        return <GameOverScreen score={score} ranking={ranking} onRestart={handleRestart} />;
      case 'start':
      default:
        return <StartScreen onStart={handleStart} ranking={ranking} />;
    }
  };

  return (
    <div className="bg-pink-50 text-gray-800 min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md mx-auto">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
