import {
    CLICK_EVENT_ANSWER_ERROR,
    CLICK_EVENT_ANSWER_IS_FINISHED, CLICK_EVENT_ANSWER_NEXT,
    CLICK_EVENT_ANSWER_SUCCESS, CLICK_EVENT_REPEAT_EXERCISE,
    FETCH_EXERCISES_ERROR,
    FETCH_EXERCISES_START,
    FETCH_EXERCISES_SUCCESS,
    FETCH_EXERCISES_TOPICS_ERROR,
    FETCH_EXERCISES_TOPICS_START,
    FETCH_EXERCISES_TOPICS_SUCCESS
} from '../actions/typeAction'

const initialState = {
    // ExerciseTopics
    topics: [], // Список упражнений по всем темам.
    loader: true, // Управление компонентом Loader, показывать-скрывать.
    error: null, // Ошибки возникающие при получении упражнений из сервера.
    // Exercises
    results: {}, // Результаты. {id-exercise: error or success}
    NumberOfCorrectResults: 0, // Количество правильных резултатов.
    isFinished: false, // Завершение упражнений.
    activeExercise: 0, // Активное упражнение. Id упражнения.
    answerStyle: null, // Стиль при клике на ответ.
    exercises: null// Список упражнений. Слово и несколько вариантов перевода.
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
        case FETCH_EXERCISES_START:
            return {
                ...state,
                loader: true,

            }
        case FETCH_EXERCISES_SUCCESS:
            return {
                ...state,
                exercises: action.exercises,
                loader: false,

            }
        case FETCH_EXERCISES_ERROR:
            return {
                ...state,
                loader: true,
                error: action.error
            }
        case CLICK_EVENT_ANSWER_SUCCESS:
            return {
                ...state,
                answerStyle: action.answerStyle,
                NumberOfCorrectResults: action.NumberOfCorrectResults
            }
        case CLICK_EVENT_ANSWER_IS_FINISHED:
            return {
                ...state,
                isFinished: action.isFinished
            }
        case CLICK_EVENT_ANSWER_ERROR:
            return {
                ...state,
                answerStyle: action.answerStyle,
                results: action.results
            }
        case CLICK_EVENT_ANSWER_NEXT:
            return {
                ...state,
                activeExercise: action.activeExercise,
                answerStyle: action.answerStyle,
                results: action.results
            }
        case CLICK_EVENT_REPEAT_EXERCISE:
            return {
                ...state,
                results: action.results,
                NumberOfCorrectResults: action.NumberOfCorrectResults,
                isFinished: action.isFinished,
                activeExercise: action.activeExercise,
                answerStyle: action.answerStyle,
            }

        default:
            return state
    }
}

export default exerciseReducer