import request from '@/utils/request'
const api = `api/order/orderInfo`

export default{
    //订单列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api}/auth/${page}/${limit}`,
            method: `get`,
            params: searchObj
        })
    },
    //订单状态
    getStatusList() {
        return request({
            url: `${api}/auth/getStatusList`,
            method: 'get'
        })
    },

    submitOrder(scheduleId,patientId){
        return request({
            url: `${api}/auth/submitOrder/${scheduleId}/${patientId}`,
            method: 'post'
        })
    },

    orderDetail(orderId){
        return request({
            url: `${api}/auth/orderDetail/${orderId}`,
            method: 'get'
        })
    },
    
}

