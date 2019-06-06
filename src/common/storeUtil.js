/**
 * Created by gs on 2019/6/5.
 */
import roleApi from '@/api/role'
import sysDic from "@/api/sysdic"
import store from '../store'
export default {
    refreshRoles(){
        roleApi.list().then(response => {
            let roles = response.data;
            store.commit('setRoles',roles);
        }).catch(() => {
            //who care
        })
    },
    refreshSysDic(){
        sysDic.sysDicTree().then(response => {
            let tree = response.data;
            store.commit('setSysDic',tree);
        }).catch(() => {
            //who care
        })
    }
}