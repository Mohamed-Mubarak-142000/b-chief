import { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardProduct from "./CardProduct";
import useDish from "../hooks/useDish";
import Loading from "./Loading";
import Error from "./Error";

const SliderProduct: React.FC = () => {
  const [randomIngredient, setRandomIngredient] = useState<string | null>(null);
  const {
    data: ingredientData,
    isLoading: isLoadingIngredients,
    isError: isErrorIngredients,
  } = useDish({
    endPoint: "list.php?i=list",
    title: "ingredients",
  });

  useEffect(() => {
    if (ingredientData && ingredientData.data.meals.length > 0) {
      const ingredients = ingredientData.data.meals.slice(0, 7);
      setRandomIngredient(
        ingredients.length > 5
          ? ingredients[Math.floor(Math.random() * ingredients.length)]
              .strIngredient
          : ingredients[0]?.strIngredient || null
      );
    }
  }, [ingredientData]);

  const {
    data,
    refetch,
    isLoading: isLoadingMeals,
    isError: isErrorMeals,
  } = useDish({
    title: "Special Ingredients",
    endPoint: randomIngredient ? `filter.php?i=${randomIngredient}` : "",
  });

  useEffect(() => {
    if (randomIngredient) {
      refetch();
    }
  }, [randomIngredient, refetch]);

  // Define slider settings
  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }),
    []
  );

  if (isLoadingIngredients || isLoadingMeals) {
    return <Loading />;
  }

  if (isErrorIngredients || isErrorMeals) {
    return <Error />;
  }

  if (!ingredientData || ingredientData.data.meals.length <= 10) {
    return <p>Not enough ingredients to display the slider.</p>;
  }

  return (
    <section className="mt-5">
      <Slider {...sliderSettings}>
        {data?.data?.meals.map((meal: any) => (
          <CardProduct
            key={meal.idMeal}
            image={meal.strMealThumb}
            alt={meal.strMeal || "image"}
            title={meal.strMeal}
            id={meal.idMeal}
          />
        ))}
      </Slider>
    </section>
  );
};

export default SliderProduct;
