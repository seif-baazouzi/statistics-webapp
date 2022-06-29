import { apiServer } from "../config"

const get = async (path, headers={}) => {
  const res = await fetch(apiServer + path, { headers })
  return await res.json()
}

const sample = async (path, headers, body, method) => {
  const res = await fetch(apiServer + path, {
    headers: { "Content-Type": "application/json", ...headers },
    method: method,
    body: JSON.stringify(body)
  })
  return await res.json()
}

const put  = (path, headers={}, body={}) => sample(path, headers, body, "PUT")
const post = (path, headers={}, body={}) => sample(path, headers, body, "POST")
const del  = (path, headers={}, body={}) => sample(path, headers, body, "DELETE")

export default { get, post, put, del }
