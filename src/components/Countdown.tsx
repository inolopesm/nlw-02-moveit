import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

const ONE_MINUTE_IN_SECONDS = 60
const ONE_SECOND = 1
const ONE_SECOND_IN_MILLISECONDS = 1000

export default function Countdown () {
  const [time, setTime] = useState(25 * ONE_MINUTE_IN_SECONDS)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => setTime(time - ONE_SECOND), ONE_SECOND_IN_MILLISECONDS)
    }
  }, [active, time])

  const minutes = Math.floor(time / ONE_MINUTE_IN_SECONDS)
  const seconds = time % ONE_MINUTE_IN_SECONDS

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  const startCountdown = () => setActive(true)

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
      <button className={styles.countdownButton} onClick={startCountdown}>
        Iniciar um ciclo
      </button>
    </div>
  )
}