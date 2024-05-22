import React, { createContext, useState, ReactNode } from 'react';

type PlayerContextType = {
  currentTrack: string | null;
  setCurrentTrack: (track: string | null) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };