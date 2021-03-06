import { useState, useEffect } from 'react'
import { useChallenges } from '../contexts/ChallengesContext'
import styles from '../styles/components/Countdown.module.css'

const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND

let countdownTimeout: NodeJS.Timeout
const defaultTime = 0.1 * ONE_MINUTE

export default function Countdown () {
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

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  const startCountdown = () => setIsActive(true)
  const resetCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(defaultTime)
  }

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        hasFinished
          ? (
            <button disabled className={styles.countdownButton}>
              Ciclo encerrado
            </button>
          )
          : isActive
              ? (
                <button
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                  onClick={resetCountdown}
                >
                  Abandonar ciclo
                </button>
              )
              : (
                <button className={styles.countdownButton} onClick={startCountdown}>
                  Iniciar um ciclo
                </button>
              )
      }
    </div>
  )
}