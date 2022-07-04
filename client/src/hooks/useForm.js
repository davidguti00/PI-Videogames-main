import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getGenres, postVideogame, getPlatform } from '../redux/actions.js'
import axios from "axios";

export const useForm = (inicialForm, validateForm)=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const responsePost = useSelector((state) => state.response)

    const[form, setForm] = useState(inicialForm);
    const[error, setErrors] = useState({});
    const[loading, setLoading] = useState (false);
    const[response, setResponse] = useState(null);



    const handleChange = (e) => {
        const{name, value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
        setErrors(validateForm(form));
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };


    const handleSelectGenre = (e) => {
        const{value} = e.target;
            if(value !== 'Select Genre')
            if(!form.genres.includes(value)){
                setForm({
                    ...form,
                    genres: [...form.genres, value],
                });
                setErrors(validateForm(form));
            }    
    }

    const handleSelectPlatforms = (e) => {
        handleChange(e);
        const{value} = e.target;
            if(value !== 'Select Platform')
            if(!form.platforms.includes(value)){
                setForm({
                    ...form,
                    platforms: [...form.platforms, value]
                });
                setErrors(validateForm(form));
            }
    }
    
    const handleDeleteGenres = (element) => {
        setForm({
            ...form,
            genres: form.genres.filter(e => e !== element)
        })
    }

    const handleDeletePlatforms = (element) => {
        setForm({
            ...form,
            platforms: form.platforms.filter(e => e !== element)
        })
    }

    const handleClick= (e) => {
        e.preventDefault()
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatform());
        dispatch(postVideogame());
    }, [dispatch])

    const sendVideogame = (form) =>{
            return axios.post(`http://localhost:3001/videogames`, form)
        
    }

    const  handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validateForm(form))
        if(Object.keys(error).length === 0){
//creo
//respues
            sendVideogame(form).then(res=>{
                console.log(res)
                alert(res.data)
            })

            
            
            // alert ("Enviando formulario");
            // // dispatch(postVideogame(form));
            // setTimeout(()=>{alert(responsePost)}, 5000)
                
                
            // localStorage.clear();
            // setLoading(true);
            
            // setResponse(true);
            // setForm(inicialForm);


            
            // responsePost?setLoading(true)&&setResponse(true): 
            // alert(responsePost)&&setLoading(false)&&setForm(inicialForm)
            
            // history.push('/home')
                
        } else {
            alert('faltan datos o hay errores en la carga de datos')
        }
    };

    return{
        genres,
        platforms,
        form, 
        error, 
        loading, 
        response,
        responsePost,
        handleClick,
        handleChange, 
        handleBlur, 
        handleSelectGenre,
        handleSelectPlatforms,
        handleDeleteGenres,
        handleDeletePlatforms,
        handleSubmit,
    }
}