import { createContext, ReactNode, useContext, useState } from 'react'
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
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function useChallenges () {
    return useContext(ChallengesContext)
}

interface ChallengesContextProviderProps {
    children: ReactNode
}

export function ChallengesContextProvider ({ children }: ChallengesContextProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    const levelUp = () => {
        setLevel(level + 1)
    }

    const startNewChallenge = () => {
        const randmomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randmomChallengeIndex] as Challenge
        setActiveChallenge(challenge)
    }

    const resetChallenge = () => {
        setActiveChallenge(null)
    }

    const value = {
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel
    }

    return (
        <ChallengesContext.Provider value={value}>
            {children}
        </ChallengesContext.Provider>
    )
}

