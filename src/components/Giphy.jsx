import React, {useState, useEffect} from "react"; 
import axios from "axios";
import Loading from './Loading'
const Giphy = () =>{
    //create hooks for search
    const [search, setSearch] = useState('');
    const[gifs, setGifs] = useState([]);
    // const [results, setResults] = useState('');
    const[isLoading, setIsLoading] = useState(false);

    //since we want this to be the first thing to appear on the screen we use useeffect
   useEffect(() => {
    async function handleTrend(){
        try {
          setIsLoading(true);
          const result = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=D90JzoKtYqUs00SOZHkSi3RSYOrntYfq`);
          setGifs(result.data.data)  
          setIsLoading(false)
         } catch (error) {
            console.error(error);
            alert("something went wrong :(");
        }
    }

       handleTrend();
    }, []);

    const renderGifs = () =>{
        if(isLoading){
            return <Loading/>
        }
        return gifs.map( el =>{
            return(
                <div key = {el.id} className="gif"><img src={el.images.fixed_height.url}/></div>
            )
        })

    }

    const handleSearch = (event) =>{
        setSearch(event.target.value)

    }

    async function handleSubmit(event){
        try {
            //prevent default is stop it from reloading the entire Dom
            event.preventDefault();
            setIsLoading(true);
            const results = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=D90JzoKtYqUs00SOZHkSi3RSYOrntYfq`);
            setGifs(results.data.data);
            setIsLoading(false);
           } catch (error) {
              console.error(error);
              alert("search not found");
           }
    }


    //return render
    return(
        <>
        <form>
           <input onChange= {handleSearch} value = {search} type="text" placeholder="Search" /> 
            <button onClick= {handleSubmit} type="submit">Search!</button>
        </form>
        <div className="gifContainer">{renderGifs()} </div>
        
        </>

    
    )  
}

export default Giphy;