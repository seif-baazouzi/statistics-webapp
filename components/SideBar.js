import Link from "next/link"
import { useRouter } from "next/router"

import LogoutIcon from "@heroicons/react/outline/LogoutIcon"
import ChartPieIcon from "@heroicons/react/outline/ChartPieIcon"
import CollectionIcon from "@heroicons/react/outline/CollectionIcon"
import ViewListIcon from "@heroicons/react/outline/ViewListIcon"
import CogIcon from "@heroicons/react/outline/CogIcon"

import { clearCookies } from "../utils/cookies"
import styles from "../styles/SideBar.module.css"

function SideBar() {
  const router = useRouter()

  const logout = () => {
    clearCookies()
    router.push("/login")
  }

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
      <Link href="/settings">
        <CogIcon className={router.pathname === "/settings" ? styles.active : ""} />
      </Link>
      <LogoutIcon onClick={logout} />
    </div>
  )
}

export default SideBar
