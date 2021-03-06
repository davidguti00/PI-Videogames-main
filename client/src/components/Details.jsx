import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetails, clearState, } from "../redux/actions";
import "./styles/Details.css"
import Loarding from "./images/Loarding"
import "./styles/Loarding.css";
import NavBar from "./NavBar.jsx"
import { deleteVideogame } from "../redux/actions";
import { starsValue } from "../hooks/functions";



export default function Details(prop) {
    const dispatch = useDispatch()
    const videogameDetails = useSelector((state)=> state.detail);

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetails(id))
        return ()=>{
            dispatch (clearState())
        }
    }, [dispatch, id])


    function handleClick(e) {
        dispatch (clearState())
        history.push('/home')
    }

    function handleDelete(id){
        function confirmacion(){
            var respuesta = window.confirm('Are you sure you want to delete the game?')
            if (respuesta === true){
                localStorage.clear();
                dispatch(deleteVideogame(id))
                .then(res=>{
                    console.log(res)
                    history.push('/home')
                    alert(res)
                })
                history.push('/home')
            }
        } 
        confirmacion()                    
    }

console.log(videogameDetails)

    function handleEdit(){
        history.push('/create', videogameDetails)

    }    

    return (

        
        <div className="allHome"> 
            <NavBar/>
            
                {videogameDetails.length === 0?        
            <div className="loading1">
                <Loarding/> 
            </div>:
            <div >
                <br/>
            <button onClick={(e) => {handleClick(e)}} className="button_detail_edit">Back to home!</button>
                <div className="cardDetail">
                    
                    <div className="containterLeft">
                        <h1>{videogameDetails.name}</h1>
                        <img src={videogameDetails.image} className="imgDetailCard" alt="Imagen del videojuego" />
                        {videogameDetails.createdInDb ? 
                        <div>
                            <button onClick={()=> handleDelete(videogameDetails.id)} className="button_detail_delete">
                                delete Videogame
                            </button>
                        </div>: null
                        }
                        {videogameDetails.createdInDb ? 
                        <div>
                            <button onClick={()=> handleEdit(videogameDetails.id)} className="button_detail_edit">
                                Edit Videogame
                            </button>
                        </div>: null
                        }
                        <h4>Release Date: {videogameDetails.released}</h4>
                        <h3>{videogameDetails.rating}  {starsValue(videogameDetails.rating)}</h3>
                        <br></br>
                        <h3>Genres:</h3>
                        <div>
                            {videogameDetails.genres?.map((e,i)=> {
                                if (typeof (e) === 'string') {
                                    return (
                                        <span className="type" key={i}>
                                            {e.replace(e[0], e[0].toUpperCase())} |
                                        </span>
                                    )
                                }
                                else {
                                    return (
                                        <span key={e.name}>
                                            |  {e.name}  |
                                        </span>
                                    )
                                }
                            })}
                        </div>
                        <h3>Platforms:</h3>
                        <div>
                            {videogameDetails.platforms?.map((e,i) => {
                                if (typeof (e) === 'string') {
                                    return (
                                        <span className="type" key={i}>
                                            |  {e.replace(e[0], e[0].toUpperCase())}  |
                                        </span>
                                    )
                                }
                                else {
                                    return (
                                        <span key={e.name}>
                                            {e.name} 
                                        </span>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    
                    <div className="containterLeft">
                    <h3>Description</h3>
                        <p>{videogameDetails.description.replace(/<[^>]+>/g,' ')}</p>
                    </div>
                </div>
                </div>
            }
            
        </div>
    )
}
