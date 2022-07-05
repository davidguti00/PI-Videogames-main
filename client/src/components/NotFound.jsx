import {Link} from 'react-router-dom'
import NotFoundError from "./images/NotFoundError.png"

export default function NotFound() {
    return (
        <div className="not_found">
            <div>
                <h1>Videogames not found</h1>
                <br/>
                    <Link to = '/home/'>
                        <button> back </button>
                    </Link>
                <img src={NotFoundError} alt="not-found" className='image_not_found' />
                
            </div>
        </div>
    )
}