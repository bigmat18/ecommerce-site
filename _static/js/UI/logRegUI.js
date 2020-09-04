export default class LoginRegistrationUI {
    
    constructor () {
        this.form = document.getElementById('form')
    }

    addError(error) {
        const newError = document.createElement('p')
        newError.classList.add("form__error")
        newError.innerHTML = error
        this.form.appendChild(newError)
    }

    addSuccess(content) {
        this.form.innerHTML = ""
        const other = document.getElementById('other')
        other.remove()
        const success = document.createElement('p')
        success.classList.add('form__success')
        success.innerHTML = content
        this.form.appendChild(success)
    }

    resetInput(input) {
        if (input){
            input.forEach(input => {
                input.value = ""
            })
        }
    }
}