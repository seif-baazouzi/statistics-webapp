import { useState } from "react"

import AddPopup from "./add"
import EditPopup from "./edit"
import DeletePopup from "./delete"

import styles from "@/styles/Logs.module.css"

function Logs({ logs, setLogs, collectionID }) {
  const [logID, setLogID] = useState(0)
  const [label, setLabel] = useState("")
  const [value, setValue] = useState(0)

  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  const showEditPopupHandler = (log) => {
    setLogID(log.logID)
    setLabel(log.label)
    setValue(log.value)
    setShowEditPopup(true)
  }

  const showDeletePopupHandler = (log) => {
    setLogID(log.logID)
    setShowDeletePopup(true)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.listHeader}>
          <h4>logs List</h4>
          <button onClick={() => setShowAddPopup(true)}>Add new log</button>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Label</th>
                <th>Value</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => {
                return (
                  <tr key={log.logID}>
                    <td>{log.logID}</td>
                    <td>{log.label}</td>
                    <td>{log.value}</td>
                    <td>{new Date(log.logDate).toDateString()}</td>
                    <td><p className={`${styles.btn} ${styles.edit}`} onClick={() => showEditPopupHandler(log)}>edit</p></td>
                    <td><p className={`${styles.btn} ${styles.delete}`} onClick={() => showDeletePopupHandler(log)}>delete</p></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
        
      {showAddPopup &&
        <AddPopup
          setShowPopup={setShowAddPopup}
          setLogs={setLogs}
          collectionID={collectionID}
        />
      }

      {showEditPopup &&
        <EditPopup
          setShowPopup={setShowEditPopup}
          setLogs={setLogs}
          log={{ logID, label, value }}
          collectionID={collectionID}
        />
      }

      {showDeletePopup &&
        <DeletePopup
          setShowPopup={setShowDeletePopup}
          setLogs={setLogs}
          logID={logID}
          collectionID={collectionID}
        />
      }
    </>
  )
}

export default Logs
