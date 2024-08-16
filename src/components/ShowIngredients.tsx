import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Slider from "react-slick";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ShowIngredients = ({ dish }: { dish: any }) => {
  const { getIngredient, getIngredientPic } = useContext(ApiContext);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
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
  };

  return (
    <section className="mt-5">
      <Slider {...settings}>
        {getIngredient(dish).map((ingredient: any, index: number) => (
          <Card key={index} sx={{ maxWidth: "95%", mx: "auto" }}>
            <CardMedia
              component="img"
              image={getIngredientPic(ingredient[1])}
              alt={ingredient[1]}
              sx={{ height: 150, objectFit: "contain" }}
              loading="lazy"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {ingredient[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {ingredient[1]}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </section>
  );
};

export default ShowIngredients;
