import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomTable from "views/DemDet/CustomTable.js";
import { CardContent, TextField } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import MButton from '@material-ui/core/Button';

import Popover from  '@material-ui/core/Popover';
import ExcelUpload from "views/DemDet/PopUp/ExcelUpload.js";


import BackupIcon from "@material-ui/icons/Backup";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import AddIcon from "@material-ui/icons/AddBox";
import TerminalList from 'views/DemDet/Map/TerminalList.js';
import axios from 'axios';
import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
import { compose, withStateHandlers, withHandlers, renderComponent } from "recompose";






const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
          color: "rgba(255,255,255,.62)",
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
      gridcss: {
        textAlignLast:'right',
        paddingTop:20,
        marginLeft: 'auto',
        fullWidth: true
      },
      buttoncss: {
          fullHight: true,
          fullWidth: true
      },
};


const useStyles = makeStyles(styles);



export default function DemDetList() {
  
  const [anchorCancel, setAnchorCancel] = useState(null);
  const [anchorExcel, setAnchorExcel] = useState(null);
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [portCode, setPortCode] = useState([]);
  const [portCodeCopy, setPortCodeCopy] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
		
    console.log('호출....');
    axios.post("/pg/getPort",{ portCode:""}).then(res => setPortCode(res.data));
    
    axios.post("/pg/getPort",{ portCode:""}).then(res => setPortCodeCopy(res.data));
    
    return () => {
        console.log('cleanup');
      };
  },[]);

const getPort = (port) => {
    if (port != null) {
        axios.post("/pg/getPort",{ portCode:port.port_code}).then(res => setPortCode(res.data));
    }
}


const getPortInfo = (port, props) =>  {
    return(
    <TerminalList
        port={port}
    />
    )
  }
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
      portCode.length !== 0 && (portCode.map((data, index) => {

      
          return(
            <Marker 
              key = {data.port_code}
              draggable = {false} 
              position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
              icon={require("assets/img/marker.png")}
              onClick={() => props.onToggleOpen(data.port_code) }>
              {props.isOpen && data.port_code == props.port && getPortInfo(data) }  
            </Marker>
          )

          } 
      )
    )
    }
   </GoogleMap>
  )
  
  const classes = useStyles();  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                    Map Service
                </h4>
                <p className={classes.cardCategoryWhite}>
                    Demurrage | Detention | Storage
                </p>
            </CardHeader>
            <CardBody>
                <GridContainer>
                    <GridItem xs={2} sm={2}>
                        <Autocomplete
                            options = {lineData}
                            getOptionLabel = { option => "["+option.carrier_code+"] "+option.carrier_hname}
                            id="lineCode"
                            /*
                            onKeyUp={this.onCarrierCodeSearch}
                            */
                            
                            
                            renderInput={params => (<TextField {...params} label="선사" fullWidth />)}/>
                    </GridItem>
                    <GridItem xs={4} sm={2}>
                        <Autocomplete
                            options = {portCodeCopy}
                            getOptionLabel = { option => "["+option.port_kname+"] "+option.port_code}
                            id="portCodeCopy"
                            /*
                            onKeyUp={this.onCarrierCodeSearch}
                            onChange={this.onCarrierCodeChange}
                            */
                            onChange={(e, value) => getPort(value) }
                            renderInput={params => (<TextField {...params} label="PORT" fullWidth />)}/>
                    </GridItem>
                </GridContainer>
            <CardContent className = {classes.card}>
                <GridContainer>
                    <GridItem xm={12} sm={12} md={12}>
                        <Map    
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBK2wBJD1QHGAquIsW0V5_XVQeu6muFmZ0"
                            loadingElement={<div style={{ height: `90%` }} />}
                            containerElement={<div style={{ height: `50vh` }} />}
                            mapElement={<div style={{ height: `100%` }} />}>
                        </Map>
                    </GridItem>
                </GridContainer>
            </CardContent>
           </CardBody>
        </Card>
      </GridItem>    
    </GridContainer>
 );
}