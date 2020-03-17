import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import CardIcon from "components/Card/CardIcon.js";
// other import
//import moment from 'moment';
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Grid from '@material-ui/core/Grid';
import CustomSelect from "components/CustomInput/CustomSelect.js";
import SearchButton from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Table from "components/Table/TablePaging.js";
const styles = {
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
	  gridStyle1: {
		  paddingTop:'1px',
		  paddingBottom:'1px',
	  },
	  cardStyle: {
		display: 'block',
		transitionDuration: '0.3s',
		height: '45vw'
	  }
  };
  
const useStyles = makeStyles(styles);

export default function TableList() {
	const [dateGbSet,setDateGbSet] = useState("VESSEL");
	const classes = useStyles();
  
	return (
	<Card className={classes.cardStyle}>
    	<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
	    	<CardIcon color="info" style={{height:'26px'}}>
				<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
      		</CardIcon>
				<h4 className={classes.cardTitleBlack}>Tracking Map</h4>
				<p className={classes.cardTitleBlack}>
					Here is a subtitle for this table
				</p>
      	</CardHeader>
      	<CardBody style={{paddingBottom:'2px'}}>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
		  			<Grid item xs={12} sm={12} md={12} >
						<Grid container spacing={4}>
							<Grid item xs={12} sm={12} md={3}>
								<CustomSelect
									id="searchGubun"
									labelText = "구분"
									setValue = {dateGbSet}
									option = {["VESSEL","ROUTE", "BL"]}
									inputProps={{onChange:event => setDateGbSet(event.target.value) || console.log(event.target.value)}}
									formControlProps={{fullWidth: true}}/>
							</Grid>
						</Grid>
						<Grid container spacing={4}>
							<Grid item xs={12} sm={12} md={3}>
							<CustomInput
								labelText="Vessel Name"
								id="vesselName"
								formControlProps={{fullWidth: true}}/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
							<CustomInput
								labelText="POL"
								id="pol"
								formControlProps={{fullWidth: true}}/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<CustomInput
									labelText="POD"
									id="pod"
									formControlProps={{fullWidth: true}}/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<CustomInput
									labelText="BLNo."
									id="BLNO"
									formControlProps={{fullWidth: true}}/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<Button>Search</Button>
									
							</Grid>
						</Grid>
					</Grid>
						
				</GridItem>
			</GridContainer>
			<Grid item item xs={12} sm={12} md={12}>
				<form target="maplink"> 
					{/* {src='http://route.seavantage.com/#/'} */}
					<iframe name="maplink" src='http://route.seavantage.com/#/'  width="100%" height="600" display='block' border='none' position="absolute" frameBorder="0" scrolling="auto" allowFullScreen></iframe>
				</form>
			</Grid>
						
			
		</CardBody>
	</Card> 
  );
}