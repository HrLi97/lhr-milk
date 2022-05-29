import request from '@/utils/request'
const api_name = `/login/user/email`
const api = `/api/order`
export default{
    sendCode(email){
        return request({
            url:`${api_name}/send/${email}`,
            method:'get'
        })
    },
    login(loginVo){
        return request({
            url:`${api_name}/userLogin`,
            method:'post',
            data:loginVo
        })
    },
    getUserAddress(){
        return request({
            url:`${api}/getUserAddress`,
            method:'get',
        })
    },
    getUserInfo(){
        return request({
            url:`/api/user/getUserInfo`,
            method:'get',
        })
    },
    changeAddressDefault(addressId){
        return request({
            url:`${api}/changeAddressDefault/${addressId}`,
            method:'get',
        })
    },
    addAddress(address){
        return request({
            url:`${api}/addAddress/${address}`,
            method:'post',
        })
    },
}