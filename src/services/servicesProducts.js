import axios from 'axios'
import { AxiosInterceptor } from './axios'
AxiosInterceptor()
//Orders
export const getHistoryOrders= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/historyOrders/${businessId}`)
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
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getOrders/${businessId}`)
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
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getTotalSalesProduct/${businessId}`)
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
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getTotalOrders/${businessId}`)
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
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getProductsStats/${businessId}`)
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
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getOrdersByMonth/${businessId}`)
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
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getOrdersByWeek/${businessId}`)
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
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getCategoriesProduct/${businessId}`)
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
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getCategoryProduct/${Id}`)
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
    return await axios.post(`https://zazu-backend.onrender.com/api/createCategoryProduct`,values)
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
    return await axios.post(`https://zazu-backend.onrender.com/api/updateCategoryProduct/${id}`,values)
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
    return await axios.post(`https://zazu-backend.onrender.com/api/deleteCategoryProduct/${id}`)
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
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getProducts/${businessId}`)
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
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getProduct/${id}`)
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
    return await axios.post(`https://zazu-backend.onrender.com/api/createProduct`,values)
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
    return await axios.post(`https://zazu-backend.onrender.com/api/updateProduct/${id}`,values)
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
    return await axios.post(`https://zazu-backend.onrender.com/api/deleteProduct/${id}`)
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