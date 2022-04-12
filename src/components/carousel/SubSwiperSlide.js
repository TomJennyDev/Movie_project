import { Box } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./carousel.css";

export default function SubSwiperSlide({ imgUrl, title }) {
    
  const styledImg = () => ({
    backgroundImage: `url(${imgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: 1,
    height: 1,
  });

  return <Box sx={styledImg}></Box>;
}
