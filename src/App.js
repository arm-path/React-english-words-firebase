import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {autoTimeLogin} from './Redux/actions/authorizationAction'
import Layout from './Fragments/Layout/Layout'
import ExerciseTopics from './BasicComponents/ExerciseTopics/ExerciseTopics'
import Exercises from './BasicComponents/Exercises/Exercises'
import CreateExercise from './BasicComponents/CreateExercise/CreateExercise'
import Authorization from './BasicComponents/Authorization/Authorization'
import Logout from './BasicComponents/Logout/Logout'




class App extends Component {

    componentDidMount(){
        this.props.autoTimeLogin()
    }

    render() {
        let route = (<Switch>
            <Route path='/exercise/:id' component={Exercises}/>
            <Route path='/authorization' component={Authorization}/>
            <Route path='/' exact component={ExerciseTopics}/>
        </Switch>)

        if (this.props.isAuthenticated) {
            route = (<Switch>
                <Route path='/exercise/:id' component={Exercises}/>
                <Route path='/' exact component={ExerciseTopics}/>
                <Route path='/create' exact component={CreateExercise}/>
                <Route path='/logout' exact component={Logout}/>
            </Switch>)
        }

        return (
            <Layout>
                {route}
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.authorization.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        autoTimeLogin: () => dispatch(autoTimeLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
