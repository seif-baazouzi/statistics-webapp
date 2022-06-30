import styles from "../styles/NavBar.module.css"

function NavBar() {
  return (
    <nav className={styles.nav}>
      <img src="/logo.svg" style={{ width: "1rem" }} />
    </nav>
  )
}

export default NavBar
