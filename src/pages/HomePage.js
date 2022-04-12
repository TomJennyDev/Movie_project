import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import tmdbApi, { movieType } from "../app/tmdbApi";
import Carousel from "../components/carousel/Carousel";
import LoadingHome from "../components/loading/LoadingHome";
import Tabs from "../components/MovieTabs";

const titleTabsPopular = ["In Theaters", "on TV"];
const titleTabsTrending = ["Today", "This week"];

export const tabType = {
  popular: "Popular",
  trending: "Trending",
};

function HomePage() {
  const [movieListTopRate, setMovieListTopRate] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getMoviesList(movieType.upcoming);

        setMovieListTopRate(response.data.results);
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingHome />
      ) : (
        <>
          <Carousel movieListTopRate={movieListTopRate} />
          <Tabs title={tabType.popular} titleTabs={titleTabsPopular} />
          <Tabs title={tabType.trending} titleTabs={titleTabsTrending} />
        </>
      )}
    </>
  );
}

export default HomePage;
