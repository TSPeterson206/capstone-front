import axios from 'axios'

const request = (path, method = 'get', body = null) => {
  const token = localStorage.getItem('token')
  return axios(`${process.env.REACT_APP_API_URL}${path}`, {

    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    data: body
  })
}

export default request
