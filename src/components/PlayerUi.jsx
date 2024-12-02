import PropTypes from "prop-types";
import NextIcon from "../Icons/NextIcon";
import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";
import PreviousIcon from "../Icons/PreviousIcon";
import RepeatIcon from "../Icons/RepeatIcon";
import Shuffle from "../Icons/Shuffle";
import headset from "../artistImage/headset.jpg";
import style from "./PlayerUi.module.css";
const PlayerUi = ({
  isPlaying,
  handlePlaying,
  currentSong,
  handleNext,
  handlePrevious,
  currentTime,
  handleSeek,
  duration,
  isRepeating,
  handleRepeat,
  handleShuffle,
  isShuffling,
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className={style.playerui_container}>
      <div className={style.playerui_image_wrapper}>
        <img src={headset} alt='headset' className={style.playerui_image} />
      </div>
      <div className={style.playui_title}>
        <p>{currentSong ? currentSong.title : "No song playing"}</p>
        <p>{currentSong ? currentSong.artist : ""}</p>
      </div>
      <div>
        <div className={style.progress_bar}>
          <span>{formatTime(currentTime)}</span>
          <input
            type='range'
            min='0'
            max={isNaN(duration) ? 1 : duration}
            value={isNaN(currentTime) ? 0 : currentTime}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className={style.btns}>
        <button
          onClick={handleRepeat}
          className={`${style.repeat_button} ${
            isRepeating ? style.active_button : ""
          }`}
        >
          <RepeatIcon />
        </button>
        <div className={style.play_btn}>
          <button onClick={handlePrevious}>
            <PreviousIcon />
          </button>
          <button onClick={handlePlaying}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button onClick={handleNext}>
            <NextIcon />
          </button>
        </div>
        <button
          onClick={handleShuffle}
          className={isShuffling ? style.active_button : ""}
        >
          <Shuffle />
        </button>
      </div>
    </div>
  );
};

export default PlayerUi;
PlayerUi.propTypes = {
  isPlaying: PropTypes.bool,
  handlePlaying: PropTypes.func,
  currentSong: PropTypes.object,
  handleNext: PropTypes.func,
  handlePrevious: PropTypes.func,
  progress: PropTypes.number,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  handleSeek: PropTypes.func,
  handleRepeat: PropTypes.func,
  isRepeating: PropTypes.bool,
  isShuffling: PropTypes.bool,
  handleShuffle: PropTypes.func,
};
