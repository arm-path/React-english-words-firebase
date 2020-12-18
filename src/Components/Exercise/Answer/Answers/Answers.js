import React from 'react'
import Answer from '../Answer/Answer'
import classes from './Answers.module.css'


const Answers = props => {
    return (
        <ul className={classes.Answers}>
            {props.answers.map((obj, index) => {
                // Итерация списка ответов, вариантов перевода.
                // 'answers': [{'text': 'Выбрать', id: 1}, {'text': 'Вставить', id: 2}, {'text': 'Вырезать', id: 3}]
                return (
                    <Answer // Components/Exercise/Answer/Answer/Answer
                        key={index}
                        answer={obj} // Конкретный ответ, перевод. Отдельный элемент из списка.
                        clickEventAnswer={props.clickEventAnswer}
                        answerStyle={props.answerStyle ? props.answerStyle[obj.id] : null}
                    />
                )
            })}
        </ul>
    )
}

/*
    props.answers: Список вариантов ответа, вариантов перевода.
    props.clickEventAnswer: Событие клика по ответу, переводу.
    props.answerStyle: Стиль ответа.
*/

export default Answers