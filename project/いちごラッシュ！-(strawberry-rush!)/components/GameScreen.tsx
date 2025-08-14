import React, { useState, useEffect, useCallback } from 'react';
import { Item } from '../types';
import { STRAWBERRY_ITEM, OTHER_ITEMS, GAME_DURATION_SECONDS, INCORRECT_PENALTY_SECONDS } from '../constants';
import ItemCard from './ItemCard';

interface GameScreenProps {
  onGameOver: (finalScore: number) => void;
}

type Position = 'left' | 'right';
type Feedback = 'correct' | 'incorrect' | null;

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [currentItem1, setCurrentItem1] = useState<Item>(STRAWBERRY_ITEM);
  const [currentItem2, setCurrentItem2] = useState<Item>(OTHER_ITEMS[0]);
  const [strawberryPosition, setStrawberryPosition] = useState<Position>('left');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isShaking, setIsShaking] = useState(false);

  const generateNewRound = useCallback(() => {
    let randomItem = OTHER_ITEMS[Math.floor(Math.random() * OTHER_ITEMS.length)];
    // Ensure the random item is not a strawberry, preventing two strawberries from appearing.
    while (randomItem.name === STRAWBERRY_ITEM.name) {
      randomItem = OTHER_ITEMS[Math.floor(Math.random() * OTHER_ITEMS.length)];
    }

    const isStrawberryLeft = Math.random() < 0.5;

    if (isStrawberryLeft) {
      setCurrentItem1(STRAWBERRY_ITEM);
      setCurrentItem2(randomItem);
      setStrawberryPosition('left');
    } else {
      setCurrentItem1(randomItem);
      setCurrentItem2(STRAWBERRY_ITEM);
      setStrawberryPosition('right');
    }
  }, []);

  useEffect(() => {
    generateNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onGameOver, score]);

  const handleItemClick = (clickedPosition: Position) => {
    if (feedback) return; // Prevent multiple clicks during feedback

    if (clickedPosition === strawberryPosition) {
      setScore(prevScore => prevScore + 1);
      setFeedback('correct');
    } else {
      setTimeLeft(prevTime => Math.max(0, prevTime - INCORRECT_PENALTY_SECONDS));
      setFeedback('incorrect');
      setIsShaking(true);
    }

    setTimeout(() => {
      setFeedback(null);
      setIsShaking(false);
      generateNewRound();
    }, 300);
  };

  const timerColor = timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-pink-500';

  return (
    <div className={`w-full max-w-md mx-auto p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg ${isShaking ? 'animate-shake' : ''}`}>
      <div className="flex justify-between items-center mb-6 md:mb-8 text-xl md:text-2xl font-bold">
        <div className="text-pink-500">
          スコア: <span className="text-2xl md:text-3xl w-16 inline-block text-center">{score}</span>
        </div>
        <div className={timerColor}>
          のこり: <span className="text-2xl md:text-3xl w-16 inline-block text-center">{timeLeft}</span>
        </div>
      </div>
      <div className="flex justify-around items-center space-x-2 sm:space-x-4">
        <ItemCard item={currentItem1} onClick={() => handleItemClick('left')} feedback={feedback && strawberryPosition === 'left' ? feedback : (feedback === 'incorrect' && strawberryPosition !== 'left' ? 'incorrect' : null)} />
        <ItemCard item={currentItem2} onClick={() => handleItemClick('right')} feedback={feedback && strawberryPosition === 'right' ? feedback : (feedback === 'incorrect' && strawberryPosition !== 'right' ? 'incorrect' : null)} />
      </div>
    </div>
  );
};

export default GameScreen;
