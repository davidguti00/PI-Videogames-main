import {useHistory} from 'react-router-dom'
import NotFoundError from "./images/NotFoundError.png"





export default function NotFound() {

    const history = useHistory()

    function handleClick(e) {
        history.push('/home')
    }

    return (
        <div className="not_found">
            <div>
                <h1>Videogames not found</h1>
                <br/>
            <button onClick={(e) => {handleClick(e)}} className="button_detail_edit">Back to home!</button>
                <img src={NotFoundError} alt="not-found" className='image_not_found' />
                
            </div>
        </div>
    )
}