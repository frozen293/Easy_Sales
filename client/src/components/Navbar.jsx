import React, { useState } from "react";
import {
  Brightness7 as LightModeOutlined,
  Brightness4 as DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  ExitToApp as LogoutOutlined,
  ExpandMore as ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexStyle from "components/FlexStyle";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate(); // Add useNavigate hook

  const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);
  const isLogoutOpen = Boolean(logoutAnchorEl);

  const handleLogoutClick = () => {
    // Perform logout logic here
    navigate("/login"); // Redirect to login page
  };

  const handleLogoutMenuOpen = (event) => {
    setLogoutAnchorEl(event.currentTarget);
  };

  const handleLogoutMenuClose = () => {
    setLogoutAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        top: 0,
        background: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)", // Use interesting boxShadow
        borderBottom: "1px solid #444",
        zIndex: theme.zIndex.drawer + 1,
        borderRadius: "0 0 15px 15px", // Rounded bottom corners
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexStyle>
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{
              position: "relative",
              marginRight: "0.5rem",
              transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
              "&:hover": {
                transform: "scale(1.2) rotate(90deg)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)", // Shadow effect on hover
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                transition: "opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                opacity: 0, // Start with opacity 0
              },
              "&:hover::before": {
                opacity: 1, // Change opacity on hover
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <FlexStyle
            backgroundColor={theme.palette.background.alt}
            borderRadius="5px"
            gap="0.5rem"
            p="0.1rem 0.5rem" // Adjusted padding
            sx={{
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              border: "2px solid transparent", // Border style
              borderRadius: "5px", // Border radius
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Box shadow
              "&:focus-within": {
                borderColor: theme.palette.primary.main, // Border color on focus
              },
            }}
          >
            <InputBase
              placeholder="Search..."
              sx={{
                color: "#fff",
                fontSize: "0.8rem", // Smaller font size
                "&::placeholder": {
                  color: "#aaa",
                },
              }}
            />
            <IconButton>
              <Search sx={{ color: "#fff" }} />
            </IconButton>
          </FlexStyle> 
        </FlexStyle>

        {/* RIGHT SIDE */}
        <FlexStyle gap="1rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <IconButton
            onMouseEnter={handleLogoutMenuOpen}
            onMouseLeave={handleLogoutMenuClose}
          >
            <LogoutOutlined />
            <Menu
              anchorEl={logoutAnchorEl}
              open={isLogoutOpen}
              onClose={handleLogoutMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </IconButton>

          <FlexStyle alignItems="center">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
              />
              <Box>
                <Typography variant="subtitle1">{user.name}</Typography>
                <Typography variant="body2" sx={{ color: "#ccc" }}>
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined /> 
            </Box>
          </FlexStyle>
        </FlexStyle>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
