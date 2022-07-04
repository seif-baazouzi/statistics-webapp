import { useState } from "react"
import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Input from "@/components/Input"
import Popup from "@/components/Popup"


export default function AddPopup({ setShowPopup, setLogs, collectionID }) {
  const router = useRouter()

  const [label, setLabel] = useState("")
  const [value, setValue] = useState(0)
  const [errors, setErrors] = useState({})

  const addLogHandler = async (event) => {
    event?.preventDefault()

    const res = await ajax.post(`/logs/${collectionID}`, null, { label, value })

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    if(res.message === "success") {
      setLogs(list => {
        return [
          ...list,
          { logID: res.logID, label, value }
        ]
      })

      setShowPopup(false)
    } else {
      setErrors(res)
    }
  }

  return (
    <Popup setShow={setShowPopup}>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Add a new log</h3>
      <form onSubmit={addLogHandler}>
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
