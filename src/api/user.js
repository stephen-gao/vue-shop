/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'

export default {
    name: 'userApi',
    userPage (data){
        return request.post('/usermanageapi/user/userPage', data, {})
    }
}