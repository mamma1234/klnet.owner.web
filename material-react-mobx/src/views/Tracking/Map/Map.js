import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import TerminalList from 'views/Tracking/Map/TerminalList.js';
//import axios from 'axios';
import axios from 'axios';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withStateHandlers, withHandlers, renderComponent } from "recompose";
const portLocation = [];



axios.post("/pg/getPort").then(res => {
  for (let v = 0; v < res.data.length; v++) {
    const element = res.data[v];
    portLocation.push({
      portCode: element.port_code,
      portName: element.port_name,
      portKname: element.port_kname,
      lng: element.wgs84_x,
      lat: element.wgs84_y
    })
  }
});

  







const getPortInfo = (port, props) =>  {
  //Marker 정보 Parameter = portInfo
  //axios.post("/pg/getPortLocation", {portCode: [ portInfo.portCode ]}).then(res => setUsePort(res.data));
  console.log(port);
  return(
    <InfoWindow>
        <TerminalList
          
        	port={port}
        />
    </InfoWindow>
  )
}

// 작성 문구 : 보여줄 TERMINAL 항목





  const Map = compose(
    withStateHandlers(() => ({
      isOpen: false,
      port: ""
    }), 
    {
    onToggleOpen: ({ isOpen }) =>(portCode) => ({
      isOpen: !isOpen,
      port: portCode
    }), 
  }
  ),
    withScriptjs,
    withGoogleMap
  )

    (props =>
      <GoogleMap
      defaultZoom={7}
      defaultCenter={ {lat: 35.837395, lng: 127.782544} }
        defaultOptions={{
          scrollwheel: true,
          zoomControl: true
      }}>
      
      {
        portLocation.map((value) => 
        {
            return(
              <Marker 
                key = {value.portCode}
                draggable = {false} 
                position={{lat:value.lat, lng:value.lng}} // 마커 위치 설정 {lat: ,lng: }   
                icon={require("assets/img/marker.png")}
                onClick={() => props.onToggleOpen(value.portCode) }>
                {props.isOpen && value.portCode == props.port && getPortInfo(value, props)}  
              </Marker>
            )
        })
      }
       
     </GoogleMap>
         
    )

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleBlack: {
	    textAlign: "left",
	    color: "#000000",
	    minHeight: "auto",
	    fontWeight: "300",
	    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	    marginBottom: "3px",
	    textDecoration: "none",
	    "& small": {
	      color: "#777",
	      fontSize: "65%",
	      fontWeight: "400",
	      lineHeight: "1"
	    }
	  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  
  return (
    <GridContainer
    style={{height: '650px',width: '650px'}}>
      <GridItem xs={12} sm={12} md={12} style={{height: `100%`,width: `100%`}}>
        <Card>
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              <Icon>content_copy</Icon>
            </CardIcon>
            <h4 className={classes.cardTitleBlack}>View Map</h4>
            <p className={classes.cardTitleBlack}>Here is a subtitle for this table</p>
	        </CardHeader>
          
          <CardBody>



            <Map    
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBK2wBJD1QHGAquIsW0V5_XVQeu6muFmZ0"
              loadingElement={<div style={{ height: `90%` }} />}
              containerElement={<div style={{ height: `50vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}>
            </Map>


          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}