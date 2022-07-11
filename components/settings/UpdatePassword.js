import { useState } from "react"
import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Input from "@/components/Input"

export default function UpdatePassword() {
  const router = useRouter()
  
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [errors, setErrors] = useState({})

  const updatePasswordHandler = async (event) => {
    event?.preventDefault()

    const res = await ajax.patch("/settings/update/password", null, { newPassword, password })

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    if(res.message === "success") {
      setPassword("")
      setNewPassword("")
      setErrors({})
    } else {
      setErrors(res)
    }
  }
  
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Update your password</h3>
      <form onSubmit={updatePasswordHandler}>
        <Input
          type="text"
          label="NewEmail"
          error={errors.password}
          value={password}
          setValue={setPassword}
        />
        <Input
          type="password"
          label="NewPassword"
          error={errors.newPassword}
          value={newPassword}
          setValue={setNewPassword}
        />
        <button>Update Password</button>
      </form>
    </div>
  )
}
