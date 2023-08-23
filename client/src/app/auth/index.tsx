import styles from './auth.module.css';

export function Login() {
  return <div className={styles.auth}>
    <input className={styles.userInput} placeholder='Username'>
    </input>
    <button className={styles.userSubmit}>Enter</button>
  </div>
}