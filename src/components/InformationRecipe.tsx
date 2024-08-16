import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// Define types for the dish prop
interface Dish {
  strMeal?: string;
  strArea?: string;
  strCategory?: string;
  strInstructions?: string;
}

interface InformationRecipeProps {
  dish: Dish;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const InformationRecipe: React.FC<InformationRecipeProps> = ({
  dish,
  show,
  setShow,
}) => {
  // Memoize the instructions slicing
  const instructionsText = useMemo(() => {
    if (!dish?.strInstructions) return "";
    return !show
      ? dish.strInstructions.slice(0, 500) +
          (dish.strInstructions.length > 500 ? "..." : "")
      : dish.strInstructions;
  }, [dish?.strInstructions, show]);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-sky-800 font-bold uppercase text-3xl">
        {dish.strMeal}
      </h1>
      <div className="text-sky-800 flex justify-center items-start w-full pe-10 font-bold flex-col text-lg">
        <h2>
          Area:
          <Link className="text-orange-800" to={`/area/${dish.strArea}`}>
            {` ${dish.strArea}`}
          </Link>
        </h2>
        <h2>
          Category:
          <Link
            className="text-orange-800"
            to={`/categories/${dish.strCategory}`}
          >
            {` ${dish.strCategory}`}
          </Link>
        </h2>
      </div>
      {/* Instructions paragraph */}
      <p>
        {instructionsText}
        <span
          onClick={() => setShow(!show)}
          className="text-sky-800 cursor-pointer"
        >
          {show ? " Show less" : " Show more"}
        </span>
      </p>
    </div>
  );
};

export default InformationRecipe;
