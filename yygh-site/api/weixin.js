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
    createNative(orderId){
        return request({
            url:`${api_name}/createNative/${orderId}`,
            method:'get'
        })
    },
    //查询支付状态的接口
    queryPayStatus(orderId) {
        return request({
            url: `${api_name}/queryPayStatus/${orderId}`,
            method: 'get'
        })
    },
    
}