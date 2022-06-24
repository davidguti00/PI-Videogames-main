import React from 'react'
import {Link} from 'react-router-dom'


export default function LandingPage() {
    return (
        <div>
            <h1> Welcome to Videogames App </h1>
                <Link to = '/home/'>
                    <button> Enter Site </button>
                </Link>
        </div>
    )
}

