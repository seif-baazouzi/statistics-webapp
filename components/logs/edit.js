import { useState } from "react"
import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Input from "@/components/Input"
import Popup from "@/components/Popup"


export default function EditPopup({ setShowPopup, setLogs, log, collectionID }) {
  const router = useRouter()

  const [label, setLabel] = useState(log.label)
  const [value, setValue] = useState(log.value)
  const [errors, setErrors] = useState({})

  const addCollectionHandler = async (event) => {
    event?.preventDefault()

    const res = await ajax.put(`/logs/${collectionID}/${log.logID}`, null, { label, value })

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    if(res.message === "success") {
      setLogs(list => {
        return list.map(item => {
          return item.logID === log.logID ? { logID: log.logID, label, value } : item
        })
      })

      setShowPopup(false)
    } else {
      setErrors(res)
    }
  }

  return (
    <Popup setShow={setShowPopup}>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Edit log</h3>
      <form onSubmit={addCollectionHandler}>
      <Input
          type="text"
          label="Label"
          error={errors.label}
          value={label}
          setValue={setLabel}
        />
        <Input
          type="text"
          label="Value"
          error={errors.value}
          value={value}
          setValue={setValue}
        />
        <button>Submit</button>
      </form>
    </Popup>
  )
}
