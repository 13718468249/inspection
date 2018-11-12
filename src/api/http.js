import Axios from 'axios'
// Axios.defaults.withCredentials = true
// 带域名
export function http (url, data = {}, type = 'post') {
  let config = {
    url: url,
    method: type
  }
  if (type.toLowerCase() === 'get') {
    config.params = data
  } else {
    config.data = data
    // config.headers = {
    //   'content-Type': 'application/json; charset=UTF-8'
    // }
  }
  return Axios(config)
}
