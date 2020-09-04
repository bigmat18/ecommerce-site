import ItemUI from './UI/itemUI.js'
import { getItems } from './components/item.js'
import { logout } from './components/user.js'


const itemUI = new ItemUI
const loadItem = document.getElementById('loadItem')


getItems(null).then(data => {
    itemUI.addItemRow(data)
})

let next = 2
loadItem.addEventListener('click', function(e) {
    getItems(JSON.stringify(next)).then(data => {
        if (next!=null){
            itemUI.addItemRow(data)
            if (data.next == null){
                loadItem.remove()
            }
        }
    })
    next++
})

logout()


