import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ScheduleToggleTable from "views/Schedule/ScheduleToggleTable.js";

import CardContent from '@material-ui/core/CardContent';
import Button from "components/CustomButtons/Button.js";


import Grid from '@material-ui/core/Grid';
//components

import CustomInput from "components/CustomInput/CustomInput.js";

import CalendarBox from "components/CustomInput/CustomCalendar.js";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
                   pldPortCode: "", 
                   podPortCode: "",
                   portCode:"" };
  }
  


  handleOnChange = (e) => {

    const vesselName = this.state.vesselName;
    const carrierCode = this.state.carrierCode;
    const podPortCode = this.state.pldPortCode;
    const pldPortCode =this.state.podPortCode;

    alert("선택한 값들: (출발지:"+podPortCode+"/도착지:"+pldPortCode+"/vesselName:"+vesselName+"/Carrier:"+carrierCode + " 데이터 조회 시작");
    
    this.scheduleToSearch();
  }
  scheduleToSearch = (vVal) => {
    return fetch('/api/schedule')
      .then(res => res.json())
      .then(scheduleData => this.setState({scheduleData}));
  }

  carrierToSearch = () => {
    return fetch('/api/carrier')
        .then(res => res.json())
      .then(carrierData => this.setState({carrierData}));
  }

  portToSearch = (vVal) => {
    return fetch('/api/port?portCode='+vVal)
        .then(res => res.json())
      .then(portData => this.setState({portData}));
  }

  onChangeValue = (event) => {
    this.setState({vesselName:event.target.value})
  }

  onCarrierCodeChange = (event,values) => {
    if(values) { 
      this.setState({
        carrierCode: values.carrier_code
      })
    }
  }

  onPldCodeChange = (event,values) => {
    if(values) {
      this.setState({
        pldPortCode: values.port_code
      })
    }
  }

  onPodCodeChange = (event,values) => {
    if(values) {
      this.setState({
        podPortCode: values.port_code
      })
    } 
  }

  onPortSearch = (event,values) => {
    const portCode = event.target.value;
    if(portCode.length > 1) {this.portToSearch(portCode);}    
  }

  

  componentDidMount() {
    this.carrierToSearch();
    //this.portToSearch();
    
  }

  render() {

    const { carrierData, portData, scheduleData } = this.state;
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
                              labelText ="출발일"
                              id="startDay"
                              format="yyyy-MM-dd"
                              selectedDate = {new Date()}
                              setSelectedDate = {new Date()}
                              formControlProps={{
                                            fullWidth: true
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Autocomplete
                                options = {portData}
                                getOptionLabel = { option => option.port_code != undefined?"["+option.port_code+"] "+option.port_name:"두글자 이상 입력하세요."}
                                id="pod"
                                onChange={this.onPodCodeChange}
                                renderInput={params => (
                                  <TextField {...params} label="출발지" onKeyUp={this.onPortSearch} fullWidth />
                                )}
                              />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <Autocomplete
                                options = {carrierData}
                                getOptionLabel = { option => "["+option.carrier_code+"] "+option.carrier_hname}
                                id="carrierCode"
                                onChange={this.onCarrierCodeChange}
                                renderInput={params => (
                                  <TextField {...params} label="선사" fullWidth />
                                )}
                              />
                          </Grid>
                          <Grid item xs={12} sm={3} >
                            <CalendarBox
                                        labelText ="도착일"
                                        id="stopDay"
                                        format="yyyy-MM-dd"
                              selectedDate = {null}
                              setSelectedDate = {null}
                                        formControlProps={{
                                            fullWidth: true
                                          }}
                            />
                          </Grid> 
                          <Grid item xs={12} sm={4}>
                            <Autocomplete
                                options = {portData}
                                getOptionLabel = { option => "["+option.port_code+"] "+option.port_name}
                                id="pld"
                                onChange={this.onPldCodeChange}
                                renderInput={params => (
                                  <TextField {...params} label="도착지" onKeyUp={this.onPortSearch} fullWidth />
                                )}
                              />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <CustomInput
                                  labelText="Vessel Name"
                                  id="vesselName"
                                  inputProps={{onBlur:this.onChangeValue}}
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
