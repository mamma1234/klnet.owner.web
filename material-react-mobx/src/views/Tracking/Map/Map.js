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

const portLocation = [
  {
    portCode: "KRPUS",
    portName: "BUSAN",
    portlat: 35.07795693,
    portlng: 129.05245138
  },
  {
    portCode: "KRINC",
    portName: "INCHEON",
    portlat: 37.41906618,
    portlng: 126.58397938
  },
  {
    portCode: "KRUSN",
    portName: "ULSAN",
    portlat: 35.50445947,
    portlng: 129.37473001
  },
  {
    portCode: "KRPTK",
    portName: "PYEONGTAEK",
    portlat: 36.98520097,
    portlng: 126.7849153
  },
  {
    portCode: "KRKAN",
    portName: "GWANGYANG",
    portlat: 34.938117,
    portlng: 127.692385
  },
  {
    portCode: "KRKPO",
    portName: "POHANG",
    portlat: 36.000093,
    portlng: 129.377479
  }


];
  
  // axios.post("/pg/getPort").then(res => {
  //   for (let v = 0; v < res.data.length; v++) {
  //     const element = res.data[v];
  //     portLocation.push({
  //       portCode: element.portcode,
  //       terminal: element.terminal, 
  //       terminal_kname: element.terminal_kname, 
  //       lng: element.wgs84_x,
  //       lat: element.wgs84_y
  //     })
  //   }
  // });






const getPortInfo = (portCode) =>  {
  //Marker 정보 Parameter = portInfo
  //axios.post("/pg/getPortLocation", {portCode: [ portInfo.portCode ]}).then(res => setUsePort(res.data));
  
  console.log('TTTTTT',portCode);
  return(
    <InfoWindow>
        <TerminalList 
        	portCode ={portCode}
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
      defaultCenter={ {lat: 36.337395, lng: 127.392544} }
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
                position={{lat:value.portlat, lng:value.portlng}} // 마커 위치 설정 {lat: ,lng: }   
                icon={require("assets/img/marker.png")}
                onClick={() => props.onToggleOpen(value.portCode) }>
                {value.portCode == props.port && getPortInfo(value.portCode)}  
              </Marker>
            )
        })
      }
       {/* </MarkerClusterer>   */}
       
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
    style={{height: '1000px',width: '800px'}}>
      <GridItem xs={15} sm={15} md={15} style={{height: `90%`,width: `90%`}}>
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
              googleMapURL="https://maps.googleapis.com/maps/api/js?key="
              loadingElement={<div style={{ height: `90%` }} />}
              containerElement={<div style={{ height: `90vh` }} />}
              mapElement={<div style={{ height: `90%` }} />}>
            </Map>   


          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

