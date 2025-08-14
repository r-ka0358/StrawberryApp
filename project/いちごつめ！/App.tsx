
import React, { useState, useCallback } from 'react';
import { GameState, RankingEntry } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [playerName, setPlayerName] = useState<string>('');
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);

  const handleGameStart = useCallback((name: string) => {
    setPlayerName(name);
    setCurrentScore(0);
    setGameState(GameState.PLAYING);
  }, []);

  const handleGameOver = useCallback((score: number) => {
    setCurrentScore(score);
    setRanking(prevRanking => [...prevRanking, { name: playerName, score }].sort((a, b) => b.score - a.score));
    setGameState(GameState.GAME_OVER);
  }, [playerName]);

  const handleRestart = useCallback(() => {
    setGameState(GameState.START);
  }, []);

  const renderScreen = () => {
    switch (gameState) {
      case GameState.PLAYING:
        return <GameScreen onGameOver={handleGameOver} />;
      case GameState.GAME_OVER:
        return <GameOverScreen ranking={ranking} currentPlayer={{ name: playerName, score: currentScore }} onRestart={handleRestart} />;
      case GameState.START:
      default:
        return <StartScreen onStart={handleGameStart} />;
    }
  };

  return (
    <main className="bg-pink-100 min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {renderScreen()}
      </div>
    </main>
  );
};

export default App;
