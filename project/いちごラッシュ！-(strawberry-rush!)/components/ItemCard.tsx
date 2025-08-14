import React from 'react';
import { Item } from '../types';

type Feedback = 'correct' | 'incorrect' | null;

interface ItemCardProps {
  item: Item;
  onClick: () => void;
  feedback: Feedback;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick, feedback }) => {
  const baseClasses = 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center bg-white rounded-2xl shadow-md cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl border-4';
  
  const feedbackClasses = {
    correct: 'border-green-400 scale-110 shadow-lg',
    incorrect: 'border-red-400',
    null: 'border-transparent',
  };

  return (
    <div onClick={onClick} className={`${baseClasses} ${feedbackClasses[feedback || 'null']}`}>
      <span className="text-6xl sm:text-7xl" role="img" aria-label={item.name}>
        {item.emoji}
      </span>
    </div>
  );
};

export default ItemCard;
