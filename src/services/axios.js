import axios from 'axios'
export const AxiosInterceptor=()=>{
    const updateHeader=(request)=>{
        const token=localStorage.getItem('Auth')
        const newHeaders={
            Authorization: `Bearer ${token}`
        }
        request.headers=newHeaders
        return request
    }
    axios.interceptors.request.use((request)=>{
        if(request.url.includes('login')) return request
        return updateHeader(request)

    })
}