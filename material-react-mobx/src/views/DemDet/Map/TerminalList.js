import React,{useState,useEffect} from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import { InfoWindow, Marker} from "react-google-maps";
import { Router, Route, Switch, Redirect ,Link} from "react-router-dom";
import trackingList from "views/Tracking/TrackingList.js";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
const hist = createBrowserHistory();


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

export default function TermianlList(props) {
  const classes = useStyles();
  const { port } = props; 
  const [usePort,setUsePort] = useState([]);
  useEffect(() => {
		
		console.log('호출....');
	    axios.post("/pg/getPortLocation",{ portCode:[props.portCode]}).then(res => setUsePort(res.data));
		return () => {
			console.log('cleanup');
		  };
	  },[props.portCode]);
	const clickButton = () => {
		console.log('TEST');
	}
  return (
	  
	// <Marker key = {port.portCode}
	// 	draggable = {false} 
	// 	position={{lat:port.wgs84_y+1, lng:port.wgs84_x+1}} // 마커 위치 설정 {lat: ,lng: }   
	// 	icon={require("assets/img/marker.png")}>
	<InfoWindow>
	<Table className={classes.table}>
	<TableHead>
		<TableRow className={classes.tableHeadRow}>
  			<TableCell align={'center'} style={{color:"orange", padding:"1px", fontSize: "1px"}}><span>{port.port_code}<br></br>{port.port_kname}</span></TableCell>
			<TableCell align={'center'} colSpan={'4'} style={{color:"orange", padding:"1px", fontSize: "1px"}}>IN</TableCell>
			<TableCell align={'center'} colSpan={'4'} style={{color:"orange", padding:"1px", fontSize: "5px"}}>OUT</TableCell>
		</TableRow>
		<TableRow className={classes.tableHeadRow}>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>TERMINAL</TableCell>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>DEM</TableCell>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>DET</TableCell>
  			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>COMBINE</TableCell>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>STO</TableCell>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>DEM</TableCell>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>DET</TableCell>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>COMBINE</TableCell>
			<TableCell style={{color:"orange", padding:"1px", fontSize: "5px"}}>STO</TableCell>
		</TableRow>
	</TableHead>
	<TableBody>
	{usePort.length !== 0 && (usePort.map((data, index) => {
		
	 return (
		<TableRow key={index} className={classes.tableBodyRow} >
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}>
				{data.terminal}
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}>
				<a href="http://localhost:3000/own/demDet" className={classes.block}>
                1
              	</a>
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}>
				<Link to={{
					pathname : `/own/demDet/`,
					state : {
						param : data.terminal
					}
					}}>
				2
				</Link>
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}>
				3
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}> 
			 	4
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}> 
			 	5
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}> 
			 	6
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}> 
			 	7
			</TableCell>
			<TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}> 
			 	8
			</TableCell>
	   	</TableRow>
	 );
	 }))
	 }
 </TableBody> 
</Table>	
</InfoWindow>
// </Marker>
  		);
	}
