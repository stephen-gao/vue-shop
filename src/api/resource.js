import request from '@/common/request'

export default {
    name: 'resourceApi',
    resourceTree (data){
        return request.get('/usermanageapi/resource/resourcetree', data, {})
    },
    add(data){
        return request.post('/usermanageapi/resource/add',data,{})
    },
    edit(data){
        return request.post('/usermanageapi/resource/edit',data,{})
    },
    del(data){
        return request.get('/usermanageapi/resource/del',data,{})
    },
}