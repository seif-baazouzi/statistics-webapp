import Head from "next/head"

import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"

import styles from "../styles/Page.module.css"

function Page({ children, title }) {
  return (
    <>
      <Head>
        <title>{ title || "Statistics" }</title>
      </Head>
      <NavBar />
      <div className={styles.pageContainer}>
        <SideBar />
        <div className={styles.content}>{children}</div>
      </div>
    </>
  )
}

export default Page
