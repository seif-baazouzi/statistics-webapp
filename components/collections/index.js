import { useState } from "react"

import TrashIcon from "@heroicons/react/outline/TrashIcon"
import PencilIcon from "@heroicons/react/outline/PencilIcon"

import AddPopup from "./add"
import EditPopup from "./edit"
import DeletePopup from "./delete"

import styles from "@/styles/Collections.module.css"

function Collections({ collections, setCollections }) {
  const [collectionID, setCollectionID] = useState(0)
  const [collectionName, setCollectionName] = useState("")

  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  const showEditPopupHandler = (collection) => {
    setCollectionID(collection.collectionID)
    setCollectionName(collection.collectionName)
    setShowEditPopup(true)
  }

  const showDeletePopupHandler = (collection) => {
    setCollectionID(collection.collectionID)
    setShowDeletePopup(true)
  }

  return (
    <>
      <div className={styles.collectionsContainer}>
        <div className={styles.listHeader}>
          <h4>Collections List</h4>
          <button onClick={() => setShowAddPopup(true)}>Add new collection</button>
        </div>
        <ul className={styles.collectionsList}>
          {collections.map(c => {
            return (
              <li key={c.collectionID} className={styles.collectionItem}>
                <p>{c.collectionName}</p>
                <div className={styles.icons}>
                  <PencilIcon onClick={() => showEditPopupHandler(c)} />
                  <TrashIcon onClick={() => showDeletePopupHandler(c)} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
        
      {showAddPopup &&
        <AddPopup
          setShowPopup={setShowAddPopup}
          setCollections={setCollections}
        />
      }

      {showEditPopup &&
        <EditPopup
          setShowPopup={setShowEditPopup}
          setCollections={setCollections}
          collection={{ collectionID, collectionName }}
        />
      }

      {showDeletePopup &&
        <DeletePopup
          setShowPopup={setShowDeletePopup}
          setCollections={setCollections}
          collectionID={collectionID}
        />
      }
    </>
  )
}

export default Collections
