/*eslint-disable*/
import React,{useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import LocationIcon from "@material-ui/icons/Map";
import ScheduleIcon from "@material-ui/icons/WatchLater";
import LoginIcon from "@material-ui/icons/VpnKey";
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import Modal from '@material-ui/core/Modal';
import JoinPage from "components/Form/Common/JoinPage.js";


const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

  const classes = useStyles();
  const [openJoin,setOpenJoin] = useState(false);
  
  React.useEffect(() => {
	    console.log('effect header links');
	    
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
}, []);
  
  const handleOpenJoin = () => {
	  setOpenJoin(true);
  };
  
  const handleJoinClose = () => {
	  setOpenJoin(false);
  }
  
  
  return (
    <List className={classes.list}>
	  <ListItem className={classes.listItem}>
	    <Button
	      //href="/login"
	    	  onClick={handleOpenJoin}
	      color="transparent"
	      className={classes.navLink}
	    ><LoginIcon/>
	      Login
	    </Button>
	      <Modal
      	//aria-labelledby="simple-modal-title"
      	//aria-describedby="simple-modal-description"
      	open={openJoin}
        	onClose={handleJoinClose}
          //onBackdropClick={handleJoinClose}
        ><JoinPage mode="0" page="/" onClose ={()=>setOpenJoin(false)} reTurnText="Login"/></Modal>
	  </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="LOCATION"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={LocationIcon}
          dropdownList={[
            <Link to="/svc/tracking" className={classes.dropdownLink}>
              Tracking Service
            </Link>,
            <Link to="/svc/demDet" className={classes.dropdownLink}>
              Dem/Det Service
            </Link>
          ]}
        />
      </ListItem>
        
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="SCHEDULE"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ScheduleIcon}
          dropdownList={[
            <Link to="/svc/scrap_sch" className={classes.dropdownLink}>
              Scrap Schedule
            </Link>,
            <Link to="/svc/fcl_sch" className={classes.dropdownLink}>
            Fcl Schedule
          </Link>
          ]}
        />
      </ListItem> 
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>*/}
    </List>
  );
}
