import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, MenuItem, IconButton, Button, Drawer } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";
import MenuDrawer from "./MenuDrawer/MenuDrawer";

function Navbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null); 
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const navigate = useNavigate();

  const pageStyle = "text-lg text-black hover:text-hovercolor";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null); 
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open); 
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    handleProfileMenuClose();
    navigate("/signin");
  };

  return (
    <nav className="text-black px-6 py-4 flex justify-between items-center">
      <div className="text-teal-600 text-3xl font-semibold">Blog Platform</div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-10">
        <Link to="/" className={pageStyle}>
          Home
        </Link>
        <Link to="/createblog" className={pageStyle}>
          Blog Creation
        </Link>

        {user ? (
          <div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <AccountCircleIcon sx={{ width: 40, height: 40}}/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              id="menu-appbar"
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose} 
            >
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose();
                  navigate("/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/signin">
              <Button
                variant="outlined"
                color="contained"
                className="bg-[#34a67b] hover:bg-teal-500 hover:text-white"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="contained"
                color="outlined"
                className="hover:bg-teal-700"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex gap-4 items-center justify-center lg:hidden">
        <p className="text-lg hover:text-hovercolor">Menu</p>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <MenuDrawer
            user={user}
            toggleDrawer={toggleDrawer}
            handleLogout={handleLogout}
          />
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
