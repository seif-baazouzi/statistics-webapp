export function getCurrentDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth().length == 2 ? date.getMonth() : "0" + date.getMonth()
  const day = date.getDate().length == 2 ? date.getDate() : "0" + date.getDate()

  return `${year}-${month}-${day}`
}
