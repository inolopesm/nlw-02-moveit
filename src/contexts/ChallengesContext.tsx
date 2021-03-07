import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  levelUp: () => void
  currentExperience: number
  challengesCompleted: number
  activeChallenge: Challenge
  startNewChallenge: () => void
  resetChallenge: () => void
  experienceToNextLevel: number
  completeChallenge: () => void
}

const ChallengesContext = createContext({} as ChallengesContextData)

export const useChallenges = () => useContext(ChallengesContext)

export const ChallengesContextProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  const levelUp = () => {
    setLevel(level + 1)
  }

  const startNewChallenge = () => {
    const randmomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randmomChallengeIndex] as Challenge
    setActiveChallenge(challenge)
    new Audio('/notification.mp3').play()
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  const resetChallenge = () => {
    setActiveChallenge(null)
  }

  const completeChallenge = () => {
    if (!activeChallenge) return
    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  const value = {
    level,
    levelUp,
    currentExperience,
    challengesCompleted,
    startNewChallenge,
    activeChallenge,
    resetChallenge,
    experienceToNextLevel,
    completeChallenge
  }

  return (
    <ChallengesContext.Provider value={value}>
      {children}
    </ChallengesContext.Provider>
  )
}

