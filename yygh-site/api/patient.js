import request from '@/utils/request'
const api = `/api/user/patient`

export default{
    findAll(){
        return request({
            url:`${api}/auth/findAll`,
            method:'get',
        })
    },
    addPatient(patient){
        return request({
            url:`${api}/auth/addPatient`,
            method:'post',
            data:patient
        })
    },
    getById(id){
        return request({
            url:`${api}/auth/get/${id}`,
            method:'get',
        })
    },
    removePatient(id){
        return request({
            url:`${api}/auth/remove/${id}`,
            method:'delete',
        })
    },
    updatePatient(patient){
        return request({
            url:`${api}/auth/update`,
            method:'post',
            data:patient
        })
    }
}