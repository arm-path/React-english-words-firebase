import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchExercisesTopics} from '../../Redux/actions/exerciseAction'
import Loader from '../../Components/UI/Loader/Loader'
import classes from './ExerciseTopics.module.css'


class ExerciseTopics extends React.Component {

    ExerciseTopicsList = () => {
        return this.props.topics.map((obj, index) => {
            return (
                <li key={obj.key}>
                    <NavLink to={'/exercise/' + obj.key}>{index + 1}. {obj.theme}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        console.log(this.props)
        this.props.fetchExercisesTopics()
        console.log(this.props)
    }

    render() {
        return (
            <div className={classes.ExerciseTopics}>
                <div>
                    <h1>Exercise Topics</h1>
                    {this.props.loader && this.props.topics.length !== 0 ? <Loader/> :
                        <ul>
                            {this.ExerciseTopicsList()}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        topics: state.getExercises.topics,
        loader: state.getExercises.loader,
        error: state.getExercises.error,
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchExercisesTopics: () => dispatch(fetchExercisesTopics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseTopics)