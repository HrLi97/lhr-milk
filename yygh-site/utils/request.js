import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8204',
    timeout: 15000 // 请求超时时间
})
// http request 拦截器
service.interceptors.request.use(
    config => {
    // token 先不处理，后续使用时在完善
    //从cookie中得到token，将token放到header中给后端获取信息
    if(cookie.get('token')){
        config.headers['token']=cookie.get('token')
    }
    return config
},
  err => {
    return Promise.reject(err)
})
// http response 拦截器
service.interceptors.response.use(
    response => {
        //在响应的过程中，如果header中没有token，后端返回208错误，接收自动弹出登录请求
        if(response.data.code==208){
            loginEvent.$emit('loginDialogEvent')
        }
        else{
            if (response.data.code !== 200) {
                Message({
                    message: response.data.message,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(response.data)
            } else {
                return response.data
            }
        }
    },
    error => {
        return Promise.reject(error.response)
})
export default service
