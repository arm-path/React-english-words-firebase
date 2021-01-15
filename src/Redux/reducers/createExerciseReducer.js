import {CreateThemeExercises, primaryFormControl} from "../actions/createExerciseAction";
import {
    ADD_IN_DB_LIST_EXERCISES,
    ADD_IN_DB_LIST_EXERCISES_ERROR,
    ADD_IN_LIST_EXERCISE, CHANGE_EVENT_THEME_INPUT, CHANGE_SELECT_CORRECT_ANSWER,
    VALIDATION_CHANGE_INPUT
} from '../actions/typeAction'

const initialState = {
    theme: CreateThemeExercises(),
    exercises: [], // Список добавленных упражнений.
    isFormValid: false, // Определяет валидацию формы.
    correctAnswer: 1, // Правильный вариант ответа.
    formControl: primaryFormControl(),
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_IN_LIST_EXERCISE:
            return {
                ...state,
                exercises: action.exercises,
                formControl: action.formControl,
                isFormValid: action.isFormValid,
                correctAnswer: action.correctAnswer
            }
        case ADD_IN_DB_LIST_EXERCISES:
            return {
                ...state,
                theme: action.theme,
                exercises: action.exercises,
                formControl: action.formControl,
                isFormValid: action.isFormValid,
                correctAnswer: action.correctAnswer
            }
        case ADD_IN_DB_LIST_EXERCISES_ERROR:
            return {
                ...state,
                error: action.error
            }
        case VALIDATION_CHANGE_INPUT:
            return {
                ...state,
                formControl: action.formControl,
                isFormValid: action.isFormValid
            }
        case CHANGE_EVENT_THEME_INPUT:
            return {
                ...state,
                theme: action.theme
            }
        case CHANGE_SELECT_CORRECT_ANSWER: {
            return {
                ...state,
                correctAnswer: action.correctAnswer
            }
        }
        default:
            return state
    }
}