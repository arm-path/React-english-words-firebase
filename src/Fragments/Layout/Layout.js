import React from 'react'
import Menu from '../../Components/Navigation/Menu/Menu'
import MenuToggle from '../../Components/Navigation/MenuToggle/MenuToggle'
import classes from './Layout.module.css'


class Layout extends React.Component {
    state = {isOpen: false} // Панель навигации. Закрывает и открывает менью.

    clickEventMenuToggle = () => { // Событие клика по иконке крестика или менью бара.
        this.setState({isOpen: !this.state.isOpen})
    }

    clickEventMenuBackground = () => { // Событие клика за пределами менью. Закрывает менью.
        this.setState({isOpen: false})
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Menu // Менью.
                    isOpen={this.state.isOpen}
                    clickEventMenuBackground={this.clickEventMenuBackground}
                />
                <MenuToggle // Иконки менью. Крестик и менью бар.
                    isOpen={this.state.isOpen}
                    clickEventMenuToggle={this.clickEventMenuToggle}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout