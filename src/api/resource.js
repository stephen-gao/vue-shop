import request from '@/common/request'

export default {
    name: 'resourceApi',
    resourceTree (data){
        return request.get('/shopmanageapi/resource/resourcetree', data, {})
    },
    add(data){
        return request.post('/shopmanageapi/resource/add',data,{})
    },
    edit(data){
        return request.post('/shopmanageapi/resource/edit',data,{})
    },
    del(data){
        return request.get('/shopmanageapi/resource/del',data,{})
    },
}