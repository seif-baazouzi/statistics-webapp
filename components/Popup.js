import styles from "../styles/Popup.module.css"

function Popup({ children, setShow }) {
  return (
    <div className={styles.container}>
      <div className={styles.close} onClick={() => setShow(false)}>✖</div>
      <div className={styles.box}>{children}</div>
    </div>
  )
}

export default Popup
