import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Alert,AlertTitle } from '@material-ui/lab';
import MButton from '@material-ui/core/Button';
import BackupIcon from "@material-ui/icons/Backup";
import StarIcon from "@material-ui/icons/Stars";
import MapIcon from "@material-ui/icons/Map";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Popover from  '@material-ui/core/Popover';
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
import CustomSelect from "components/CustomInput/CustomSelect.js";
import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
import moment from 'moment';
import ScheduleToggleTable from "views/Schedule/ScheduleDetailTable.js";


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
	paddingTop:15,
	marginLeft: 'auto',
  },
  buttoncss: {
	  fullHight: true,
	  fullWidth: true
  },
  calendarcss: {
	  width:200,
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
  }
  
  const open_bl = Boolean(anchorE1);
  const open_hot = Boolean(anchorE2);
  const open_map = Boolean(anchorE3);
  const id_bl = open_bl ? 'simple-popover1':undefined;
  const id_hot = open_hot ? 'simple-popover2':undefined;
  const id_map = open_map ? 'simple-popover3':undefined;
  
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
        <CardHeader color="warning" stats icon>
	        <CardIcon color="warning">
	        <Icon>content_copy</Icon>
	      </CardIcon>
        <h4 className={classes.cardTitleBlack}>Tacking Service</h4>
        <p className={classes.cardTitleBlack}>
          Here is a subtitle for this table
        </p>
      </CardHeader>
          <CardBody>
          	<Card>
          		<CardHeader>
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
						        	<GridContainer>
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
						      			<GridItem xs={12} sm={12} md={6}>
			      						<CustomInput
						        			labelText="BL No."
						        			id="blNo"
						        			inputProps={{onChange:event => setVesselName(event.target.value)}}
						        			formControlProps={{fullWidth: true}}
			      						/>
					      			</GridItem>
				      				<GridItem xs={12} sm={12} md={6}>
					      				<CustomInput
						        			labelText="Vessel Name"
						        			id="vesselName"
						        			inputProps={{onChange:event => setVesselName(event.target.value)}}
						        			formControlProps={{fullWidth: true}}
					      				/>
				      				</GridItem>
						      		</GridContainer>
					      		</GridItem>
					      		<Grid className={classes.gridcss}>
				      			<Grid container spacing={1}>
			  						<Grid item xs={12}>
			      						<MButton
			      							variant="contained"
			      							//color="primary"
			      							size="small"
			      							//style={{}}
			      							startIcon={<BackupIcon/>}
			      							onClick={e=>setAnchorE1(e.currentTarget)}
			      						 >BL Upload
			      						 </MButton>
			      			            <Popover
				      		            	id={id_bl}
				      		            	open={open_bl}
				      		            	anchorEl={anchorE1}
				      		            	onClose={handleClose}
				      		            	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
				      		            	transformOrigin={{vertical:'top',horizontal:'center',}}
			      			            >BL Upload PopUp
			      			            </Popover>
			      			            &nbsp;&nbsp;
			      						<MButton
			    							variant="contained"
			    							//color="primary"
			    							size="small"
			    							startIcon={<StarIcon/>}
				      						onClick={e=>setAnchorE2(e.currentTarget)}
				    					>Star
			    						</MButton>
			    						<Popover
				      		            	id={id_hot}
				      		            	open={open_hot}
				      		            	anchorEl={anchorE2}
				      		            	onClose={handleClose}
				      		            	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
				      		            	transformOrigin={{vertical:'top',horizontal:'center',}}
			    						>Hot Star Add
		      			            </Popover>
		      			            &nbsp;&nbsp;
			    						<MButton
											variant="contained"
											//color="primary"
											size="small"
											startIcon={<MapIcon/>}
				    						onClick={e=>setAnchorE3(e.currentTarget)}
			    						>Map
			    						</MButton>
			    						<Popover
				      		            	id={id_map}
				      		            	open={open_map}
				      		            	anchorEl={anchorE3}
				      		            	onClose={handleClose}
				      		            	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
				      		            	transformOrigin={{vertical:'top',horizontal:'center',}}
			    						>Map Add
	      			            </Popover>
			    					</Grid>
					      		</Grid>
					      </Grid>
				        	 </GridContainer>
			        	 </GridItem>
			        	<GridItem xs={12} sm={12} md>
			        		<Button onClick = {onSubmit} fullWidth>Search</Button>
			        	</GridItem>
		        	</GridContainer>
		          </GridItem> 
          		</CardHeader>
          		<CardBody>
          			<GridContainer>
          				<GridItem xs={12}>
          					<ScheduleToggleTable
		                        //tableHeaderColor="primary"
		                        tableHead={["BL No", "HOT", "I/E", "CARRIER", "VESSEL/VOYAGE","CURRENT","POL/ETD","POD/ETA"]}
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
