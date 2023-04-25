import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  IoMdSunny,
  IoMdThunderstorm,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsThermometer,
  BsWater,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const apiKeys = "0d3aa6b55eab0537061b13f6a06ab2b6";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Bucharest");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // of input value is empty

    if (inputValue == "") {
      setAnimate(true);

      //   // after 500 mili seconds set it to false
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    // if input is not empty

    if (inputValue !== "") {
      // set location

      setLocation(inputValue);
    }

    // select input

    const input = document.querySelector("input");

    // clear input

    input.value = "";

    // prevent default
    e.preventDefault();
  };
  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKeys}`;
    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 1500);
    });
  }, [location]);

  if (!data) {
    return (
      <div>
        <div className="flex justify-center h-screen w-full items-center">
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }
  // set the icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }
  // date object
  const date = new Date();

  return (
    <div className="w-full py-5 bg-gradientBg bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center px-4 lg:px-0">
      {/* form */}
      <form
        className={`${
          animate ? `animate-shake` : `animate-none`
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="search by city or country"
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full "
          ></input>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#5abdd] w-20 h-12 rounded-full flex items-center justify-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}

      {loading ? (
        <div className="w-full max-w-[450px] bg-black/20 text-white rounded-[32px] backdrop-blur-[32px] py-12 px-6 min-h-[578px] flex items-center justify-center">
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      ) : (
        <div className="w-full max-w-[450px] bg-black/20 text-white rounded-[32px] backdrop-blur-[32px] py-12 px-6 min-h-[578px]">
          {/* card top */}
          <div className=" flex items-center gap-x-5">
            {/* icon */}
            <div className="text-[87px]">{icon}</div>
            <div>
              {/* conuntry name */}
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div className="my-20">
            <div className="flex justify-center items-center">
              {/* temp */}
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              {/* celsius icon */}
              <div className="text-4xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            {/* weather description */}
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>
          {/* card bottom */}
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                {/* icon */}
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visibilty{" "}
                  <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                {/* icon */}
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels like{" "}
                  <div className=" flex items-center ml-2">
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                {/* icon */}
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div>
                  Humidity <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                {/* icon */}
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div className="flex">
                  <div className=" flex items-center ml-2">
                    <div>
                      Wind <span className="ml-2">{data.wind.speed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
