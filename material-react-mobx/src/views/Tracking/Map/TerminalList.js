import React,{useState,useEffect} from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "components/CustomButtons/Button.js";
import DeleteIcon from '@material-ui/icons/DeleteForever';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
	    axios.post("/loc/getPortLocation",{ portCode:[port.portCode]}).then(res => setUsePort(res.data));
	    //.then(res => console.log(JSON.stringify(res.data)));
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
	
  return (
	<Table className={classes.table}>
	<TableHead>
		<TableRow className={classes.tableHeadRow}>
  <TableCell align={'center'} style={{color:"orange", padding:"1px", fontSize: "1px"}}><span>{port.portCode}<br></br>{port.portKname}</span></TableCell>
			<TableCell align={'center'} colspan={4} style={{color:"orange", padding:"1px", fontSize: "1px"}}>IN</TableCell>
			<TableCell align={'center'} colspan={4} style={{color:"orange", padding:"1px", fontSize: "5px"}}>OUT</TableCell>
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
				 1
			 </TableCell>
			 <TableCell align={'center'} className={classes.tableCell} style={{padding:"1px", fontSize: "5px"}}>
				 2
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
   }))}
 </TableBody> 
</Table>	
  		);
}
