import React from 'react'
import axios from 'axios'
import Auxiliary from '../../Fragments/Auxiliary/Auxiliary'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import Select from '../../Components/UI/Select/Select'
import {createFormControl, validateForm, validateInput} from '../../Form/FormControl/formControl'
import classes from './CreateExercise.module.css'


let CreateAnswerOptions = (index) => {
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

let CreateThemeExercises = () => {
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

let primaryFormControl = () => {
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


class CreateExercise extends React.Component {

    state = {
        theme: CreateThemeExercises(),
        exercises: [], // Список добавленных упражнений.
        isFormValid: false, // Определяет валидацию формы.
        correctAnswer: 1, // Правильный вариант ответа.
        formControl: primaryFormControl()
    }

    preventDefaultSubmit = event => { // Отменяет стандартное поведение submit формы.
        event.preventDefault()
    }


    clickEventAddExercise = () => { // Событие клика по кнопке, добавление в список упражнений.
        let exercises = [...this.state.exercises]
        let stateCopy = {...this.state}
        let formControl = {...stateCopy.formControl}
        let exercise = { // Построение объекта для списка упражнений.
            'question': formControl.question.value,
            'answers': [
                {'text': formControl.answer1.value, 'id': formControl.answer1.id},
                {'text': formControl.answer2.value, 'id': formControl.answer1.id},
                {'text': formControl.answer3.value, 'id': formControl.answer1.id},
            ],
            'correctAnswerId': stateCopy.correctAnswer
        }

        exercises.push(exercise) // Добавление объекта в список упражнений.
        this.setState({
            exercises,
            formControl: primaryFormControl(),
            isFormValid: false,
            correctAnswer: 1,
        })
    }


    clickEventAddExercises = async () => { // Работа с сервером, добавление в БД.
        if (this.state.theme.value !== '') {
            try {
                let data = {} // {Тема: [Упражнения]}
                data[this.state.theme.value] = this.state.exercises
                await axios.post('https://learn-english-aab4b-default-rtdb.firebaseio.com/exercises.json', data)
                this.setState({
                    theme: CreateThemeExercises(),
                    exercises: [],
                    formControl: primaryFormControl(),
                    isFormValid: false,
                    correctAnswer: 1,
                })

            } catch (e) {
                console.log(e)
            }
        }
    }


    onChangeEventInput = (event, obj) => { // События изменения полей Input.
        let formControl = {...this.state.formControl}
        let control = formControl[obj]

        control.value = event.target.value
        control.touched = true
        control.valid = validateInput(control.value, control.validation)

        formControl[obj] = control

        let isFormValid = validateForm(formControl)

        this.setState({formControl, isFormValid})
    }


    renderInput() { // Функция для получения и отображения полей Input.
        return Object.keys(this.state.formControl).map((obj, index) => {
            let control = this.state.formControl[obj]
            return (
                <Auxiliary key={index}>
                    <Input // ---> Components/UI/Input/Input
                        value={control.value}
                        label={control.label}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={true}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeEventInput(event, obj)}
                    />
                </Auxiliary>
            )
        })
    }

    onChangeSelect = event => { // Изменение state правильного ответа.
        let correctAnswer = event.target.value
        this.setState({correctAnswer})
    }


    onChangeEventThemeInput = (event, obj) => { // Изменение state -> theme. Получение темы упражнения в value.
        obj.value = event.target.value
        obj.touched = true
        obj.valid = validateInput(obj.value, obj.validation)
        this.setState({theme: obj})
    }

    render() {
        let select = <Select  // Переменная для получения и отображения поля Select.
            // ---> Components/UI/Select/Select
            value={this.state.correctAnswer}
            label='Choose the correct translate'
            onChange={(event) => this.onChangeSelect(event)}
            options={[ // Варианты выбора.
                {'text': 1, 'value': 1},
                {'text': 2, 'value': 2},
                {'text': 3, 'value': 3},
                {'text': 4, 'value': 4},
            ]}
        />

        let inputTheme = <Input // Input темы упражнения.
            {...this.state.theme}
            onChange={event => this.onChangeEventThemeInput(event, this.state.theme)}
        />

        return (
            <div className={classes.CreateExercise}>
                <div>
                    <h1>Adding a word</h1>
                    <form onSubmit={event => this.preventDefaultSubmit(event)}>
                        {this.renderInput()}
                        {select}
                        {this.state.exercises.length === 0 ? null : inputTheme}
                        <Button
                            onClick={this.clickEventAddExercise}
                            type='dark'
                            disabled={!this.state.isFormValid}>Add Exercise
                        </Button>
                        <Button
                            onClick={this.clickEventAddExercises}
                            type='dark'
                            disabled={this.state.exercises.length === 0 || this.state.theme.value === ''}>Add Exercises
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateExercise