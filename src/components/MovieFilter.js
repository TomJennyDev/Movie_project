import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import tmdbApi, { category, sortBy } from "../app/tmdbApi";
import useStoreContext from "../hooks/useStoreContext";
import { FMultiCheckbox, FSelect } from "./form";

function ProductFilter() {
  const [genreList, setGenreList] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setSearchKeyWords, with_keywords, toggleMenu, isOpenMenu } =
    useStoreContext();
  const handleDelete = () => {
    setSearchKeyWords();
    isOpenMenu && toggleMenu();
  };

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getGenre(category.movie);
        setGenreList(response.data.genres);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getGenres();
  }, []);

  return (
    <>
      <Box component={Paper} elevation={5} sx={{ p: 2, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, letterSpacing: "5px", textAlign: "left" }}
        >
          Keywords
        </Typography>
        <Divider sx={{ my: 1 }} />
        {with_keywords && (
          <Chip label={with_keywords} color="primary" onDelete={handleDelete} />
        )}
      </Box>
      <Stack component={Paper} elevation={5} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: "5px" }}>
          Sort
        </Typography>
        <Divider sx={{ my: 1 }} />
        <FSelect name="sort_by" label="sort_by">
          {sortBy.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </FSelect>
      </Stack>
      <Stack component={Paper} elevation={5} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: "5px" }}>
          Genres
        </Typography>
        <Divider sx={{ my: 1 }} />
        <FMultiCheckbox name="with_genres" options={genreList} />
      </Stack>
    </>
  );
}

export default ProductFilter;
