import React, { createContext, useContext, useEffect, useState } from 'react'
import { useChallenges } from './ChallengesContext'

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

const CountdownContext = createContext({} as CountdownContextData)

export const useCountdown = () => useContext(CountdownContext)

const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND

let countdownTimeout: NodeJS.Timeout

const defaultTime = 0.1 * ONE_MINUTE

export const CountdownProvider: React.FC = ({ children }) => {
  const { startNewChallenge } = useChallenges()

  const [time, setTime] = useState(defaultTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => setTime(time - ONE_SECOND), ONE_SECOND)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  const minutes = Math.floor(time / ONE_MINUTE)
  const seconds = (time % ONE_MINUTE) / ONE_SECOND

  const startCountdown = () => {
    setIsActive(true)
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(defaultTime)
    setHasFinished(false)
  }

  const value = {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  }

  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  )
}