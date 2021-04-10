import { createContext, useState, useEffect, useContext } from "react";


type SoundContextData = {
  sound: string;
  selectSound: (sound: string) => void;
};

const SoundContext = createContext<SoundContextData>({
  sound: null,
  selectSound: () => null
});
export default SoundContext;

export const SoundContextProvider: React.FC = ({ children }) => {
  const [sound, setSound] = useState<string | null>("AMSynth");

  const selectSound = (sound: string): void => {
    setSound(sound)
  };

  return (
    <SoundContext.Provider
      value={{
        sound,
        selectSound
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
    const { sound } = useContext(SoundContext);
    return sound;
};

export const useSelectSound = () => {
    const { selectSound } = useContext(SoundContext);
    return selectSound;
};
