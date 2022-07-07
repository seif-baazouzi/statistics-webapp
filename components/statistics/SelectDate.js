import styles from "@/styles/SelectDate.module.css"

export default function SelectDate({ dateState, statisticsTypeState }) {
  const [date, setDate] = dateState
  const [statisticsType, setStatisticsType] = statisticsTypeState
  
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <p
          onClick={() => setStatisticsType("weekly")}
          className={statisticsType === "weekly" ? styles.active : ""}
          >Week
        </p>
        <p
          onClick={() => setStatisticsType("monthly")}
          className={statisticsType === "monthly" ? styles.active : ""}
          >Month
        </p>
        <p
          onClick={() => setStatisticsType("yearly")}
          className={statisticsType === "yearly" ? styles.active : ""}
          >Year
        </p>
      </div>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    </div>
  )
}
