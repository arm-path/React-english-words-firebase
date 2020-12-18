import React from 'react'
import classes from './Select.module.css'


const Select = props => {
    const idSelect = `props.label-${Math.random()}`
    return (
        <div className={classes.Select}>
            <label htmlFor={idSelect}>{props.label}</label>
            <select
                id={idSelect}
                value={props.value}
                onChange={props.onChange}>
                {props.options.map((obj, index) => {
                    return (
                        <option key={index} defaultValue={obj.value}>
                            {obj.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

/*
    props.label: Текст для тега label.
    props.value: Атрибут value в select.
    props.onChange: Событие изменения в select.
    props.options: Список для выбора для поля select.
    [{'value': 1, 'text': 1}{'value': 2, 'text': 2}{'value': 3, 'text': 3}{'value': 4, 'text': 4}]

*/

export default Select