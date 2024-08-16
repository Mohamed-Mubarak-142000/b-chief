import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import useDish from "../hooks/useDish";
import Error from "../components/Error";
import CardProduct from "../components/CardProduct";

export default function SpecialIngredients() {
  const { ingredient } = useParams();
  const { data, refetch, isLoading, isError } = useDish({
    title: "Special Ingredients",
    endPoint: `filter.php?i=${ingredient}`,
  });

  useEffect(() => {
    refetch();
  }, [ingredient, refetch]);

  const meals = useMemo(() => data?.data?.meals || [], [data]);

  if (isLoading || isError) {
    return isLoading ? <Loading /> : <Error />;
  }

  return (
    <>
      <Helmet>
        <title>{ingredient}</title>
      </Helmet>
      <div className="container mx-auto px-4">
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
      </div>
    </>
  );
}
