import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getGenres, postVideogame, getPlatform, updateVideogame} from '../redux/actions.js'



export const useForm = (inicialForm, validateForm)=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    

    const[form, setForm] = useState(inicialForm);
    const[error, setErrors] = useState({});

console.log(form);

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
    }, [dispatch])


    const  handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validateForm(form))
        if(Object.keys(error).length === 0){

            alert ("submitting form");
            dispatch(postVideogame(form))
            .then(res=>{
                console.log(res)
                alert(res)
            })
            
            localStorage.clear();
            history.push('/home')
            
        } else {
            alert('missing data or errors in data loading')
        }
    };

    function handleEdit(e, id){
        e.preventDefault()
        setErrors(validateForm(form))
        if(Object.keys(error).length === 0){
            function confirmacion(){
                var respuesta = window.confirm('Are you sure you want to edit the game?')
                if (respuesta === true){
                    localStorage.clear();
                    dispatch(updateVideogame(id,form))
                    .then(res=>{
                        console.log(res)
                        alert(res)
                    })
                }
            } 
            confirmacion()
            history.push('/home')
        } else {
        alert('missing data or errors in data loading')
    }                   
    }

    return{
        genres,
        platforms,
        form, 
        error, 
        handleClick,
        handleChange, 
        handleBlur, 
        handleSelectGenre,
        handleSelectPlatforms,
        handleDeleteGenres,
        handleDeletePlatforms,
        handleSubmit,
        handleEdit,
    }
}