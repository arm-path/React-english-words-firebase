import is from 'is_js'


export function createFormControl(conf, validation) {
    // Функция на основании полученных данных, возвращает дополненные данные, не обходимые для всех элементов формы,
    // требующих валидации.
    return {
        ...conf, // Конфигурации.
        validation, // Правила валидации.
        valid: !validation, // Если имеются правила валидации, тогда поле не является валидным, пока не пройдет проверку.
        touched: false, // Был ли изменен поле.
        value: '' // Значение поля.
    }
}

export function validateInput(value, validation = null) {
    // Функция валидации input полей.
    if (!validation) {
        return true // Если не определены правила валидации.
    }

    let isValid = true

    if (validation.required) { // Проверяет не пустое ли поле.
        isValid = value.trim() !== '' && isValid
    }

    if (validation.email) { // Проверяет является ли значение данного поля email.
        isValid = is.email(value) && isValid
    }

    if (validation.number) { // Проверяет является ли значение данного поля числом.
        isValid = is.number(value) && isValid
    }

    if (validation.number) { // Проверяет является ли значение данного поля url.
        isValid = is.url(value) && isValid
    }

    if (validation.minLength) { // Проверяет превышает ли поле минимальную длину.
        isValid = value.trim().length >= validation.minLength && isValid
    }

    return isValid
}

export function validateForm(formControl) {
    // Функция проверяет валидацию формы, проверяя все поля в форме на валидность.
    let isFormValid = true
    Object.keys(formControl).forEach(obj => {
        isFormValid = formControl[obj].valid && isFormValid
    })
    return isFormValid
}