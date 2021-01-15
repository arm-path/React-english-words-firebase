import {AUTO_LOGOUT, LOGIN_OR_REGISTRATION} from "../actions/typeAction";

const initialState = {
    token: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_OR_REGISTRATION:
            return {
                ...state,
                token: action.token
            }
        case AUTO_LOGOUT:
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
}