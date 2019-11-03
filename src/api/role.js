/**
 * Created by gs on 2019/6/3.
 */
import request from '@/common/request'

export default {
    name: 'roleApi',
    page (data){
        return request.post('/shopmanageapi/role/page', data, {})
    },
    add (data){
        return request.post('/shopmanageapi/role/add', data, {})
    },
    get (data){
        return request.get('/shopmanageapi/role/get', data, {})
    },
    edit (data){
        return request.post('/shopmanageapi/role/edit', data, {})
    },
    del (data){
        return request.get('/shopmanageapi/role/del', data, {})
    },
    list (data){
        return request.get('/shopmanageapi/role/list', data, {})
    }
}