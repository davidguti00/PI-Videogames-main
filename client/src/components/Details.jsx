import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetails, clearState, } from "../redux/actions";
import "./styles/Details.css"
export default function Details(prop) {
    const dispatch = useDispatch()
    const videogameDetails = useSelector((state)=> state.detail);

    const history = useHistory()
    
    useEffect(() => {
        dispatch(getDetails(prop.match.params.id))
        return()=>{
            dispatch (clearState())
        }     
    }, [dispatch, prop.match.params.id])



    function handleClick(e) {
        e.preventDefault()
        history.push('/home')
    }


    return (

        <div>
            <div className="allCard"> 
            {videogameDetails.length === 0?        
            <div className="loading">
                <img src='https://1.bp.blogspot.com/-LrKEogzQIu4/X_ZF1ld0JSI/AAAAAAAACZ4/NDXxx9s1GKExxbFz-glkZn8yCVSM2HM7ACLcBGAsYHQ/w320-h240/LOADING.gif' alt="loading" />
            </div> : 
            <div className="cardDetail">
                <div className="containterLeft">
                    <h1>{videogameDetails.name}</h1>
                    <img src={videogameDetails.image} className="imgDetailCard" alt="Imagen del videojuego" />
                    <br></br>
                    <h3>Description</h3>
                    <p>{videogameDetails.description.replace(/<[^>]+>/g,' ')}</p>
                </div>
                <div className="containterLeft">
                    <h3>Genres:</h3>
                    <div>
                        {videogameDetails.genres?.map(e => {
                            if (typeof (e) === 'string') {
                                return (
                                    <span className="type" key={e.id}>
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
                        {videogameDetails.platforms?.map(e => {
                            if (typeof (e) === 'string') {
                                return (
                                    <span className="type" key={e.id}>
                                        |  {e.replace(e[0], e[0].toUpperCase())}  |
                                    </span>
                                )
                            }
                            else {
                                return (
                                    <span key={e.name}>
                                        {e.name} |
                                    </span>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            }
            </div>
                <button onClick={(e) => {handleClick(e)}} className="ButtonBack">Back to home!</button>
        </div>
    )
}
