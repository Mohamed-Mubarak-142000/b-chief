import React, { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Loading from "../components/Loading";
import useDish from "../hooks/useDish";
import CardProduct from "../components/CardProduct";

export default function Search() {
  const { term } = useParams<{ term: string }>();
  const [newTerm, setTerm] = useState(term);
  const { data, isLoading, isError, refetch } = useDish({
    endPoint: `search.php?s=${term}`,
    title: "search",
  });
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (newTerm) {
        navigate(`/search/${newTerm}`);
        refetch();
      }
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [newTerm, navigate, refetch]);

  useEffect(() => {
    inputRef.current?.blur();
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>

      <section className="container mx-auto px-2 pt-24">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-x-10 gap-5">
          <h1 className="text-center flex flex-col justify-center items-center gap-5 text-3xl">
            <strong className="text-sky-900 font-bold">
              Search for ({term})
            </strong>
          </h1>

          <input
            ref={inputRef}
            type="search"
            className="w-4/12 border-0 lg:w-2/12 outline-0 px-3 py-1 rounded-xl shadow-lg transition-all duration-500 focus:w-6/12 lg:focus:w-3/12"
            placeholder="Search..."
            value={newTerm || ""}
            onChange={handleChange}
            onFocus={(e) => (e.target.value = "")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 my-10">
          {data?.data?.meals?.length ? (
            data.data.meals.map((dish: any) => (
              <CardProduct
                key={dish.idMeal}
                image={dish.strMealThumb}
                alt={dish.strMeal}
                title={dish.strMeal}
                id={dish.idMeal}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-96 flex-col gap-5 col-span-6">
              <h2 className="text-sky-800 font-bold text-3xl">
                No results found for {term}
              </h2>
              <h4 className="text-gray-600 font-bold text-xl flex justify-center gap-3 items-center">
                Try another search{" "}
                <CiSearch
                  onClick={() => {
                    inputRef.current?.focus();
                    setTerm("");
                  }}
                  className="text-sky-800 animate-pulse"
                  cursor="pointer"
                  size="2rem"
                />
              </h4>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
