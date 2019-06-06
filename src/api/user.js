/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'

export default {
    name: 'userApi',
    userPage (data){
        return request.post('/usermanageapi/user/userPage', data, {})
    },
    add (data){
        return request.post('/usermanageapi/user/add', data, {})
    },
    edit (data){
        return request.post('/usermanageapi/user/edit', data, {})
    },
    getOne (data){
        return request.get('/usermanageapi/user/get', data, {})
    },
    del (data){
        return request.get('/usermanageapi/user/del', data, {})
    }

}