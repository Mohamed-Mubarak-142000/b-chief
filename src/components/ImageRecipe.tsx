import React, { Dispatch, SetStateAction, useMemo, useCallback } from "react";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Dish {
  strMealThumb?: string;
  strMeal?: string;
  strSource?: string;
  strYoutube?: string;
}

interface ImageRecipeProps {
  dish: Dish;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ImageRecipe: React.FC<ImageRecipeProps> = ({ dish, setIsModalOpen }) => {
  const { strMealThumb, strMeal, strSource, strYoutube } = useMemo(
    () => dish,
    [dish]
  );

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  return (
    <div className="flex flex-col justify-start items-center gap-10">
      <img
        className="w-3/4 md:w-1/2 lg:w-3/4 max-w-lg rounded-md shadow-2xl mx-auto"
        src={strMealThumb}
        alt={strMeal}
      />
      <div className="flex justify-center items-center gap-5">
        {strSource && (
          <Link
            className="text-white px-5 py-2 bg-orange-600 rounded-full"
            to={strSource}
            target="_blank"
          >
            Source
          </Link>
        )}
        {strYoutube && (
          <button
            className="text-white px-5 py-2 bg-red-600 rounded-full flex justify-center items-center gap-2"
            onClick={handleModalOpen}
          >
            <FaYoutube />
            YouTube
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageRecipe;
