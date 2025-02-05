import React from 'react'

export interface ReactionProps {
    imageSource: string;
    audioSource: string;
    message: string;
}

const Reaction = ({ imageSource, audioSource, message }: ReactionProps) => {
    return (
        <div className="text-center bg-white/30 backdrop-blur-sm p-6 rounded-lg w-full max-w-2xl mx-auto
          border border-pink-200/50 shadow-[0_0_15px_rgba(255,182,193,0.3)] hover:shadow-[0_0_20px_rgba(255,182,193,0.5)]
          transition-all duration-300">
            <p className="sparkle text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-red-600
              bg-clip-text text-transparent drop-shadow px-4">
                {message}
            </p>
            <div className="relative w-full flex justify-center">
                <img 
                    className="max-h-[300px] md:max-h-[400px] w-auto rounded-lg 
                    shadow-md hover:scale-105 transition-all duration-300 
                    hover:shadow-[0_0_20px_rgba(255,182,193,0.5)]"
                    src={imageSource} 
                    alt={message}
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = "1";
                    }}
                    style={{ opacity: 0, transition: 'opacity 0.3s' }}
                />
            </div>
            <audio className="mt-4" autoPlay loop src={audioSource}/>
        </div>
    );
};

export default Reaction;