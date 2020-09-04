/**
 * EasyHTTP library
 * Library for making HTTP requests
 * 
 * @version 3.0.0
 * @author Matteo Giuntoni
 * @license MIT
 * 
 */

import { CSRF_TOKEN } from "./csrf_token.js"

export default class EasyHTTP{

    // Make an HTTP GET request
    async get(url){
        const response = await fetch(url)
        const resData = await response.json()
        return resData
    }

    // Make an HTTP POST request
    async post(url, data){
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': CSRF_TOKEN
            }, body: JSON.stringify(data)
        })
        const resData = await response.json()
        return resData
    }

    // Make an HTTP PUT Request
    async put(url, data){
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': CSRF_TOKEN
            }, body: JSON.stringify(data)
        })
        const resData = await response.json()
        return resData
    }

    // Make an HTTP DELETE Request
    async delete(url){
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': CSRF_TOKEN
            }, body: JSON.stringify(data)
        })
        const resData = await 'Resource Deleted'
        return resData
    }
 }