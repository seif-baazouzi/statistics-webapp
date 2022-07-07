import styles from "@/styles/Collections.module.css"

export default function SelectCollection({ collectionsList, setSelectedCollection }) {
  return (
    <div className={styles.selectCollection}> 
      <p className={styles.title}>Collections List</p>  
      <select onChange={(e) => setSelectedCollection(e.target.value)}>
        {collectionsList.map(collection => (
          <option
            key={collection.collectionID}
            value={collection.collectionID}
            >{collection.collectionName}
          </option>
        ))}
      </select>
    </div>
  )
}
