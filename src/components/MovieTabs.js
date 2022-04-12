import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Alert, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi, {
  movieType,
  trendingTimeType,
  trendingType,
  tvType,
} from "../app/tmdbApi";
import { tabType } from "../pages/HomePage";
import LoadingScreen from "./loading/LoadingScreen";
import SwiperCustom from "./Swipper/SwiperCustom";

const styledTitle = (theme) => ({
  position: "relative",
  pl: 2,
  mb: 2,
  "&::before": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 1,
    width: "2px",
    backgroundColor: theme.palette.primary.main,
  },
});

export default function Tabs({ title, titleTabs }) {
  const params = useParams();

  const [value, setValue] = useState(titleTabs[0]);

  const [movieList, setMovieList] = useState([]);
  const [tvList, setTVList] = useState([]);
  const [castList, setCastList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        if (title === tabType.popular) {
          const responseMovie = await tmdbApi.getMoviesList(movieType.popular);
          const responseTVList = await tmdbApi.getTvList(tvType.popular);

          setMovieList(responseMovie.data.results);
          setTVList(responseTVList.data.results);
        }

        if (title === tabType.trending) {
          let trendingTime =
            value === "Today" ? trendingTimeType.day : trendingTimeType.week;
          const responseMovie = await tmdbApi.getTrendMovieList(
            trendingType.movie,
            trendingTime
          );

          setMovieList(responseMovie.data.results);
        }

        if (value === "Similar") {
          const responseSimilar = await tmdbApi.similar(
            trendingType.movie,
            params.id
          );
          setMovieList(responseSimilar.data.results);
        }

        if (value === "Cast") {
          const responseCast = await tmdbApi.credits(
            trendingType.movie,
            params.id
          );

          setCastList(responseCast.data.cast);
        }

        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };
    getMovies();
  }, [value, title, params.id]);

  return (
    <Container maxWidth="xl" sx={{ width: "100%", pt: "70px" }}>
      <Typography variant="h3" sx={styledTitle}>
        {title}
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {titleTabs?.map((title, idx) => {
              return <Tab key={title} label={title} value={title}></Tab>;
            })}
          </TabList>
        </Box>
        <TabPanel value={titleTabs[0]}>
          {loading ? (
            <Box sx={{ height: "407px" }}>
              <LoadingScreen />
            </Box>
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : value === "Cast" ? (
                <SwiperCustom castList={castList} />
              ) : (
                <SwiperCustom movieList={movieList} />
              )}
            </>
          )}
        </TabPanel>
        <TabPanel value={titleTabs[1]}>
          {loading ? (
            <Box sx={{ height: "407px" }}>
              <LoadingScreen />
            </Box>
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : title === tabType.trending ? (
                <SwiperCustom movieList={movieList} />
              ) : value === "Similar" ? (
                <SwiperCustom movieList={movieList} />
              ) : (
                <SwiperCustom tvList={tvList} />
              )}
            </>
          )}
        </TabPanel>
      </TabContext>
    </Container>
  );
}
