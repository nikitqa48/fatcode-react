import axios from 'axios'


const api = axios.create({
  baseURL: 'http://0.0.0.0:8000/',
  // headers: {
  //   Authorization: 'Token '
  // }
})


export default api