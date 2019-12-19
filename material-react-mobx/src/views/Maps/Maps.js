// // import React from "react";
// // import {
// //   withScriptjs,
// //   withGoogleMap,
// //   GoogleMap,
// //   Marker
// // } from "react-google-maps";
// // const flightPlanCoordinates = [{lat: 37.495272, lng: 127.035994}, {lat: 35.105746, lng: 129.042807}]
// // //, {lat: 35.105746, lng: 129.042807}
// // const CustomSkinMap = withScriptjs(
// //   withGoogleMap(() => (
// //     <GoogleMap
// //       defaultZoom={10}
// //       defaultCenter={{ lat: 37.495272, lng: 127.035994 }}
      
// //       defaultOptions={{
// //         scrollwheel: false,
// //         zoomControl: true,
        
// //         styles: [
// //           {
// //             featureType: "water",
// //             stylers: [
// //               { saturation: 43 },
// //               { lightness: -11 },
// //               { hue: "#0088ff" }
// //             ]
// //           },
// //           {
// //             featureType: "road",
// //             elementType: "geometry.fill",
// //             stylers: [
// //               { hue: "#ff0000" },
// //               { saturation: -100 },
// //               { lightness: 99 }
// //             ]
// //           },
// //           {
// //             featureType: "road",
// //             elementType: "geometry.stroke",
// //             stylers: [{ color: "#808080" }, { lightness: 54 }]
// //           },
// //           {
// //             featureType: "landscape.man_made",
// //             elementType: "geometry.fill",
// //             stylers: [{ color: "#ece2d9" }]
// //           },
// //           {
// //             featureType: "poi.park",
// //             elementType: "geometry.fill",
// //             stylers: [{ color: "#ccdca1" }]
// //           },
// //           {
// //             featureType: "road",
// //             elementType: "labels.text.fill",
// //             stylers: [{ color: "#767676" }]
// //           },
// //           {
// //             featureType: "road",
// //             elementType: "labels.text.stroke",
// //             stylers: [{ color: "#ff0000" }]
// //           },
// //           { featureType: "poi", stylers: [{ visibility: "off" }] },
// //           {
// //             featureType: "landscape.natural",
// //             elementType: "geometry.fill",
// //             stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
// //           },
// //           { featureType: "poi.park", stylers: [{ visibility: "on" }] },
// //           {
// //             featureType: "poi.sports_complex",
// //             stylers: [{ visibility: "on" }]
// //           },
// //           { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
// //           {
// //             featureType: "poi.business",
// //             stylers: [{ visibility: "simplified" }]
// //           }
// //         ]
// //       }}
// //     >
// //     </GoogleMap>

// //   ))
// // );

// // export default function Maps() {
// //   return (
// //     <CustomSkinMap
// //       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpzOZmIfUZBQTB2a9-CBRvQcwly79pqBg"
// //       loadingElement={<div style={{ height: `100%` }} />}
// //       containerElement={<div style={{ height: `100vh` }} />}
// //       mapElement={<div style={{ height: `100%` }} />}
// //     />
// //   );

// // }
// //AIzaSyBK2wBJD1QHGAquIsW0V5_XVQeu6muFmZ0
// //AIzaSyDpzOZmIfUZBQTB2a9-CBRvQcwly79pqBg





















import React from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  MarkerClusterer
} from "react-google-maps";
import { compose, withStateHandlers } from "recompose";
import { sizeHeight, height } from "@material-ui/system";



// const CustomSkinMap = withScriptjs(withGoogleMap(() => (
    
//     <GoogleMap
//       defaultZoom={18}
//       defaultCenter={{lat: 37.495272, lng: 127.035994}}
      
//     >
//     <Polyline
//       path={ [{lat: 37.495272, lng: 127.035994}, {lat: 37.496272, lng: 127.035994}] }
//       options= {{strokeColor: '#ff0000', strokeOpacity: 3, strokeWeight: 2 }}
//     ></Polyline>

//       <Marker
//       defaultPosition = {{lat: 37.495272, lng: 127.035994}}
//       position = {
//                 {
//                   lat: 37.495272, 
//                   lng: 127.035794
//                 }
              
//               }
//       defaultVisible = {true}
//       visible= {true}
//       defaultIcon ={require("assets/img/cntrImg.png")}
//       icon={require("assets/img/cntrImg.png")}
      
//     ></Marker>
//     </GoogleMap>

//   ))
// );


// export default class MapContainer extends React.Component {
  
  
  
  
  
//   render() {
//     return (
//       <CustomSkinMap
//       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBK2wBJD1QHGAquIsW0V5_XVQeu6muFmZ0"
//       loadingElement={<div style={{ height: `93%` }} />}
//       containerElement={<div style={{ height: `93vh` }} />}
//       mapElement={<div style={{ height: `93%` }} />}>

        
      
//       </CustomSkinMap>
      
//     );
//   }
// }
const Map = compose(
  withStateHandlers(() => ({
    isMarkerShown: false,
    markerPosition: null
    
    
  }), {
    onMapClick: ({ isMarkerShown}) =>(e) => ({
//        markerPosition: e.latLng,
        markerPosition: {lat: e.latLng.lat(), lng: e.latLng.lng()},
        isMarkerShown: true
        
    })
  }),
  withScriptjs,
  withGoogleMap
)
  (props =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={ {lat: 37.495272, lng: 127.035994} }
        onClick={props.onMapClick}
        
      >


      {props.isMarkerShown &&
      <Marker
      draggable = {true}
      defaultPosition = {props.markerPosition}
      position = {props.markerPosition}
      defaultIcon ={require("assets/img/cntrImg.png")}
      icon={require("assets/img/cntrImg.png")}
      
      >


      </Marker> 
      
      }
      </GoogleMap>
      
      
    )
export default class MapContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Map
      
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBK2wBJD1QHGAquIsW0V5_XVQeu6muFmZ0"
      
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}>

      </Map>
    
    );
  }
}
