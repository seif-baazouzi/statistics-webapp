import { useState } from "react"
import { useRouter } from "next/router"

import ajax from "@/utils/ajax"
import Input from "@/components/Input"

export default function UpdateName() {
  const router = useRouter()
  
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const updateNameHandler = async (event) => {
    event?.preventDefault()

    const res = await ajax.patch("/settings/update/name", null, { name, password })

    if(res.message === "invalid-token") {
      return router.push("/login")
    }

    if(res.message === "success") {
      setName("")
      setPassword("")
      setErrors({})
    } else {
      setErrors(res)
    }
  }
  
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Update your name</h3>
      <form onSubmit={updateNameHandler}>
        <Input
          type="text"
          label="Name"
          error={errors.name}
          value={name}
          setValue={setName}
        />
        <Input
          type="password"
          label="Password"
          error={errors.password}
          value={password}
          setValue={setPassword}
        />
        <button>Update Name</button>
      </form>
    </div>
  )
}
