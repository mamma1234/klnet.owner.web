import React from "react";
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

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage() {

  const classes = useStyles();
  
  return (
    <div>
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
              <h2 className={classes.title}>Start To Plism Plus.</h2>
              <h4 style={{textAlign:'-webkit-right'}}>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href ="/own/tracking"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Go Service.
              </Button>
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
