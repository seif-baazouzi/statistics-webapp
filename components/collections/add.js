import { useState } from "react"
import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Input from "@/components/Input"
import Popup from "@/components/Popup"


export default function AddPopup({ setShowPopup, setCollections }) {
  const router = useRouter()

  const [collectionName, setCollectionName] = useState("")
  const [errors, setErrors] = useState({})

  const addCollectionHandler = async (event) => {
    event?.preventDefault()

    const res = await ajax.post("/collections", null, { collectionName })

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    if(res.message === "success") {
      setCollections(list => {
        return [
          ...list,
          { collectionID: res.collectionID, collectionName: collectionName }
        ]
      })

      setShowPopup(false)
    } else {
      setErrors(res)
    }
  }

  return (
    <Popup setShow={setShowPopup}>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Add a new collection</h3>
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
