import { useState } from "react"
import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Input from "@/components/Input"

export default function UpdateEmail() {
  const router = useRouter()
  
  const [newEmail, setNewEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const updateEmailHandler = async (event) => {
    event?.preventDefault()

    const res = await ajax.patch("/settings/update/email", null, { newEmail, password })

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    if(res.message === "success") {
      setNewEmail("")
      setPassword("")
      setErrors({})
      document.cookie = "token=" + res.token
    } else {
      setErrors(res)
    }
  }
  
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Update your email</h3>
      <form onSubmit={updateEmailHandler}>
        <Input
          type="text"
          label="NewEmail"
          error={errors.newEmail}
          value={newEmail}
          setValue={setNewEmail}
        />
        <Input
          type="password"
          label="Password"
          error={errors.password}
          value={password}
          setValue={setPassword}
        />
        <button>Update Email</button>
      </form>
    </div>
  )
}
