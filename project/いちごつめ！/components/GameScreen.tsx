import React, { useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_TIME, PENALTY_SECONDS, DISTRACTOR_EMOJIS, CHOICE_COUNT } from '../constants';

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [items, setItems] = useState<string[]>([]);
  const [strawberryIndex, setStrawberryIndex] = useState(-1);
  const [feedback, setFeedback] = useState<{ index: number; type: 'correct' | 'incorrect' } | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoreRef = useRef(score);
  scoreRef.current = score;

  const generateNewItems = useCallback(() => {
    setFeedback(null);
    const newStrawberryIndex = Math.floor(Math.random() * CHOICE_COUNT);
    const newItems: string[] = new Array(CHOICE_COUNT).fill('');
    
    newItems[newStrawberryIndex] = '🍓';

    const distractors = [...DISTRACTOR_EMOJIS].sort(() => 0.5 - Math.random());
    let distractorCursor = 0;

    for (let i = 0; i < CHOICE_COUNT; i++) {
      if (i !== newStrawberryIndex) {
        newItems[i] = distractors[distractorCursor++];
      }
    }
    
    setStrawberryIndex(newStrawberryIndex);
    setItems(newItems);
  }, []);

  useEffect(() => {
    generateNewItems();
  }, [generateNewItems]);
  
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      onGameOver(scoreRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, onGameOver]);

  const handleChoice = (index: number) => {
    if (feedback) return;

    const isCorrect = index === strawberryIndex;

    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({ index, type: 'correct' });
    } else {
      setTimeLeft(t => Math.max(0, t - PENALTY_SECONDS));
      setFeedback({ index, type: 'incorrect' });
    }
    
    feedbackTimeoutRef.current = setTimeout(() => {
      generateNewItems();
    }, 300);
  };

  const timeBarWidth = (timeLeft / INITIAL_TIME) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full animate-pop-in">
      <div className="flex justify-between items-center mb-4 text-2xl font-bold">
        <div className="text-pink-500">スコア: {score}</div>
        <div className="text-gray-700">時間: {timeLeft}</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-linear ${timeLeft <= 10 ? 'bg-red-500' : 'bg-green-400'}`}
          style={{ width: `${timeBarWidth}%` }}
        ></div>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px]">
        <p className="text-2xl font-bold text-gray-700 mb-8">いちごはどっち？</p>
        <div className="flex justify-around w-full max-w-sm">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              disabled={!!feedback}
              className={`w-36 h-36 sm:w-40 sm:h-40 bg-pink-50 rounded-2xl flex items-center justify-center text-7xl sm:text-8xl transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300
                ${feedback && feedback.index === index && feedback.type === 'correct' ? 'scale-110 ring-4 ring-green-400' : ''}
                ${feedback && feedback.index === index && feedback.type === 'incorrect' ? 'animate-shake' : ''}
                ${feedback && feedback.index !== index ? 'opacity-50' : ''}
              `}
              aria-label={`選択肢 ${index + 1}: ${item}`}
            >
              <span role="img" aria-hidden="true">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;