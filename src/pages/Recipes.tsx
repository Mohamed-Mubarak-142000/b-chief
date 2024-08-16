import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";
import Modal from "../components/Modal";
import VideoDisplay from "../components/VideoDisplay";
import BroadCardImage from "../components/BroadCardImage";
import ShowIngredients from "../components/ShowIngredients";
import InformationRecipe from "../components/InformationRecipe";
import ImageRecipe from "../components/ImageRecipe";
import RelatedProducts from "../components/RelatedProducts";
import DetailProductSkeleton from "../components/DetailProductSkeleton";
import Loading from "../components/Loading";

export default function Recipes() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useDish({
    title: "dish by id",
    endPoint: `lookup.php?i=${id}`,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const dish = data?.data?.meals[0];

  if (isLoading) {
    return <DetailProductSkeleton />;
  }

  if (isError) {
    return <Loading />;
  }

  if (!dish) {
    return <div>No dish found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{dish.strMeal}</title>
      </Helmet>

      <BroadCardImage title="Details About Recipe" />
      <section className="container mx-auto px-4 min-h-[70vh] flex flex-col justify-start items-center py-28 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <ImageRecipe dish={dish} setIsModalOpen={setIsModalOpen} />
          <InformationRecipe dish={dish} show={show} setShow={setShow} />
        </div>

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <VideoDisplay videoUrl={dish.strYoutube} />
        </Modal>

        <div className="w-full">
          <h2 className="text-sky-800 font-bold text-3xl">Ingredients</h2>
          <ShowIngredients dish={dish} />
        </div>
      </section>

      <section className="container mx-auto min-h-[70vh]">
        <h1 className="text-sky-800 font-bold text-2xl">Related Recipes</h1>
        <RelatedProducts category={dish.strCategory} />
      </section>
    </>
  );
}
