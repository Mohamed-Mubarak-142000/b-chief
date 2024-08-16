import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";

interface CardProductProps {
  image: string;
  alt: string;
  title: string;
  id: string;
}

const CardProduct: React.FC<CardProductProps> = ({ image, alt, title, id }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 0 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={image}
          alt={alt}
          sx={{ objectFit: "cover" }}
          loading="lazy"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title.split(" ").slice(0, 3).join(" ")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This dish is a popular choice, made with fresh ingredients and
            authentic flavors.
          </Typography>
          <Link to={`/recipe/${id}`} style={{ textDecoration: "none" }}>
            <Button size="medium" color="warning" variant="outlined">
              More Details
            </Button>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;
