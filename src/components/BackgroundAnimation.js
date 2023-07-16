import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../data/animation_lk2x9b23.json';



const BackgroundAnimation = () => {
    const animationContainerRef = useRef(null);
  
    useEffect(() => {
      const anim = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      });
  
      return () => {
        anim.destroy();
      };
    }, []);
  
    return <div className="fixed inset-0 z-0 top-0 left-0 w-screen h-screen" ref={animationContainerRef} />;
};

  export default BackgroundAnimation;
  