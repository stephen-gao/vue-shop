import request from '@/common/request'

export default {
    name: 'resourceApi',
    resourceTree (data){
        return request.get('/usermanageapi/resource/resourcetree', data, {})
    },

    add(data){
        return request.post('/usermanageapi/resource/add',data,{})
    }
}