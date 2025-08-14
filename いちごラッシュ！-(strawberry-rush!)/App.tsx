import React, { useState, useEffect, useCallback } from 'react';
import { GameState } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import { RANKING_SIZE } from './constants';
import { fetchRankings, saveScore } from '../services/rankingService';
import type { RankingEntry } from '../services/rankingService';
import { fetchRankings, saveScore } from '../services/rankingService';
import type { RankingEntry } from '../services/rankingService';
import { fetchRankings, saveScore } from '../services/rankingService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerName, setPlayerName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadRankings = async () => {
    setIsLoading(true);
    try {
      const rankings = await fetchRankings();
      // 既存の形式に変換
      const formattedRankings = rankings.slice(0, RANKING_SIZE).map(entry => ({
        score: entry.score,
        date: new Date(entry.createdAt).toLocaleDateString('ja-JP'),
        id: entry.id,
        playerName: entry.playerName,
      }));
      setRanking(formattedRankings);
    } catch (error) {
      console.error('Failed to load rankings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRankings = async () => {
    setIsLoading(true);
    try {
      const rankings = await fetchRankings();
      // 既存の形式に変換
      const formattedRankings = rankings.slice(0, RANKING_SIZE).map(entry => ({
        score: entry.score,
        date: new Date(entry.createdAt).toLocaleDateString('ja-JP'),
        id: entry.id,
        playerName: entry.playerName,
      }));
      setRanking(formattedRankings);
    } catch (error) {
    loadRankings();

  const handleStart = useCallback((name: string) => {
  const handleStart = useCallback((name: string) => {
    setPlayerName(name);
    setScore(0);
    setGameState('playing');
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
  const handleRestart = useCallback(() => {
    setGameState('start');
    // スコアをデータベースに保存
    if (playerName.trim()) {
      saveScore(playerName, finalScore).then(() => {
        // ランキングを再読み込み
        loadRankings();
      }).catch(error => {
        console.error('Failed to save score:', error);
      });
    }
  }, [playerName]);

  const renderScreen = () => {
    switch (gameState) {
      case 'playing':
        return <GameScreen playerName={playerName} onGameOver={handleGameOver} />;
      case 'gameOver':
        return <GameOverScreen 
          score={score} 
          playerName={playerName}
          ranking={ranking} 
          onRestart={handleRestart} 
        />;
          score={score} 
          playerName={playerName}
          ranking={ranking} 
          onRestart={handleRestart} 
        />;
      case 'start':
      default:
        return <StartScreen onStart={handleStart} ranking={ranking} isLoading={isLoading} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-100 text-gray-800 min-h-screen flex items-center justify-center p-4">
      {renderScreen()}
};

export default App;