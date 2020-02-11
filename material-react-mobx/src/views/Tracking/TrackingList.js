import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Alert,AlertTitle } from '@material-ui/lab';
import BackupIcon from "@material-ui/icons/Backup";
import StarIcon from "@material-ui/icons/Stars";
import SettingIcon from "@material-ui/icons/Settings";
import MapIcon from "@material-ui/icons/Map";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Popover from  '@material-ui/core/Popover';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
import moment from 'moment';
import Table from "views/Tracking/TrackingDetail.js";
import Blupload from "views/Tracking/Blupload/Upload.js";
import HotSet from "views/Tracking/HotSet/HotSet.js";
import Map from "views/Tracking/Map/Map.js";
import FixedPlugin from "views/Tracking/Setting/CustomFixedPlugin.js";


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


export default function ScheduleList() {

  const setDate = new Date();
  const setEndDate = new Date();
  //const [carrierCode,setCarrierCode] = useState("");
  const [dateGbSet,setDateGbSet] = useState("ETA");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [vesselName,setVesselName] = useState("");
  const [selectData,setSelectData] = useState([]);
  const [portData,setPortData] = useState([]);
  const [scheduleData,setScheduleData] = useState([]);
  const [fromDate,setFromDate] = useState(new Date());
  const [toDate,setToDate] = useState(setEndDate.setDate(setEndDate.getDate()+6));
  const [anchorE1, setAnchorE1] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  //const [anchorE4, setAnchorE4] = useState(null);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [viewVlaue, setViewVlaue] = React.useState("list");
  
  
  const handleViewClick = () => {
	  console.log("event3: 시작");
  }
  
  const handleFixedClick = () => {
	    if (fixedClasses === "dropdown") {
	      setFixedClasses("dropdown show");
	    } else {
	      setFixedClasses("dropdown");
	    }
	  };
  
  useEffect(() => {
	    console.log('effect');
/*	    axios.post("/api/getCarrierInfo").then(res => setSelectData(res.data));
	    //.then(res => console.log(JSON.stringify(res.data)));
	    */
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  
  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    if(values != "" && values.length > 2) {
	    	axios.post("/api/getPortCodeInfo",{ portCode:values})
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
	  /*axios.post("/api/getScheduleList",{ carrierCode:carrierCode,
		  								  startDate:moment(fromDate).format('YYYYMMDD'),
		  								  endDate:moment(toDate).format('YYYYMMDD'),
		  								  startPort:sPort,
		  								  endPort:ePort,
		  								  vesselName:vesselName
	  									})
	    .then(res => setScheduleData(res.data));*/
	  alert("Tracking Info Search onSubmit");
  }
  
  const handleClose = () => {
	  setAnchorE1(null);
	  setAnchorE2(null);
	  setAnchorE3(null);
	  //setAnchorE4(null);
  }
  
  const open_bl = Boolean(anchorE1);
  const open_hot = Boolean(anchorE2);
  const open_map = Boolean(anchorE3);
  //const open_set = Boolean(anchorE4);
  const id_bl = open_bl ? 'simple-popover1':undefined;
  const id_hot = open_hot ? 'simple-popover2':undefined;
  const id_map = open_map ? 'simple-popover3':undefined;
  //const id_set = open_set ? 'simple-popover4':undefined;
  
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
        <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Tacking Service</h4>
        <p className={classes.cardCategoryWhite}>
          Here is a subtitle for this table
        </p>
      </CardHeader>
          <CardBody>
          	<Card style={{marginTop:'5px',marginBottom:'5px'}}>
          		<CardHeader style={{paddingBottom:'1px',paddingRight:'1px',paddingLeft:'1px'}}>
		          <GridItem xs>
			      	<GridContainer>
			      		<GridItem xs={12} sm={9} md={10}>
			      			<GridContainer spacing={1}>
			      				<GridItem xs={12} sm={7}>
			      					<GridContainer>
			      						<GridItem xs={12} sm={12} md={3}>
					      					<CustomSelect
					      					    id="dateGb"
					      					    labelText = "구분"
					      					    setValue = {dateGbSet}
					      					    option = {["ETA","ETD"]}
					      						inputProps={{onChange:event => setDateGbSet(event.target.value)}}
					      					    formControlProps={{fullWidth: true}}
					      					/>
					      				</GridItem>
					      				<GridItem xs={12} sm={12} md={9}>
					      					<GridContainer>
					      						<GridItem xs={12} sm={12} md={6}>
								      				<CalendarBox
									        			labelText ="From"
									      				id="fromDate"
									      				format="yyyy-MM-dd"
									      				setValue={fromDate}
									        			onChangeValue={date => setFromDate(date)}
									        			formControlProps={{fullWidth: true}} 
								      				/>
								      			</GridItem>
							      				<GridItem xs={12} sm={12} md={6}>
								      				<CalendarBox
									        			labelText ="To"
									      				id="toDate"
									      				format="yyyy-MM-dd"
									      				setValue={toDate}
									        			onChangeValue={date => setToDate(date)}
									        			formControlProps={{fullWidth: true}}
								      				/>
							      				</GridItem>
						      				</GridContainer>
					      				</GridItem>
						      		</GridContainer>
					        	</GridItem>
					      		<GridItem xs={12} sm={5}>
						        	<GridContainer spacing={1}>
							        	<GridItem xs={12} sm={12} md={6}>
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
					      				<GridItem xs={12} sm={12} md={6}>
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
					      			</GridContainer>
					      		</GridItem>
					        	<GridItem xs={12} sm={7}>
					      			<GridContainer>
						      			<GridItem xs={12} sm={12} md={5}>
			      						<CustomInput
						        			labelText="BL No."
						        			id="blNo"
						        			inputProps={{onChange:event => setVesselName(event.target.value)}}
						        			formControlProps={{fullWidth: true}}
			      						/>
					      			</GridItem>
				      				<GridItem xs={12} sm={12} md={7}>
					      				<CustomInput
						        			labelText="Vessel Name"
						        			id="vesselName"
						        			inputProps={{onChange:event => setVesselName(event.target.value)}}
						        			formControlProps={{fullWidth: true}}
					      				/>
				      				</GridItem>
						      		</GridContainer>
					      		</GridItem>	
					      		
				        	 </GridContainer>
			        	 </GridItem>
			        	<GridItem xs={12} sm={12} md>
			        		<Button color="warning" onClick = {onSubmit} fullWidth>Search</Button>
			        	</GridItem>
		        	</GridContainer>
		          </GridItem>
		          <GridItem style={{textAlignLast:'right'}}>
  						<Button
  							variant="contained"
  							color="warning"
  							size="sm"
  							startIcon={<BackupIcon/>}
  							onClick={e=>setAnchorE1(e.currentTarget)}
  						 >BL Upload
  						 </Button>
  			            <Popover
	      		            	id={id_bl}
	      		            	open={open_bl}
	      		            	anchorEl={anchorE1}
	      		            	onClose={handleClose}
  			            		anchorReference="anchorPosition"
  			            		anchorPosition={{top:100,left:650}}
	      		            	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      		            	transformOrigin={{vertical:'top',horizontal:'center',}}
  			            ><Blupload/>
  			            </Popover>
  			            &nbsp;&nbsp;
  						<Button
	  							variant="contained"
	  	  						color="warning"
	  	    					size="sm"
	  							startIcon={<StarIcon/>}
	      						onClick={e=>setAnchorE2(e.currentTarget)}
	    					>Star
						</Button>
						<Popover
	      		            	id={id_hot}
	      		            	open={open_hot}
	      		            	anchorEl={anchorE2}
	      		            	onClose={handleClose}
								anchorReference="anchorPosition"
								anchorPosition={{top:300,left:450}}
	      		            	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      		            	transformOrigin={{vertical:'top',horizontal:'center',}}
						><HotSet/>
			            </Popover>
			            &nbsp;&nbsp;
						<Button
								variant="contained"
		  						color="warning"
		  	  					size="sm"
								startIcon={<MapIcon/>}
	    						onClick={e=>setAnchorE3(e.currentTarget)}
						>Map
						</Button>
						<Popover
	      		            	id={id_map}
	      		            	open={open_map}
	      		            	anchorEl={anchorE3}
	      		            	onClose={handleClose}
		            			anchorReference="anchorPosition"
  			            		anchorPosition={{top:100,left:650}}
	      		            	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      		            	transformOrigin={{vertical:'top',horizontal:'center',}}
						><Map/>
						</Popover>
		      </GridItem>
          		</CardHeader>
          		<CardBody style={{padding:'3px'}}>
          			<GridContainer>
          				<GridItem xs={12}>
          					<Table
		                        tableHeaderColor="warning"
		                        tableHead={["BL No", "HOT", "I/E", "CARRIER", "VESSEL/VOYAGE","CURRENT","POL/ETD","POD/ETA","ACTION"]}
	          					tableData={[
	    				            ["SNKO000000001", "Y", "E", "SNKO","KOREAREAD ER40W","입항","KRPUS 2020-01-29","KRINC 2020-01-29"],
	    				            ["SNKO000000001", "Y", "E", "SNKO","KOREAREAD ER40W","입항","KRPUS 2020-01-29","KRINC 2020-01-29"],
	    				            ["SNKO000000001", "Y", "E", "SNKO","KOREAREAD ER40W","입항","KRPUS 2020-01-29","KRINC 2020-01-29"],
	    				            ["SNKO000000001", "Y", "E", "SNKO","KOREAREAD ER40W","입항","KRPUS 2020-01-29","KRINC 2020-01-29"],
	    				            ["SNKO000000001", "Y", "E", "SNKO","KOREAREAD ER40W","입항","KRPUS 2020-01-29","KRINC 2020-01-29"],
	    				            ["SNKO000000001", "Y", "E", "SNKO","KOREAREAD ER40W","입항","KRPUS 2020-01-29","KRINC 2020-01-29"]
	    				          ]}
		                     /> 
		                </GridItem>
		            </GridContainer>
		            <FixedPlugin
			          //handleImageClick={handleImageClick}
			          //handleColorClick={handleColorClick}
			          //bgColor={color}
			          //bgImage={image}
		              handleViewClick={handleViewClick}
			          handleFixedClick={handleFixedClick}
			          fixedClasses={fixedClasses}
		        />
          		</CardBody>
          	</Card>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
