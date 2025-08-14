
import { useCallback, useMemo } from 'react';

export const useAudio = (src: string) => {
  const audio = useMemo(() => new Audio(src), [src]);

  const play = useCallback(() => {
    audio.currentTime = 0;
    audio.play().catch(e => console.error("Error playing audio:", e));
  }, [audio]);

  return play;
};
