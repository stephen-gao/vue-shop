/**
 * Created by gs on 2019/6/10.
 */
import request from '@/common/request'

export default {
    name: 'brandApi',
    page (data){
        return request.post('/shopmanageapi/brand/page', data, {})
    },
    add(data){
        return request.post('/shopmanageapi/brand/add',data,{})
    },
    edit(data){
        return request.put('/shopmanageapi/brand/edit',data,{})
    },
    del(data){
        return request.delete('/shopmanageapi/brand/del',data,{})
    }
}