
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../redux/actions";
import "./styles/SearchBar.css"

function validate(videogame) {
    let error = "";
    if (videogame === "") {
        error = "Please insert a name";
    }
    return error;
}

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [error, setError] =useState("")
    
    function handlevideogameChange(e){
        e.preventDefault();
        setName(e.target.value)
        setCurrentPage(1)
    }
//console.log(name)
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(name !== ""){
            dispatch(getVideogamesByName(name))
            setName("")
        }
        setError(validate(name))       
    }
    return(
        <div className="flexbox">
            <div className="search">
                <input 
                    type="text" 
                    className="inputSearch"
                    name="name" 
                    value={name}
                    placeholder="search game..." 
                    onChange={e => handlevideogameChange(e)} 
                />
                <button 
                    className="buttonHome"
                    type="submit" 
                    onClick={(e) => handleSubmit(e)}> 
                    Search
                </button>
                {error ? 
                <div className="error-message">
                    <span>{error}</span>
                </div> : null
                }
            </div>
        </div>
        
    )
}
