/**
 * Created by gs on 2019/7/31.
 */
import request from '@/common/request'

export default {
    name: 'spuApi',
    page (data){
        return request.post('/shopmanageapi/spu/page', data, {})
    },
    add(data){
        return request.post('/shopmanageapi/spu/add',data,{})
    },
    edit(data){
        return request.put('/shopmanageapi/spu/edit',data,{})
    },
    del(data){
        return request.delete('/shopmanageapi/spu/del',data,{})
    }
}