/**
 * Created by gs on 2019/5/7.
 */
let token

export default {
    setToken(tokenKey){
        token = tokenKey
    },
    getToken(){
        return token;
    },
    removeToken(){
        token = null;
    }
}