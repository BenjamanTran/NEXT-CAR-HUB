"use client";
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars, generateCarImageUrl } from "@/untils";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState('2022');
  const [fuel, setFuel] = useState("");
  const [limit, setLimit] = useState(10);
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCars = async () => {
    setIsLoading(true);

    try {
      const results = await fetchCars({
        manufacturer: manufacturer || "toyota",
        year: year || '2022',
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });

      setAllCars(results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [manufacturer, model, limit, fuel, year]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
      </div>

      <div className="home__filters">
        <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
          <CustomFilter
            title="year"
            options={yearsOfProduction}
            setFilter={setYear}
          />
        </div>
      </div>

      {isLoading && (
        <div className="mt-16 w-full flex-center">
          <Image
            src="/loader.png"
            alt="loader"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
      )}

      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car, index) => (
              <CarCard
                car={car}
                key={index}
              />
            ))}
          </div>

          <ShowMore
            pageNumber={limit / 10}
            isNext={limit > allCars.length}
            setLimit={setLimit}
          />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
        </div>
      )}
    </main>
  );
}
