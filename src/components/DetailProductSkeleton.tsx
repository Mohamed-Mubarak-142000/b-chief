import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Skeleton from "@mui/material/Skeleton";

const DetailProductSkeleton = () => {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
      {/* Skeleton Card 1 */}
      <Card sx={{ height: 400 }}>
        <Skeleton variant="rectangular" sx={{ height: "100%" }} />
      </Card>

      {/* Skeleton Card 2 */}
      <Card sx={{ height: 400 }}>
        <CardActionArea>
          <Skeleton variant="text" sx={{ width: "90%", margin: "16px auto" }} />
          <CardContent>
            <Skeleton variant="text" sx={{ width: "90%", margin: "8px 0" }} />
            <Skeleton variant="text" sx={{ width: "90%", margin: "8px 0" }} />
            <Skeleton variant="text" sx={{ width: "90%", margin: "8px 0" }} />
            <Skeleton variant="text" sx={{ width: "60%", margin: "8px 0" }} />
            <Skeleton variant="text" sx={{ width: "60%", margin: "8px 0" }} />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Skeleton variant="rectangular" width={100} height={36} />
        </CardActions>
      </Card>
    </section>
  );
};

export default DetailProductSkeleton;
