import {combineReducers} from 'redux'
import exerciseReducer from './exerciseReducer'
import createExerciseReducer from './createExerciseReducer'

export default combineReducers({
    getExercises: exerciseReducer,
    createExercises: createExerciseReducer
})