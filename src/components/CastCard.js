import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import apiConfig from "../app/config";

function CastCard({ cast }) {
  return (
    <Card sx={{ width: 1, height: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
          image={apiConfig.w220Image(cast?.profile_path)}
          alt={cast?.original_name}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            noWrap
            textAlign="left"
            fontWeight="500"
          >
            {cast?.character}
          </Typography>

          <Typography
            gutterBottom
            variant="body2"
            component="div"
            noWrap
            textAlign="left"
          >
            {cast?.original_name || " "}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CastCard;
