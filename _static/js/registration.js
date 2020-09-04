import { apiService } from './service/api.service.js'
import LoginRegistrationUI from './UI/logRegUI.js'

let email = document.getElementById('email')
let username = document.getElementById('username')
let password = document.getElementById('password')
let passwordConf = document.getElementById('passwordConf')
let buttonRegistration = document.getElementById('registrationButton')

const loginUI = new LoginRegistrationUI

buttonRegistration.addEventListener('click', (e) => {
    if(username.value && password.value && email.value && passwordConf.value){
        apiService('/api/rest-auth/registration/', 'POST', { username: username.value, 
            password1: password.value, password2: passwordConf.value, email: email.value })
         .then(data => {
            loginUI.resetInput([username, password, passwordConf, email])
            if(data.key) {
                loginUI.addSuccess('Hai effetuato la registrazione con successo ora torna alla <a href="/" class="login-registration__link--green">Homepage</a>')
                localStorage.setItem("token", data.key)
            } else {
                if(data.password1) {
                    data.password1.forEach(error => {loginUI.addError(error)})
                }
                if(data.email){
                    data.email.forEach(error => {loginUI.addError(error)})
                }
            }
         })
         .catch(error => {loginUI.addError("Errore registrazione")})
    }
    e.preventDefault()
})