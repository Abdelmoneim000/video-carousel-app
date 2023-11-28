import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './VideoCarousel.css'; // You can define your styles in this file
import video1 from './videos/video-1.mp4';
import video2 from './videos/video-2.mp4';
import video3 from './videos/video-3.mp4';

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null)]; // Create refs for each video

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (current) => {
      // Disable next button if the last video is reached
      if (current === 2) {
        sliderRef.current.slickNext = () => {};
      } else {
        sliderRef.current.slickNext = originalSlickNext;
      }
    },
  };

  const originalSlickNext = sliderRef.current ? sliderRef.current.slickNext : () => {};

  useEffect(() => {
    // Pause previous videos and play the current one
    videoRefs.forEach((videoRef, index) => {
      try {
        if (currentSlide === index) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0; // Reset to the beginning
        }
      } catch (error) {
        // Handle the error or ignore it, as it's related to the play/pause interruption
        console.error("Error handling video play/pause:", error);
      }
    });
  }, [currentSlide]);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      sliderRef.current.slickPrev();
    } else if (direction === 'right') {
      sliderRef.current.slickNext();
    }
  };

return (
  <div className="video-carousel">
    <Slider {...settings} ref={sliderRef}>
      {/* Video 1 */}
      <div className={`carousel-item ${currentSlide === 0 ? 'center' : 'video-behind'}`}>
        <video ref={videoRefs[0]} autoPlay={currentSlide === 0} muted loop>
          <source src={video1} type="video/mp4" />
        </video>
      </div>

      {/* Video 2 */}
      <div className={`carousel-item ${currentSlide === 1 ? 'center' : 'video-behind'}`}>
        <video ref={videoRefs[1]} autoPlay={currentSlide === 1} muted loop>
          <source src={video2} type="video/mp4" />
        </video>
      </div>

      {/* Video 3 */}
      <div className={`carousel-item ${currentSlide === 2 ? 'center' : 'video-behind'}`}>
        <video ref={videoRefs[2]} autoPlay={currentSlide === 2} muted loop>
          <source src={video3} type="video/mp4" />
        </video>
      </div>
    </Slider>
  </div>
);
};

export default VideoCarousel;
