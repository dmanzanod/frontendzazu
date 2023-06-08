import axios from 'axios'
import { AxiosInterceptor } from './axios'
AxiosInterceptor()
const url= process.env.REACT_APP_BASE_URL
//Orders
export const getHistoryOrders= async(businessId)=>{
    
    return await axios.get(`${url}/historyOrders/${businessId}`)
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
export const getOrders= async(businessId)=>{
    
    return await axios.get(`${url}/getOrders/${businessId}`)
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

export const getTotalSalesProducts= async(businessId)=>{
    
    return await axios.get(`${url}/getTotalSalesProduct/${businessId}`)
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
export const getTotalOrders= async(businessId)=>{
    
    return await axios.get(`${url}/getTotalOrders/${businessId}`)
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
export const getProductsStats= async(businessId)=>{
    
    return await axios.get(`${url}/getProductsStats/${businessId}`)
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
export const getMonthlyOrders= async(businessId)=>{
    
    return await axios.get(`${url}/getOrdersByMonth/${businessId}`)
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
export const getWeeklyOrders= async(businessId)=>{
    
    return await axios.get(`${url}/getOrdersByWeek/${businessId}`)
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

//Categories
export const getCategoriesProduct= async(businessId)=>{
    
    return await axios.get(`${url}/getCategoriesProduct/${businessId}`)
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
export const getCategoryProduct= async(Id)=>{
    
    return await axios.get(`${url}/getCategoryProduct/${Id}`)
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

export const newCategoryProduct=async(values)=>{
    return await axios.post(`${url}/createCategoryProduct`,values)
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
export const updateCategoryProduct=async(id,values)=>{
    return await axios.post(`${url}/updateCategoryProduct/${id}`,values)
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
export const deleteCategoryProduct=async(id)=>{
    return await axios.post(`${url}/deleteCategoryProduct/${id}`)
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

//Products

export const getProducts= async(businessId)=>{
    
    return await axios.get(`${url}/getProducts/${businessId}`)
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
export const getProduct= async(id)=>{
    
    return await axios.get(`${url}/getProduct/${id}`)
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
export const newProduct=async(values)=>{
    return await axios.post(`${url}/createProduct`,values)
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
export const updateProduct=async(id,values)=>{
    return await axios.post(`${url}/updateProduct/${id}`,values)
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
export const deleteProduct=async(id)=>{
    return await axios.post(`${url}/deleteProduct/${id}`)
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