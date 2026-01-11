import { useEffect, useRef, useCallback } from "react";

export function useButtonAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  //ssr nodeJs에서 Audio api 사용못함 => useEffect로 브라우저에서만
  useEffect(() => {
    audioRef.current = new Audio("/audio/pop.mp3");
    audioRef.current.volume = 0.2;

    return () => {
      const a = audioRef.current;
      if (!a) return;
      a.pause();
      audioRef.current = null;
    };
  }, []);

  //리렌더링 잦은편 => useCallback
  const playEffect = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;

    a.currentTime = 0;
    a.play();
  }, []);

  return playEffect;
}
