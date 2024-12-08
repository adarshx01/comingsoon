"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from "@/components/Navbar"
import { vote, submitSuggestion, getSuggestions, getVoteCount } from '@/server/VoteHelper'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { SparklesCore } from '@/components/ui/sparkles'

const MAX_CHARACTERS = 100

const App: React.FC = () => {
  const [voteCount, setVoteCount] = useState<number>(0)
  const [hasVoted, setHasVoted] = useState<boolean>(false)
  // const [voteMessage, setVoteMessage] = useState<string>('')
  const [suggestionText, setSuggestionText] = useState<string>('')
  const [suggestionMessage, setSuggestionMessage] = useState<string>('')
  // const [suggestions, setSuggestions] = useState<any[]>([]) // Uncommented this line

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    if (inputText.length <= MAX_CHARACTERS) {
      setSuggestionText(inputText)
    }
  }

  const handleVote = async () => {
    if (!hasVoted) {
      const result = await vote()
      if (result.success) {
        setVoteCount(result.count ?? 0)
        setHasVoted(true)
        // setVoteMessage(result.message?? '')
      } else {
        // setVoteMessage(result.message?? '')
      }
    }
  }

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitSuggestion(suggestionText)
    if (result.success) {
      setSuggestionMessage(result.message?? '')
      setSuggestionText('')
      if (result.suggestions) {
        // setSuggestions(result.suggestions?? '')
      }
    } else {
      setSuggestionMessage(result.message ?? '')
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      const voteResult = await getVoteCount()
      if (voteResult.success) {
        setVoteCount(voteResult.count?? 0)
      }
      
      // Uncomment this block to fetch suggestions
      const suggestionsResult = await getSuggestions()
      if (suggestionsResult.success && suggestionsResult.suggestions) {
        // setSuggestions(suggestionsResult.suggestions?? '')
      }
    }
    fetchInitialData()
  }, [])

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <Navbar />

      <div className="fixed inset-0 z-10 pointer-events-none">
        <BackgroundBeams />
      </div>
      <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="h-[20rem] -mb-24 w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
              <h1 className="text-4xl md:text-5xl font-bold text-center text-white relative z-20">
                Coming Soon 
              </h1>
              <div className="w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[40rem] h-40 relative">

                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        
                {/* Core component */}
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
        
                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
              </div>
            </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            Coming Soon
          </motion.h1> */}
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed"
          >
            We&apos;re crafting something extraordinary. Our innovative platform is under development, bringing the future of technology right to your doorstep.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 space-y-8"
          >
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleVote}
                disabled={hasVoted}
                className={`px-6 py-2 text-sm font-medium rounded-full ${
                  hasVoted
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                } transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              >
                {hasVoted ? 'Voted' : 'Vote Your Eager'}
              </button>
              <p className="text-gray-400">
                Eager Votes: <span className="font-bold text-cyan-400">{voteCount}</span>
              </p>
              {hasVoted && (
                <p className="text-sm text-green-400">Thank you for your vote!</p>
              )}
            </div>
          </motion.div>
          <div className="w-full max-w-md mx-auto px-4 sm:px-10 md:px-16 py-6 sm:py-8 md:py-10 rounded-none sm:rounded-xl md:rounded-2xl shadow-input bg-transparent dark:bg-black">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-slate-300 dark:text-neutral-200 mb-4 sm:mb-6">
              Give Us Your Suggestion
            </h2>
            <form onSubmit={handleSuggestionSubmit}>
              <LabelInputContainer>
              <Label 
                htmlFor="limitedInput" 
                className="text-xs font-light sm:text-[0.5rem] md:text-[0.65rem] lg:text-[0.8rem]"
              >
                Enter text (max {MAX_CHARACTERS} chars)
              </Label>
                <Input
                  id="limitedInput"
                  value={suggestionText}
                  onChange={handleInputChange}
                  placeholder="Type here..."
                  className="mb-2 text-sm sm:text-base"
                />
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {suggestionText.length} / {MAX_CHARACTERS} characters
                </p>
                {suggestionMessage && (
                  <p
                    className={`text-xs sm:text-sm ${
                      suggestionMessage.includes("successfully")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {suggestionMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-sm sm:text-base py-2 sm:py-3"
                >
                  Submit
                </Button>
              </LabelInputContainer>
            </form>
          </div>

        </div>
      </div>
    </main>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-[90%] lg:w-full sm:w-full mx-auto", className)}>
      {children}
    </div>
  )
}

export default App