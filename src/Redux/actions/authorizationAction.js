import axios from "axios";
import {AUTO_LOGOUT, LOGIN_OR_REGISTRATION} from './typeAction'

export function loginAndRegistration(email, password, isLogin) {
    return async dispatch => {
        try {
            let date = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            let url

            if (isLogin) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0TQJmq0crWnvnhFQONMxqJfNNN8nk0IU'
            } else {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0TQJmq0crWnvnhFQONMxqJfNNN8nk0IU'
            }
            let response = await axios.post(url, date)
            let data = response.data
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('localId', data.localId)
            localStorage.setItem('expiresIn', data.expiresIn)

            dispatch(loginOrRegistration(data.idToken))
            dispatch(autoTimeLogout(data.expiresIn))

        } catch (e) {
            console.log(e)
        }
    }
}

// LOGIN_OR_REGISTRATION
export function loginOrRegistration(token) {
    return {
        type: LOGIN_OR_REGISTRATION,
        token
    }
}

export function autoTimeLogout(timeLogout) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout)
        }, timeLogout * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('localId')
    localStorage.removeItem('expiresIn')

    return {
        type: AUTO_LOGOUT,
        token: null
    }
}