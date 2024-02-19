import axios from 'axios'
import { useSelector } from 'react-redux'



export const BaseUrl = axios.create({
    baseURL:'https://api.spotify.com/v1/',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
})