import React, {Component} from 'react'
import Layout from './Fragments/Layout/Layout'
import Exercises from './BasicComponents/Exercises/Exercises'


class App extends Component {
    render() {
        return (
            <Layout>
                <Exercises/>
            </Layout>
        )
    }
}

export default App;
