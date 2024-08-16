import Slider from "react-slick";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDish from "../hooks/useDish";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useEffect } from "react";

const SomeCategories = () => {
  const {
    data: categories,
    isLoading,
    refetch,
  } = useDish({
    endPoint: "categories.php",
    title: "categories",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loading />;
  }

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
  };

  return (
    <section className="mt-5">
      <Slider {...settings}>
        {categories?.data?.categories.map((category: any, index: number) => (
          <Card
            sx={{
              border: "none",
              boxShadow: 0,
              borderRadius: "50%",
              height: "400px",
              width: "250px",
              margin: "0 5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
            key={index}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                src={category.strCategoryThumb}
                alt={category.strCategory}
                sx={{
                  objectFit: "cover",
                  height: "250px",
                  width: "250px",
                  borderRadius: "50%",
                  marginBottom: "20px",
                }}
                loading="lazy"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {category.strCategory.split(" ").splice(0, 3).join(" ")}
                </Typography>

                <Link to={`/categories/${category.strCategory}`}>
                  <Button size="medium" color="warning" variant="outlined">
                    More Details
                  </Button>
                </Link>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Slider>
    </section>
  );
};

export default SomeCategories;
