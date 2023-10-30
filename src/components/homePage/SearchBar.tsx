"use client";
import React, { useEffect, useState } from "react";
import IconSearch from "./SearchIcon";
import axios from "axios";
import Link from "next/link";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [initialRender, setInitialRender] = useState(true);

  const handleSearch = async (query: string) => {
    try {
      const apiKey = "B69I69O1YWXYNPHI";
      const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const data = response.data.bestMatches || [];
      setSearchResults(data);
    } catch (error: any) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        setDebouncedQuery(searchQuery);
      }, 400);

      setTypingTimeout(timeoutId);
    }
  }, [searchQuery, initialRender]);

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full md:w-80 flex flex-col relative">
      <div className="search-bar bg-gray-200 rounded-full flex items-center px-8 py-3 flex justify-between items-center w-full">
        <input
          type="text"
          placeholder="Search Stocks & ETFs"
          className="w-full bg-transparent focus:outline-none"
          value={searchQuery}
          onChange={handleChange}
        />
        <button
          type="button"
          className="pl-2"
          onClick={() => handleSearch(searchQuery)}
        >
          <IconSearch />
        </button>
      </div>
      {error && <div>Error: {error}</div>}
      {searchResults.length > 0 && (
        <div className="bg-gray-100 flex-col w-full px-4 py-2 rounded-b-lg absolute left-0 right-0 top-107% w-full">
          {searchResults.map((result) => (
            <div
              className="font-regular text-base px-2 py-2 border-b border-gray-300"
              key={result["1. symbol"]}
            >
              <Link href={`/stocks/${result["1. symbol"]}`}>
                <p>{result["1. symbol"]}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
