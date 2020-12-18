import React from 'react'
import classes from './Input.module.css'


const isInvalid = ({valid, touched, shouldValidate}) => { // Валидация полей input.
    return !valid && shouldValidate && touched
}


const Input = props => {

    let clsInput = [classes.Input]
    let type = props.type || 'text'
    let idInput = type + '_' + Math.random()

    if (isInvalid(props)) {
        clsInput.push(classes.invalid)
    }

    return (
        <div className={clsInput.join(' ')}>
            <label htmlFor={idInput}>{props.label}</label>
            <input
                type={type}
                id={idInput}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props) ?
                    <span>{props.errorMessage || 'Fields filled in incorrectly'}</span> :
                    null
            }
        </div>
    )
}

/*
    props.label: Текст для тега label.
    props.type: Атрибут type в input.
    props.value: Атрибут value в input.
    props.onChange: Событие изменения в input.
    props.errorMessage: Текст сообщения при возникновении ошибки.
    props.valid: Проверяет валидацию input. true - Поле является провалидированным.
    props.shouldValidate - Проверяет необходимость валидирования input.
    props.touched - Проверяет,  был ли ввод данных в input.
*/

export default Input