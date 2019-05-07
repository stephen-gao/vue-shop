/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'


export default {
    login (data){
        return request.post('/api/login',data,{})
    }
}