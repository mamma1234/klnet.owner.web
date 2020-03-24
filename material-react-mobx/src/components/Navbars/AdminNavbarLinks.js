import React from "react";
import classNames from "classnames";
import { Link } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";

// core components

import Button from "components/CustomButtons/Button.js";
import Modal from '@material-ui/core/Modal';
import JoinPage from "components/Form/Common/JoinPage.js";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Login from "views/LoginPage/LoginPage.js";
import Drawer from '@material-ui/core/Drawer';
const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {

  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openJoin,setOpenJoin] = React.useState(false);
  
  React.useEffect(() => {
	    console.log('effect');
	    
	    function handleTouchMove(event) {
	    	if(openJoin) {
	    		event.preventDefault();
	    	}
	    }
	    
	    window.addEventListener("touchmove",handleTouchMove, {
	    	passive: false
	    });

	    return () => {
	      console.log('cleanup');
	      window.removeEventListener("touchmove",handleTouchMove);
	    };
}, [openJoin]);
  
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  
  const logOut = () => {
	   console.log(">>>logout button click");
	    axios.get("/auth/logout")
	    .then(res => {
	        if (res.data.message) alert(res.data.message);
	        else setOpenJoin(true);
	        	//window.location.href = "/login"; //alert(res.data.userid + " �α��� ����");
	    })
	    .catch(err => {
	        console.log(err);
	        //window.location.href = "/Landing";
	    })
	  
	 // window.location.href = "/auth/logout";
  };
    
  const handleJoinClose = () => {
	  setOpenJoin(false);
  }
  
  const handleEvents = name => e => {
	  //name == "Profile"?return <Link href="/svc/user"}></Link>:window.location.href = "/svc/setting"
	  return (<Link href="/svc/user"></Link>);
  }
  
  return (
    <div>
      {/*}<div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>*/}
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You{"'"}re now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
    	          <NavLink
  	            	to="/svc/user"
  	            	activeClassName="active"
  	            	>
                    <MenuItem
                      //onClick={handleEvents('Profile')}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    </NavLink>
                    <NavLink
  	            	to="/svc/setting"
  	            	activeClassName="active"
  	            	>
                    <MenuItem
                      //onClick={handleEvents('setting')}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem></NavLink>
                    <Divider light />
                    <MenuItem
                      onClick={logOut}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
{/*        <Modal
	  	open={openJoin}
	    onClose={handleJoinClose}
	  ><JoinPage mode="0" page="/Landing" onClose ={()=>setOpenJoin(false)} reTurnText="정상적으로 LogOut 되었습니다."/></Modal>*/}
		 <Drawer anchor="top" open={openJoin} >
         {/* <JoinPage mode="0" onClose ={()=>setOpenJoin(false)} page="/svc" reTurnText="Login" /> */}
		    <Login onClose ={()=>setOpenJoin(false)} /> 
      </Drawer>
      </div>
    </div>
  );
}
