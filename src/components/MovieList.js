import { Grid } from "@mui/material";
import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <Grid container spacing={2} mt={1}>
      {movies?.map((movie) => (
        <Grid item key={movie.id} xs={12} md={6} lg={3}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;
