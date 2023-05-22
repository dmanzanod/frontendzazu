import axios from 'axios'
import { AxiosInterceptor } from './axios'
AxiosInterceptor()

export const getQr= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`http://localhost:3000/api/qr/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        console.log(error)
        return {
            error: error.response.data.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}

export const getBusinessById= async(id)=>{
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getBusiness/${id}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        return {
            error: error.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}

export const updateBusiness=async(id,values)=>{
    return await axios.post(`https://zazu-backend.onrender.com/api/updateBusiness/${id}`,values)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        return {
            error: error.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
}

export const login=async(values)=>{
    return await axios.post('https://zazu-backend.onrender.com/api/login',values)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        console.log(error)
        return{
            error:error.response.data.message,
            code:error.code,
            name:error.name,
            status:error.response.status
        }
    })
}
export const logOut=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('Business')
    localStorage.removeItem('Auth')
    
  }

