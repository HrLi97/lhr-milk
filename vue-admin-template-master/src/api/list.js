import request from '@/utils/request'
const api = `/admin/author`

export default {
    //数据字典列表
    showAll(current,limit,searchObj) {
      return request ({
        url: `${api}/showAll/${current}/${limit}`,
        method: 'post',
        data:searchObj
      })
    },
    changeNew(id) {
        return request ({
          url: `${api}/changeNew/${id}`,
          method: 'get',
        })
      },
      changeHot(id) {
        return request ({
          url: `${api}/changeHot/${id}`,
          method: 'get',
        })
      },
      cancelHotNew(id) {
        return request ({
          url: `${api}/cancelHotNew/${id}`,
          method: 'get',
        })
      },
      findAllType(){
        return request ({
            url: `${api}/findAllType`,
            method: 'get',
          })
      },
      saveCommoditySet(searchObj){
        return request ({
            url: `${api}/saveCommoditySet`,
            method: 'post',
            data:searchObj
          })
      },
      getCommodityById(id){
        return request ({
            url: `${api}/getCommodityById/${id}`,
            method: 'get',
          })
      },
  }