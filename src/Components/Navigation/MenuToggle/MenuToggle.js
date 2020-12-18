import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = props => {

    const clsMenuToggle = [classes.MenuToggle, 'fa']

    if (props.isOpen) {
        clsMenuToggle.push('fa-times')
        clsMenuToggle.push(classes.Open)
    } else {
        clsMenuToggle.push('fa-bars')
    }
    return (
        <i onClick={props.clickEventMenuToggle} className={clsMenuToggle.join(' ')}></i>
    )
}

/* Fragments/Layout/Layout ---> props
     props.isOpen: Панель навигации. Закрывает и открывает менью.
     props.clickEventMenuToggle: ССобытие клика по иконке крестика или менью бара.
*/

export default MenuToggle