import { useState } from "react"
import CollectionIcon from "@heroicons/react/outline/CollectionIcon"

import { apiServer } from "@/config/index"
import { parseCookies } from "@/utils/cookies"

import Page from "@/components/Page"
import Collections from "@/components/collections/"
import AddPopup from "@/components/collections/add"

export default function Home({ collectionsList }) {
  const [collections, setCollections] = useState(collectionsList)

  const [showAddPopup, setShowAddPopup] = useState(false)

  return (
    <>
      <Page title="Statistics - Collections List">
        {
          collections.length ?
            <Collections
              collections={collections}
              setCollections={setCollections}
            />
            :
            <div className="message-container">
              <CollectionIcon />
              <h3>There is not collections yet!</h3>
              <button onClick={() => setShowAddPopup(true)}>Add a new collection</button>
            </div>
        }
      </Page>

      {showAddPopup &&
        <AddPopup
        setShowPopup={setShowAddPopup}
        setCollections={setCollections}
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
