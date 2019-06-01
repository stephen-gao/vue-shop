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
    }
}