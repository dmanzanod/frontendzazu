import axios from 'axios'
import { AxiosInterceptor } from './axios'
const url= process.env.REACT_APP_BASE_URL
AxiosInterceptor()

export const sendBulkMessages = async (urlMessages, values) => {
    try {
        console.log('send Vlaues from service\n', values)
      const response = await axios.post(`${urlMessages}/sendMessages`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      return {
        error: error.message,
        code: error.code,
        name: error.name,
        status: error.response ? error.response.status : null,
      };
    }
  };
  

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

export const authAdminVerification = async () => {
    try {
      const response = await axios.get(`${url}/isAdmin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Auth')}`,
        },
      });
  
      return response.data;
    } catch (error) {
      return {
        error: error.response.data.message,
        code: error.code,
        name: error.name,
        status: error.response.status,
      };
    }
  };
  
// Excel Upload
export const uploadExcel = async (businessId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return await axios.post(`${url}/uploadExcel/${businessId}`, formData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        error: error.response.data.message,
        code: error.code,
        name: error.name,
        status: error.response.status,
      };
    });
};

export const getCrmDataByYear = async(year,businessId)=>{
    return await axios.get(`${url}/getCrmDataByYear/${businessId}/${year}`)
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

export const getTotalCrmDataByDates = async (year, businessId, selectedStartDate, selectedEndDate) => {
    const requestData = {
        selectedStartDate: selectedStartDate,
        selectedEndDate: selectedEndDate
    };

    return await axios.post(`${url}/getTotalCrmDataByDates/${businessId}/${year}`, requestData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return {
                error: error.message,
                code: error.code,
                name: error.name,
                status: error.response ? error.response.status : null
            };
        });
};


export const getCrmByFlow = async(businessId,field)=>{
    return await axios.get(`${url}/getUniqueValuesByFields/${businessId}/${field}`)
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

export const getContactListsData = async(businessId)=>{
    return await axios.get(`${url}/getContactLists/${businessId}`)
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

export const getContactInformation = async(businessId,field)=>{
    return await axios.get(`${url}/getContactsInformation/${businessId}`)
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

export const getUniqueCrmByCategory = async(businessId)=>{
    return await axios.get(`${url}/getUniqueCrmByCategory/${businessId}`)
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


export const getCrmByMonth = async(businessId,year,month,flow)=>{
    return await axios.get(`${url}/getCrmDataByMonth/${businessId}/${year}/${month}/${flow}`)
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

export const getInfoCrmData = async(businessId)=>{
    return await axios.get(`${url}/getContactsCrm/${businessId}`)
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

export const createContactList=async(values)=>{
    console.log("dentro de valores",values)
    return await axios.post(`${url}/createContactsInformation`,values)
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

export const updateContactList=async(businessId,listName,values)=>{
    console.log("dentro de valores",values)
    return await axios.post(`${url}/updateContactList/${businessId}/${listName}`,values)
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

export const updateLastMessageSendByList=async(businessId,listName,values)=>{
    console.log("dentro de valores",values)
    return await axios.post(`${url}/updateLastMessageSendList/${businessId}/${listName}`,values)
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

export const deleteContactList=async(businessId,listName)=>{
    return await axios.delete(`${url}/deleteContactListInformation/${businessId}/${listName}`)
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

export const saveSchedule=async(values)=>{
    return await axios.post(`${url}/newSimpleSchedule`,values)
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

export const getSimpleScheduleByBussinesId = async(id)=>{
    return await axios.get(`${url}/getSimpleSchedule/${id}`)
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

export const getContactListByName = async(businessId,listName)=>{
    return await axios.get(`${url}/getContactListDataByName/${businessId}/${listName}`)
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

export const updateSimpleSchedule = async (id,value)=>{
    return await axios.post(`${url}/updateSimpleSchedules/${id}`,value)
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
const clearAxiosInterceptors = () => {
    axios.interceptors.request.eject(AxiosInterceptor.requestHandler);
    axios.interceptors.response.eject(AxiosInterceptor.responseHandler);
  };
  
export const uploadFileText = async (file, onUploadProgress) => {
    clearAxiosInterceptors();
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(`${localStorage.getItem('url')}/uploadFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
  
      if (response && response.data) {
        return response.data; // Return response data if available
      } else {
        // Handle case when response data is undefined or empty
        return { error: 'No data received from server' };
      }
    } catch (error) {
      return {
        error: error.response ? error.response.data.message : 'Unknown error',
        code: error.code,
        name: error.name,
        status: error.response ? error.response.status : 'Unknown status',
      };
    }
  };


export const logOut=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('Business')
    localStorage.removeItem('Auth')
    
  }

