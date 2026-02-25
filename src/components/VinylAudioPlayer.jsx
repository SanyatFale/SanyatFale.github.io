import React, { useState, useRef, useEffect } from 'react';

export default function VinylAudioPlayer({
  audioSrc,
  thumbnail = '/images/default-album.jpg',
  autoplay = true,
  title = "Background Music",
  artist = "Unknown Artist"
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // On mobile: starts expanded, collapses to mini after 3s; user can tap to re-expand
  const [isExpanded, setIsExpanded] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    setIsMobile(mobile);
    if (mobile) {
      const timer = setTimeout(() => setIsExpanded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setDuration(audio.duration);
      if (autoplay) {
        const playAudio = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (error) {
            setIsPlaying(false);
          }
        };
        setTimeout(playAudio, 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => { setIsPlaying(false); setIsLoaded(false); };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.load();

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [autoplay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = isMuted;
  }, [isMuted]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;
    try {
      if (isPlaying) { audio.pause(); } else { await audio.play(); }
    } catch (error) {}
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio) { audio.volume = newVolume; setVolume(newVolume); }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!audioSrc) return null;

  const statusColor = !isLoaded ? 'bg-yellow-500 animate-pulse'
    : isPlaying ? 'bg-green-500 animate-pulse'
    : 'bg-gray-400';

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" style={{ display: 'none' }} />

      <div className="fixed top-20 right-6 z-40">

        {/* ── Collapsed mini-button (mobile, after 3s) ── */}
        {isMobile && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="relative w-10 h-10 rounded-full bg-gray-900/90 border border-purple-900/40 flex items-center justify-center text-purple-400 hover:border-purple-500 transition-colors"
            title="Open player"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <span className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full ${statusColor}`} />
          </button>
        )}

        {/* ── Full vinyl player ── */}
        {(!isMobile || isExpanded) && (
          <div
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
          >
            {/* Collapse button (mobile only) */}
            {isMobile && (
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-2 -left-2 z-10 w-5 h-5 rounded-full bg-gray-900 border border-purple-900/40 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors"
                title="Minimise"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}

            {/* Vinyl disc */}
            <div className="relative">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl border-4 border-gray-700 transition-transform duration-300 ${
                  isPlaying ? 'animate-spin' : ''
                } ${isHovered ? 'scale-110' : ''}`}
                style={{
                  animationDuration: isPlaying ? '3s' : '0s',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite'
                }}
              >
                <div className="absolute inset-2 rounded-full border border-gray-600 opacity-30" />
                <div className="absolute inset-4 rounded-full border border-gray-600 opacity-20" />
                <div className="absolute inset-6 rounded-full border border-gray-600 opacity-10" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-800">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMjQgMjhDMjYuMjA5MSAyOCAyOCAyNi4yMDkxIDI4IDI0QzI4IDIxLjc5MDkgMjYuMjA5MSAyMCAyNCAyMEMyMS43OTA5IDIwIDIwIDIxLjc5MDkgMjAgMjRDMjAgMjYuMjA5MSAyMS43OTA5IDI4IDI0IDI4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rounded-full border border-gray-600" />
              </div>

              {/* Tonearm */}
              <div
                className={`absolute -top-2 -right-2 w-8 h-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full origin-left transition-transform duration-500 ${
                  isPlaying ? 'rotate-12' : 'rotate-0'
                }`}
                style={{ transformOrigin: '10% 50%' }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full" />
              </div>

              {/* Status dot */}
              <div className="absolute -bottom-1 -right-1">
                <div className={`w-3 h-3 rounded-full ${statusColor}`} />
              </div>
            </div>

            {/* Controls panel — hover on desktop; always visible when expanded on mobile */}
            <div className={`absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-sm border border-purple-900/40 transition-all duration-300 ${
              isMobile
                ? 'opacity-100 visible translate-y-0'
                : isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
            }`}>
              <div className="p-4 space-y-3 min-w-[200px]">
                <div className="text-center">
                  <div className="text-xs font-mono text-gray-300 truncate">{title}</div>
                  <div className="text-xs font-mono text-gray-600 truncate">{artist}</div>
                </div>

                {duration > 0 && (
                  <div className="space-y-1">
                    <div className="w-full bg-gray-900 h-px">
                      <div
                        className="bg-purple-500 h-px transition-all duration-300"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-mono text-gray-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={togglePlayPause}
                    disabled={!isLoaded}
                    className={`p-2 transition-colors text-gray-400 hover:text-purple-400 ${!isLoaded ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    disabled={!isLoaded}
                    className={`p-2 transition-colors text-gray-400 hover:text-purple-400 ${!isLoaded ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3z"/>
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    disabled={!isLoaded}
                    className="flex-1 appearance-none cursor-pointer accent-purple-500 disabled:opacity-30"
                    style={{ height: '1px', background: '#1f1f2e' }}
                  />
                  <span className="text-xs font-mono text-gray-600 w-8 text-right">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
