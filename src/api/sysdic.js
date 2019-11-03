/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'


export default {
    page (data){
        return request.post('/shopmanageapi/sysdic/sysdicpage',data,{})
    },
    addDicType(data){
        return request.post('/shopmanageapi/sysdic/adddictype',data,{})
    },
    dicItemsByTypeId(data){
        return request.get('/shopmanageapi/sysdic/dicitemsbtypeid',data,{})
    },
    addDicItem(data){
        return request.post('/shopmanageapi/sysdic/adddicitem',data,{})
    },
    dicitemsbtypeCode(data){
        return request.get('/shopmanageapi/sysdic/dicitemsbtypeCode',data,{})
    },
    deldictype(data){
        return request.get('/shopmanageapi/sysdic/deldictype',data,{})
    },
    deldicitem(data){
        return request.get('/shopmanageapi/sysdic/deldicitem',data,{})
    },
    sysDicTree(data){
        return request.get('/shopmanageapi/sysdic/sysdictree',data,{})
    }


}