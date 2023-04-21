import axios from 'axios'

export const getHistory= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`http://localhost:3000/api/history/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        return {
            error: error.message,
            code: error.code,
            name: error.name
        }
    })
    

}
export const getCategories= async(businessId)=>{
    
    return await axios.get(`http://localhost:3000/api/getCategoriesService/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        return {
            error: error.message,
            code: error.code,
            name: error.name
        }
    })
    

}
export const getServices= async(businessId)=>{
    
    return await axios.get(`http://localhost:3000/api/getServices/${businessId}`)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        return {
            error: error.message,
            code: error.code,
            name: error.name
        }
    })
    

}