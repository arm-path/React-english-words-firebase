import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import ActiveExercise from '../../Components/Exercise/ActiveExercise/ActiveExercise'
import FinishTheExercise from '../../Components/Exercise/FinishTheExercise/FinishTheExercise'
import Loader from '../../Components/UI/Loader/Loader'
import {clickEventAnswer, clickEventRepeatExercise, fetchExercises} from '../../Redux/actions/exerciseAction'

import classes from './Exercises.module.css'


class Exercises extends React.Component {


    clickEventRepeatExercise = () => { // Возвращение state в первоначальное положение.
        this.setState({
            results: {},
            NumberOfCorrectResults: 0,
            isFinished: false,
            activeExercise: 0,
            answerStyle: null,
        })

    }

    componentDidMount() {
        console.log(this.props)
        console.log(this.props.match.params.id)
        this.props.fetchExercises(this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Exercises}>
                <div>
                    <h1>Learning English</h1>
                    {this.props.loader && !this.props.exercises ?
                        <Loader/> :
                        this.props.isFinished
                            ? <FinishTheExercise  // Components/Exercise/FinishTheExercise/FinishTheExercise
                                results={this.props.results} // Результаты. {id-exercise: error or success}
                                exercises={this.props.exercises} // Список упражнений. Слово и несколько вариантов перевода.
                                NumberOfCorrectResults={this.props.NumberOfCorrectResults} // Количество правильных ответов.
                                clickEventRepeatExercise={() => this.props.clickEventRepeatExercise()} // Функция обнуления state.
                            />
                            : <ActiveExercise // Components/Exercise/ActiveExercise/ActiveExercise
                                answers={this.props.exercises[this.props.activeExercise].answers} // Список вариантов ответа, вариантов перевода.
                                question={this.props.exercises[this.props.activeExercise].question} // Вопрос, слово для перевода.
                                exercisesNumber={this.props.activeExercise + 1} // Номер текущего упражнения.
                                exercisesNumbers={this.props.exercises.length} // Общее количество упражнений.
                                answerStyle={this.props.answerStyle} // Стиль ответа.
                                clickEventAnswer={this.props.clickEventAnswer} // Событие клика по ответу.
                            />
                    }

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loader: state.getExercises.loader, // Управление компонентом Loader, показывать-скрывать.
        results: state.getExercises.results, // Результаты. {id-exercise: error or success}
        NumberOfCorrectResults: state.getExercises.NumberOfCorrectResults, // Количество правильных резултатов.
        isFinished: state.getExercises.isFinished, // Завершение упражнений.
        activeExercise: state.getExercises.activeExercise, // Активное упражнение. Id упражнения.
        answerStyle: state.getExercises.answerStyle, // Стиль при клике на ответ.
        exercises: state.getExercises.exercises// Список упражнений. Слово и несколько вариантов перевода.
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExercises: (id) => dispatch(fetchExercises(id)),
        clickEventAnswer: (id) => dispatch(clickEventAnswer(id)),
        clickEventRepeatExercise: ()=>dispatch(clickEventRepeatExercise())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Exercises))