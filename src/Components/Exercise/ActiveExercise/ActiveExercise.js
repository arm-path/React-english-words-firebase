import React from 'react'
import Answers from '../Answer/Answers/Answers'
import classes from './ActiveExercise.module.css'


const ActiveExercise = props => (
    <div className={classes.ActiveExercise}>
        <p>
            <span> {props.question} </span>
            <small>{props.exercisesNumber} из {props.exercisesNumbers}</small>
        </p>
        <Answers // Components/Exercise/Answer/Answers/Answers
            answers={props.answers}
            clickEventAnswer={props.clickEventAnswer}
            answerStyle={props.answerStyle}
        />
    </div>
)

/*
    props.question: Вопрос, слово для перевода.
    props.exercisesNumber: Номер текущего упражнения.
    props.exercisesNumbers: Общее количество упражнений.
    props.answers: Список вариантов ответа, вариантов перевода.
    props.clickEventAnswer: Событие клика по ответу, переводу.
    props.answerStyle: Стиль ответа.
*/

export default ActiveExercise