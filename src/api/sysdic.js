/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'


export default {
    page (data){
        return request.post('/usermanageapi/sysdic/sysdicpage',data,{})
    }
}