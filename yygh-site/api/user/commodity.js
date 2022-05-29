import request from '@/utils/request'
const api_name = `/front/commodity`

export default{
    findCommodityType(){
        return request({
            url:`${api_name}/findCommodityType`,
            method:'get'
        })
    },
    findCommodity(page,limit,serachObj){
        return request({
            url:`${api_name}/findCommodity/${page}/${limit}`,
            method:'get',
            params:serachObj
        })
    },
    findCommodityByName(name){
        return request({
            url:`${api_name}/findCommodityByName/${name}`,
            method:'get',
        })
    },
    findCommodityById(id){
        return request({
            url:`${api_name}/findCommodityById/${id}`,
            method:'get',
        })
    },
   
    addJoinList(serachObj){
        return request({
            url:`${api_name}/addJoinList`,
            method:'get',
            params:serachObj
        })
    },
    getJoinList(){
        return request({
            url:`${api_name}/getJoinList`,
            method:'get',
        })
    },
    delAll(){
        return request({
            url:`${api_name}/delAll`,
            method:'delete',
        })
    },
    changeNum(flag,id){
        return request({
            url:`${api_name}/changeNum/${flag}/${id}`,
            method:'delete',
        })
    },
    GenerateTable(userJoinList){
        return request({
            url:`${api_name}/GenerateTable`,
            method:'post',
            data:userJoinList
        })
    }
}