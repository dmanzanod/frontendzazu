import axios from 'axios'
import { AxiosInterceptor } from './axios'
AxiosInterceptor()
const url= process.env.REACT_APP_BASE_URL
//Bookings
export const getHistoryBookings= async(businessId)=>{
    
    return await axios.get(`${url}/historyBookings/${businessId}`)
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
export const getBookings= async(businessId)=>{
    
    return await axios.get(`${url}/getBookings/${businessId}`)
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
export const getTotalSales= async(businessId)=>{
    
    return await axios.get(`${url}/getTotalSalesServices/${businessId}`)
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
export const getTotalBookings= async(businessId)=>{
    
    return await axios.get(`${url}/getTotalBookings/${businessId}`)
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
export const getServicesStats= async(businessId)=>{
    
    return await axios.get(`${url}/getServicesStats/${businessId}`)
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
export const getMonthlyBookings= async(businessId)=>{
    
    return await axios.get(`${url}/getBookingsByMonth/${businessId}`)
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
export const getWeeklyBookings= async(businessId)=>{
    
    return await axios.get(`${url}/getBookingsByWeek/${businessId}`)
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
export const getPeriodBookings= async(period,businessId)=>{
    const request={
        period:period,
        id:businessId
    }
    return await axios.post(`${url}/getBookingsPeriod`,request)
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
export const getCurrencyService= async(businessId)=>{
   
    return await axios.get(`${url}/getCurrency/${businessId}`)
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
export const getTotalPeriodBookings= async(period,businessId)=>{
    const request={
        period:period,
        id:businessId
    }
    return await axios.post(`${url}/getTotalBookingsPeriod`,request)
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
export const getBookingsForExport= async(id,properties)=>{
    const request={
        id:id,
        properties:properties
    }
    return await axios.post(`${url}/exportBookings`,request)
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
//CrmInfoExport
export const getCrmInfoExport = async(id,properties)=>{
    const request={
        id:id,
        properties:properties
    }
    return await axios.post(`${url}/exportCrmInfo`,request)
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


//categories
export const getCategories= async(businessId)=>{
    
    return await axios.get(`${url}/getCategoriesService/${businessId}`)
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
    
    return await axios.get(`${url}/getCategoryService/${Id}`)
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
    return await axios.post(`${url}/createCategoryService`,values)
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
    return await axios.post(`${url}/updateCategoryService/${id}`,values)
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
    return await axios.post(`${url}/deleteCategoryService/${id}`)
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
    
    return await axios.get(`${url}/getServices/${businessId}`)
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
    
    return await axios.get(`${url}/getService/${id}`)
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
    
    return await axios.post(`${url}/createServices`,values)
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
    return await axios.post(`${url}/updateService/${id}`,values)
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
    return await axios.post(`${url}/deleteService/${id}`)
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