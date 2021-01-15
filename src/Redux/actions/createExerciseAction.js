import {createFormControl, validateForm, validateInput} from "../../Form/FormControl/formControl";
import {
    ADD_IN_DB_LIST_EXERCISES,
    ADD_IN_DB_LIST_EXERCISES_ERROR,
    ADD_IN_LIST_EXERCISE,
    CHANGE_EVENT_THEME_INPUT,
    CHANGE_SELECT_CORRECT_ANSWER,
    VALIDATION_CHANGE_INPUT
} from './typeAction'
import axios from "axios";


export let CreateAnswerOptions = (index) => {
    // Формирует state.formControl[answer1, answer2, answer3, answer4]
    return createFormControl(
        { // Конфигурации для передачи в input.
            id: index,
            label: `Translation option ${index}`,
            errorMessage: 'The field cannot be empty'
        },
        { // Валидирование для передачи в input.
            required: true
        }
    )
}

export let CreateThemeExercises = () => {
    // Формирование темы упражнения. Функция для построения state и сброса после добавления упражнения.
    return createFormControl(  // Формирование данных для передачи в Input.
        {
            label: 'Theme exercises',
            errorMessage: 'Please enter a subject'
        },
        {
            required: true
        })
}

export let primaryFormControl = () => {
    return {
        question: createFormControl( // Вопрос, слово для перевода.
            { // Конфигурации для передачи в input.
                label: 'word',
                errorMessage: 'The field cannot be empty'
            },
            { // Валидирование для передачи в input.
                required: true // Поле обязательно для заполнения.
            }),
        // Варианты ответа, варианты перевода.
        answer1: CreateAnswerOptions(1),
        answer2: CreateAnswerOptions(2),
        answer3: CreateAnswerOptions(3),
    }
}


export function clickEventAddExercise() {
    // Событие клика по кнопке, добавление в список упражнений.
    return (dispatch, getState) => {
        const state = getState().createExercises
        let exercises = [...state.exercises]
        let stateCopy = {...state}
        let formControl = {...stateCopy.formControl}
        let exercise = { // Построение объекта для списка упражнений.
            'question': formControl.question.value,
            'answers': [
                {'text': formControl.answer1.value, 'id': formControl.answer1.id},
                {'text': formControl.answer2.value, 'id': formControl.answer2.id},
                {'text': formControl.answer3.value, 'id': formControl.answer3.id},
            ],
            'correctAnswerId': stateCopy.correctAnswer
        }
        exercises.push(exercise) // Добавление объекта в список упражнений.
        dispatch(addInListExercise(exercises, primaryFormControl(), false, 1))
    }
}

export function clickEventAddExercises() {
    // Работа с сервером, добавление в БД.
    return async (dispatch, getState) => {
        const state = getState().createExercises
        if (state.theme.value !== '') {
            try {
                let data = {} // {Тема: [Упражнения]}
                data[state.theme.value] = state.exercises
                await axios.post('https://learn-english-aab4b-default-rtdb.firebaseio.com/exercises.json', data)

                dispatch(addInDBListExercises(CreateThemeExercises(), [], primaryFormControl(), false, 1))

            } catch (e) {
                dispatch(addInDBListExercisesError(e))
            }
        }
    }
}

export function onChangeEventInput(event, obj) {
    // События изменения полей Input.
    return (dispatch, getState) => {
        const state = getState().createExercises
        let formControl = {...state.formControl}
        let control = formControl[obj]

        control.value = event.target.value
        control.touched = true
        control.valid = validateInput(control.value, control.validation)

        formControl[obj] = control

        let isFormValid = validateForm(formControl)

        dispatch(validationChangeInput(formControl, isFormValid))
    }
}


// CHANGE_EVENT_THEME_INPUT
export function onChangeEventThemeInput(event) {
    // Изменение state -> theme. Получение темы упражнения в value.
    return (dispatch, getState) =>{
        const obj = {...getState().createExercises.theme}

        obj.value = event.target.value
        obj.touched = true
        obj.valid = validateInput(obj.value, obj.validation)

        dispatch(changeEventThemeInput(obj))
    }

}

// CHANGE_EVENT_THEME_INPUT
function changeEventThemeInput(theme) {
    return {
        type: CHANGE_EVENT_THEME_INPUT,
        theme
    }
}

// CHANGE_SELECT_CORRECT_ANSWER
export function onChangeSelect(event) {
    // Изменение state правильного ответа.
    let correctAnswer = event.target.value
    return {
        type: CHANGE_SELECT_CORRECT_ANSWER,
        correctAnswer
    }
}

// ADD_IN_LIST_EXERCISE
export function addInListExercise(exercises, formControl, isFormValid, correctAnswer) {
    return {
        type: ADD_IN_LIST_EXERCISE,
        exercises, formControl, isFormValid, correctAnswer
    }
}

// ADD_IN_DB_LIST_EXERCISES
export function addInDBListExercises(theme, exercises, formControl, isFormValid, correctAnswer) {
    return {
        type: ADD_IN_DB_LIST_EXERCISES,
        theme, exercises, formControl, isFormValid, correctAnswer
    }
}

// ADD_IN_DB_LIST_EXERCISES_ERROR
export function addInDBListExercisesError(e) {
    return {
        type: ADD_IN_DB_LIST_EXERCISES_ERROR,
        error: e
    }
}

// VALIDATION_CHANGE_INPUT
export function validationChangeInput(formControl, isFormValid) {
    return {
        type: VALIDATION_CHANGE_INPUT,
        formControl, isFormValid
    }
}