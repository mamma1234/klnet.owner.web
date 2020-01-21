// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyBK2wBJD1QHGAquIsW0V5_XVQeu6muFmZ0' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text="My Marker"
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default SimpleMap;









import React from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
  
  
} from "react-google-maps";
import Button from "components/CustomButtons/Button.js";
import { compose, withStateHandlers } from "recompose";



const track_data = [{"timestamp":"2019-11-11T00:02:29Z",
"device_type":"GPS",
"imo_no":"9820245",
"mmsi":"620512000",
"call_sign":"D6A2512",
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111500",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-10T09:21:02Z",
"ais_location_rcv_dt":"2019-11-11T00:02:29Z",
"ais_class":"A",
"nvg_status":1,
"rot":-13.0,
"sog":0.0,
"pos_accrcy":0,
"longitude":128.69591167,
"latitude":37.59424167,
"cog":183.699997,
"heading":95,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":28,
"dte":0,
"special_maneuver_indicator":"0",
"raim_flag":"0",
"static_message_no":5,
"location_message_no":3,
"static_raw_id":"369b402d-ddb2-463d-b8c1-cdc4bd68ad91",
"location_raw_id":"7fa54795-8ad0-4c69-999b-9b2e4a01a336",
"valid_code":null
}
,
{
"timestamp":"2019-11-11T00:02:31Z",
"device_type":"GPS",
"imo_no":"9820245",
"mmsi":"620512000",
"call_sign":"D6A2512",
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111500",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-10T09:21:02Z",
"ais_location_rcv_dt":"2019-11-11T00:02:31Z",
"ais_class":"A",
"nvg_status":1,
"rot":-13.0,
"sog":0.0,
"pos_accrcy":0,
"longitude":120.69591167,
"latitude":35.59424167,
"cog":183.699997,
"heading":95,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":28,
"dte":0,
"special_maneuver_indicator":"0",
"raim_flag":"0",
"static_message_no":5,
"location_message_no":3,
"static_raw_id":"369b402d-ddb2-463d-b8c1-cdc4bd68ad91",
"location_raw_id":"70aede0d-1a46-49df-84bd-5eb05ac1ea81",
"valid_code":null
}
,
{
"timestamp":"2019-11-11T01:02:46Z",
"device_type":"GPS","imo_no":"9820245",
"mmsi":"620512000",
"call_sign":"D6A2512",
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111500",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-10T09:21:02Z",
"ais_location_rcv_dt":"2019-11-11T01:02:46Z",
"ais_class":"A",
"nvg_status":0,
"rot":8.0,
"sog":3.70000005,
"pos_accrcy":0,
"longitude":127.70073167,
"latitude":37.59674167,
"cog":35.2999992,
"heading":32,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":43,
"dte":0,
"special_maneuver_indicator":"0",
"raim_flag":"0",
"static_message_no":5,
"location_message_no":1,
"static_raw_id":"369b402d-ddb2-463d-b8c1-cdc4bd68ad91",
"location_raw_id":"27bccbcf-7ed4-4601-9053-63c61903c675",
"valid_code":null
}
,
{
"timestamp":"2019-11-11T01:06:15Z",
"device_type":"GPS",
"imo_no":"9820245",
"mmsi":"620512000",
"call_sign":"D6A2512",
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111500",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-10T09:21:02Z",
"ais_location_rcv_dt":"2019-11-11T01:06:15Z",
"ais_class":"A",
"nvg_status":0,
"rot":-9.0,
"sog":5.80000019,
"pos_accrcy":0,
"longitude":113.703675,
"latitude":21.60067833,
"cog":34.4000015,
"heading":35,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":13,
"dte":0,
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111300",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-11T06:14:09Z",
"ais_location_rcv_dt":"2019-11-11T06:22:36Z",
"ais_class":"A",
"nvg_status":0,
"rot":-11.0,
"sog":12.3000002,
"pos_accrcy":0,
"longitude":113.773835,
"latitude":22.38431833,
"cog":328.799988,
"heading":327,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":35,
"dte":0,
"special_maneuver_indicator":"0",
"raim_flag":"0",
"static_message_no":5,
"location_message_no":1,
"static_raw_id":"d336a327-d50e-4acc-a781-9415b451cba7",
"location_raw_id":"8723cf7e-aded-4ddc-be16-9fa1a7afeba8",
"valid_code":null
}
,
{
"timestamp":"2019-11-11T06:25:47Z",
"device_type":"GPS",
"imo_no":"9820245",
"mmsi":"620512000",
"call_sign":"D6A2512",
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111300",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-11T06:14:09Z",
"ais_location_rcv_dt":"2019-11-11T06:25:47Z",
"ais_class":"A",
"nvg_status":0,
"rot":-6.0,
"sog":12.3999996,
"pos_accrcy":0,
"longitude":113.76771,
"latitude":22.39365833,
"cog":328.299988,
"heading":327,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":44,
"dte":0,
"special_maneuver_indicator":"0",
"raim_flag":"0",
"static_message_no":5,
"location_message_no":3,
"static_raw_id":"d336a327-d50e-4acc-a781-9415b451cba7",
"location_raw_id":"801913f3-f679-42a6-b7f2-0ed1091ff15c",
"valid_code":null
}
,
{
"timestamp":"2019-11-11T06:26:57Z",
"device_type":"GPS","imo_no":"9820245",
"mmsi":"620512000",
"call_sign":"D6A2512",
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111300",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-11T06:26:12Z",
"ais_location_rcv_dt":"2019-11-11T06:26:57Z",
"ais_class":"A",
"nvg_status":0,
"rot":9.0,
"sog":12.3999996,
"pos_accrcy":0,
"longitude":113.76551667,
"latitude":22.39709667,
"cog":330.100006,
"heading":330,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":53,
"dte":0,
"special_maneuver_indicator":"0",
"raim_flag":"0",
"static_message_no":5,
"location_message_no":1,
"static_raw_id":"c6cd30bc-0339-4495-8d9a-d58616aa68d2",
"location_raw_id":"28e3a182-2af9-4d09-a36a-bfb991e4a54a",
"valid_code":null
}
,
{
"timestamp":"2019-11-11T06:37:38Z",
"device_type":"GPS",
"imo_no":"9820245",
"mmsi":"620512000",
"call_sign":"D6A2512",
"ship_nm":"TENREACH",
"ais_ship_type":74,
"ais_dim_a":112,
"ais_dim_b":254,
"ais_dim_c":14,
"ais_dim_d":34,
"ais_eta":"11111300",
"ais_destination":"NANSHA",
"ais_static_rcv_dt":"2019-11-11T06:26:12Z",
"ais_location_rcv_dt":"2019-11-11T06:37:38Z",
"ais_class":"A",
"nvg_status":0,
"rot":4.0,
"sog":12.8000002,
"pos_accrcy":0,
"longitude":113.75587333,
"latitude":22.43309833,
"cog":349.299988,
"heading":348,
"ais_max_draught":10,
"ais_source":"rORBCOMM000",
"elapsed":0,
"utc_second":33,
"dte":0,
"special_maneuver_indicator":"0",
"raim_flag":"0",
"static_message_no":5,
"location_message_no":3,
"static_raw_id":"c6cd30bc-0339-4495-8d9a-d58616aa68d2",
"location_raw_id":"afbbe752-ed3a-4aa8-bfee-86a6a375a55a",
"valid_code":null
}]








const flightPlanCoordinates = [{lat: 22.38431833, lng: 113.773835}]
  for (let v = 0; v < track_data.length; v++) {
    flightPlanCoordinates.push({lat: track_data[v].latitude, lng: track_data[v].longitude})
  }




  const Map = compose(
    withStateHandlers(() => ({
      isMarkerShown: false,
      markerPosition: flightPlanCoordinates
      
      
    }), {
      onMapClick: ({ isMarkerShown}) =>(e) => ({
  //        markerPosition: e.latLng,
          markerPosition: {lat: e.latLng.lat(), lng: e.latLng.lng()},
          isMarkerShown: true,
          
          
      })

    }),
    withScriptjs,
    withGoogleMap
  )
    (props =>
      <GoogleMap
      defaultZoom={5}
      defaultCenter={ {lat: 35.38431833, lng: 127.773835} }
        defaultOptions={{
          scrollwheel: true,
          zoomControl: true
      }}
      onClick={props.onMapClick}
      >
      
      {
      track_data.map((value) => {
          return(
            <Marker 
            draggable = {false} 
            position={{lat:value.latitude, lng:value.longitude}} // 마커 위치 설정 {lat: ,lng: }   
            icon={require("assets/img/marker.png")} 
            id={1}

               // 마커 클릭이벤트
            //animation={4}//마커애니메이션 1,2,3,4,5
            

            >
            
            <InfoWindow
              onCloseClick={function () {alert('마커창 닫을때 이벤트')}}
            >
              <div>
                <div>좌표 : {value.latitude} + {value.longitude}</div>
                <div>선명 : {value.ship_nm}</div>
              </div>
              
              </InfoWindow>  
              
            </Marker>
            
          )
      })
      }

      {
      props.isMarkerShown 
      &&
      flightPlanCoordinates.push(props.markerPosition) 
      && 
      flightPlanCoordinates.map((value) => {
        return(
        <Polyline
        path={flightPlanCoordinates}
        options=
        {
          {
          strokeColor: '#FF0000',
         strokeOpacity: 1,
         strokeWeight: 1,
         icons: 
         [{
          icon: 
            {
            path : 1,
            strokeColor: '#0000FF'
            },
          offset: '2',
          repeat: '50px'
          }]
        }
      }>


      </Polyline>
        )
      })


    }
    {
      props.isMarkerShown 
      &&
      flightPlanCoordinates.push(props.markerPosition) 
      && 
      flightPlanCoordinates.map((value) => {
              return(
                <Marker 
                draggable = {false} 
                position={{lat:value.lat, lng:value.lng}} // 마커 위치 설정 {lat: ,lng: }   
                icon={require("assets/img/marker.png")} 
                id={1}
                //animation={4}//마커애니메이션 1,2,3,4,5
                >
                
                  <InfoWindow onCloseClick={function () {alert('마커창 닫을때 이벤트')}}>
                    <div>
                      <div>좌표 : {value.lat} + {value.lng}</div>
                      <div>선명 : {value.ship_nm}</div>
                    </div>
                  </InfoWindow>  
                    
                </Marker>
              )
            })
      }

      <Polyline
        path={flightPlanCoordinates}
        options=
        {
          {
          strokeColor: '#FF0000',
         strokeOpacity: 1,
         strokeWeight: 1,
         icons: 
         [{
          icon: 
            {
            path : 1,
            strokeColor: '#0000FF'
            },
          offset: '2',
          repeat: '50px'
         }]
        }
      }>
        </Polyline>
     </GoogleMap>
      
    )
   
   

export default class MapContainer extends React.Component {
  render() {

    return (

      <div>
      
      <Map    
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBK2wBJD1QHGAquIsW0V5_XVQeu6muFmZ0"
        loadingElement={<div style={{ height: `90%` }} />}
        containerElement={<div style={{ height: `90vh` }} />}
        mapElement={<div style={{ height: `90%` }} />}>
      </Map>
      </div>
    
    );
  }
}