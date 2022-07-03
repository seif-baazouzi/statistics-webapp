import { apiServer } from "../config"
import { parseCookies } from "../utils/cookies"

const getApiToken = () => {
  const cookies = parseCookies(document.cookie)
  return cookies.token
}

const get = async (path, headers={}) => {
  const res = await fetch(apiServer + path, {
    headers: {
      ...headers,
      "X-Auth-Token": getApiToken()
    }
  })

  return await res.json()
}

const sample = async (path, headers, body, method) => {
  const res = await fetch(apiServer + path, {
    headers: { 
      "Content-Type": "application/json",
      ...headers,
      "X-Auth-Token": getApiToken()
    },
    method: method,
    body: JSON.stringify(body)
  })
  return await res.json()
}

const put  = (path, headers={}, body={}) => sample(path, headers, body, "PUT")
const post = (path, headers={}, body={}) => sample(path, headers, body, "POST")
const del  = (path, headers={}, body={}) => sample(path, headers, body, "DELETE")

export default { get, post, put, del }
