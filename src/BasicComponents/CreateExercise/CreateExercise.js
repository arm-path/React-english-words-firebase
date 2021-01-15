import React from 'react'
import {connect} from 'react-redux'
import Auxiliary from '../../Fragments/Auxiliary/Auxiliary'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import Select from '../../Components/UI/Select/Select'
import classes from './CreateExercise.module.css'
import {
    clickEventAddExercise, clickEventAddExercises,
    onChangeEventInput,
    onChangeEventThemeInput,
    onChangeSelect
} from '../../Redux/actions/createExerciseAction'


class CreateExercise extends React.Component {

    preventDefaultSubmit = event => {
        event.preventDefault()
    }

    renderInput() { // Функция для получения и отображения полей Input.
        return Object.keys(this.props.formControl).map((obj, index) => {
            let control = this.props.formControl[obj]
            return (
                <Auxiliary key={index}>
                    <Input // ---> Components/UI/Input/Input
                        value={control.value}
                        label={control.label}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={true}
                        errorMessage={control.errorMessage}
                        onChange={event => this.props.onChangeEventInput(event, obj)}
                    />
                </Auxiliary>
            )
        })
    }

    render() {
        let select = <Select  // Переменная для получения и отображения поля Select.
            // ---> Components/UI/Select/Select
            value={this.props.correctAnswer}
            label='Choose the correct translate'
            onChange={(event) => this.props.onChangeSelect(event)}
            options={[ // Варианты выбора.
                {'text': 1, 'value': 1},
                {'text': 2, 'value': 2},
                {'text': 3, 'value': 3},
                {'text': 4, 'value': 4},
            ]}
        />

        let inputTheme = <Input // Input темы упражнения.
            {...this.props.theme}
            onChange={event => this.props.onChangeEventThemeInput(event)}
        />

        return (
            <div className={classes.CreateExercise}>
                <div>
                    <h1>Adding a word</h1>
                    <form onSubmit={event => this.preventDefaultSubmit(event)}>
                        {this.renderInput()}
                        {select}
                        {this.props.exercises.length === 0 ? null : inputTheme}
                        <Button
                            onClick={this.props.clickEventAddExercise}
                            type='dark'
                            disabled={!this.props.isFormValid}>Add Exercise
                        </Button>
                        <Button
                            onClick={this.props.clickEventAddExercises}
                            type='dark'
                            disabled={this.props.exercises.length === 0 || this.props.theme.value === ''}>Add Exercises
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.createExercises.theme,
        exercises: state.createExercises.exercises, // Список добавленных упражнений.
        isFormValid: state.createExercises.isFormValid, // Определяет валидацию формы.
        correctAnswer: state.createExercises.correctAnswer, // Правильный вариант ответа.
        formControl: state.createExercises.formControl,
        error: state.createExercises.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeEventInput: (event, obj) => dispatch(onChangeEventInput(event, obj)),
        onChangeSelect: (event) => dispatch(onChangeSelect(event)),
        onChangeEventThemeInput: (event) => dispatch(onChangeEventThemeInput(event)),
        clickEventAddExercise: ()=> dispatch(clickEventAddExercise()),
        clickEventAddExercises: ()=> dispatch(clickEventAddExercises())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExercise)