import {combineReducers} from 'redux'
import exerciseReducer from './exerciseReducer'

export default combineReducers({
    getExercises: exerciseReducer
})