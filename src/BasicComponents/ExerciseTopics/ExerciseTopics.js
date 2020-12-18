import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './ExerciseTopics.module.css'


class ExerciseTopics extends React.Component {

    ExerciseTopicsList = () => {
        return ['Theme-1', 'Theme-2', 'Theme-3'].map((obj, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/exercise/' + obj}>{obj}</NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.ExerciseTopics}>
                <div>
                    <h1>Exercise Topics</h1>
                    <ul>
                        {this.ExerciseTopicsList()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ExerciseTopics