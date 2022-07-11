import Page from "@/components/Page"

import UpdateName from "@/components/settings/UpdateName"
import UpdateEmail from "@/components/settings/UpdateEmail"
import UpdatePassword from "@/components/settings/UpdatePassword"

import styles from "@/styles/Settings.module.css"

export default function Settings() {
  return (
    <>
      <Page title="Statistics - Settings">
        <div className={styles.container}>
          <UpdateName />
          <div className={styles.spacer}></div>
          <UpdateEmail />
          <div className={styles.spacer}></div>
          <UpdatePassword />
        </div>
      </Page>
    </>
  )
}
