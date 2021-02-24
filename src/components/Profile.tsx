import styles from '../styles/components/Profile.module.css'

export default function Profile () {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/inolopesm.png" alt="Matheus Lopes" />
      <div>
        <strong>Matheus Lopes</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  )
}