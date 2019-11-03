/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'

export default {
    name: 'userApi',
    userPage (data){
        return request.post('/shopmanageapi/user/userPage', data, {})
    },
    add (data){
        return request.post('/shopmanageapi/user/add', data, {})
    },
    edit (data){
        return request.post('/shopmanageapi/user/edit', data, {})
    },
    getOne (data){
        return request.get('/shopmanageapi/user/get', data, {})
    },
    del (data){
        return request.get('/shopmanageapi/user/del', data, {})
    }

}