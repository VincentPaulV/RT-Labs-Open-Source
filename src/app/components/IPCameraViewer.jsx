"use client";

import { useState, useRef } from "react";
import { Maximize2, RefreshCw } from "lucide-react";

export default function IPCameraViewer() {
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  const handleRefresh = () => {
    setIsLoading(true);
    // Force reload the video stream
    if (videoRef.current) {
      const currentSrc = videoRef.current.src;
      videoRef.current.src = "";
      setTimeout(() => {
        videoRef.current.src = currentSrc;
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          ref={videoRef}
          src="http://10.100.81.47:4747/video"
          alt="Camera Feed"
          className="w-full h-full object-cover"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        <button
          variant="outline"
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Feed
        </button>
        <button
          variant="outline"
          onClick={handleFullscreen}
          className="flex items-center gap-2"
        >
          <Maximize2 className="w-4 h-4" />
          Fullscreen
        </button>
      </div>
    </div>
  );
}