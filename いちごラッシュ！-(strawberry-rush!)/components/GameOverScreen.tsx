interface GameOverScreenProps {
  score: number;
  playerName: string;
  ranking: RankingEntry[];
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, playerName, ranking, onRestart }) => {
  const topScore = ranking.length > 0 ? ranking[0].score : 0;
  const isNewHighScore = score > 0 && score > topScore;
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-12 text-center flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">{playerName}さん</h1>
      <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500 mb-4">タイムアップ！</h2>
    </div>
  );
};