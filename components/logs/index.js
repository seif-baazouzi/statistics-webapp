import { useState } from "react"

import TrashIcon from "@heroicons/react/outline/TrashIcon"
import PencilIcon from "@heroicons/react/outline/PencilIcon"

import AddPopup from "./add"
import EditPopup from "./edit"
import DeletePopup from "./delete"

import styles from "@/styles/Collections.module.css"

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
      <div className={styles.collectionsContainer}>
        <div className={styles.listHeader}>
          <h4>logs List</h4>
          <button onClick={() => setShowAddPopup(true)}>Add new log</button>
        </div>
        <ul className={styles.logsList}>
          {logs.map(log => {
            return (
              <li key={log.logID} className={styles.collectionItem}>
                <p>{`${log.label} => ${log.value}`}</p>
                <div className={styles.icons}>
                  <PencilIcon onClick={() => showEditPopupHandler(log)} />
                  <TrashIcon onClick={() => showDeletePopupHandler(log)} />
                </div>
              </li>
            )
          })}
        </ul>
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
