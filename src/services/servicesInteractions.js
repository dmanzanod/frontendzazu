import axios from 'axios'
import { AxiosInterceptor } from './axios'
const url= process.env.REACT_APP_BASE_URL
AxiosInterceptor()
export const getInteractions= async(businessId)=>{
    
    return await axios.get(`${url}/totalInteractions/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return {
            error: error.response.data.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}
export const getInteractionsByWeek= async(businessId)=>{
    
    return await axios.get(`${url}/InteractionsByWeek/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return {
            error: error.response.data.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}
export const getConversationFlows= async(businessId)=>{
    
    return await axios.get(`${url}/Flows/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return {
            error: error.response.data.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}
export const getConversationHistory= async(businessId)=>{
    
    return await axios.get(`${url}/interactionHistory/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return {
            error: error.response.data.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}

export const getPeriodInteractions= async(period,businessId)=>{
    const request={
        period:period,
        id:businessId
    }
    return await axios.post(`${url}/interactionsByPeriod`,request)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        
        return {
            error: error.response.data.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}