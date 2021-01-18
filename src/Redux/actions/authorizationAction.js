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

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('localId', data.localId)
            localStorage.setItem('expiresIn', expirationDate)

            dispatch(loginOrRegistration(data.idToken))
            dispatch(autoTimeLogout(data.expiresIn))

        } catch (e) {
            console.log(e)
        }
    }
}

export function autoTimeLogin() {
    return dispatch => {
        let token = localStorage.getItem('token')
        if (!token) {
            // dispatch(logout())
        } else {
            let expirationDate = new Date(localStorage.getItem('expiresIn'))
            if (expirationDate <= new Date()) {
                // dispatch(logout())
            } else {
                dispatch(loginOrRegistration(token))
                dispatch(autoTimeLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function autoTimeLogout(timeLogout) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout)
        }, timeLogout * 1000)
    }
}

// LOGIN_OR_REGISTRATION
export function loginOrRegistration(token) {
    return {
        type: LOGIN_OR_REGISTRATION,
        token
    }
}

// AUTO_LOGOUT
export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('localId')
    localStorage.removeItem('expiresIn')

    return {
        type: AUTO_LOGOUT,
    }
}