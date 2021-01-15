import {combineReducers} from 'redux'
import exerciseReducer from './exerciseReducer'
import createExerciseReducer from './createExerciseReducer'
import authorizationReducer from './authorizationReducer'

export default combineReducers({
    getExercises: exerciseReducer,
    createExercises: createExerciseReducer,
    authorization: authorizationReducer
})