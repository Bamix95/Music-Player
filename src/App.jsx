import style from "./App.module.css";
import PlayerUi from "./components/PlayerUi";
import Track from "./components/Track";
import { songsArray } from "./MusicData/MusicProvider";
import { useState, useRef, useEffect, useCallback } from "react";
function App() {
  const [songs] = useState(songsArray);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const audioRef = useRef(new Audio());

  const currentSong = playingIndex !== null ? songsArray[playingIndex] : null;

  const getRandomIndex = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * songsArray.length);
    console.log(randomIndex);
    return randomIndex === playingIndex ? getRandomIndex() : randomIndex;
  }, [playingIndex]);

  const handlePlaying = (index) => {
    if (playingIndex === index) {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      setPlayingIndex(index);
      setIsPlaying(true);
      audioRef.current.src = songsArray[index].songUrl;
      audioRef.current.play();
    }
  };
  const handleNext = useCallback(() => {
    const nextIndex = isShuffling
      ? getRandomIndex()
      : (playingIndex + 1) % songsArray.length;
    setPlayingIndex(nextIndex);
    setIsPlaying(true);
    audioRef.current.src = songsArray[nextIndex].songUrl;
    audioRef.current.play();
  }, [playingIndex, isShuffling, getRandomIndex]);

  const handlePrevious = () => {
    const prevIndex =
      (playingIndex - 1 + songsArray.length) % songsArray.length;
    setPlayingIndex(prevIndex);
    setIsPlaying(true);
    audioRef.current.src = songsArray[prevIndex].songUrl;
    audioRef.current.play();
  };
  const handleTimeUpdate = useCallback(() => {
    const current = audioRef.current.currentTime || 0;
    const total = audioRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  }, []);

  const handleSeek = (event) => {
    const seekTo = event.target.value;
    audioRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
    setProgress((seekTo / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!isNaN(audio.duration)) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
  };

  const handleSongEnd = useCallback(() => {
    if (isRepeating) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      handleNext();
    }
  }, [isRepeating, handleNext]);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      requestAnimationFrame(handleTimeUpdate);
    }

    audio.addEventListener("ended", handleSongEnd);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("ended", handleSongEnd);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [handleTimeUpdate, handleSongEnd, isPlaying]);

  const validProgress = isNaN(progress) || progress < 0 ? 0 : progress;

  const handleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const handleShuffle = () => {
    setIsShuffling(!isShuffling);
  };
  return (
    <div className={style.app_container}>
      <PlayerUi
        isPlaying={isPlaying}
        handlePlaying={() => handlePlaying(playingIndex)}
        currentSong={currentSong}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        progress={validProgress}
        currentTime={currentTime}
        duration={isLoaded ? duration : 0}
        handleSeek={handleSeek}
        isRepeating={isRepeating}
        handleRepeat={handleRepeat}
        handleShuffle={handleShuffle}
        isShuffling={isShuffling}
      />
      <div className={style.app_track}>
        {songs.map((song, index) => {
          return (
            <Track
              key={song.id}
              song={song}
              index={index}
              isPlaying={isPlaying && playingIndex === index}
              setIsPlaying={setIsPlaying}
              handlePlaying={() => handlePlaying(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
export default App;
