@@ .. @@
 import React, { useState, useEffect, useCallback } from 'react';
 import { GameState, RankingEntry } from './types';
 import StartScreen from './components/StartScreen';
 import GameScreen from './components/GameScreen';
 import GameOverScreen from './components/GameOverScreen';
-import { RANKING_KEY, RANKING_SIZE } from './constants';
+import { RANKING_SIZE } from './constants';
+import { fetchRankings, saveScore } from '../services/rankingService';

 const App: React.FC = () => {
   const [gameState, setGameState] = useState<GameState>('start');
+  const [playerName, setPlayerName] = useState('');
   const [score, setScore] = useState(0);
   const [ranking, setRanking] = useState<RankingEntry[]>([]);
+  const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
-    try {
-      const savedRanking = localStorage.getItem(RANKING_KEY);
-      if (savedRanking) {
-        setRanking(JSON.parse(savedRanking));
-      }
-    } catch (error) {
-      console.error("Failed to parse ranking from localStorage", error);
-      setRanking([]);
-    }
+    loadRankings();
   }, []);

-  const handleStart = useCallback(() => {
+  const loadRankings = async () => {
+    setIsLoading(true);
+    try {
+      const rankings = await fetchRankings();
+      // 既存の形式に変換
+      const formattedRankings = rankings.slice(0, RANKING_SIZE).map(entry => ({
+        score: entry.score,
+        date: new Date(entry.createdAt).toLocaleDateString('ja-JP'),
+        id: entry.id,
+        playerName: entry.playerName,
+      }));
+      setRanking(formattedRankings);
+    } catch (error) {
+      console.error('Failed to load rankings:', error);
+    } finally {
+      setIsLoading(false);
+    }
+  };
+
+  const handleStart = useCallback((name: string) => {
+    setPlayerName(name);
     setScore(0);
     setGameState('playing');
   }, []);

   const handleGameOver = useCallback((finalScore: number) => {
     setScore(finalScore);
-
-    const newEntry: RankingEntry = { 
-      score: finalScore, 
-      date: new Date().toLocaleDateString('ja-JP') 
-    };
-
-    const updatedRanking = [...ranking, newEntry]
-      .sort((a, b) => b.score - a.score)
-      .slice(0, RANKING_SIZE);
-    
-    setRanking(updatedRanking);
-    localStorage.setItem(RANKING_KEY, JSON.stringify(updatedRanking));
-
     setGameState('gameOver');
-  }, [ranking]);
+
+    // スコアをデータベースに保存
+    if (playerName.trim()) {
+      saveScore(playerName, finalScore).then(() => {
+        // ランキングを再読み込み
+        loadRankings();
+      }).catch(error => {
+        console.error('Failed to save score:', error);
+      });
+    }
+  }, [playerName]);
   
   const handleRestart = useCallback(() => {
       setGameState('start');
@@ .. @@
   const renderScreen = () => {
     switch (gameState) {
       case 'playing':
-        return <GameScreen onGameOver={handleGameOver} />;
+        return <GameScreen playerName={playerName} onGameOver={handleGameOver} />;
       case 'gameOver':
-        return <GameOverScreen score={score} ranking={ranking} onRestart={handleRestart} />;
+        return <GameOverScreen 
+          score={score} 
+          playerName={playerName}
+          ranking={ranking} 
+          onRestart={handleRestart} 
+        />;
       case 'start':
       default:
-        return <StartScreen onStart={handleStart} ranking={ranking} />;
+        return <StartScreen onStart={handleStart} ranking={ranking} isLoading={isLoading} />;
     }
   };