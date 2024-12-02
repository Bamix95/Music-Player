import PropTypes from "prop-types";
import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";
import style from "./Track.module.css";

const Track = ({ song, isPlaying, handlePlaying }) => {
  return (
    <div className={style.track_container}>
      <div className={style.track_wrapper} onClick={handlePlaying}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        <div className={style.artist_info}>
          <p>{song.title}</p>
          <small>{song.artist}</small>
        </div>
      </div>
    </div>
  );
};
export default Track;
Track.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handlePlaying: PropTypes.func.isRequired,
};
