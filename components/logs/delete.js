import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Popup from "@/components/Popup"

export default function DeletePopup({ setShowPopup, setLogs, logID, collectionID }) {
  const router = useRouter()

  const deleteHandler = async () => {
    const res = await ajax.del(`/logs/${collectionID}/${logID}`)

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    setLogs(list => {
      return list.filter(item =>  item.logID !== logID)
    })

    setShowPopup(false)
  }

  return (
    <Popup setShow={setShowPopup}>
      <h3>Are you sure you want to delete this!</h3>
      <div className="buttons-row">
        <button className="gray" onClick={() => setShowPopup(false)}>Cancel</button>
        <button className="red" onClick={deleteHandler}>Delete</button>
      </div>
    </Popup>
  )
}
