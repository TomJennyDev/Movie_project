import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import apiConfig from "../app/config";
import tmdbApi, { category } from "../app/tmdbApi";
import LoadingScreen from "../components/loading/LoadingScreen";
import Tabs from "../components/MovieTabs";
import BreadCrumsStyle from "../components/styled/BreadCrumsStyle";
import useStoreContext from "../hooks/useStoreContext";

const StyledIconAddFavorite = (theme) => ({
  zIndex: 9999,
  position: "absolute",
  height: "2em",
  width: "2em",
  lineHeight: 1,
  right: "1%",
  top: "1%",
});

const styledIconPlay = (theme) => ({
  zIndex: 9999,
  position: "absolute",
  height: "2em",
  width: "2em",
  lineHeight: 1,
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 30px ${theme.palette.primary.main}`,

  transition: theme.transitions.create(["all"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translate(-50%,-50%) scale(1.2)",
  },
});

export const titleTabsCast = ["Cast", "Similar"];
export const titleCast = "Cast";

function DetailPage() {
  const params = useParams();
  const location = useLocation();
  const { favorites, toggleFavorite } = useStoreContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddtoFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(movie.id);
  };

  useEffect(() => {
    if (params.id) {
      const getMovie = async () => {
        setLoading(true);
        try {
          const response = await tmdbApi.detail(category.movie, params.id);
          setMovie(response.data);

          setError("");
        } catch (error) {
          setError(error.message);
        }
        setLoading(false);
      };
      getMovie();
    }
  }, [params]);

  const styledContainer = {
    background: `url(${apiConfig.originalImage(movie?.poster_path)})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover",
  };

  const styledContent = {
    position: "relative",
    height: 1,
    zIndex: 99,
  };

  const styledBackground = {
    minHeight: "100vh",
    width: 1,
    height: 1,
    background:
      "linear-gradient(to top, rgba(0,0,0),rgba(0,0,0,0.3),rgba(0,0,0,0.4),transparent,rgba(0,0,0,0.8))",
    pt: { xs: "125px", lg: "80px" },
  };
  return (
    <Box sx={styledContainer}>
      <Box sx={styledBackground}>
        <Container maxWidth="xl">
          <BreadCrumsStyle title={movie?.title} />
          <Box sx={styledContent}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    {movie ? (
                      <Card
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.25)",
                          backgroundImage: "none",
                          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba( 255, 255, 255, 0.18 )",
                          p: 3,
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12} md={4}>
                            <Box p={2}>
                              <Box
                                sx={{
                                  borderRadius: 2,
                                  overflow: "hidden",
                                  display: "flex",
                                  justifyContent: "center",
                                  position: "relative",
                                }}
                              >
                                <IconButton
                                  aria-label="delete"
                                  variant="contained"
                                  size="large"
                                  sx={styledIconPlay}
                                  component={RouterLink}
                                  to={`/modal/${movie.id}`}
                                  state={{ backgroundLocation: location }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <PlayArrowIcon fontSize="inherit" />
                                </IconButton>
                                <img
                                  src={apiConfig.w220Image(movie.backdrop_path)}
                                  width="220"
                                  height="320"
                                  alt={movie.title}
                                />
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <IconButton
                              aria-label="delete"
                              variant="contained"
                              size="large"
                              sx={StyledIconAddFavorite}
                              state={{ backgroundLocation: location }}
                              onClick={handleAddtoFavorite}
                            >
                              {favorites.includes(movie.id) ? (
                                <BookmarkRemoveIcon fontSize="inherit" />
                              ) : (
                                <BookmarkAddIcon fontSize="inherit" />
                              )}
                            </IconButton>
                            <Typography
                              variant="h4"
                              paragraph
                              sx={{ textShadow: "0 0 3px black" }}
                            >
                              {movie.title}
                            </Typography>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              alignItems="center"
                              spacing={1}
                              divider={
                                <Divider
                                  orientation="vertical"
                                  sx={{
                                    borderColor: "rgba(255, 255, 255)",
                                  }}
                                />
                              }
                              sx={{ my: 2 }}
                            >
                              <Button
                                variant="contained"
                                startIcon={<CalendarTodayIcon />}
                              >
                                {movie.release_date}
                              </Button>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                sx={{ mb: 2 }}
                              >
                                <Rating
                                  value={movie.vote_average}
                                  precision={0.1}
                                  readOnly
                                  sx={{
                                    filter: "drop-shadow(0 1px 1px black)",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    textShadow: "0 0 3px black",
                                  }}
                                >
                                  ({movie.vote_count} reviews)
                                </Typography>
                              </Stack>
                            </Stack>
                            <Divider />
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={2}
                              sx={{ m: 1 }}
                            >
                              {movie?.genres?.map((genre) => {
                                return (
                                  <Fragment key={genre.id}>
                                    <Chip
                                      color="primary"
                                      variant="contained"
                                      label={genre.name}
                                    />
                                  </Fragment>
                                );
                              })}
                            </Stack>
                            <Divider />
                            <Typography
                              paragraph
                              variant="subtitle1"
                              sx={{ m: 1, textShadow: "0 0 3px black" }}
                            >
                              {movie.overview}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    ) : (
                      <Typography variant="h6">Movie not found!</Typography>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
          <Box>
            <Tabs title={titleCast} titleTabs={titleTabsCast} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default DetailPage;
