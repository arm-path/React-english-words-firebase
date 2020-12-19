import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Layout from './Fragments/Layout/Layout'
import ExerciseTopics from './BasicComponents/ExerciseTopics/ExerciseTopics'
import Exercises from './BasicComponents/Exercises/Exercises'
import CreateExercise from './BasicComponents/CreateExercise/CreateExercise'
import Authorization from './BasicComponents/Authorization/Authorization'


class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/' exact component={ExerciseTopics}/>
                    <Route path='/exercise/:id' component={Exercises}/>
                    <Route path='/create' component={CreateExercise} exact/>
                    <Route path='/Authorization' component={Authorization}/>
                </Switch>
            </Layout>
        )
    }
}

export default App;
