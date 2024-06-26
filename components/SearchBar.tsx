"use client";
import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="maginifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = ({setManufacturer, setModel}: {setManufacturer: Function, setModel: Function}) => {
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchManufacturer === "" && searchModel === "") {
      return alert("Please fill in the search bar");
    }

    setModel(searchModel)
    setManufacturer(searchManufacturer)
  };

  // const updateSearchParams = (model: string, manufacturer: string) => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   searchParams.set("model", model)
  //   searchParams.set("manufacturer", manufacturer)
  //   searchParams.set("limit", '10');
  //   const newPathname = `${
  //     window.location.pathname
  //   }?${searchParams.toString()}`;

  //   router.push(newPathname);
  // };

  return (
    <form onSubmit={handleSearch} className="searchbar">
      <div className="searchbar__item">
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          placeholder="Tiguan"
          className="searchbar__input"
          onChange={(e) => setSearchModel(e.target.value)}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
