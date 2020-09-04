import { apiService } from './service/api.service.js'
import LoginRegistrationUI from './UI/logRegUI.js'

const loginButton = document.getElementById('loginButton')
const loginUI = new LoginRegistrationUI
let name = document.getElementById('name')
let password = document.getElementById('password')

loginButton.addEventListener('click', (e) => {
    if(name.value && password.value){
        apiService('/api/rest-auth/login/', 'POST', { username: name.value, password: password.value })
         .then(data => {
            loginUI.resetInput([name, password])
            if(data.non_field_errors) loginUI.addError(data.non_field_errors)
            else {
                loginUI.addSuccess('Hai effetuato il login con successo ora torna alla <a href="/" class="login-registration__link--green">Homepage</a>')
                localStorage.setItem("token", data.key)
            }
         })
    }
    e.preventDefault()
}) 
