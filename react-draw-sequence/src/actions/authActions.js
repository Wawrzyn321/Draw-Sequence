import { SET_CREDENTIALS, LOG_OUT } from './action-labels';


export function logIn(credentials) {
    return {
        type: SET_CREDENTIALS,
        access_token: credentials.accessTokenExpiration,
        token_expire: credentials.accessTokenExpiration
    }
}

//added only for semantics
export function relogin(credentials) {
    logIn(credentials);   
}

export function logout() {
    return {
        type: LOG_OUT
    }
}
