import Link from "next/link"
import { useRouter } from "next/router"

import LogoutIcon from "@heroicons/react/outline/LogoutIcon"
import ChartPieIcon from "@heroicons/react/outline/ChartPieIcon"
import CollectionIcon from "@heroicons/react/outline/CollectionIcon"
import ViewListIcon from "@heroicons/react/outline/ViewListIcon"

import styles from "../styles/SideBar.module.css"

function SideBar() {
  const router = useRouter()

  return (
    <div className={styles.sideBar}>
      <Link href="/">
        <CollectionIcon className={router.pathname === "/" ? styles.active : ""} />
      </Link>
      <Link href="/logs">
        <ViewListIcon className={router.pathname === "/logs" ? styles.active : ""} />
      </Link>
      <Link href="/statistics">
        <ChartPieIcon className={router.pathname === "/statistics" ? styles.active : ""} />
      </Link>
      <div className={styles.separator}></div>
      <LogoutIcon />
    </div>
  )
}

export default SideBar
