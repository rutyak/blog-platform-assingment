import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {List, ListItem, ListItemText } from "@mui/material";

const MenuDrawer = ({user, toggleDrawer, handleLogout}) => {

  const navigate = useNavigate();
  
  return (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="w-64"
    >
      <List>
        <ListItem button>
          <Link to="/" className="text-lg text-black">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button>
        </ListItem>
        <ListItem button>
          <Link to="/createblog" className="text-lg text-black">
            <ListItemText primary="Blog Creation" />
          </Link>
        </ListItem>
        {user ? (
          <>
            <ListItem onClick={()=>navigate("/profile")}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button>
              <Link to="/signin" className="text-lg text-black">
                <ListItemText primary="Sign In" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/signup" className="text-lg text-black">
                <ListItemText primary="Sign Up" />
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default MenuDrawer;
