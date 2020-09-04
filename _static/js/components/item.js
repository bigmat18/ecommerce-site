import { apiService } from '../service/api.service.js'

async function getItems(endpointNext){
    let endpoint = `/api/items/`
    if (endpointNext) endpoint += `?page=${endpointNext}`
    let itemList
    await apiService(endpoint)
     .then(result => itemList = result)
     .catch(error => itemList = error)
    return itemList
}

async function getItemVotes(itemSlug){
    const endpoint = `/api/items/${itemSlug}/votes/`
    let voteList
    await apiService(endpoint)
     .then(result => voteList = result)
     .catch(error => voteList = error)
    return voteList
}


function getPrice(item) { 
    if(item != null){
        let price = item.price - (item.price * (item.discountValue/100)) 
        return (Math.round((price + Number.EPSILON) * 10) / 10)
    }else{
        return "Item non valido"
    }
}

function getVote(vote, length) {
    let voteTot = 0
    vote.forEach(v => {voteTot+=v.vote})
    voteTot = voteTot / length
    let half = voteTot - Math.floor(voteTot)
    if (half >= 0.4 && half <= 0.6) { voteTot = Math.floor(voteTot) + 0.5 }
    else if (half > 0.6) { voteTot = Math.ceil(voteTot) }
    else if (half < 0.4) { voteTot = Math.floor(voteTot) }

    return voteTot
}

function deleteItem(slug) {
    const endpoint = `/api/items/${slug}/`
    apiService(endpoint, 'DELETE')
}

export { getItems, getItemVotes, getPrice, getVote, deleteItem }
