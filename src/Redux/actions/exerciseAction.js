import axios from 'axios'
import {
    CLICK_EVENT_ANSWER_ERROR,
    CLICK_EVENT_ANSWER_IS_FINISHED, CLICK_EVENT_ANSWER_NEXT,
    CLICK_EVENT_ANSWER_SUCCESS, CLICK_EVENT_REPEAT_EXERCISE,
    FETCH_EXERCISES_ERROR,
    FETCH_EXERCISES_START, FETCH_EXERCISES_SUCCESS,
    FETCH_EXERCISES_TOPICS_ERROR,
    FETCH_EXERCISES_TOPICS_START,
    FETCH_EXERCISES_TOPICS_SUCCESS
} from './typeAction'

// Функции для использования в BasicComponents

export function fetchExercisesTopics() {
    return async dispatch => {
        dispatch(fetchExercisesTopicsStart())
        try {
            // Получение списка тестов по темам из backend.
            let response = await axios.get('https://learn-english-aab4b-default-rtdb.firebaseio.com/exercises.json')
            let topics = []
            Object.keys(response.data).forEach((key, value) => {
                Object.keys(response.data[key]).forEach((theme) => {
                    topics.push({key: key, theme: theme})
                })
            })
            dispatch(fetchExercisesTopicsSuccess(topics))
            // Успешное получения списка тестов по темам из backend.
        } catch (e) {
            dispatch(fetchExercisesTopicsError(e))
            // Ошибка при получении списка тестов по темам из backend.
        }
    }
}

export function fetchExercises(id) {
    return async dispatch => {
        dispatch(fetchExercisesStart())
        try {
            const response = await axios.get(`https://learn-english-aab4b-default-rtdb.firebaseio.com/exercises/${id}.json`)
            let exercises = Object.values(response.data)
            exercises = exercises[0]
            dispatch(fetchExercisesSuccess(exercises))

        } catch (e) {
            dispatch(fetchExercisesError(e))
        }
    }
}

export function clickEventAnswer(idAnswer) { // Событие клика по возможному ответу, переводу.
    // idAnswer: id ответа, получаемого в файле: src/Components/Exercise/Answer/Answer
    return (dispatch, getState) => {
        const state = getState().getExercises
        let results = state.results // Результаты. {id-exercise: error or success}
        let NumberOfCorrectResults = state.NumberOfCorrectResults // Количество правильных резултатов.

        if (state.exercises[state.activeExercise].correctAnswerId === idAnswer) {
            // Если ответ от пользователя является правильным.
            if (!results[state.activeExercise]) {
                // Если нет в объекте results ключа по id упражнения.
                results[state.activeExercise] = 'success'
                // Создание нового элемента объекта, по ключу который является id упражнения,
                // и присвоение ей значения - success.  {this.state.activeExercise: success}
                NumberOfCorrectResults++ // Увеличение количества правильных ответов.
            }

            dispatch(clickEventAnswerSuccess({[idAnswer]: 'success'}, NumberOfCorrectResults))

            const timeout = window.setTimeout(() => {
                // Устанавливает время задержки при клике. Задержка для отображения стилей при клике.
                if (state.activeExercise + 1 !== state.exercises.length) {
                    // Если упражнения остались. Если массив this.state.exercises не проитерирован.

                    dispatch( clickEventAnswerNext(state.activeExercise + 1, null, results))

                } else {
                    // Если больше нет вопросов. Если массив this.state.exercises  проитерирован.

                    dispatch(clickEventAnswerIsFinished(true))

                }
                window.clearTimeout(timeout)
            }, 150) // <--- Время задержки при клике.
        } else { // Если ответ от пользователя является неправильным.
            results[state.activeExercise] = 'error';
            // Создание нового элемента объекта, по ключу который равняется id упражнения,
            // и присвоение ей значения - error. {this.state.activeExercise: error}

            dispatch(clickEventAnswerError({[idAnswer]: 'error'}, results))
        }
    }
}

// Функции для использования в BasicComponent и передачи аргументов в exerciseReducer

export function clickEventRepeatExercise(){
    // Возвращение state в первоначальное положение.
    return {
        type: CLICK_EVENT_REPEAT_EXERCISE,
        results: {},
        NumberOfCorrectResults: 0,
        isFinished: false,
        activeExercise: 0,
        answerStyle: null,
    }
}

// Функции для передачи аргументов в exerciseReducer

export function fetchExercisesTopicsStart() {
    return {
        type: FETCH_EXERCISES_TOPICS_START
    }
}

export function fetchExercisesTopicsSuccess(topics) {
    return {
        type: FETCH_EXERCISES_TOPICS_SUCCESS,
        topics: topics
    }
}

export function fetchExercisesTopicsError(e) {
    return {
        type: FETCH_EXERCISES_TOPICS_ERROR,
        error: e
    }
}

export function fetchExercisesStart() {
    return {
        type: FETCH_EXERCISES_START
    }
}

export function fetchExercisesSuccess(exercises) {
    return {
        type: FETCH_EXERCISES_SUCCESS,
        exercises: exercises
    }
}

export function fetchExercisesError(e) {
    return {
        type: FETCH_EXERCISES_ERROR,
        error: e
    }
}

export function clickEventAnswerSuccess(answerStyle, NumberOfCorrectResults) {
    return {
        type: CLICK_EVENT_ANSWER_SUCCESS,
        answerStyle, NumberOfCorrectResults
    }
}

export function clickEventAnswerIsFinished(isFinished) {
    return {
        type: CLICK_EVENT_ANSWER_IS_FINISHED,
        isFinished
    }
}

export function clickEventAnswerError(answerStyle, results) {
    return {
        type: CLICK_EVENT_ANSWER_ERROR,
        answerStyle, results
    }
}

export function clickEventAnswerNext(activeExercise, answerStyle, results) {
    return {
        type: CLICK_EVENT_ANSWER_NEXT,
        activeExercise, answerStyle, results
    }
}