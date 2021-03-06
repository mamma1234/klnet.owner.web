import React,{useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import styles2 from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Login from "views/LoginPage/LoginPage.js";
import Drawer from '@material-ui/core/Drawer';
const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);
let ps;

export default function LandingPage() {

	const [openJoin,setOpenJoin] = useState(false);
    const classes = useStyles();
    const classes2 = useStyles2();
    const mainPanel = React.createRef();
  
    React.useEffect(() => {
    	console.log(navigator.platform);
        if (navigator.platform.indexOf("Win") > -1) {
          ps = new PerfectScrollbar(mainPanel.current, {
            suppressScrollX: true,
            suppressScrollY: false
          });
          document.body.style.overflow = "hidden";
        }

        // Specify how to clean up after this effect:
        return function cleanup() {
          if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
          }
        };
      }, [mainPanel]);      
    
  const handleOpenJoin = () => {
	  setOpenJoin(true);
	  //loginCheck();
  };
    
  return (
    <div className={classes2.wrapper} ref={mainPanel}>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Plism+"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
      <Parallax filter image={require("images/main.jpg")}>
        <div className={classes.container}>
          <GridContainer style={{textAlignLast:'end'}}>
          <GridItem xs={12} sm={12} md={6} ></GridItem>
            <GridItem xs={12} sm={12} md={6} >
              <h3 className={classes.title}>Welcome To Plism Plus.</h3>
              <h5 style={{textAlign:'-webkit-right'}}>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h5>
              <br />
              <Button
                color="danger"
                size="lg"
                //href ="/own/tracking"
                rel="noopener noreferrer"
                onClick={()=>setOpenJoin(true)}
              >Start Service
              </Button>
{/*               <Modal
            	open={openJoin}
              	onClose={handleJoinClose}
                //onBackdropClick={handleJoinClose}
              ><JoinPage mode="1" onClose ={()=>setOpenJoin(false)} reTurnText="KLNET 회원가입" /></Modal> */}

		      <Drawer anchor="top" open={openJoin} >
		       <Login onClose ={()=>setOpenJoin(false)} /> 
         </Drawer>


            </GridItem>
          </GridContainer>
         
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
         
          <ProductSection />
          <TeamSection />
          <WorkSection />
       
        </div>
      </div>
      <Footer />
    </div>
  );
}
