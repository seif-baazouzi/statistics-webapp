import { useState } from "react"
import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Input from "@/components/Input"
import Popup from "@/components/Popup"


export default function EditPopup({ setShowPopup, setCollections, collection }) {
  const router = useRouter()

  const [collectionName, setCollectionName] = useState(collection.collectionName)
  const [errors, setErrors] = useState({})

  const addCollectionHandler = async (event) => {
    event?.preventDefault()

    const res = await ajax.put(`/collections/${collection.collectionID}`, null, { collectionName })

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    if(res.message === "success") {
      setCollections(list => {
        return list.map(item => {
          return item.collectionID === collection.collectionID ? { collectionID: collection.collectionID, collectionName } : item
        })
      })

      setShowPopup(false)
    } else {
      setErrors(res)
    }
  }

  return (
    <Popup setShow={setShowPopup}>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Edit collection</h3>
      <form onSubmit={addCollectionHandler}>
        <Input
          type="text"
          label="Collection Name"
          error={errors.collectionName}
          value={collectionName}
          setValue={setCollectionName}
        />
        <button>Submit</button>
      </form>
    </Popup>
  )
}
