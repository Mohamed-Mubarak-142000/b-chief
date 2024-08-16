import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions, Skeleton } from "@mui/material";
export default function Loading() {
  return (
    <div className="container mx-auto px-4">
      <Skeleton
        sx={{ bgcolor: "grey.300" }}
        variant="rectangular"
        width={"100%"}
        height="250"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        <Card sx={{ border: "1px solid #ddd" }}>
          <CardActionArea>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Skeleton variant="rectangular" width="100px" height="36px" />
          </CardActions>
        </Card>

        <Card sx={{ border: "1px solid #ddd" }}>
          <CardActionArea>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Skeleton variant="rectangular" width="100px" height="36px" />
          </CardActions>
        </Card>

        <Card sx={{ border: "1px solid #ddd" }}>
          <CardActionArea>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Skeleton variant="rectangular" width="100px" height="36px" />
          </CardActions>
        </Card>

        <Card sx={{ border: "1px solid #ddd" }}>
          <CardActionArea>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Skeleton variant="rectangular" width="100px" height="36px" />
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
