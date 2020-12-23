import React from 'react'
import axios from 'axios'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import {createFormControl, validateInput, validateForm} from "../../Form/FormControl/formControl";
import classes from './Authorization.module.css'


class Authorization extends React.Component {

    state = {
        isFormValid: false,
        formControl: {
            emailControl: createFormControl({ // Данные поля e-mail.
                type: 'email',
                label: 'Email',
                errorMessage: 'Please enter correct email',
            }, {
                required: true,
                email: true
            }),
            passwordControl: createFormControl( // Данные поля password.
                {
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Please enter correct password'
                },
                {
                    required: true,
                    minLength: 6
                })
        }
    }

    clickEventLogin = async () => { // Событие клика по кнопке логин.
        try {
            let date = {
                email: this.state.formControl.emailControl.value,
                password: this.state.formControl.passwordControl.value,
                returnSecureToken: true
            }
            let response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0TQJmq0crWnvnhFQONMxqJfNNN8nk0IU', date)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    clickEventRegistration = async () => { // Событие клика по кнопке регистрация.
        try {
            let date = {
                email: this.state.formControl.emailControl.value,
                password: this.state.formControl.passwordControl.value,
                returnSecureToken: true
            }
            let response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0TQJmq0crWnvnhFQONMxqJfNNN8nk0IU', date)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    submitForm = event => { // Событие отмены стандартного поведения submit у формы.
        event.preventDefault()
    }


    onChangeEventInput(event, obj) { // Событие изменения поля Input.
        let formControl = {...this.state.formControl}
        let control = {...formControl[obj]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateInput(control.value, control.validation)

        formControl[obj] = control

        let isFormValid = validateForm(formControl)

        this.setState({formControl, isFormValid})
    }

    renderInput() { // Функция построения полей input.
        return Object.keys(this.state.formControl).map((obj, index) => {
            let control = this.state.formControl[obj]
            return (
                <Input
                    key={obj + '_' + index}
                    value={control.value}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={true}
                    onChange={event => this.onChangeEventInput(event, obj)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Authorization}>
                <div>
                    <h1>Authorization and registration</h1>
                    <form onSubmit={this.submitForm}>
                        {this.renderInput()}
                        <Button onClick={this.clickEventLogin}
                                disabled={!this.state.isFormValid}> Login
                        </Button>
                        <Button onClick={this.clickEventRegistration}
                                type='dark'
                                disabled={!this.state.isFormValid}> Registration
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Authorization