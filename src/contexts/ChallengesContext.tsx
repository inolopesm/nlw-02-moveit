import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

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
  closeLevelUpModal: () => void
}

const ChallengesContext = createContext({} as ChallengesContextData)

export const useChallenges = () => useContext(ChallengesContext)

interface ChallengesContextProvider {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContextProvider: React.FC<ChallengesContextProvider> = (props) => {
  const [level, setLevel] = useState(props.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(props.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)
  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)
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

  const closeLevelUpModal = () => {
    setIsLevelModalOpen(false)
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
    completeChallenge,
    closeLevelUpModal
  }

  return (
    <ChallengesContext.Provider value={value}>
      {props.children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}

