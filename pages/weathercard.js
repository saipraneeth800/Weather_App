import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudMoon,
  faTemperatureEmpty,
  faTemperatureFull,
  faTemperatureHalf,
} from "@fortawesome/free-solid-svg-icons";

const weathercard = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [weathercondition, Setcondition] = useState({});
  const [units, setUnits] = useState("C");

  // useEffect(getData,[])
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=9ae0425b3b6e8607756fcb3f7477d75f&units=metric`
    );
    if (response.status === 200) {
      let obj = await response.json();
      let { temp, temp_max, temp_min, humidity, pressure } = obj.main;
      let { main, description } = obj.weather[0];
      let { speed, deg } = obj.wind;
      let { country, sunrise, sunset } = obj.sys;
      let name = obj.name;
      let dat = obj.dt;
      let datel = new Date(dat * 1000);
      let date = `${datel.getHours()} : ${datel.getMinutes()} `;
      // let dat = new Date();
      // let date = `${dat.getHours()}:${dat.getMinutes()}`
      // console.log(obj);

      const allValues = {
        temp,
        temp_max,
        temp_min,
        humidity,
        pressure,
        main,
        description,
        speed,
        deg,
        country,
        sunrise,
        sunset,
        date,
        name,
      };
      setData(allValues);
      switch (main) {
        case "Clouds":
          faCloud;
      }
    }
  };
  console.log(data);

  return (
    <>
      <div  className="item-center  flex-wrap mt-20">
        <div className="rounded-lg lg:w-3/5 bg-[#1b1e2b] md:w-5/6 shadow-2xl m-auto">
          <h1 className="text-white text-3xl pt-8 text-center uppercase tracking-widest">
            Weather App
          </h1>
          {/* <FontAwesomeIcon icon={faCoffee} /> */}
          <div className="flex justify-center m-4 text-2xl">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="rounded p-4 h-14"
              placeholder="Enter City Name"
            />
            <button
              onClick={getData}
              className=" border-white	rounded-lg bg-white ml-2 p-2"
            >
              Search
            </button>
          </div>
          <div className="bg-white w-1/2 m-auto mb-7 rounded p-3">
            <h1 className="text-2xl">
              City : {data.name},{data.country}
            </h1>
            <h1 className="text-xl text-slate-700">
              {/* Date : {new Date().toLocaleString()} */}
            </h1>
          </div>
          <div className="flex bg-white w-1/2 m-auto  rounded-lg p-6">
            <div className="font-semibold p-4">
              <FontAwesomeIcon icon={faCloud} size="6x" />
              <h1 className="text-2xl text-center">{data.main}</h1>
            </div>
            <div className="text-center w-full">
              <h1 className="text-2xl font-medium">Temperature :</h1>
              <div className="flex items-center justify-center text-center bg-indigo-90 p-2">
                <FontAwesomeIcon icon={faTemperatureHalf} size="2x" />
                <h1 className="text-2xl p-2">
                  {data.temp} &deg; {units}{" "}
                </h1>
              </div>
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faTemperatureEmpty} />
                <h1 className="pl-2 text-lg text-slate-700">
                  Min : {data.temp_min} &deg; C
                </h1>
              </div>
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faTemperatureFull} />
                <h1 className="pl-2 text-lg text-slate-700">
                  Max : {data.temp_max} &deg; C
                </h1>
              </div>
            </div>
            {/* <FontAwesomeIcon icon={faCloudMoon} /> */}
          </div>
          <div className="tracking-wider text-center ">
            {/* <h1 className="text-white text-2xl">Date: {data.date}</h1> */}
            <h1 className="text-white text-2xl">Humidity: {data.humidity}</h1>
            <h1 className="text-white text-2xl">Pressure: {data.pressure}</h1>
            <h1 className="text-white text-2xl">
              Description: {data.description}
            </h1>
            <h1 className="text-white text-2xl">Speed: {data.speed}</h1>
            <h1 className="text-white text-2xl">Degrees: {data.deg}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default weathercard;
