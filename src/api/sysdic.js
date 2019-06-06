/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'


export default {
    page (data){
        return request.post('/usermanageapi/sysdic/sysdicpage',data,{})
    },
    addDicType(data){
        return request.post('/usermanageapi/sysdic/adddictype',data,{})
    },
    dicItemsByTypeId(data){
        return request.get('/usermanageapi/sysdic/dicitemsbtypeid',data,{})
    },
    addDicItem(data){
        return request.post('/usermanageapi/sysdic/adddicitem',data,{})
    },
    dicitemsbtypeCode(data){
        return request.get('/usermanageapi/sysdic/dicitemsbtypeCode',data,{})
    },
    deldictype(data){
        return request.get('/usermanageapi/sysdic/deldictype',data,{})
    },
    deldicitem(data){
        return request.get('/usermanageapi/sysdic/deldicitem',data,{})
    },
    sysDicTree(data){
        return request.get('/usermanageapi/sysdic/sysdictree',data,{})
    }


}