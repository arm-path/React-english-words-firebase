import React from 'react'
import classes from './Answer.module.css'


const Answer = props => {

    const cls = [classes.Answer]

    if (props.answerStyle) {
        cls.push(classes[props.answerStyle])
    }
    return (
        <li onClick={() => props.clickEventAnswer(props.answer.id)} className={cls.join(' ')}>
            {/* onClick: Передача в функцию clickAnswers в файл Exercises id ответа, по которому был произведен клик */}
            {props.answer.text} {/*{'text': 'Выбрать', id: 1}*/}
        </li>
    )
}

/*
    props.answer: Элемент из списка ответов, переводов.
    props.clickEventAnswer: Событие клика по ответу, переводу.
    props.answerStyle: Стиль ответа.
*/

export default Answer