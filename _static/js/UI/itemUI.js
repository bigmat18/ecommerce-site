import { apiService } from '../service/api.service.js'
import { getPrice, getVote, getItemVotes, deleteItem} from '../components/item.js'

export default class ItemUI {

     constructor() {
        this.itemList = document.getElementById("article-list")
    }

    async getStar() {
        let starFull, starHalf, starEmpty
        await apiService('/api/star/')
         .then(data => {
            starFull = data[0]
            starEmpty = data[1]
            starHalf = data[2]
         })
        return { starFull, starHalf, starEmpty }
    }

    async createItemAdmin(item, vote){
        let newItemFull
        await this.getStar()
         .then(data => {
            const newItem = `
               <div class="item__picture">
                   <img src="${item.image}" alt="">
               </div>
               <div class="item__content">
                   <h3 class="item__title">
                       ${item.title}
                   </h3>
                   <div class="item__vote">
                       ${this.createVoteToItem(vote, data, "item__star", "")}
                   </div>
                   <p class="item__description">
                       ${item.description}
                   </p>
               </div>
               <div class="item__price-detail">
                   <div class="item__price">
                       <p class="item__price--label">Prezzo</p>
                       <p class="item__price--price">€${item.price}</p>
                   </div>
                   <div class="item__price">
                       <p class="item__price--label">Sconto</p>
                       <p class="item__price--price">${item.discountValue}%</p>
                   </div>
               </div>
               <div class="item__action">
                    <div class="item__button" id="update">
                        <a class="item__action--label" href="#popup">Modifica</a>
                        <div class="item__action--button">
                            <a href="#popup"><img src="${DJANGO_URL_PENCIL}" alt="" class="item__img"></a>
                        </div>
                    </div>
                    <div class="item__button" id="delete">
                        <p class="item__action--label">Elimina</p>
                        <div class="item__action--button">
                            <img src="${DJANGO_URL_CROSS }" alt="" class="item__img">
                        </div>
                    </div>
                </div>`
           newItemFull = newItem
         })
         console.log
         return newItemFull
    }

    async createItem(item, vote){
        let newItemFull
        await this.getStar()
         .then(data => {
            const newItem = `
            <div class="col-1-of-4">
                <div class="card">
                    <div class="card__side card__side--front">
                        <div class="card__picture">
                            <img src="${item.image}" alt="">
                        </div>
                        <h4 class="card__heading">
                            <span class="card__heading-span">${item.title}</span>
                        </h4>
                        <div class="card__vote" id="card-vote">
                            ${this.createVoteToItem(vote, data, 'card__star', 'card__img')}
                        </div>
                    </div>
                    <div class="card__side card__side--back">
                        <div class="card__cta">
                            <div class="card__price-box">
                                <p class="card__price-only">Solo</p>
                                <p class="card__price-value">€ ${getPrice(item)}</p>
                            </div>
                            <a href="#popup" class="btn btn--white">Acquista ora!</a>
                        </div>
                    </div>
                </div>
            </div>`
            newItemFull = newItem
         })
         return newItemFull
    }

    createVoteToItem(vote, starList, classList, classImg){
        let stars
        if(vote==0 || isNaN(vote)) stars = [starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img]
        else if(vote==0.5) stars = [starList.starHalf.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img]
        else if(vote==1) stars = [starList.starFull.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img]
        else if(vote==1.5) stars = [starList.starFull.img, starList.starHalf.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img]
        else if(vote==2) stars = [starList.starFull.img, starList.starFull.img, starList.starEmpty.img, starList.starEmpty.img, starList.starEmpty.img]
        else if(vote==2.5) stars = [starList.starFull.img, starList.starFull.img, starList.starHalf.img, starList.starEmpty.img, starList.starEmpty.img]
        else if(vote==3) stars = [starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starHalf.img, starList.starEmpty.img]
        else if(vote==3.5) stars = [starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starHalf.img, starList.starEmpty.img]
        else if(vote==4) stars = [starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starEmpty.img]
        else if(vote==4.5) stars = [starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starHalf.img]
        else if(vote==5) stars = [starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starFull.img, starList.starFull.img]
        
        const newVote = `
        <ul>
            <li class="${classList}"><img class="${classImg}" src="${stars[0]}" alt=""></li>
            <li class="${classList}"><img class="${classImg}" src="${stars[1]}" alt=""></li>
            <li class="${classList}"><img class="${classImg}" src="${stars[2]}" alt=""></li>
            <li class="${classList}"><img class="${classImg}" src="${stars[3]}" alt=""></li>
            <li class="${classList}"><img class="${classImg}" src="${stars[4]}" alt=""></li>
        </ul>`
        return newVote
    }

    noItem() {
        this.itemList.innerHTML = 'NON CI SONO ARTICOLI'
        this.itemList.style.cssText =  `font-size: 30px;
                                        margin-top: 50px;`
    }

    addItemRow(itemList) {
        if (itemList != null ) {
            let row = document.createElement('div')
            row.classList.add("row")

            itemList.results.forEach(item => {
                getItemVotes(item.slug)
                .then(vote => {
                    this.createItem(item, getVote(vote, vote.length))
                    .then(data => {
                        row.innerHTML += data
                        this.itemList.appendChild(row)
                    })
                })
                .catch(error => console.log(error))
            })
        } else {
            this.noItem()
        }
    }

    addItemList(itemList) {
        if (itemList != null ) {
            itemList.results.forEach(item => {
                getItemVotes(item.slug)
                .then(vote => {
                    this.createItemAdmin(item, getVote(vote, vote.length))
                    .then(data => {
                        const newItem = document.createElement('div')
                        newItem.classList.add('item')
                        newItem.innerHTML = data
                        newItem.childNodes[7].childNodes[3].addEventListener('click', (e) => {
                            deleteItem(item.slug)
                            newItem.remove()
                        })
                        newItem.childNodes[7].childNodes[1].addEventListener('click', (e) => {
                            const formTitle = document.getElementById('formTitle')
                            const formDescription = document.getElementById('formDescription')
                            const formPrice = document.getElementById('formPrice')
                            const formDiscount = document.getElementById('formDiscount')
                            const formImage = document.getElementById('formImage')
                            const imagePicker = document.getElementById('imagePicker')

                            formTitle.value = item.title 
                            formDescription.value = item.description
                            formPrice.value = item.price
                            formDiscount.value = item.discountValue 
                            formImage.innerHTML = `Immagine selezionata: ${item.image}`
                            
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
                                                if(imagePicker.files) {
                                                    const fd = new FormData();
                                                    fd.append('image', imagePicker.files[0]);
                                                    const config = {
                                                        method: 'PUT',
                                                        body: fd,
                                                        headers: {'Authorization': `Token ${localStorage.getItem('token')}`}
                                                    }
                                                    fetch(`/api/items/${item.slug}/image/`, config)
                                                    .catch(error => console.log(error))
                                                }
                                                apiService(`/api/items/${item.slug}/`, 'PUT', 
                                                {title: formTitle.value, description: formDescription.value, 
                                                price: formPrice.value, discountValue: formDiscount.value})  
                                                document.getElementById('popupClose').click()
                                                window.location.reload();
                                            
                                        }else {
                                            const form = document.getElementById('form')
                                            if(form.querySelector("#error")){
                                                form.querySelector("#error").innerHTML = "Lo sconte deve essere tra 0 e 100 %"
                                            }else {
                                                const newError = document.createElement('p')
                                                newError.classList.add("form__error")
                                                newError.id = "error"
                                                newError.innerHTML = "Lo sconte deve essere tra 0 e 100 %"
                                                form.appendChild(newError)
                                            }
                                            e.preventDefault()
                                        }
                                    }else {
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
                        this.itemList.appendChild(newItem)
                    })
                })
                .catch(error => console.log(error))
            })
        } else {
            this.noItem()
        }
    }
}