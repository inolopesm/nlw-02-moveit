import { useChallenges } from '../contexts/ChallengesContext'
import { useCountdown } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox () {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenges()
  const { resetCountdown } = useCountdown()

  const handleChallengeSucceeded = () => {
    completeChallenge()
    resetCountdown()
  }

  const handleChallengeFailed = () => {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {
        activeChallenge
          ? (
            <div className={styles.challengeActive}>
              <header>Ganhe {activeChallenge.amount} xp</header>
              <main>
                <img src={`icons/${activeChallenge.type}.svg`} />
                <strong>Novo desafio</strong>
                <p>{activeChallenge.description}</p>
              </main>
              <footer>
                <button className={styles.challengeFailedButton} onClick={handleChallengeFailed}>
                  Falhei
                </button>
                <button className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>
                  Completei
                </button>
              </footer>
            </div>
          )
          : (
            <div className={styles.challengeNotActive}>
              <strong>Finalize um ciclo para receber um desafio</strong>
              <p>
                <img src="icons/level-up.svg" alt="Level Up" />
                Avance de level completando desafios
              </p>
            </div>
          )
      }
    </div>
  )
}