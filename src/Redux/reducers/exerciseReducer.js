import {
    FETCH_EXERCISES_TOPICS_ERROR,
    FETCH_EXERCISES_TOPICS_START,
    FETCH_EXERCISES_TOPICS_SUCCESS
} from '../actions/typeAction'

const initialState = {
    topics: [],
    loader: false,
    error: null
}

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXERCISES_TOPICS_START:
            return {
                ...state,
                loader: true,

            }
        case FETCH_EXERCISES_TOPICS_SUCCESS:
            return {
                ...state,
                topics: action.topics,
                loader: false,

            }
        case FETCH_EXERCISES_TOPICS_ERROR:
            return {
                ...state,
                loader: true,
                error: action.error
            }
        default:
            return state
    }
}

export default exerciseReducer