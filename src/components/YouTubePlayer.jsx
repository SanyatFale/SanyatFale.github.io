import React from 'react';

export default function YouTubePlayer({ videoId, width = "100%", height = "390", ...props }) {
  return (
    <div className="youtube-container my-6 rounded-lg overflow-hidden shadow-lg">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full"
        {...props}
      />
    </div>
  );
}

