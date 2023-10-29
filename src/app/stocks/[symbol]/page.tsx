"use client";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/globalComponents/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function page() {
  interface CompanyData {
    Symbol: string;
    Name: string;
    Description: string;
    Sector: string;
    Industry: string;
    PERatio: number;
  }

  const router = useRouter();
  const pathName = usePathname();
  const parts = pathName.split("/");
  const stockName = parts.pop();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
    const apiKey = "B69I69O1YWXYNPHI";
    const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockName}&apikey=${apiKey}`;

    axios
      .get<CompanyData>(apiUrl)
      .then((response) => {
        setCompanyData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [stockName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="individual-stock-page w-full flex flex-col justify-center items-center">
      <Navbar />
      {companyData && (
        <div className="stock-container w-full flex flex-col justify-center items-center mt-10 px-6 lg:px-20">
          <h1 className="font-bold text-2xl lg:text-4xl">
            Stock Details for {companyData.Symbol}
          </h1>
          <div className="stock-details-container bg-teal-50 rounded-lg mt-4 w-auto py-4 px-8 flex flex-col justify-center items-start">
            <p className="font-normal text-base">
              <span className="font-bold">Name -</span> {companyData.Name}
            </p>
            <p className="font-normal text-base">
              <span className="font-bold">Description -</span>{" "}
              {companyData.Description}
            </p>
            <p className="font-normal text-base">
              <span className="font-bold">Sector -</span> {companyData.Sector}
            </p>
            <p className="font-normal text-base">
              <span className="font-bold">Price -</span> {companyData.Industry}
            </p>
            <p className="font-normal text-base">
              <span className="font-bold">P/E Ratio -</span>{" "}
              {companyData.PERatio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
