import { Box } from "@mui/material";
import { Autoplay, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import CastCard from "../CastCard";
import MovieCard from "../MovieCard";
import "./swipper.css";

function SwiperCustom({ movieList, tvList, castList }) {
  const dataList = movieList || tvList || castList;
  return (
    <Box sx={{ width: 1, position: "relative" }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation={true}
        breakpoints={{
          slidesPerView: 1,
          spaceBetween: 10,

          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },

          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          900: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        modules={[Navigation, Autoplay]}
        className="main_swipper"
      >
        {dataList?.map((data) => {
          return (
            <SwiperSlide key={data.id}>
              {({ isActive }) => {
                return (
                  (castList && <CastCard cast={data} />) || (
                    <MovieCard movie={data} />
                  )
                );
              }}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default SwiperCustom;
