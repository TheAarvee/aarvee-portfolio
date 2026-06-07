"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import vinylImg from "@/app/assets/vinyl.png";
import songCoverImg from "@/app/assets/songCover.jpg";
import spotifyImg from "@/app/assets/spotify.png";
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon } from "@phosphor-icons/react";

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const initWidget = () => {
      const SC = (window as any).SC;
      if (SC && iframeRef.current && !widgetRef.current) {
        const widget = SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        
        widget.bind(SC.Widget.Events.PLAY, () => setIsPlaying(true));
        widget.bind(SC.Widget.Events.PAUSE, () => setIsPlaying(false));
        widget.bind(SC.Widget.Events.FINISH, () => {
          widget.play(); // Loop the track
        });
      }
    };

    if (!(window as any).SC) {
      const script = document.createElement("script");
      script.src = "https://w.soundcloud.com/player/api.js";
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      initWidget();
    }
  }, []);

  const togglePlay = () => {
    if (widgetRef.current) {
      if (isPlaying) {
        widgetRef.current.pause();
      } else {
        widgetRef.current.play();
      }
    }
  };

  return (
    <div className="relative flex items-center h-full">
      {/* Hidden SoundCloud iframe */}
      <iframe
        ref={iframeRef}
        className="hidden"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/kobzx2zz/let-the-world-burn-x-you-broke&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false"
      />

      {/* Vinyl Disc */}
      <div 
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] shrink-0 -ml-[180px] md:-ml-[220px] z-0 animate-[spin_10s_linear_infinite]"
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      >
        <Image
          src={vinylImg}
          alt="Vinyl Disc"
          fill
          className="object-contain"
        />
      </div>

      {/* Player Details */}
      <div className="ml-6 md:ml-8 flex items-center justify-between flex-1 z-10 w-full pr-4 md:pr-8 -mt-6">
        <div className="flex flex-col">
          <div className="relative w-5 h-5 md:w-8 md:h-8 mb-2">
            <Image
              src={spotifyImg}
              alt="Spotify"
              fill
              className="object-contain rotate-10"
            />
          </div>
          <h3 className="text-lg md:text-2xl font-semibold tracking-tight text-black font-[family-name:var(--font-familjen-grotesk)] whitespace-nowrap">
            Let the world burn
          </h3>
          <p className="text-gray-500 mb-3 font-[family-name:var(--font-geist-sans)] text-xs md:text-sm">
            Chris Grey
          </p>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button className="text-black hover:scale-110 transition-transform">
              <RewindIcon size={28} weight="fill" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="text-black hover:scale-110 transition-transform flex items-center justify-center w-8 h-8"
            >
              {isPlaying ? (
                <PauseIcon size={28} weight="fill" />
              ) : (
                <PlayIcon size={28} weight="fill" />
              )}
            </button>
            
            <button className="text-black hover:scale-110 transition-transform">
              <FastForwardIcon size={28} weight="fill" />
            </button>
          </div>
        </div>

        {/* Song Cover Image */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden shadow-lg ml-6 mt-8">
          <Image
            src={songCoverImg}
            alt="Song Cover"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
