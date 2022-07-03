import styles from "../styles/Input.module.css"

export default function Input({ label, type, error, value, setValue }) {  
  return (
    <div className={styles.inputBox}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <span>{error}</span>
    </div>
  )
}
