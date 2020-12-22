import React from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import Loader from '../../Components/UI/Loader/Loader'
import classes from './ExerciseTopics.module.css'


class ExerciseTopics extends React.Component {

    state = {
        topics: [],
        loader: true
    }

    ExerciseTopicsList = () => {
        return this.state.topics.map((obj, index) => {
            return (
                <li key={obj.key}>
                    <NavLink to={'/exercise/' + obj.key}>{index + 1}. {obj.theme}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            let response = await axios.get('https://learn-english-aab4b-default-rtdb.firebaseio.com/exercises.json')
            let topics = []
            Object.keys(response.data).forEach((key, value) => {
                Object.keys(response.data[key]).forEach((theme) => {
                    topics.push({key: key, theme: theme})
                })
            })
            this.setState({topics, loader: false})
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.ExerciseTopics}>
                <div>
                    <h1>Exercise Topics</h1>
                    {this.state.loader ? <Loader/> :
                        <ul>
                            {this.ExerciseTopicsList()}
                        </ul>
                    }

                </div>
            </div>
        )
    }
}

export default ExerciseTopics