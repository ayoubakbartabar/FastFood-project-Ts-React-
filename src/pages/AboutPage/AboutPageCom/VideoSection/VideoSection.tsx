import React, { useRef, useState } from "react";
import "./VideoSection.css";
import { FaPlay, FaPause } from "react-icons/fa";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  // Use custom hook to animate video container on scroll
  useIntersectionAnimation(".video-container");

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowControls(false);
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => {
    if (isPlaying) setShowControls(false);
  };

  return (
    <section className="video-section">
      <div
        ref={containerRef}
        className="video-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className="responsive-video"
          src="src/assets/video/661e04539d8c67c185503efc_2141629_Homemade_Eating_Cooking_1920x1080-transcode.mp4"
          muted
          loop
          playsInline
        />
        {showControls && (
          <button className="custom-play-button" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
