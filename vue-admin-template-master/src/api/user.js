import request from '@/utils/request'
const api = `/admin/author`

export default {
    getUser(current,limit,searchObj){
        return request({
            url: `${api}/getUser/${current}/${limit}`,
            method: 'post',
            data:searchObj
        })
    }
  }