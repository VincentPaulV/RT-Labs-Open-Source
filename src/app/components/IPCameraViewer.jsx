import React, { useEffect, useRef } from 'react';

const IPCameraViewer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = 'http://10.100.81.47:4747/video';
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        style={{ width: '100%', maxWidth: '800px', borderRadius: '4px', alignSelf: 'center' }}
      />
    </div>
  );
};

export default IPCameraViewer; 