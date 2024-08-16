import { useEffect, useState, useMemo } from "react";
import useDish from "../hooks/useDish";
import CardProduct from "./CardProduct";
import Loading from "./Loading";

const RelatedProducts = ({ category }: { category: string }) => {
  const [data, setData] = useState<any[]>([]);
  const {
    data: dataCategory,
    isLoading,
    refetch,
  } = useDish({
    title: "Special Category",
    endPoint: `filter.php?c=${category}`,
  });

  const memoizedData = useMemo(() => {
    return dataCategory?.data?.meals.slice(0, 10) || [];
  }, [dataCategory?.data?.meals]);

  useEffect(() => {
    setData(memoizedData);
    refetch();
  }, [category, memoizedData, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        {data?.map((dish: any) => (
          <CardProduct
            key={dish?.idMeal}
            image={dish?.strMealThumb}
            alt={dish?.strMeal}
            title={dish?.strMeal}
            id={dish?.idMeal}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
