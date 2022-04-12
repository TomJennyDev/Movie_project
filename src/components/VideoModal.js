import { Alert, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { category } from "../app/tmdbApi";
import LoadingScreen from "./loading/LoadingScreen";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "99999",
};

export default function BasicModal() {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };
  const [video, setVideo] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getVideo = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.getVideos(category.movie, params.id);

        setVideo(response.data.results[0]);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getVideo();
  }, [params.id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <Box sx={{ width: { xs: "100vw", md: "600px" } }}>
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${video?.key}`}
                    title={video?.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
