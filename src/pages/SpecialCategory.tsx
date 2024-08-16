import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import useDish from "../hooks/useDish";
import CardProduct from "../components/CardProduct";

export default function SpecialCategory() {
  const { category } = useParams<{ category: string }>();
  const { data, isLoading, refetch } = useDish({
    title: "Special Category",
    endPoint: `filter.php?c=${category}`,
  });

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  const meals = useMemo(() => data?.data?.meals || [], [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{category}</title>
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
