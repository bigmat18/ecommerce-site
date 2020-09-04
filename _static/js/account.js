import { getUser, getDate, logout } from './components/user.js'
import { getItems } from './components/item.js'
import ItemUI from './UI/itemUI.js'
import { apiService } from './service/api.service.js'

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    document.getElementById('popupClose').click()
}


const username = document.getElementById('username')
const email = document.getElementById('email')
const firstName = document.getElementById('firstName')
const secondName = document.getElementById('secondName')
const cartItem = document.getElementById('cartItem')
const dataJoined = document.getElementById('dataJoined')
const avatar = document.getElementById('avatar')
const title = document.getElementById('title')

const itemUI = new ItemUI
logout()

getUser().then(data => {

    if(data.username) username.innerHTML = data.username
    else username.innerHTML = "Username assente"

    if(data.email) email.innerHTML = data.email
    else email.innerHTML = "Email assente"
    
    if(data.first_name != "" && data.last_name) firstName.innerHTML = data.first_name
    else firstName.innerHTML = "Nome assente"

    if(data.last_name != "" && data.last_name) secondName.innerHTML = data.last_name
    else secondName.innerHTML = "Cognome assente"

    if(data.cart_number_item) cartItem.innerHTML = `${data.cart_number_item} oggetti`
    else cartItem.innerHTML = "0 oggetti"

    if(data.date_joined) dataJoined.innerHTML = getDate(data.date_joined)
    else dataJoined.innerHTML = "Data non trovata"

    if(data.avatar) avatar.src = data.avatar

    if(data.first_name != "" && data.last_name != "" && data.last_name && data.first_name) title.innerHTML = `Benvenuto ${data.first_name} ${data.last_name}`
    else if(data.username) title.innerHTML = `Benvenuto ${data.username}`
    else title.innerHTML = "Devi accedere per vedere i dati"

    if(data.is_superuser){
        const loadItem = document.getElementById('loadItem')
        const newItem = document.getElementById('newItem')

        getItems(null).then(data => {
            itemUI.addItemList(data)
        })
    
        let next = 2
        loadItem.addEventListener('click', function(e) {
            getItems(JSON.stringify(next)).then(data => {
                if (next!=null){
                    itemUI.addItemList(data)
                    if (data.next == null){
                        loadItem.remove()
                    }
                }
            })
            next++
        })

        newItem.addEventListener('click', function(e) {
            const formTitle = document.getElementById('formTitle')
            const formDescription = document.getElementById('formDescription')
            const formPrice = document.getElementById('formPrice')
            const formDiscount = document.getElementById('formDiscount')
            const formImage = document.getElementById('formImage')
            const imagePicker = document.getElementById('imagePicker')
            formImage.innerHTML = `Seleziona immagine`

            document.getElementById('popupClose').addEventListener('click', (e)=>{
                formTitle.value = ""
                formDescription.value = ""
                formPrice.value = ""
                formDiscount.value = ""
                formImage.innerHTML = `Seleziona immagine`
            })

            var old_element = document.getElementById("updateButton")
            var new_element = old_element.cloneNode(true)
            old_element.parentNode.replaceChild(new_element, old_element)
            const updateButton = document.getElementById('updateButton')
            updateButton.addEventListener('click', (e) => {
                if(formTitle.value && formDescription.value && formPrice.value && formDiscount.value){
                        if(formTitle.value.length <= 20) {
                            if(formDiscount.value>=0 && formDiscount.value<100) {
                                apiService(`/api/items/`, 'POST', 
                                {title: formTitle.value, description: formDescription.value, 
                                    price: formPrice.value, discountValue: formDiscount.value})
                                .then(item => {
                                    const fd = new FormData();
                                    fd.append('image', imagePicker.files[0]);
                                    const config = {
                                        method: 'PUT',
                                        body: fd,
                                        headers: {'Authorization': `Token ${localStorage.getItem('token')}`}
                                    }
                                    fetch(`/api/items/${item.slug}/image/`, config)
                                     .catch(error => console.log(error))
                                })
                                document.getElementById('popupClose').click()
                                window.location.reload() 
                            }else{
                                const form = document.getElementById('form')
                                if(form.querySelector("#error")){
                                    form.querySelector("#error").innerHTML = "Lo sconte deve essere tra 0 e 99 %"
                                }else {
                                    const newError = document.createElement('p')
                                    newError.classList.add("form__error")
                                    newError.id = "error"
                                    newError.innerHTML = "Lo sconte deve essere tra 0 e 99 %"
                                    form.appendChild(newError)
                                }
                                e.preventDefault()
                            }
                        }else{
                            const form = document.getElementById('form')
                            if(form.querySelector("#error")){
                                form.querySelector("#error").innerHTML = "Il titolo non deve superare i 20 caratteri"
                            }else {
                                const newError = document.createElement('p')
                                newError.classList.add("form__error")
                                newError.id = "error"
                                newError.innerHTML = "Il titolo non deve superare i 20 caratteri"
                                form.appendChild(newError)
                            }
                            e.preventDefault()
                        }
                }
            })
        })
    }
})






