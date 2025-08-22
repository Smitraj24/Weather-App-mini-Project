import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';


export default function SearchBox ({updateInfo}) {

  let [city , setcity] = useState("");
  let [err , seterr] = useState(false);

   const API_URL="https://api.openweathermap.org/data/2.5/weather";
   const API_KEY="6e67507f29e559c772e92c5cb0356fb3"; 

   let getWeatherInfo = async() => {
    try{
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY }&units=metric`);
       let jsonResponse = await response.json();
       console.log(jsonResponse);

     let result = {
       city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description, 
        wind: jsonResponse.wind,
   };
    console.log(result);
    return result;
    }catch(err){
        throw err;  
    }
     
};
    let handleChange = (event) =>{
        setcity(event.target.value); 
    }

    let handleSubmit = async (event) =>{
        try{
            event.preventDefault();
           console.log(city);
           setcity("");
           let newinfo = await getWeatherInfo();
           updateInfo(newinfo);
        }catch(err){
           seterr(true); 
        }
        
    };

    return(
        <div className='SearchBox'>
           
            <form onSubmit={handleSubmit}>
               <TextField 
                 id="outlined-basic" 
                 label="City Name" 
                 variant="outlined" required  
                 value={city} 
                 onChange={handleChange}/>
                  <br/><br/>
 
                <Button variant="contained" type='submit'>Search
                 </Button>   
                 {err && <p style={{color:"red" }}> No such place exists!</p>}
             </form>
        </div>
    );
}