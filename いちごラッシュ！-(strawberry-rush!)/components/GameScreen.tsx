@@ .. @@
 interface GameScreenProps {
+  playerName: string;
   onGameOver: (finalScore: number) => void;
 }

-const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
+const GameScreen: React.FC<GameScreenProps> = ({ playerName, onGameOver }) => {
   const [score, setScore] = useState(0);
@@ .. @@
   return (
     <div className={`w-full max-w-md mx-auto p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg ${isShaking ? 'animate-shake' : ''}`}>
+      <div className="text-center mb-2">
+        <span className="text-lg font-bold text-gray-600">{playerName}さん</span>
+      </div>
  
  )
}     <div className="flex justify-between items-center mb-6 md:mb-8 text-xl md:text-2xl font-bold">