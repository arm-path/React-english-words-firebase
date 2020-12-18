import React from 'react'
import Button from '../../UI/Button/Button'
import classes from './FinishTheExercise.module.css'


const FinishTheExercise = props => {
    return (
        <div className={classes.FinishTheExercise}>
            <h3>Exercises completed</h3>
            <ul>
                {props.exercises.map((obj, index) => { // Итерация по списку упражнений
                    let styleIcon = [ // Определение стиля для иконки.
                        'fa',
                        props.results[index] === 'success' ? 'fa-check' : 'fa-times',
                        // Получения значения объекта по ключу - Индекс вопроса, и сравнивание со значениями success или error.
                        classes[props.results[index]] // Класс error или success из css файла.
                    ]
                    return (
                        <li key={index}>
                            {index + 1}. &nbsp; {obj.question} &nbsp;
                            <i className={styleIcon.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Количество вопросов: {props.exercises.length}<br/>
                Правильных ответов: {props.NumberOfCorrectResults}</p>
            <Button onClick={props.clickEventRepeatExercise} type='dark'>Repeat</Button>
        </div>
    )
}

/*
  props.exercises: Список упражнений. Слово и несколько вариантов перевода.
  props.results: Результаты. {id-exercise: error or success}
  props.NumberOfCorrectResults: Количество правильных ответов.
  props.clickEventRepeatExercise: Функция обнуления state.
*/

export default FinishTheExercise