import request from "@/utils/request"
const api = `/api/hosp/hospital`
const api_name = `/admin/hosp/hospital`

export default{

    findHospList(page,limit,searchObj){
        return request({
            url : `${api}/findHospList/${page}/${limit}`,
            method : 'get',
            params : searchObj
        })  
    },
    //根据医院名称模糊查询
    findHospByHosname(hosname){
        return request({
            url:`${api}/findHospByHosname/${hosname}`,
            method:'get'
        })
    },
    //根据hoscode获取科室列表
    findDepartment(hoscode){
        return request({
            url:`${api}/findDepartment/${hoscode}`,
            method:'get'
        })
    },
    //根据hoscode来获取医院预约挂号详情
    item(hoscode){
        return request({
            url:`${api}/item/${hoscode}`,
            method:'get'
        })
    },
    getBookingScheduleRule(page,limit,hoscode,depcode){
        return request({
            url:`${api_name}/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
            method:'get'
        })
    },
    findScheduleList(hoscode,depcode,workDate){
        return request({
            url:`${api_name}/auth/findScheduleList/${hoscode}/${depcode}/${workDate}`,
            method:'get'
        })
    },
    getSchedule(scheduleId){
        return request({
            url:`${api_name}/getSchedule/${scheduleId}`,
            method:'get'
        })
    },
}