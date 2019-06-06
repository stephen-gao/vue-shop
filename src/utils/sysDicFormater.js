/**
 * Created by gs on 2019/6/4.
 */
import store from '../store'

export function roleFormat(key) {
    let roles = store.getters.roles;
    let value = null;
    for(let i =0;i<roles.length;i++){
        if(key === roles[i].id){
            value = roles[i].name
        }
    }
    if(value === null){
        value = key
    }
    return value
}

export function sysDicFormat(dicType,key) {
    let tree = store.getters.sysDic;
    let value = null;
    let type = tree[dicType];
    value = type[key];
    if(value === null){
        value = key
    }
    return value
}