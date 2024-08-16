import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useRandomDish from "../hooks/useRandomDish";
import DetailProductSkeleton from "./DetailProductSkeleton";
import Error from "./Error";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from "@mui/material";

export default function RandomDish() {
  const { data, isError, isLoading } = useRandomDish();

  const dishes = useMemo(() => {
    if (data?.data?.meals) {
      return data.data.meals.map((dish: any) => (
        <Grid container spacing={5} key={dish?.idMeal} sx={{ mb: 5 }}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ maxWidth: "100%", mx: "auto", boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="400"
                image={dish?.strMealThumb}
                alt={dish?.strMeal}
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} container alignItems="center">
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                {dish?.strMeal}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {dish?.strInstructions.split("").splice(0, 1000).join("")}
                <Link
                  to={`/recipe/${dish?.idMeal}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    Read More ......
                  </Typography>
                </Link>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      ));
    }
    return [];
  }, [data?.data?.meals]);

  if (isLoading) {
    return <DetailProductSkeleton />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {dishes}
    </Container>
  );
}
