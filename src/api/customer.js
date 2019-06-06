/**
 * Created by gs on 2019/6/6.
 */
import request from '@/common/request'

export default {
    name: 'customerApi',
    page (data){
        return request.post('/usermanageapi/customer/page', data, {})
    },
    resetPwd(data){
        return request.post('/usermanageapi/customer/resetpwd', data, {})
    },
    chageState(data){
        return request.post('/usermanageapi/customer/changestate', data, {})
    }
}