"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from "@/components/Navbar"
import { 
  handleVote, 
  handleSuggestion, 
  getVoteCount, 
  getSuggestions 
} from '@/server/VoteHelper'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { ClientIpPayload } from '@/lib/types'

const MAX_CHARACTERS = 100

const App: React.FC = () => {
  const message = "I'm building a platform to bring you the latest in tech, from product reviews & robotics to programming, mobile dev, and more! Stay tuned!";
  const [voteCount, setVoteCount] = useState<number>(0)
  const [hasVoted, setHasVoted] = useState<boolean>(false)
  const [suggestionText, setSuggestionText] = useState<string>('')
  const [suggestionMessage, setSuggestionMessage] = useState<string>('')
  const [clientIp, setClientIp] = useState<ClientIpPayload>({ ipv4: null, ipv6: null })

  // Robust IP detection
  const fetchClientIp = async (): Promise<ClientIpPayload> => {
    try {
      // Attempt to fetch from public APIs
      const [ipv4Response, ipv6Response] = await Promise.allSettled([
        fetch('https://api.ipify.org?format=json'),
        fetch('https://api6.ipify.org?format=json')
      ]);

      let ipv4 = null;
      let ipv6 = null;

      if (ipv4Response.status === 'fulfilled') {
        try {
          const data = await ipv4Response.value.json();
          ipv4 = data.ip;
        } catch {}
      }

      if (ipv6Response.status === 'fulfilled') {
        try {
          const data = await ipv6Response.value.json();
          ipv6 = data.ip;
        } catch {}
      }

      // Fallback to Cloudflare headers if available
      if (!ipv4 && typeof window !== 'undefined') {
        ipv4 = (window as any).cf?.ip || null;
      }

      return { ipv4, ipv6 };
    } catch (error) {
      console.error('IP retrieval error:', error);
      return { ipv4: null, ipv6: null };
    }
  }

  useEffect(() => {
    const initializeIp = async () => {
      const detectedIp = await fetchClientIp();
      setClientIp(detectedIp);
    };
    initializeIp();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    if (inputText.length <= MAX_CHARACTERS) {
      setSuggestionText(inputText)
    }
  }

  const handleVoteSubmit = async () => {
    if (!hasVoted) {
      const result = await handleVote(clientIp);
      if (result.success) {
        setVoteCount(result.count ?? 0)
        setHasVoted(true)
        setSuggestionMessage(result.message ?? '')
      } else {
        setSuggestionMessage(result.message ?? 'Vote failed')
      }
    }
  }

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate suggestion before submission
    if (suggestionText.trim().length < 10) {
      setSuggestionMessage("Suggestion must be at least 10 characters long");
      return;
    }

    const result = await handleSuggestion({
      text: suggestionText,
      clientIp: clientIp
    });

    if (result.success) {
      setSuggestionMessage(result.message ?? '')
      setSuggestionText('')
    } else {
      setSuggestionMessage(result.message ?? 'Suggestion submission failed')
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const voteResult = await getVoteCount();
        if (voteResult.success) {
          setVoteCount(voteResult.count ?? 0)
        }
        
        // Optionally fetch suggestions if needed
        const suggestionsResult = await getSuggestions();
        // Handle suggestions if required
      } catch (error) {
        console.error('Initial data fetch error:', error);
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
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
          <span
            className="text-4xl md:text-5xl font-bold mb-8 top-6"
          >
            Coming Soon
          </span>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              fontSize: '0.875rem', // text-sm
              color: 'rgb(209 213 219)', // text-gray-300
              maxWidth: '36rem',
              margin: '1rem 0 0 0', // Added 1rem top margin
              lineHeight: '1.625',
            }}
          >
            <span className='mt-4'>
              {message}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{
              marginTop: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleVoteSubmit}
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