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
        
        return {
            error: error.response.data.message,
            code: error.code,
            name: error.name,
            status:error.response.status
        }
    })
    

}
export const getPeriodOrders= async(period,businessId)=>{
    const request={
        period:period,
        id:businessId
    }
    return await axios.post(`${url}/getOrdersPeriod`,request)
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
export const getTotalPeriodOrders= async(period,businessId)=>{
    const request={
        period:period,
        id:businessId
    }
    return await axios.post(`${url}/getTotalOrdersPeriod`,request)
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
export const getOrdersForExport= async(id,properties)=>{
    const request={
        id:id,
        properties:properties
    }
    return await axios.post(`${url}/exportOrders`,request)
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
    const formData= new FormData()
    formData.append('name',values.name)
    formData.append('code',values.code)
    formData.append('stock',values.stock)
    formData.append('description',values.description)
    formData.append('details',values.details)
    formData.append('price',values.price)
    formData.append('coin',values.coin)
    formData.append('categoryId',values.categoryId)
    formData.append('businessId',values.businessId)
    formData.append('image',values.image)
    formData.append('state',values.state)
    return await axios.post(`${url}/createProduct`,formData,{
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })
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
    const formData= new FormData()
    formData.append('name',values.name)
    formData.append('code',values.code)
    formData.append('stock',values.stock)
    formData.append('description',values.description)
    formData.append('details',values.details)
    formData.append('price',values.price)
    formData.append('coin',values.coin)
    
    formData.append('state',values.state)
    formData.append('categoryId',values.categoryId)
    formData.append('businessId',values.businessId)
    formData.append('image',values.image)
    return await axios.post(`${url}/updateProduct/${id}`,formData,{
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })
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

export const getCurrencyProduct= async(businessId)=>{
   
    return await axios.get(`${url}/getCurrencyProduct/${businessId}`)
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