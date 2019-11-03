/**
 * Created by gs on 2019/6/10.
 */
import request from '@/common/request'

export default {
    name: 'categoryApi',
    categoryTree (data){
        return request.get('/shopmanageapi/category/categorytree', data, {})
    },
    add(data){
        return request.post('/shopmanageapi/category/add',data,{})
    },
    edit(data){
        return request.post('/shopmanageapi/category/edit',data,{})
    },
    del(data){
        return request.get('/shopmanageapi/category/del',data,{})
    }
}