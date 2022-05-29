import request from '@/utils/request'
const api = `/api/ucenter/wx`
const api_name = `/api/order/weixin`

export default{
    getLoginParams(){
        return request({
            url:`${api}/getLoginParams`,
            method:'get'
        })
    },
    createNative(orderId,addressId,getTime){
        return request({
            url:`${api_name}/createNative/${orderId}/${addressId}/${getTime}`,
            method:'get',
        })
    },
    queryPayStatus(orderId){
        return request({
            url:`${api_name}/queryPayStatus/${orderId}`,
            method:'get'
        })
    },

}