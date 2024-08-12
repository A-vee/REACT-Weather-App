import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import cloud from "./images/cloud.png"
import { WiHumidity } from "react-icons/wi";
import { FaCloud } from "react-icons/fa";
import { BiMapPin } from "react-icons/bi";
import { IoRainy } from "react-icons/io5";
import { BiTime, BiWind } from "react-icons/bi";
import { FiSunrise,FiSunset,FiMoon } from "react-icons/fi";
function Api() {
  const [loading,setloading]=useState(false)
  const [weather, setweather] = useState(null);
  const [message, setmessage] = useState("");
  const [inputValue,setValue]=useState('')
  
const key=`` // your api key 
  async function fetchdata(param) {
    {
      setloading(true)
      let url = `http://api.weatherapi.com/v1/future.json?key=${key}&q=${param}&dt=2024-09-12`;
     
      const data = await fetch(url);
      data.json().then((json) => {
        if (data) {
         
          console.log(json);
          if (json.message == null) {
            setloading(false)
            setweather(json);
            console.log("found");
          } else {
            setweather(json);
            console.log("not found");
            setmessage("Not found");
          }
        }
      });
    }
  }

  return (
    loading?(<div className="flex h-[80%] rounded-lg w-[80%]  mx-[10%] bg-black  justify-center items-center">
      <h1 className="text-white  font-extrabold text-8xl text-center">loading...</h1>
    </div>):
  weather ?
    (<div className="h-[80%]  flex justify-center items-center rounded-lg   w-[80%]" >
      <div className="w-[40%] rounded-s-2xl h-full space-y-5   justify-centeritems-center opacity-90  bg-black">
        <div className="h-[40%] space-x-2 flex justify-center items-center  w-full ">
          <img src={`https://${weather?.forecast?.forecastday[0]?.day?.condition?.icon}`} className="w-48 mt-10 h-48 object-cover">
          </img>
          <h1 className="text-5xl mt-10 font-extrabold">{weather?.forecast?.forecastday[0]?.day?.maxtemp_c} &#176;C</h1>
        </div>
        
        <div className="h-[8%] mx-[5%] w-[90%] flex justify-center items-center ">
          <h1 className="text-2xl font-semibold">{weather?.forecast?.forecastday[0]?.day?.condition?.text}</h1>
        </div>
        <div className="h-[8%] pt-4  border-t-[1px] border-gray-500 w-[80%] mx-[10%] flex space-x-20 justify-center items-center">
          <h1 className="h-full flex font-light space-x-5 justify-center items-center"><FaCloud className="w-10 mx-2 h-10" color="white"></FaCloud>Cloud - {weather?.forecast?.forecastday[0]?.hour[1]?.cloud} % </h1>
          <h1 className="h-full flex font-light space-x-5 justify-center items-center">{<WiHumidity className="w-10 mx-2 h-10" color="white"></WiHumidity>} Humidity - {weather?.forecast?.forecastday[0]?.day?.avghumidity 
           } %</h1>
        </div>

        <div className="h-[8%] pt-4  border-t-[1px] border-gray-500 w-[80%] mx-[10%] flex space-x-20 justify-center items-center">
          <h1 className="h-full font-light flex space-x-5 justify-center items-center"><BiMapPin className="w-10 mx-2 h-10" color="white"></BiMapPin> {weather?.location?.tz_id}  </h1>
          <h1 className="h-full flex font-light  space-x-5 justify-center items-center">{<IoRainy className="w-10 mx-2 h-10" color="white"></IoRainy>}Chance of Rain - {weather?.forecast?.forecastday[0]?.hour[1]?.chance_of_rain} %</h1>
        </div>
        
        
        <div className="h-[11%] pt-4 pb-5 border-b-[1px]   border-t-[1px] border-gray-500  w-[80%] mx-[10%]  flex space-x-20 justify-center items-center">
          <h1 className="h-full font-light flex space-x-5 justify-center items-center"><BiTime className="w-10 mx-2 h-10" color="white"></BiTime> {weather?.location?.localtime} </h1>
          <h1 className="h-full font-light flex  space-x-5 justify-center items-center">{<BiWind className="w-10 mx-2 h-10" color="white"></BiWind>} Wind - {weather?.forecast?.forecastday[0]?.day?.maxwind_kph } km/h </h1>
        </div>
      </div>
      <div className="w-[60%] space-y-3 rounded-e-xl h-full bg-slate-200">
        <div className="h-[20%] flex justify-between items-center ">
          <input type="text" className="w-[70%] ml-[10%] text-center text-black font-medium text-lg rounded-full h-[40%]   bg-gray-400 border-none" value={inputValue} onChange={(e)=>setValue(e.target.value)}/>
        <button className="h-42 ml-[5%] w-[20%]" onClick={()=>fetchdata(inputValue)}>
          <FaSearch size={52} className="text-black"/>
        </button>
        
        </div>
        <div className="h-[15%] flex justify-center items-center w-full">
          <h1 className="text-7xl text-black font-extrabold">
            {weather?.location?.name}
          </h1>

        </div>
        <div className="h-[10%] flex justify-center items-center w-full">
          <h1 className="text-5xl text-black font-semibold">
           {weather?.location?.country}
          </h1>
          
        </div>
        <div className="h-[30%] flex justify-between items-center w-[90%] space-x-10 mx-[5%] overflow-x-scroll scroll-smooth scrollbar-none">
          {

            [{ho:weather?.forecast?.forecastday[0]?.hour[0]?.temp_c,da:weather?.forecast?.forecastday[0]?.hour[0]?.time,
              im:weather?.forecast?.forecastday[0]?.hour[0]?.condition?.icon
            },{
              ho:weather?.forecast?.forecastday[0]?.hour[2]?.temp_c,
              da:weather?.forecast?.forecastday[0]?.hour[2]?.time
              ,
              im:weather?.forecast?.forecastday[0]?.hour[2]?.condition?.icon
          
            },{
              ho:weather?.forecast?.forecastday[0]?.hour[4]?.temp_c,
              da:weather?.forecast?.forecastday[0]?.hour[4]?.time
              ,
              im:weather?.forecast?.forecastday[0]?.hour[4]?.condition?.icon
            },
          {
            ho:weather?.forecast?.forecastday[0]?.hour[5]?.temp_c,
              da:weather?.forecast?.forecastday[0]?.hour[5]?.time
              ,
              im:weather?.forecast?.forecastday[0]?.hour[5]?.condition?.icon
          },{ho:weather?.forecast?.forecastday[0]?.hour[6]?.temp_c,
            da:weather?.forecast?.forecastday[0]?.hour[6]?.time
            ,
            im:weather?.forecast?.forecastday[0]?.hour[6]?.condition?.icon},
            {ho:weather?.forecast?.forecastday[0]?.hour[7]?.temp_c,
              da:weather?.forecast?.forecastday[0]?.hour[7]?.time
              ,
              im:weather?.forecast?.forecastday[0]?.hour[7]?.condition?.icon},
              {ho:weather?.forecast?.forecastday[0]?.hour[8]?.temp_c,
                da:weather?.forecast?.forecastday[0]?.hour[8]?.time
                ,
                im:weather?.forecast?.forecastday[0]?.hour[8]?.condition?.icon},
                {ho:weather?.forecast?.forecastday[0]?.hour[9]?.temp_c,
                  da:weather?.forecast?.forecastday[0]?.hour[9]?.time
                  ,
                  im:weather?.forecast?.forecastday[0]?.hour[9]?.condition?.icon}].map((val)=>
            {
              return(
                <div class="w-auto px-7 py-5 h-auto flex-col-reverse justify-center items-center rounded-xl bg-black">
 
                  <img src={`https://${val.im}`} className="w-15 object-cover h-10"/>
                 
                  <h1 className="text-md">
                  {val.ho}&#176;C
                  </h1>
                  <h1 className="w-[4rem] text-[0.5rem]">
                    {val.da}
                  </h1>
                </div>
              )

            })
          }
          
        </div>
        <div className="w-full flex justify-center items-center space-x-10 h-[10%] ">
          <h1 className="text-black font-mono text-base  flex justify-center items-center">
            <FiSunrise className="mx-2 h-8 w-8" color="black"/>
            {
              weather?.forecast?.forecastday[0]?.astro?.sunrise
            }
          </h1>
          <h1 className="text-black  font-mono text-base flex justify-center items-center">
            <FiSunset className="mx-2 h-8 w-8" color="black"/>
            {
              weather?.forecast?.forecastday[0]?.astro?.sunset
           
            }
          </h1>
          <h1 className="text-black font-mono text-base flex justify-center items-center">
            <FiMoon className="mx-2 h-8 w-8" color="black"/>
            {
              weather?.forecast?.forecastday[0]?.astro?.moon_phase
           
            }
          </h1>
          </div>
      </div>
      
    </div>
    )
    
   :
   (<div className="h-[80%] flex justify-center items-center rounded-2xl  bg-white w-[80%]" >
    <div className="w-[40%] rounded-s-2xl h-full space-y-5   justify-centeritems-center opacity-90  bg-black">
        <div className="h-[40%] space-x-5 flex justify-center items-center  w-full ">
          <img src={cloud} className="w-40  mt-10 h-40 object-cover">
          </img>
          <h1 className="text-5xl mt-10 font-extrabold"> 23 &#176;C</h1>
        </div>
        
        <div className="h-[8%] mx-[5%] w-[90%] flex justify-center items-center ">
          <h1 className="text-2xl font-semibold">Partly clouds</h1>
        </div>
        <div className="h-[8%] pt-4  border-t-[1px] border-gray-500 w-[80%] mx-[10%] flex space-x-20 justify-center items-center">
          <h1 className="h-full flex font-light space-x-5 justify-center items-center"><FaCloud className="w-10 mx-2 h-10" color="white"></FaCloud>Cloud - 73 % </h1>
          <h1 className="h-full flex font-light space-x-5 justify-center items-center">{<WiHumidity className="w-10 mx-2 h-10" color="white"></WiHumidity>} Humidity -  65 %</h1>
        </div>

        <div className="h-[8%] pt-4  border-t-[1px] border-gray-500 w-[80%] mx-[10%] flex space-x-20 justify-center items-center">
          <h1 className="h-full font-light flex space-x-5 justify-center items-center"><BiMapPin className="w-10 mx-2 h-10" color="white"></BiMapPin>Europe</h1>
          <h1 className="h-full flex font-light  space-x-5 justify-center items-center">{<IoRainy className="w-10 mx-2 h-10" color="white"></IoRainy>}Chance of Rain - {weather?.forecast?.forecastday[0]?.hour[1]?.chance_of_rain} 23 %</h1>
        </div>
        
        
        <div className="h-[11%] pt-4 pb-5 border-b-[1px]   border-t-[1px] border-gray-500  w-[80%] mx-[10%]  flex space-x-20 justify-center items-center">
          <h1 className="h-full font-light flex space-x-5 justify-center items-center"><BiTime className="w-10 mx-2 h-10" color="white"></BiTime> {weather?.location?.localtime} 11:38 AM </h1>
          <h1 className="h-full font-light flex  space-x-5 justify-center items-center">{<BiWind className="w-10 mx-2 h-10" color="white"></BiWind>} Wind - {weather?.forecast?. forecastday[0]?.day?.maxwind_kph } 18 km/h </h1>
        </div>
      </div>
    
    <div className="w-[60%] rounded-e-xl space-y-3   h-full bg-slate-200">
      <div className="h-[20%] flex justify-between items-center ">
        <input type="text" className="w-[70%] ml-[10%] text-center text-black font-medium text-lg rounded-full h-[40%]   bg-gray-400 border-none" value={inputValue} onChange={(e)=>setValue(e.target.value)}/>
      <button className="h-42 ml-[5%] w-[20%]" onClick={()=>fetchdata(inputValue)}>
        <FaSearch size={52} className="text-black"/>
      </button>
      
      </div>
      <div className="h-[15%] flex justify-center items-center w-full">
        <h1 className="text-7xl text-black font-extrabold">
          London
        </h1>

      </div>
      <div className="h-[10%] flex justify-center items-center w-full">
        <h1 className="text-5xl text-black font-semibold">
         United kingdom
        </h1>
        
      </div>
      <div className="h-[30%] flex justify-between items-center w-[90%] space-x-10 mx-[5%] overflow-x-scroll scrollbar-none">
        {

          ["0:00 AM","1:00 AM","2:00 AM","3:00 AM","4:00 AM","5:00 AM"].map((val)=>
          {
            return(
              <div class="w-auto px-10 py-5 h-auto flex-col-reverse justify-center items-center rounded-xl bg-black">

                <img src={cloud} className="w-12 h-10"/>
                
                <h1 className="text-md">
                  23&#176;C
                </h1>
                <h1 className=" text-center justify-center flex items-center text-xs w-full">
                {val}
                </h1>
              </div>
            )

          })
        }
        
      </div>
      <div className="w-full flex justify-center items-center space-x-10 h-[10%] ">
      <h1 className="text-black font-mono text-base  flex justify-center items-center">
        <FiSunrise className="mx-2 h-8 w-8" color="black"/>
        Sunrise
      </h1>
      <h1 className="text-black  font-mono text-base flex justify-center items-center">
        <FiSunset className="mx-2 h-8 w-8" color="black"/>
        Sunset
      </h1>
      <h1 className="text-black font-mono text-base flex justify-center items-center">
        <FiMoon className="mx-2 h-8 w-8" color="black"/>
        Moon-shape
      </h1>
      </div>
  </div>
    </div>
    

  
  )
  )
}

export default Api;
