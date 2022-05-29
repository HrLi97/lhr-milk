import request from "@/utils/request";
const api = `/api/msm`
export default{
    sendCode(phone){
        return request({
            url: `${api}/send/${phone}`,
            method: 'get'
        })
    }
}