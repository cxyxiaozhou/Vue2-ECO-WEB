const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
export const setInfo = (obj) => {
  // Objects that cannot be directly stored need to be used JSON.stringify
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
export const setHistoryList = (arr) => {
  // json.stringify是序列化方法
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
