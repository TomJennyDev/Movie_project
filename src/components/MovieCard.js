import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CardActionArea, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiConfig from "../app/config";
import useStoreContext from "../hooks/useStoreContext";
import { CircularProgressWithLabel } from "./styled";

const styledContainerPlayButton = (theme) => ({
  width: 1,
  height: "80%",
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 0,
});

const StyledIconAddFavorite = (favorites, id) => ({
  zIndex: 999,
  position: "absolute",
  height: "2em",
  width: "2em",
  lineHeight: 1,
  right: "1%",
  top: "1%",

  "& svg": { filter: "drop-shadow( 0 1px 0 black)" },
});

const styledIconPlay = (theme) => ({
  zIndex: 999,
  height: "2em",
  width: "2em",
  lineHeight: 1,

  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 30px ${theme.palette.primary.main}`,
  display: { sx: "block", lg: "none" },
  transition: theme.transitions.create(["all"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "scale(1.2)",
  },
});

const styledCircularProgressWithLabel = {
  zIndex: 99,
  position: "absolute",
  bottom: "0.5%",
  right: "2%",
};

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, toggleFavorite } = useStoreContext();

  const handleAddtoFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(movie.id);
  };
  return (
    <Card
      sx={{
        width: 1,
        height: 1,
        position: "relative",
        "&:hover a.MuiButtonBase-root": {
          display: "block",
        },
      }}
    >
      <Box sx={styledContainerPlayButton}>
        <IconButton
          aria-label="delete"
          variant="contained"
          size="large"
          sx={styledIconPlay}
          component={Link}
          to={`/modal/${movie.id}`}
          state={{ backgroundLocation: location }}
          onClick={(e) => e.stopPropagation()}
        >
          <PlayArrowIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          variant="contained"
          size="large"
          sx={StyledIconAddFavorite}
          onClick={handleAddtoFavorite}
        >
          {favorites.includes(movie.id) ? (
            <BookmarkRemoveIcon fontSize="inherit" />
          ) : (
            <BookmarkAddIcon fontSize="inherit" />
          )}
        </IconButton>
      </Box>

      <CardActionArea onClick={() => navigate(`/details/${movie.id}`)}>
        <CardMedia
          component="img"
          height="320"
          image={apiConfig.w220Image(movie.backdrop_path)}
          alt={movie?.title ? movie?.title : movie?.name}
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
            {movie?.title ? movie?.title : movie?.name}
          </Typography>
          <Box sx={styledCircularProgressWithLabel}>
            <CircularProgressWithLabel value={movie.vote_average * 10} />
          </Box>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            noWrap
            textAlign="left"
          >
            {movie?.release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
