/**
 * Created by gs on 2019/5/7.
 */
import request from '@/common/request'

export default {
    userPage (data){
        return request.get('/api/user/userPage', data, {})
    }
}