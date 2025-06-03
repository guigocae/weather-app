import { useEffect, useState } from 'react'

function App() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState("");

  const handleInput = (event) => {
    setInputData(event.target.value);
  }

  const getAPIData = async (data) => {
    const query = encodeURIComponent(data);
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/next7days?unitGroup=metric&lang=pt&include=days&key=XADLHG4KBH7HRBN7JZRNUN8MV&contentType=json`;
    try {
      const response = await fetch(URL, { mode: 'cors' });
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch(error) {
      console.log("Erro ao buscar dados: "+error);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = `${position.coords.latitude},${position.coords.longitude}`
        getAPIData(coordinates);
      });
    } else {
      setData("Não foi possível acessar sua localização");
    }
  }, []);
    
  return (
    <>
      <input type="text" onChange={handleInput} className='border-1 rounded-[8px] p-1'/>
      <button onClick={() => getAPIData(inputData)} className='text-2xl text-sky-600 font-bold underline cursor-pointer'>Enviar</button>
      {data && 
        <div className="result">
          <li>{`${data.resolvedAddress}`}</li>
          <li>{`${data.days[0].temp}`}°C</li>
          <li>{`${data.days[0].description}`}</li>
        </div>
      }
    </>
  )
}

export default App