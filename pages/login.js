import Head from "next/head"
import Link from "next/link"
import Router from "next/router"
import { useState } from "react"

import ajax from "../utils/ajax"
import Input from "../components/Input"
import styles from "../styles/Form.module.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const [password, setPassword] = useState("")
  
  const login = async (event) => {
    event.preventDefault()
    
    const res = await ajax.post(`/login`, null, { email, password })    
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
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.boxContainer}>
          <h1>Welcome Back</h1>
          <form onSubmit={login}>
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
            <button>Login</button>
          </form>
          <div className={styles.link}>
            Do not have an account? <Link href="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </>
  )
}
