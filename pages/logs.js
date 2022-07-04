import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ViewListIcon from "@heroicons/react/outline/ViewListIcon"

import Page from "@/components/Page"
import SelectCollection from "@/components/collections/select"
import Logs from "@/components/logs"
import AddPopup from "@/components/logs/add"

import ajax from "@/utils/ajax"
import { apiServer } from "@/config/index"
import { parseCookies } from "@/utils/cookies"

export default function LogsPage({ collectionsList }) {
  const router = useRouter()

  const [showAddPopup, setShowAddPopup] = useState(false)

  const [logs, setLogs] = useState([])
  const [selectedCollection, setSelectedCollection] = useState(collectionsList[0]?.collectionID)

  useEffect(() => {
    (async () => {
      if(!selectedCollection) return

      const res = await ajax.get(`/logs/${selectedCollection}`)
      
      if(res.message === "invalid-token") {
        router.push("/login")
      } else {
        console.log(res);
        setLogs(res.logs)
      }
    })()
  }, [ selectedCollection ])

  const showPageContent = () => {
    if(collectionsList.length === 0) {
      return (
        <div className="message-container">
          <ViewListIcon />
          <h3>There is not collections yet!</h3>
        </div>
      )
    }

    if(logs.length === 0) {
      return (
        <>
          <SelectCollection
            collectionsList={collectionsList}
            setSelectedCollection={setSelectedCollection}
          />
          <div className="message-container">
            <ViewListIcon />
            <h3>There is not logs yet!</h3>
            <button onClick={() => setShowAddPopup(true)}>Add a new log</button>
          </div>
        </>
      )
    }

    return (
      <>
        <SelectCollection
          collectionsList={collectionsList}
          setSelectedCollection={setSelectedCollection}
        />
        <Logs
          logs={logs}
          setLogs={setLogs}
          collectionID={selectedCollection}
        />
      </>
    )
  }

  return (
    <>
      <Page title="Statistics - Logs List">
        {showPageContent()}
      </Page>

      {showAddPopup &&
        <AddPopup
        setLogs={setLogs}
        setShowPopup={setShowAddPopup}
        collectionID={selectedCollection}
        />
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context.req.headers.cookie)
  
  if(!cookies.token) {
    return {
      redirect: { permanent: false, destination: "/login" }
    }
  }

  const req = await fetch(`${apiServer}/collections`, {
    headers: {
      "X-Auth-Token": cookies.token
    }
  })
  const res = await req.json()

  if(res.message === "invalid-token") {
    return {
      redirect: { permanent: false, destination: "/login" }
    }
  }

  return {
    props: { collectionsList: res.collections }
  }
}
