"use client"
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Location } from "./LocationContext";

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [searchResult, setSearchResult] = useState<Location[]>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue) {
      fetch(`http://localhost:3000/api/maps/search-location?location=${debouncedValue}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {
          setSearchResult(data.data);
          console.log(data.data)
        })
        .catch(error => {
          console.error("Error fetching location:", error);
        });
    }
  }, [debouncedValue]);
  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Looking for a parking"
        className="px-4 py-2 rounded-md w-1/3 text-skyparkPrimary bg-white mx-auto"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div className="bg-white w-1/3 mx-auto text-left">
        {searchResult && searchResult.map((result, index: number) => (
          <div key={index} className="truncate p-3 border-b hover:bg-[#e7e7e7] transition-all">
            <Link href={`/maps?lat=${result.coordinates.lat}&lng=${result.coordinates.lng}`}>
              {result.description}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}