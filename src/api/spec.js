/**
 * Created by gs on 2019/6/12.
 */
import request from '@/common/request'

export default {
    name: 'specApi',
    specTree (data){
        return request.get('/shopmanageapi/spectree/tree', data, {})
    },
    specList (data){
        return request.post('/shopmanageapi/spectree/list', data, {})
    },
    add (data){
        return request.post('/shopmanageapi/spectree/add', data, {})
    },
    edit (data){
        return request.put('/shopmanageapi/spectree/edit', data, {})
    },
    del (data){
        return request.delete('/shopmanageapi/spectree/del', data, {})
    },
}