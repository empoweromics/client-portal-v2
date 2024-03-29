import ReactPlayer from 'react-player';
import styles from './academy.module.css';

const x = true;
const VideoSection = ({ video }) => {
  return (
    <div className={styles.video_sec_wrapper}>
      {video.title}
      <ReactPlayer url={video.url} controls={x} width="100%" height="360px" />
    </div>
  );
};

export { VideoSection };
