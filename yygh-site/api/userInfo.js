import request from "@/utils/request"
const api = `/api/user`

export default{
    login(loginVo){
        return request({
            url: `${api}/login`,
            method: 'post',
            data: loginVo
        })
    },
    //用户认证
    userAuth(userAuthVo){
        return request({
            url: `${api}/auth/userAuth`,
            method: 'post',
            data: userAuthVo
        })
    },
    //根据userid获取用户信息
    getUserInfo(){
        return request({
            url: `${api}/auth/getUserInfo`,
            method: 'get'
        })
    },
}