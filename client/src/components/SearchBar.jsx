
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../redux/actions";
import "./styles/SearchBar.css"

function validate(videogame) {
    let error = "";
    if (videogame === "") {
        error = "PLEASE INSERT A NAME";
    }
    return error;
}

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [error, setError] =useState("")
    
    function handlevideogameChange(e){
        e.preventDefault();
        setName(e.target.value)
    }
//console.log(name)
    function handleSubmit(e){
        e.preventDefault()
        if(name !== ""){
            dispatch(getVideogamesByName(name))
            setName("")
        }
        setError(validate(name))       
    }


    return(
        <div className="containerSearch">
            <videogame type="text" className="videogameSearch"name="name" value={name}
            placeholder="search game..." onChange={e => handlevideogameChange(e)} 
            />
            <button className="buttonHome"
            type="submit" onClick={(e) => handleSubmit(e)}> 
            Search 🔍
            </button>
            {error && (<h1 className="search-error">{error}</h1>)}
        </div>
    )
}
