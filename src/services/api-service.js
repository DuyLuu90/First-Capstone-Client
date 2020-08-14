import config from '../config'
//import TokenService from './token-service'

export const GeneralApiServices= {
    getAllItems(dbName){
        return fetch(`${config.API_ENDPOINT}/${dbName}`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    postItem(dbName,item){
        //const proxy='https://cors-anywhere.herokuapp.com'
        return fetch(`${config.API_ENDPOINT}/${dbName}`,{
            method: `POST`,
            headers:{
                'Authorization': `Basic ${config.API_TOKEN}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(res=>(!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json())
    },
    getItemById(dbName,id){
        return fetch(`${config.API_ENDPOINT}/${dbName}/${id}`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    patchItemById(dbName,id,fieldsToUpdate){
        return fetch(`${config.API_ENDPOINT}/${dbName}/${id}`,{
            method: `PATCH`,
            headers:{
                'Authorization': `Basic ${config.API_TOKEN}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(fieldsToUpdate)
        })
        .then(res=>(!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json())
    },
    DeleteItemById(dbName,id){
        return fetch(`${config.API_ENDPOINT}/${dbName}/${id}`,{
            method: `DELETE`,
            headers:{
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res=>(!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json())
    },
}

export const MovieApiServices = {
    sortMovies(sortQuery){
        return fetch(`${config.API_ENDPOINT}/movies${sortQuery}`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    getMovieReviews(id){
        return fetch(`${config.API_ENDPOINT}/movies/${id}/reviews`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    getMovieCast(id){
        return fetch(`${config.API_ENDPOINT}/movies/${id}/cast`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    getMovieDirector(id){
        return fetch(`${config.API_ENDPOINT}/movies/${id}/director`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    postMovieCast(id,item){
        return fetch(`${config.API_ENDPOINT}/movies/${id}/cast`,{
            method: `POST`,
            headers:{
                'Authorization': `Basic ${config.API_TOKEN}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(res=>(!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json())
    },
    updateMovieCast(id,fieldsToUpdate){
        return fetch(`${config.API_ENDPOINT}/movies/${id}/cast`,{
            method: `PATCH`,
            headers:{
                'Authorization': `Basic ${config.API_TOKEN}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(fieldsToUpdate)
        })
        .then(res=>(!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json())
    }
}

export const UserApiServices= {
    postUser(user) {
        //const proxy='https://cors-anywhere.herokuapp.com'
        return fetch(`${config.API_ENDPOINT}/users`,{
            method: `POST`,
            headers:{
                'Authorization': `Basic ${config.API_TOKEN}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>(!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json())
    }
}
/*
export const ReviewApiServices={
    postReview(movieid,userid,comment,rating){
        //const proxy='https://cors-anywhere.herokuapp.com'
        return fetch(`${config.API_ENDPOINT}/reviews`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Basic ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
              movieid,userid,rating,comment,
            }),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },  
}*/

export const ArtistApiServices= {
    getMoviesByArtist(id){
        return fetch(`${config.API_ENDPOINT}/artists/${id}/movies`, {
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
            },
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    }
}

export const AuthApiServices={
    postLogin(credentials){
        return fetch(`${config.API_ENDPOINT}/auth/login`,{
            method: `POST`,
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
        .then(res=>(!res.ok)
            ? res.json().then(e=>Promise.reject(e))
            : res.json())
    },
}
 

//export default MovieApiServices

