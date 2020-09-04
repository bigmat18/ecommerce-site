import { apiService } from '../service/api.service.js'

export default class User {
    constructor(username, email, firstName, secondName, avatarUrl, nCartItem) {
        this.username = username
        this.email = email
        this.firstName = firstName
        this.secondName = secondName
        this.avatarUrl = avatarUrl
        this.nCartItem = nCartItem
    }
}

async function getUser() {
    const endpoint = '/api/user/'
    let user = null
    await apiService(endpoint)
     .then(data => {user = data})
     .catch(error => {user = error})
    return user
}

function getDate(date) {
    const newDate = new Date(date)
    return (`${newDate.getDay()} - ${newDate.getMonth()} - ${newDate.getFullYear()}`)
} 

function logout(){
    const logout = document.getElementById('logout')
    if (logout != null){
        logout.addEventListener('click', (e) => {
            apiService('/api/rest-auth/logout/', 'POST')
        })
    }
}

export { getUser, getDate, logout }
