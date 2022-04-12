import BookmarksIcon from "@mui/icons-material/Bookmarks";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Stack, ToggleButton, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import MovieSearch from "../components/MovieSearch";
import { ButtonStyled } from "../components/styled";
import useAuth from "../hooks/useAuth";
import useStoreContext from "../hooks/useStoreContext";

const settings = ["Profile", "Logout"];

function MainHeader() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const { favorites, toggleMenu, isOpenMenu } = useStoreContext();

  const [toggleSearch, settoggleSearch] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDropDownMenu = (e, setting) => {
    if (setting === "Logout")
      logout(() => {
        navigate("/");
      });
  };

  const isScroll = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const styledAppbar = (isScroll) => ({
    backgroundImage: "none",
    backgroundColor: {
      sx: "rgb(18,18,18,0.5)",
      md: isScroll ? "rgba(0,0,0,0.5)" : "transparent",
    },
    boxShadow: {
      sx: 5,
      md: isScroll ? 3 : "none",
    },
  });

  const styledToolbar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Box>
      <AppBar position="fixed" sx={() => styledAppbar(isScroll)}>
        <Toolbar sx={styledToolbar}>
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <ToggleButton
              value="check"
              selected={isOpenMenu}
              onChange={() => {
                toggleMenu();
              }}
              sx={{ borderRadius: "50%" }}
            >
              {isOpenMenu ? <MenuOpenIcon /> : <MenuIcon />}
            </ToggleButton>
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Box sx={{ display: { xs: "none", lg: "block" }, width: "25%" }}>
            <MovieSearch />
          </Box>

          <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ display: { xs: "block", lg: "none" }, mr: 1 }}>
              <ToggleButton
                size="medium"
                value="check"
                selected={toggleSearch}
                onChange={() => {
                  settoggleSearch(!toggleSearch);
                }}
                sx={{ borderRadius: "50%" }}
              >
                <SearchIcon />
              </ToggleButton>
            </Box>
            <Box sx={{ mr: 1 }}>
              <IconButton aria-label="delete" size="medium">
                <Badge color="primary" badgeContent={favorites.length} showZero>
                  <BookmarksIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, m: 0 }}
                    >
                      <Avatar
                        alt={user.username}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={(e) => handleDropDownMenu(e, setting)}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <ButtonStyled
                  variant="outlined"
                  onClick={() => navigate("/login")}
                >
                  Login
                </ButtonStyled>
              )}
            </Box>
          </Stack>
        </Toolbar>
        <Stack
          sx={{
            display: { xs: toggleSearch ? "block" : "none", lg: "none" },
            width: 1,
            p: 2,
          }}
        >
          <MovieSearch />
        </Stack>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
