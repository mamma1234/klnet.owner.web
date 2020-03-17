import React,{ useState, useEffect, Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {MAP} from 'react-google-maps/lib/constants'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CardContent, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TerminalList from 'views/DemDet/Map/TerminalList.js';
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import MapSkin from './CustomMap';
import CustomInput from "components/CustomInput/CustomInput";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";
import { compose, withStateHandlers, withProps } from "recompose";
import Switch from '@material-ui/core/Switch';
import dotenv from "dotenv";
dotenv.config();


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
 
const [portCode, setPortCode] = useState([]);
const [portCodeCopy, setPortCodeCopy] = useState([]);
const [lineData, setLineData] = useState([]);
const portwgs84 = {lat: 35.837395, lng: 127.782544};
useEffect(() => {
  console.log('호출....');
  axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCode(res.data));
  
  axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCodeCopy(res.data));
  return () => {
      console.log('cleanup');
    };
},[]);

const getPort = (port) => {
    if (port != null) {
        axios.post("/loc/getPort",{ portCode:port.port_code}).then(res => setPortPostion(res.data));
      }
}

const setPortPostion = (data) => {
  setPortCode(data);
}


const getPortInfo = (port, props) =>  {
    return(
    <TerminalList
        port={port}
    />
    )
  }
  const Map=compose(
    
    withProps({

      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{height: `100%`}}/>,
      containerElement: <div style={{width:'100%', height: `50vw`, position: `relative` }}/>,
      mapElement: <div style={{ height: `100%` }}/>,
    }),
    withStateHandlers(() => ({
      isOpen: false,
      port: "",
      centerPosition: portwgs84,
      map: "map"
    }), 
    {
    onToggleOpen: ({ isOpen }) =>(portCode, positionX, positionY) => ({
      isOpen: !isOpen,
      port: portCode,
      centerPosition: {lat: positionY, lng: positionX} 
    }),
    
    },
    
    ),
    withStateHandlers(() => ({
      setStyle: []
    }),
    {
    onSetMapStyle: () =>(skin) => ({
      setStyle: skin
    }),
      
    }
    ),
    withStateHandlers(() => ({
      markerVisible: true
    }),
    {
    onMarkerView: () =>(switchMarker) => ({
      markerVisible: switchMarker
    }),
    }
    ),
    withScriptjs,
    withGoogleMap
  
  )
  
  (props =>
    <div id = 'map'>
      
     <GridContainer>  
      <GridItem xm={12} sm={12} md={2}>
       <h4>View Port</h4>
       </GridItem>
       <GridItem xm={12} sm={12} md={1}>       
        <Switch defaultChecked={true}
            labelText = "구분"
	      		onChange={e => props.onMarkerView(e.target.checked)}
	      		value="MapSwitch"/>
      </GridItem>
      
    </GridContainer>  

       
    
    <GoogleMap
    id = {props.map}
    defaultZoom={6}
    center={props.centerPosition}
    defaultCenter={ props.centerPosition }
    defaultOptions={{
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: props.setStyle,
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      }
    }}
    options={{
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: props.setStyle,
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      }
    }}
    
    >
      <MapControl position = {window.google.maps.ControlPosition.TOP_CENTER}>
        <GridItem xm={12} sm={12} md={6}>
        <Autocomplete
                              options = {portCodeCopy}
                              getOptionLabel = { option => "["+option.port_kname+"] "+option.port_code}
                              id="portCodeCopy"
                              onChange={(e, value) => getPort(value) }
                              renderInput={params => (<TextField {...params} label="PORT" fullWidth />)}/>
        </GridItem>

      </MapControl>
      <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
        <div>
        <GridContainer>
      <GridItem xm={12} sm={12} md={2}>
        <Button onClick= {() => props.onSetMapStyle(MapSkin.MapStyleSilver)}>Silver</Button>
      </GridItem>
      <GridItem xm={12} sm={12} md={2}>
        <Button onClick ={() => props.onSetMapStyle(MapSkin.MapAubergine)}>Aubergine</Button>
      </GridItem>
      <GridItem xm={12} sm={12} md={2}>
        <Button onClick ={() => props.onSetMapStyle(MapSkin.MapStyleDark)}>Dark</Button>
      </GridItem>
      <GridItem xm={12} sm={12} md={2}>
        <Button onClick ={() => props.onSetMapStyle(MapSkin.MapStyleNight)}>Night</Button>
      </GridItem>
      <GridItem xm={12} sm={12} md={2}>
        <Button onClick ={() => props.onSetMapStyle(MapSkin.MapStyleRetro)}>Retro</Button>
      </GridItem>
      <GridItem xm={12} sm={12} md={2}>
        <Button onClick ={() => props.onSetMapStyle([])}>Normar</Button>
      </GridItem>
    </GridContainer>  
        </div>
      </MapControl>
    {
      portCode.length !== 0 && (portCode.map((data, index) => {

      
          return(
            <Marker 
              key = {data.port_code}
              draggable = {false} 
              position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
              icon={require("assets/img/marker.png")}
              defaultVisible={props.markerVisible}
              visible={props.markerVisible}
              onClick={() => props.onToggleOpen(data.port_code, data.wgs84_x, data.wgs84_y) }>
              
              {props.isOpen && data.port_code == props.port && getPortInfo(data) }  
            </Marker>
          )

          } 
      )
    )
    } 
   
   </GoogleMap>
   </div>
  )

  const classes = useStyles();  
  return (
    <GridContainer>
      <Map>
      </Map> 
    </GridContainer>
 );
}

class MapControl extends Component {
  static contextTypes = {
    [MAP] : PropTypes.object
  }

  componentWillMount() {
    this.map = this.context[MAP]
    console.log('TTTTTTTT',this.map)
    this.controlDiv = document.createElement('div');
    this.map.controls[this.props.position].push(this.controlDiv);
  }

  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex)
  }
  render() {
    return createPortal(this.props.children,this.controlDiv)
  }
}




