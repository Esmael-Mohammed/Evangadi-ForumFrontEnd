import axios from 'axios'
 const instanceAxios=axios.create({
    baseURL:'http://localhost:3003/api',
 })
 export default instanceAxios;