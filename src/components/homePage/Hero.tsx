"use client";
import React, { useEffect, useState } from "react";
import { getTopGainersAndLosers } from "../../services/TopGainersLosers";
import IconUp from "./IconUp";
import IconDown from "./IconDown";
import Link from "next/link";
import { useStockData } from "@/contexts/StockDataContext";

const Hero = () => {
  const [showTopGainers, setShowTopGainers] = useState(true);
  const [topGainersData, setTopGainersData] = useState([]);
  const [topLosersData, setTopLosersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //using the hook that we made using useContext
  const { cachedData, setCachedData } = useStockData();

  useEffect(() => {
    // Fetch Top Gainers and losers data and put them in individual state containers
    getTopGainersAndLosers()
      .then((data) => {
        if (data) {
          console.log("data->", data);
          setTopGainersData(data.top_gainers);
          setTopLosersData(data.top_losers);
          setCachedData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching Top Gainers data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="px-20 pt-6 max-width w-full flex justify-start">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!topGainersData && cachedData) {
    if (cachedData.top_gainers) setTopGainersData(cachedData.top_gainers);
  }

  if (!topLosersData && cachedData) {
    if (cachedData.top_losers) setTopLosersData(cachedData.top_losers);
  }

  return (
    <div className="hero-container w-full flex justify-center items-center">
      <div className="hero-section max-width w-full flex flex-col justify-center items-center px-6 md:px-20 pt-6">
        <div className="hero-button-container flex justify-start items-center w-full lg:w-70%">
          <button
            onClick={() => setShowTopGainers(true)}
            className={`px-4 py-2 rounded-full border border-gray-300 mr-4 ${
              showTopGainers ? "active-button" : ""
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setShowTopGainers(false)}
            className={`px-4 py-2 rounded-full border border-gray-300 ${
              !showTopGainers ? "active-button" : ""
            }`}
          >
            Top Losers
          </button>
        </div>
        <div className="stocks-grid-container mt-10 w-full lg:w-70%">
          {showTopGainers ? (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topGainersData &&
                topGainersData.map((data: any) => (
                  <Link href={`/stocks/${data.ticker}`} key={data.ticker}>
                    <div className="border border-gray-300 flex flex-col px-4 py-2 rounded-md">
                      {/* <img alt="stock-image" /> */}
                      <p>{data.ticker}</p>
                      <p className="text-green-400 flex items-center">
                        <span className="mr-2">+{data.change_percentage}</span>
                        <IconUp />
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topLosersData &&
                topLosersData.map((data: any) => (
                  <Link href={`/stocks/${data.ticker}`} key={data.ticker}>
                    <div className="border border-gray-300 flex flex-col px-4 py-2 rounded-md">
                      {/* <img alt="stock-image" /> */}
                      <p>{data.ticker}</p>
                      <p className="text-red-400 flex items-center">
                        <span className="mr-2">{data.change_percentage}</span>
                        <IconDown />
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
