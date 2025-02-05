import React from 'react'
import { useRef, useState } from "react"
import Reaction from "./components/Reaction"
import { Button } from "./components/ui/button"
import { yesReactions } from "@/assets/yesReactions"
import ValentineQuestion from '@/assets/be-my-valentine.jpg'
import { noReactions } from "./assets/noReactions"

const App = () => {
  const [yesCount,setYesCount] = useState<number>(-1)
  const [noCount,setNoCount] = useState<number>(-1)
  const [buttonSize,setButtonSize] = useState<number>(0)
  const yesLastClicked = useRef<boolean>(false)
  const currentCount = yesLastClicked.current ? yesCount: noCount
  const currentReactions = yesLastClicked.current ? yesReactions: noReactions

  const toggleYes = () => {
    setYesCount(yesCount+1)
    yesLastClicked.current = true
  }

  const toggleNo = () => {
    setButtonSize(buttonSize + 1)
    setNoCount(noCount+1)
    yesLastClicked.current = false
  }

  // Fun teasing messages based on how many times they tried to say no
  const teasingMessages = [
    "See? The No button was too small anyway 😏",
    "Aww, trying to resist my charm? 😘",
    "Your stubbornness is making me fall for you even more! 🥰",
    "Playing hard to get only makes me try harder! 💝",
    "You're so cute when you pretend not to like me 😌",
    "I can do this all day, my valentine-to-be! 💫",
    "Your resistance only makes my heart grow stronger! 💖",
    "Looks like the No button got shy and ran away... just like your excuses! 🌹",
  ]

  // Check if this is the last no reaction
  const isLastNoReaction = noCount === noReactions.length - 1
  const showTeasingMessage = noCount === noReactions.length
  const teasingIndex = Math.min(noCount - 1, teasingMessages.length - 1)

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-pink-200 p-4 relative overflow-hidden flex items-center justify-center">
        {/* Floating Hearts Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
                opacity: 0.4
              }}
            >
              {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '💖' : '💝'}
            </div>
          ))}
        </div>
        
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-8 py-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 
            bg-clip-text text-transparent animate-pulse px-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
            Will You Be My Valentine???
          </h1>
          
          {noCount + yesCount > -2 && currentReactions.length && currentCount < currentReactions.length ? (
            <Reaction 
              audioSource={currentReactions[currentCount].audioSource} 
              imageSource={currentReactions[currentCount].imageSource} 
              message={currentReactions[currentCount].message} 
            />
          ) : (
            <div className="w-full px-4 flex justify-center">
              <img
                src={ValentineQuestion}
                className="max-h-[300px] md:max-h-[400px] w-auto rounded-lg shadow-lg hover:scale-105 transition-all"
                alt="Valentine Question"
                onLoad={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                style={{ opacity: 0, transition: 'opacity 0.3s' }}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 w-full px-4 justify-center items-center">
            {yesCount !== yesReactions.length ? (
              <div className="relative">
                <Button
                  variant="secondary"
                  style={{
                    width: `${Math.min(200, 100 + buttonSize * 5)}px`, 
                    height: `${Math.min(80, 40 + buttonSize * 2)}px`
                  }} 
                  onClick={() => toggleYes()}
                  className="min-w-[120px] bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 text-white border-none
                    hover:from-pink-500 hover:to-red-500 hover:scale-110 
                    transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,182,193,0.5)]
                    animate-heartbeat"
                >
                  {yesCount === -1 ? '❤️ Yes ❤️': '💝 Continue 💝'}
                </Button>
              </div>
            ) : null}
            {yesCount === -1 && noCount !== noReactions.length ? (
              <Button 
                variant="destructive"
                style={{
                  width: `${Math.max(50, 100 - buttonSize * 5)}px`, 
                  height: `${Math.max(20, 40 - buttonSize * 2)}px`
                }}
                onClick={() => toggleNo()}
                className="hover:scale-90 transition-transform duration-300 relative group"
              >
                <>No</>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-pink-500 opacity-0 
                  group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {noCount > 2 ? "Still trying? 😅" : "Are you sure? 🥺"}
                </span>
              </Button>
            ) : null}
            {showTeasingMessage && yesCount === -1 && (
              <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 
                bg-clip-text text-transparent animate-bounce px-4 text-center">
                {teasingMessages[teasingIndex]}
              </div>
            )}
            {yesCount === yesReactions.length ? 
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 
                bg-clip-text text-transparent animate-pulse px-4 text-center sparkle">
                Thanks for saying yes my love! 💖 Forever starts now 💝
              </div>
            : null}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
