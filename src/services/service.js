import axios from 'axios'
import { AxiosInterceptor } from './axios'
const url= process.env.REACT_APP_BASE_URL
AxiosInterceptor()

export const getQr= async()=>{
    
    return await axios.get(`${localStorage.getItem('url')}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return {
            error: error.response? error.response.data.message:"error",
            code: error.code,
            name: error.name,
            status:error.response? error.response.status:500
        }
    })
    

}

export const getBusinessById= async(id)=>{
    
    return await axios.get(`${url}/getBusiness/${id}`)
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
    return await axios.post(`${url}/updateBusiness/${id}`,values)
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
    return await axios.post(`${url}/login`,values)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return{
            error:error.response.data.message,
            code:error.code,
            name:error.name,
            status:error.response.status
        }
    })
}
export const signUp=async(values)=>{
    return await axios.post(`${url}/signUp`,values)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return{
            error:error.response.data.message,
            code:error.code,
            name:error.name,
            status:error.response.status
        }
    })
}
export const verify=async(id,token)=>{
    return await axios.get(`${url}/users/${id}/verify/${token}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return{
            error:error.response.data.message,
            code:error.code,
            name:error.name,
            status:error.response.status
        }
    })
}
export const resetPassword=async(values)=>{
    return await axios.post(`${url}/resetPassword`,values)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return{
            error:error.response.data.message,
            code:error.code,
            name:error.name,
            status:error.response.status
        }
    })
}
export const changePassword=async(id,token,values)=>{
    return await axios.post(`${url}/users/${id}/password/${token}`,values)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
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

