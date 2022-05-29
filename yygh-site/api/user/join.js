import request from '@/utils/request'
const api_name = `/api/order`

export default{
    getParent(){
        return request({
            url:`${api_name}/getParent`,
            method:'get'
        })
    },
    getPageList(searchObj){
        return request({
            url:`${api_name}/getPageList`,
            method:'get',
            params:searchObj
        })
    },
    cancel(id){
        return request({
            url:`${api_name}/cancel/${id}`,
            method:'delete',
        })
    },
    orderDetail(id){
        return request({
            url:`${api_name}/orderDetail/${id}`,
            method:'get',
        })
    },
    getBack(orderId){
        return request({
            url:`${api_name}/getBack/${orderId}`,
            method:'get',
        })
    },

    
    
}