import React from "react";
import { Helmet } from "react-helmet-async";
import RandomDish from "../components/RandomDish";
import SliderProduct from "../components/SliderProduct";
import BanarProduct from "../components/BanarProduct";
import SomeCategories from "../components/SomeCategories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    const x = setTimeout(() => {
      if (searchData && searchData.length > 0) {
        navigate(`/search/${searchData}`);
      }
    }, 3000);
    return () => {
      clearTimeout(x);
    };
  }, [searchData, navigate]);

  return (
    <>
      <Hero />
      <section className="container text-center relative -top-6">
        <input
          onChange={handleChange}
          type="search"
          placeholder="Search for Recipes.."
          className="w-9/12 lg:w-1/4 md:w-1/2 focus:w-3/4 lg:focus:w-2/6 transition-width duration-500
            outline-none rounded-lg text-xl text-gray-600
             shadow-sm mx-auto h-12 px-5 placeholder:text-gray-600"
        />
      </section>
      <RandomDish />
      <SliderProduct />
      <BanarProduct />
      <SomeCategories />
    </>
  );
};

export default Home;
