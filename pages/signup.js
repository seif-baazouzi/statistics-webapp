import Head from "next/head"
import Link from "next/link"
import Router from "next/router"
import { useState } from "react"

import ajax from "../utils/ajax"
import Input from "../components/Input"
import styles from "../styles/Form.module.css"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const [password, setPassword] = useState("")
  
  const signup = async (event) => {
    event.preventDefault()
    
    const res = await ajax.post(`/signup`, null, { name, email, password })    
    if(res.token) {
      document.cookie = "token=" + res.token
      Router.push('/')
    } else {
      setErrors(res)
    }   
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.boxContainer}>
          <h1>Welcome Back</h1>
          <form onSubmit={signup}>
          <Input
              type="text"
              label="Full name"
              error={errors.name}
              state={[name, setName]}
            />
            <Input
              type="text"
              label="E-mail"
              error={errors.email}
              state={[email, setEmail]}
            />
            <Input
              type="password"
              label="Password"
              error={errors.password}
              state={[password, setPassword]}
            />
            <button>Signup</button>
          </form>
          <div className={styles.link}>
            Have an account? <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  )
}
