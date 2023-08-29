import React from 'react';
import PropTypes from 'prop-types';
import styles from './chat.module.css';

const ChatBox = () => {
  return (
    <>
      <div className={styles.messageNav}>
            <h3>John</h3>
          </div>
          <div className={styles.messages}>
            <div className={styles.messageLeft}>
              <p> Hello !</p>
            </div>
            <div className={styles.messageRight}>
              <p>How are you?</p>
            </div>
          </div>
          <form className={styles.messageForm}>
            <input className={styles.textInput}
              placeholder='Send a message' type='text'></input>
            <button type='submit' className={styles.messageButton}>Send</button>
          </form>
    </>
  )
}

ChatBox.propTypes = {}

export default ChatBox;