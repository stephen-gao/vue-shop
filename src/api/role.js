/**
 * Created by gs on 2019/6/3.
 */
import request from '@/common/request'

export default {
    name: 'roleApi',
    page (data){
        return request.post('/usermanageapi/role/page', data, {})
    },
    add (data){
        return request.post('/usermanageapi/role/add', data, {})
    },
    get (data){
        return request.get('/usermanageapi/role/get', data, {})
    },
    edit (data){
        return request.post('/usermanageapi/role/edit', data, {})
    },
    del (data){
        return request.get('/usermanageapi/role/del', data, {})
    },
    list (data){
        return request.get('/usermanageapi/role/list', data, {})
    }
}