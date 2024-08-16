import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import imageCard from "../images/hero.png";
import { Link } from "react-router-dom";

const BanarProduct = () => {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
      {/* Text Card */}
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <CardContent>
          <div className="bg-[#010f36] flex flex-wrap justify-around items-center">
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "lg", lg: "xl" },
                color: "skyblue",
                fontWeight: "bold",
              }}
            >
              B
              <span
                className="text-xl lg:text-3xl"
                style={{
                  color: "white",
                  position: "relative",
                  left: "-1rem",
                  top: "-1rem",
                }}
              >
                Chief
              </span>
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{ color: "white", fontSize: "16px" }}
            >
              Now you can search for your food!
            </Typography>
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, fontSize: "18px", lineHeight: 2 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos numquam
            velit recusandae itaque illum, dolores dolorem obcaecati quaerat
            adipisci inventore enim a soluta impedit? Optio aperiam nulla sit
            vel cupiditate! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Eos numquam velit recusandae itaque illum, dolores dolorem
            obcaecati quaerat adipisci inventore enim a soluta impedit? Optio
            aperiam nulla sit vel cupiditate! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eos numquam velit recusandae itaque
            illum, dolores dolorem obcaecati quaerat adipisci inventore enim a
            soluta impedit? Optio aperiam nulla sit vel cupiditate!
          </Typography>
          <Link to={`/categories/${""}`} style={{ textDecoration: "none" }}>
            <Button
              size="medium"
              color="warning"
              variant="contained"
              sx={{ p: 1.5 }}
            >
              More Details
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Image Card */}
      <Card
        sx={{
          bgcolor: "transparent",
          borderRadius: "10px",
          boxShadow: 0,
          height: "100%",
          width: "90%",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            className="animate-spin-slow"
            src={imageCard}
            alt={"image"}
            sx={{
              objectFit: "cover",
              borderRadius: "10px",
              height: "80%",
              width: "100%",
            }}
            loading="lazy"
          />
        </CardActionArea>
      </Card>
    </div>
  );
};

export default BanarProduct;
