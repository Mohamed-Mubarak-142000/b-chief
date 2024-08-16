import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";
import Error from "../components/Error";
import CardProduct from "../components/CardProduct";

export default function SpecialArea() {
  const { area } = useParams();
  const { data, isLoading, isError } = useDish({
    endPoint: `filter.php?a=${area}`,
    title: "Special Area",
  });

  // Memoize the meals to avoid unnecessary re-renders
  const meals = useMemo(() => data?.data?.meals || [], [data]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Helmet>
        <title>{area}</title>
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        {meals.map((meal: any) => (
          <CardProduct
            key={meal.idMeal}
            image={meal.strMealThumb}
            alt={meal.strMeal || "image"}
            title={meal.strMeal}
            id={meal.idMeal}
          />
        ))}
      </div>
    </>
  );
}
