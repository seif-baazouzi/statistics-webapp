import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Popup from "@/components/Popup"

export default function DeletePopup({ setShowPopup, setCollections, collectionID }) {
  const router = useRouter()

  const deleteHandler = async () => {
    const res = await ajax.del(`/collections/${collectionID}`)

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    setCollections(list => {
      return list.filter(item =>  item.collectionID !== collectionID)
    })

    setShowPopup(false)
  }

  return (
    <Popup setShow={setShowPopup}>
      <h3>Are you sure you want to delete this</h3>
      <div className="buttons-row">
        <button className="gray" onClick={() => setShowPopup(false)}>Cancel</button>
        <button className="red" onClick={deleteHandler}>Delete</button>
      </div>
    </Popup>
  )
}
