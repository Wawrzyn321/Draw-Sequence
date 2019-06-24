import { SET_CREDENTIALS, LOG_OUT } from './action-labels';


export function logIn(access_token, token_expire) {
    return {
        type: SET_CREDENTIALS,
        access_token,
        token_expire
    }
}

//added only for semantics
export function relogin(access_token, token_expire) {
    logIn(access_token, token_expire);   
}

export function logout() {
    return {
        type: LOG_OUT
    }
}
