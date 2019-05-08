import  Types from '../types';

export function onLogIn(userId) {
    return {type: Types.USER_LOAIN,userId: userId}
}