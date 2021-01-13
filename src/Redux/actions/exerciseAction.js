import axios from 'axios'
import {FETCH_EXERCISES_TOPICS_ERROR, FETCH_EXERCISES_TOPICS_START, FETCH_EXERCISES_TOPICS_SUCCESS} from './typeAction'

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