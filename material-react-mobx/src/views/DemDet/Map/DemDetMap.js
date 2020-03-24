
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React,{ useState, useEffect, Component } from "react";
// @material-ui/core components
import { createPortal } from 'react-dom';
import {MAP} from 'react-google-maps/lib/constants'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CardContent, TextField, ListItemIcon, Divider} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TerminalList from 'views/DemDet/Map/TerminalList.js';
import axios from 'axios';
import MapSkin from './CustomMap';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer
  } from "react-google-maps";
import { compose, withStateHandlers, withProps } from "recompose";
import Switch from '@material-ui/core/Switch';
import dotenv from "dotenv";

import AppBar from '@material-ui/core/AppBar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
dotenv.config();



export default function DemDetMap() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [portCode, setPortCode] = useState([]);
  const [portCodeCopy, setPortCodeCopy] = useState([]);
  const portwgs84 = {lat: 35.837395, lng: 127.782544};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  
 
    useEffect(() => {
      console.log('호출....');
      axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCode(res.data));
      
      axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCodeCopy(res.data));
      return () => {
          console.log('cleanup');
        };
    },[]);
    //const img = require('images/googleMap/dark.png');
    
    
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
const DemDetMap=compose(
  
  withProps({

    googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
    loadingElement: <div style={{ minHeight:`37vw`}}/>,
    containerElement: <div style={{width:'100%', height: `37vw` }}/>,
    mapElement: <div style={{minHeight:`37vw` }}/>,
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
  withStateHandlers(() => ({
    menuVisible: false
  }),
  {
  onMenuVisible: ({ menuVisible }) =>() => ({
    menuVisible: !menuVisible,
  }),
  }
  ),
  withScriptjs,
  withGoogleMap

)

(props =>
  <div id = 'map'>
    

      
  
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
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
      <div style={{backgroundColor:"#000000", marginTop:"10px", marginRight:"5px"}}>
        <IconButton
          color="secondary"
          onClick={() => props.onMenuVisible(props.menuVisible)}
          >
          {props.menuVisible && 
            <div>
            <img src={require("assets/img/googleMap/dark.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleDark)}/>
            <img src={require("assets/img/googleMap/aubergine.png")} onClick={() => props.onSetMapStyle(MapSkin.MapAubergine)}/>
            <img src={require("assets/img/googleMap/night.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleNight)}/>
            <img src={require("assets/img/googleMap/retro.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleRetro)}/>
            <img src={require("assets/img/googleMap/silver.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleSilver)}/>
            <img src={require("assets/img/googleMap/normal.png")} onClick={() => props.onSetMapStyle([])}/>
            </div>
          }  
          <MenuIcon />
        </IconButton>
      </div>
  </MapControl>
  <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
          
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Off</Grid>
        <Grid item>
        <Switch defaultChecked={true}
          onChange={e => props.onMarkerView(e.target.checked)}
          value="MapSwitch"/>
          
        </Grid>
        <Grid item>On</Grid>

      </Grid>
    </Typography>
          
  </MapControl>
  <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
        <Autocomplete
          options = {portCodeCopy}
          getOptionLabel = { option => "["+option.port_kname+"] "+option.port_code}
          id="portCodeCopy"
          onChange={(e, value) => getPort(value) }
          renderInput={params => (<TextField {...params} label="PORT" fullWidth />)}/>
      
  </MapControl>
        
    
  <MapControl position = {window.google.maps.ControlPosition.TOP_CENTER}>
    <GridItem xm={12} sm={12} md={6}>
    
    </GridItem>

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
            {props.isOpen && data.port_code == props.port && getPortInfo(data)}
          </Marker>
        )

    }))
  } 
  
  </GoogleMap>
  </div>
)








//////////////////////////////////////
const CargoTrackingMap=compose(
  
  withProps({

    googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
    loadingElement: <div style={{ minHeight:`37vw`}}/>,
    containerElement: <div style={{width:'100%', height: `37vw` }}/>,
    mapElement: <div style={{minHeight:`37vw` }}/>,
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
  withScriptjs,
  withGoogleMap

)

(props =>
  <GoogleMap
  defaultZoom={15}
  center={props.centerPosition}
  defaultCenter={ props.centerPosition }
  defaultZoom={10}
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
  
  >z
    
  </GoogleMap>
)










return (
  <div className={classes.root}>
    <AppBar position="static">
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
      >
        <LinkTab label="DEM/DET/STOR MAP" href="/drafts" {...a11yProps(0)} />
        <LinkTab label="Cargo Tracking Map" href="/trash" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <DemDetMap></DemDetMap>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <CargoTrackingMap></CargoTrackingMap>
    </TabPanel>
  </div>
);
}

class MapControl extends Component {
  static contextTypes = {
    [MAP] : PropTypes.object
  }

  componentWillMount() {
    this.map = this.context[MAP]
    this.controlDiv = document.createElement('div');
    this.map.controls[this.props.position].push(this.controlDiv);
  }

  componentWillUnmount() {
    const controlArray = this.map.controls[this.props.position].getArray()
    for (let index in controlArray) {
      if(controlArray[index] === this.controlDiv) {
        this.map.controls[this.props.position].removeAt(index);
      }
    }
  }
  render() {
    return createPortal(this.props.children,this.controlDiv)
  }
}




