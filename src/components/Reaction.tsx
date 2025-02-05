import React, { useEffect, useRef, useState } from 'react'

export interface ReactionProps {
    imageSource: string;
    audioSource: string;
    message: string;
}

const Reaction = ({ imageSource, audioSource, message }: ReactionProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isGif = imageSource.endsWith('.gif');

    useEffect(() => {
        setIsLoading(true);
        if (audioRef.current) {
            // Preload the audio
            audioRef.current.load();
            
            // Start playing when loaded
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio playback failed:", error);
                });
            }
        }
        
        // Cleanup previous audio when component unmounts or audio changes
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [audioSource]);

    return (
        <div className="text-center bg-white/30 backdrop-blur-sm p-6 rounded-lg w-full max-w-2xl mx-auto
          border border-pink-200/50 shadow-[0_0_15px_rgba(255,182,193,0.3)] hover:shadow-[0_0_20px_rgba(255,182,193,0.5)]
          transition-all duration-300">
            <p className="sparkle text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-red-600
              bg-clip-text text-transparent drop-shadow px-4">
                {message}
            </p>
            <div className="relative w-full flex justify-center">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-pink-50/30 backdrop-blur-sm rounded-lg">
                        <div className="flex flex-col items-center gap-2">
                            <div className="animate-bounce text-4xl">💝</div>
                            <div className="animate-pulse text-pink-600 font-medium">Loading your love...</div>
                        </div>
                    </div>
                )}
                {isGif && (
                    <img
                        src={imageSource.replace('.gif', '-preview.jpg')}
                        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
                        alt="preview"
                    />
                )}
                <img 
                    className="max-h-[300px] md:max-h-[400px] w-auto rounded-lg 
                    shadow-md hover:scale-105 transition-all duration-300 
                    hover:shadow-[0_0_20px_rgba(255,182,193,0.5)]"
                    src={imageSource} 
                    alt={message}
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = "1";
                        setIsLoading(false);
                    }}
                    style={{ 
                        opacity: isLoading ? 0 : 1, 
                        transition: 'opacity 0.3s'
                    }}
                />
            </div>
            <audio 
                ref={audioRef}
                className="mt-4" 
                loop 
                preload="auto"
            >
                <source src={audioSource} type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default Reaction;