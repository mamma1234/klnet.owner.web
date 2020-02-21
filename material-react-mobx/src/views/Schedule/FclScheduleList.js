import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Alert,AlertTitle } from '@material-ui/lab';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// other import
import axios from 'axios';
import moment from 'moment';
import ScheduleToggleTable from "views/Schedule/ScheduleDetailTable.js";

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
  }
};

const useStyles = makeStyles(styles);

export default function ScheduleList() {

  const setDate = new Date();
  const setEndDate = new Date();
  const [carrierCode,setCarrierCode] = useState("");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [vesselName,setVesselName] = useState("");
  const [selectData,setSelectData] = useState([]);
  const [portData,setPortData] = useState([]);
  const [scheduleData,setScheduleData] = useState([]);
  const [sDate,setSDate] = useState(new Date());
  const [eDate,setEDate] = useState(setEndDate.setDate(setEndDate.getDate()+6));

  
  
  useEffect(() => {
	    console.log('effect');
	    axios.post("/sch/getCarrierInfo").then(res => setSelectData(res.data));
	    //.then(res => console.log(JSON.stringify(res.data)));
	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  const onCarrierChange = (e,data) => {
	  console.log(data.LINE_CODE);
	  if(data) {setCarrierCode(data.LINE_CODE);} else {setCarrierCode("");}
	  
  }
  
  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    if(values != "" && values.length > 2) {
	    	axios.post("/sch/getPortCodeInfo",{ portCode:values})
		    .then(res => setPortData(res.data));
	    }  
  }

  
  const onSPortChange = (e,data) => {
	  if(data) {
		  setSPort(data.PORT_CODE);
	  } else {
		  setSPort("");
	  }
  }

  const onEPortChange = (e,data) => {
	  if(data) {
		  setEPort(data.PORT_CODE);
	  } else {
		  setEPort("");
	  }
  }
  
  const onSubmit = () => {
	  //search
	  axios.post("/sch/getScheduleList",{ carrierCode:carrierCode,
		  								  startDate:moment(sDate).format('YYYYMMDD'),
		  								  endDate:moment(eDate).format('YYYYMMDD'),
		  								  startPort:sPort,
		  								  endPort:ePort,
		  								  vesselName:vesselName
	  									})
	    .then(res => setScheduleData(res.data));
  }
  
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>FCL Schedule</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
          	<Card>
          		<CardHeader>
		          <GridItem xs={12}>
			      	<GridContainer>
			      		<GridItem xs={12} sm={9} md={10}>
			      			<GridContainer spacing={1}>
			      				<GridItem xs={12} sm={4}>
					        	  	<CalendarBox
					        			labelText ="출항일자"
					      				id="portDate"
					      				format="yyyy-MM-dd"
					      				setValue={sDate}
					        			onChangeValue={date => setSDate(date)}
					        			formControlProps={{fullWidth: true}}
					        	  	/>
					        	</GridItem>
					        	<GridItem xs={12} sm={4}>
					        		<Autocomplete
					        			options = {portData}
					        			getOptionLabel = { options => "["+options.PORT_CODE+"] "+options.PORT_NAME}
					        			id="start"
					        			onChange={onSPortChange}
					        			onInputChange={onPortSearchValue}
					        			renderInput={params => (
					        					<TextField {...params} label="출발지"  fullWidth />
					        			)}
					        		/>
					        	</GridItem>
					        	<GridItem xs={12} sm={4}>
					        		<CustomInput
					        			labelText="Vessel Name"
					        			id="vesselName"
					        			inputProps={{onChange:event => setVesselName(event.target.value)}}
					        			formControlProps={{fullWidth: true}}
					        		/>
					        	</GridItem>
					        	<GridItem xs={12} sm={4}>
					        		<CalendarBox
					        			labelText ="입항일자"
					        			id="portDate"
					        			format="yyyy-MM-dd"
					        			setValue={eDate}
					        		    onChangeValue={date => setEDate(date)}
					        			formControlProps={{fullWidth: true}}
					        		/>
					        	</GridItem>
					        	<GridItem xs={12} sm={4}>
					        		<Autocomplete
					        			options = {portData}
					        			getOptionLabel = { options => "["+options.PORT_CODE+"] "+options.PORT_NAME}
					        			id="end"
					        			onChange={onEPortChange}
					        			onInputChange={onPortSearchValue}
					        			renderInput={params => (
					        				<TextField {...params} label="도착지"  fullWidth />
					        			)}
					        		/>
					        	</GridItem>
					        	<GridItem xs={12} sm={4}>
					        		<Autocomplete
					        			options = {selectData}
					        			getOptionLabel = { option => option.LINE_NAME }
					        			id="carrierCode"
					        			onChange={onCarrierChange}
					        			renderInput={params => (
					        				<TextField {...params} label="선사" fullWidth />
					        			)}
					        		/>
					        	</GridItem>
				        	 </GridContainer>
			        	 </GridItem>
			        	<GridItem xs={12} sm={2} md={2}>
			        		<Button color="primary" onClick = {onSubmit} >Search</Button>
			        	</GridItem>
		        	</GridContainer>
		          </GridItem>    	
          		</CardHeader>
          		<CardBody>
          			<GridContainer>
          				<GridItem xs={12}>
          					<ScheduleToggleTable
		                        tableHeaderColor="primary"
		                        tableHead={["Carrier", "Vessel Name", "Voyage No", "Start Port", "End Port"]}
		                        tableData={scheduleData}
		                     /> 
		                </GridItem>
		            </GridContainer>
          		</CardBody>
          	</Card>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
