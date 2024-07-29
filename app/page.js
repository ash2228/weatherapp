"use client"
import { useState,useEffect } from "react"
import {Open_Sans} from "next/font/google"
const open = Open_Sans({
  weight:"400",
  subsets:["cyrillic"]
})
export default function Home(){
  const [info,setInfo] = useState(["loading..."]);
  const [ip,setIp] = useState(0);
  const [temp,setTemp] = useState("loading...");
  const [c,setC] = useState("loading...");
  const [f,setF] = useState("loading...");
  const [dis,setDis] = useState(true);
  useEffect(()=>{
    fetch("https://api.ipify.org?format=json")
      .then(res=>res.json())
      .then(res=>setIp(res.ip)
    )
  },[])
  useEffect(()=>{
    if(ip){
      fetch(`http://ip-api.com/json/${ip}`)
      .then(res=>res.json())
      .then(res=>setInfo([res.city,res.lat,res.lon]))
    }
  },[ip]);
  useEffect(()=>{
    if(info[0]!="loading..."){
      fetch(fetch(`https://api.open-meteo.com/v1/forecast?latitude=${info[1]}&longitude=${info[2]}&current_weather=true`).then(res=>res.json()).then(res=>setTemp(parseInt(res.current_weather.temperature))));
    }
  },[info]);
  useEffect(()=>{
    if(temp!="loading..."){
      setC(`${temp}°C`);
      setF(`${(temp * 9/5) + 32}°F`);
    }
  },[temp])
  return(<>
  <div className="star top-[10%] left-[20%]"></div>
    <div className="star top-[30%] left-[70%]"></div>
    <div className="star top-[50%] left-[40%]"></div>
    <div className="star top-[70%] left-[80%]"></div>
    <div className="star top-[90%] left-[10%]"></div>
    <div className="text-white">
      <img src="house.png" alt="" className="mix-blend-color-burn xl:h-[40vh] mx-auto"/>
      <h1 className={`text-center text-3xl ${open.className}`}>Location:{info[0]}</h1>
      <h1 className={`text-center mt-5 text-3xl ${open.className}`}>Lat:{info[1]} lon:{info[2]}</h1>
      <div
  className="flex w-[70%] xl:w-[20%] mx-auto mt-10 space-x-2 border-[3px] border-purple-400 rounded-xl select-none"
>

  <label
    className="radio flex flex-grow items-center justify-center rounded-lg cursor-pointer"
  >
    <input type="radio" name="radio" value="react" className="peer hidden" defaultChecked={true} onClick={()=>{setDis(true)}} />
    <span
      className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
      >Celcius</span
    >
  </label>

  <label
    className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
  >
    <input type="radio" name="radio" value="vue" className="peer hidden" onClick={()=>{setDis(false)}} />
    <span
      className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
      >Ferenhiet</span
    >
  </label>
</div>
    </div>
    <h1 className={`text-white ${open.className} text-3xl text-center mt-10`}>{dis?c:f}</h1>
  </>)
}