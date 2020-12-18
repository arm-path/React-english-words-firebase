import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Layout from './Fragments/Layout/Layout'
import Exercises from './BasicComponents/Exercises/Exercises'
import CreateExercise from './BasicComponents/CreateExercise/CreateExercise'


class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/' exact component={Exercises}/>
                    <Route path='/create' component={CreateExercise} exact/>
                </Switch>
            </Layout>
        )
    }
}

export default App;
