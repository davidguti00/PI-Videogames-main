import axios from "axios";



export function getVideogames() {
    return async function (dispatch){
        const videogamesStorage = JSON.parse(localStorage.getItem('videoGamesStorage'))

        if(videogamesStorage){
            return dispatch({
                type: 'GET_ALL_VIDEOGAMES',
                payload: videogamesStorage
            })
        } else{
            try{
                const json = await axios.get(`http://localhost:3001/videogames`)
                const data = json.data
                    localStorage.setItem('videoGamesStorage',JSON.stringify(data));
                return dispatch({
                    type: 'GET_ALL_VIDEOGAMES',
                    payload: data
            })
            } catch(error){
                console.log(error)
            }
        }
    }
}

export function postVideogame(videogame) {
    return function (dispatch){
        try{
            return axios.post(`http://localhost:3001/videogames`, videogame)
            // const json = await axios.post(`http://localhost:3001/videogames`, videogame)
            // const response = json.data
            // console.log(response)
            // return dispatch({
            //     type: 'POST_VIDEOGAME',
            //     payload: response
            // })
        } 
        catch(error){
            console.log(error)
        }
    }
    
    
}

export function getDetails (id) {
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/videogames/${id}`)
            const data = json.data
            return dispatch({
                type: 'GET_DETAILS',
                payload: data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function getVideogamesByName (name) {
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            const data = json.data
            return dispatch({
                type: 'GET_VIDEOGAMES_BY_NAME',
                payload: data
            })
        } catch(error){
            alert('Videogame not found')
            console.log(error)
        }
    }
}

export function getGenres() {
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/genres`)
            const data = json.data
            return dispatch({
                type: 'GET_GENRES',
                payload: data
            })
        } catch(error){
            console.log(error)
        }
    }

}
//FILTRO POR GENERO
export function filterVideogameByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}

// FILTRO POR ORIGEN
export function filterByCreated(payload){
    return{
        type: 'FILTER_BY_CREATED',
        payload
    }
}

//ORDENAMIENTO ALFABETICO 
export function filterByAlpha(payload){
    return{
        type: 'FILTER_BY_ALPHA',
        payload
    }
}

//ORDENAMIENTO POR RATING 
export function filterByRating(payload){
    return{
        type: 'FILTER_BY_RATING',
        payload
    }
}

//TODAS LAS PLATAFORMAS
export function getPlatform() {
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/platforms`)
            const data = json.data
            return dispatch({
                type: 'GET_PLATFORMS',
                payload: data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function clearState(payload){
    return{
        type: "CLEAR_STATE",
        payload: [],
    }
}

//delete
//put

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_PLATFORM = "FILTER_BY_PLATFORM";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const FILTER_BY_ALPHA = "FILTER_BY_ALPHA";
export const FILTER_BY_RATING = "FILTER_BY_RATING";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const POST_VIDEOGAME = "POST_VIDEOGAME"
export const CLEAR_STATE = "CLEAR_STATE";
