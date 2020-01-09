import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ScheduleToggleTable from "views/Schedule/ScheduleDetailTable.js";

import CardContent from '@material-ui/core/CardContent';
import Button from "components/CustomButtons/Button.js";


import Grid from '@material-ui/core/Grid';
//components

import CustomInput from "components/CustomInput/CustomInput.js";

import CalendarBox from "components/CustomInput/CustomCalendar.js";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';

import moment from 'moment';

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


class SearchToSchedule extends React.Component {
 
  constructor() {
    super();
    this.state = { carrierData: [], 
                   portData:[], 
                   scheduleData:[], 
                   vesselName: "" ,
                   carrierCode: "", 
                   endPort: "", 
                   startPort: "",
                   portCode:"",
                   setStartDate : new Date(),
    			   setEndDate : ""
                	   };
    const selectdVal = "ETA";
    const selectVal ="";
 
  }
  


  handleOnChange = (e) => {


	  if(this.state.carrierCode == "") {
	    	alert("선사코드는 필수 입력 값입니다.");
	    	return false;
	    }
	  
    if(this.state.startPort == "") {
    	alert("출발지는 필수 입력 값입니다.");
    	return false;
    }
    
    if (this.state.endPort == "") {
    	alert("도착지는 필수 입력 값입니다.");
    	return false;
    }
    
	    if(this.state.carrierCode != "" && this.state.startPort != "" && this.state.endPort != "") {
	    
		    return axios ({
				url:'/api/getScheduleList',
				method:'POST',
				data: {carrierCode : this.state.carrierCode,
					   startDate : moment(this.state.setStartDate).format('YYYYMM'),
					   endDate : moment(this.state.setEndDate).format('YYYYMM'),
					   startPort : this.state.startPort,
					   endPort : this.state.endPort,
					   vesselName : this.state.vesselName
					   }
			}).then(response => this.setState({scheduleData:response.data}));
	    }
 
  }
  
  carrierToSearch = () => {
	return axios ({
		url:'/api/getCarrierInfo',
		method:'POST',
	}).then(response => this.setState({carrierData:response.data}));
	//.then(response => console.log(JSON.stringify(response.data)));
  }


  portToSearch = (vVal) => {
  
	  return axios ({
			url:'/api/getPortCodeInfo',
			method:'POST',
			data: {portCode : vVal }
		}).then(response => this.setState({portData:response.data}));
		//.then(response => console.log(JSON.stringify(response.data)));
	}

  onChangeValue = (event) => {
    this.setState({vesselName:event.target.value})
  }

  onCarrierCodeChange = (event,values) => {
    if(values) { 
      this.setState({
    	  carrierCode: values.LINE_CODE
      })
    }
  }

  onStartChange = (event,values) => {

    if(values) {
      this.setState({
    	  startPort: values.PORT_CODE
      })
    }
  }

  onEndChange = (event,values) => {
    if(values) {
      this.setState({
    	  endPort: values.PORT_CODE
      })
    } 
  }

  onPortSearch = (event,values) => {
    const portCode = event.target.value;
    if(portCode.length > 2) {this.portToSearch(portCode);}  
  }
  
  onHandleChange = event => {
	  this.setState({
		  inOutGb: event.target.value,
		      });
  }
  
 
  onStartDate = date => {
	 this.setState({
		 setStartDate: date,
	      });
  }

  onEndDate = date => {
		 this.setState({
			 setEndDate: date,
		      });
	  }
  

  componentDidMount() {
    this.carrierToSearch();
  }

  render() {

    const { carrierData, portData, scheduleData,inOutGb } = this.state;
    const classes = makeStyles(styles);

    return(
      <form>
        <Card>
          <CardContent className = {classes.card}>
            <GridContainer>
                      <GridItem xs={12} sm={12} md={10}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={3}>
                          <CalendarBox
                          labelText ="출항일자"
                          id="portDate"
                          format="yyyy-MM-dd"
                          setValue={this.state.setStartDate}
                          onChangeValue={this.onStartDate}
                          formControlProps={{
                                        fullWidth: true
                          }}
                        />
                          
                          </Grid>
                          <Grid item xs={12} sm={4}>
	                          <Autocomplete
	                          options = {portData}
	                          getOptionLabel = { option => option.PORT_CODE != undefined?"["+option.PORT_CODE+"] "+option.PORT_NAME:"두글자 이상 입력하세요."}
	                          id="start"
	                          onChange={this.onStartChange}
	                          renderInput={params => (
	                            <TextField {...params} label="출발지" onKeyUp={this.onPortSearch} fullWidth />
	                          )}
	                        />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                          <Autocomplete
                          options = {carrierData}
                          getOptionLabel = { option => option.LINE_NAME }
                          id="carrierCode"
                          onChange={this.onCarrierCodeChange}
                          renderInput={params => (
                            <TextField {...params} label="선사" fullWidth />
                          )}
                        />
                          
                          </Grid>
                          <Grid item xs={12} sm={3} >
                          <CalendarBox
                          labelText ="도착일자"
                          id="portDate"
                          format="yyyy-MM-dd"
                          setValue={this.state.setEndDate}
                          onChangeValue={this.onEndDate}
                          formControlProps={{
                                        fullWidth: true
                          }}
                        />
                          </Grid> 
                          <Grid item xs={12} sm={4}>
                          <Autocomplete
	                          options = {portData}
	                          getOptionLabel = { option => "["+option.PORT_CODE+"] "+option.PORT_NAME}
	                          id="end"
	                          onChange={this.onEndChange}
	                          renderInput={params => (
	                            <TextField {...params} label="도착지" onKeyUp={this.onPortSearch} fullWidth />
	                          )}
                          />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                          <CustomInput
	                          labelText="Vessel Name"
	                          id="vesselName"
	                          inputProps={{onChange:this.onChangeValue}}
	                          formControlProps={{
	                            fullWidth: true
	                          }}
                          	/>  
                          </Grid>
                        </Grid>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <Button color="primary" onClick={this.handleOnChange}>Search</Button>
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                </Card> 
                <Card>
                  <CardContent className = {classes.card}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                         <ScheduleToggleTable
                          tableHeaderColor="primary"
                          tableHead={["Carrier", "Vessel Name", "Voyage No", "Start Port", "End Port"]}
                          tableData={scheduleData}
                        /> 
                      </GridItem>
                    </GridContainer>
                  </CardContent>
        </Card>
      </form>
    );
  }
}


export default function ScheduleList() {

const classes = useStyles();

    return (

      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>FCL SCHEDULE</h4>
            <p className={classes.cardCategoryWhite}>Schedule</p>
          </CardHeader>
          <CardBody>
            <SearchToSchedule />
          </CardBody>
        </Card>
      </GridItem>    
    </GridContainer>
    );
}
