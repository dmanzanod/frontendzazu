import axios from 'axios'
import { AxiosInterceptor } from './axios'
AxiosInterceptor()
//Bookings
export const getHistoryBookings= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/historyBookings/${businessId}`)
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
export const getBookings= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getBookings/${businessId}`)
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
export const getTotalSales= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getTotalSales/${businessId}`)
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
export const getTotalBookings= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getTotalBookings/${businessId}`)
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
export const getServicesStats= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getServicesStats/${businessId}`)
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
export const getMonthlyBookings= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getBookingsByMonth/${businessId}`)
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
export const getWeeklyBookings= async(businessId)=>{
    console.log(process.env.BASE_URL)
    return await axios.get(`https://zazu-backend.onrender.com/api/getBookingsByWeek/${businessId}`)
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
//categories
export const getCategories= async(businessId)=>{
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getCategoriesService/${businessId}`)
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
export const getCategory= async(Id)=>{
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getCategoryService/${Id}`)
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

export const newCategory=async(values)=>{
    return await axios.post(`https://zazu-backend.onrender.com/api/createCategoryService`,values)
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
export const updateCategory=async(id,values)=>{
    return await axios.post(`https://zazu-backend.onrender.com/api/updateCategoryService/${id}`,values)
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
export const deleteCategory=async(id)=>{
    return await axios.post(`https://zazu-backend.onrender.com/api/deleteCategoryService/${id}`)
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

//Services
export const getServices= async(businessId)=>{
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getServices/${businessId}`)
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
export const getService= async(id)=>{
    
    return await axios.get(`https://zazu-backend.onrender.com/api/getService/${id}`)
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
export const newService=async(values)=>{
    return await axios.post(`https://zazu-backend.onrender.com/api/createServices`,values)
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
export const updateService=async(id,values)=>{
    return await axios.post(`https://zazu-backend.onrender.com/api/updateService/${id}`,values)
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
export const deleteService=async(id)=>{
    return await axios.post(`https://zazu-backend.onrender.com/api/deleteService/${id}`)
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