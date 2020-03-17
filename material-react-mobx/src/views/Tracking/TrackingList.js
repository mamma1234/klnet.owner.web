import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import BackupIcon from "@material-ui/icons/Backup";
import StarIcon from "@material-ui/icons/Stars";
import MapIcon from "@material-ui/icons/Map";
import AddBox from "@material-ui/icons/AddBox";
import RemoveBox from "@material-ui/icons/IndeterminateCheckBox";
//import FormControl from "@material-ui/core/FormControl";
//import Icon from "@material-ui/core/Icon";
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
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';
import Table from "views/Tracking/TrackingDetail.js";
import Blupload from "views/Tracking/Blupload/Upload.js";
import HotSet from "views/Tracking/HotSet/HotSet.js";
import Map from "views/Tracking/Map/Map.js";
import FixedPlugin from "views/Tracking/Setting/CustomFixedPlugin.js";
import Modal from '@material-ui/core/Modal';
import JoinPage from "components/Form/Common/JoinPage.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import TestForm from "components/Form/Common/Search.js";
import Grid from '@material-ui/core/Grid';

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
};

const useStyles = makeStyles(styles);


export default function ScheduleList() {


  const setEndDate = new Date();
  //const [carrierCode,setCarrierCode] = useState("");
  const [dateGbSet,setDateGbSet] = useState("ETA");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [vesselName,setVesselName] = useState("");
  const [selectData,setSelectData] = useState([]);
  const [portData,setPortData] = useState([]);
  const [trackingList,setTrackingList] = useState([]);
  const [fromDate,setFromDate] = useState(new Date());
  const [toDate,setToDate] = useState(setEndDate.setDate(setEndDate.getDate()+6));
  const [anchorE1, setAnchorE1] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  //const [anchorE4, setAnchorE4] = useState(null);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  //const [viewVlaue, setViewVlaue] = React.useState("list");
  const [openJoin,setOpenJoin] = useState(false);
  const [optionData,setOptionData] = useState([]);
  
  let portCode = [];
  

  const handleFixedClick = () => {
	    if (fixedClasses === "dropdown") {
	    	 setFixedClasses("dropdown show");
			  axios.post("/com/getUserSetting").then(res => portCode(res.data[0]))
			  //.then(res => console.log(JSON.stringify(res.data[0])))
			  .catch(err => {
			        if(err.response.status == "403") {
			        	setOpenJoin(true);
			        }
			    });

	    } else {
	      setFixedClasses("dropdown");
	      setOptionData([]);
	    }
};
  
useEffect(() => {
	    console.log('effect');

    	axios.get("/com/getPortCodeInfo")
	    .then(res => setPortData(res.data));
    	
	    function handleTouchMove(event) {
	    	if(openJoin) {
	    		event.preventDefault();
	    	}
	    }
	    
	    window.addEventListener("touchmove",handleTouchMove, {
	    	passive: false
	    });

	    return () => {
	      console.log('cleanup');
	      window.removeEventListener("touchmove",handleTouchMove);
	    };
}, [openJoin]);
  
  
  const onPortSearchValue = (e) => {
	  console.log(">>>click");
	    const values = e.target.value;
	    if(values != "" && values.length > 2) {
	    	axios.get("/com/getPortCodeInfo")
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
	  axios.post("/loc/getTrackingList"
			  //{ carrierCode:carrierCode,
		//  								  startDate:moment(fromDate).format('YYYYMMDD'),
		 // 								  endDate:moment(toDate).format('YYYYMMDD'),
		  //								  startPort:sPort,
		  //								  endPort:ePort,
		  //								  vesselName:vesselName
	  									//})
			  )
		.then(setTrackingList([]))
	    .then(res => setTrackingList(res.data))
	    .catch(err => {
	       //console.log(err.response.status);
	        if(err.response.status == "403") {
	        	setOpenJoin(true);
	        }
	        //window.location.href = "/Landing";
	    });
	  //alert("Tracking Info Search onSubmit");
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
  
  const handleOpenJoin = () => {
	  setOpenJoin(true);
  };
  
  const handleJoinClose = () => {
	  setOpenJoin(false);
  }
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const classes = useStyles();
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card style={{marginBottom:'0px'}}>
{/*        <CardHeader color="info" >
        <h4 className={classes.cardTitleWhite}>Tacking Service</h4>
        <p className={classes.cardCategoryWhite}>
          Here is a subtitle for this table
        </p>
      </CardHeader>*/}
      <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		<CardIcon color="info" style={{height:'26px'}}>
			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		</CardIcon>
		<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>
	  </CardHeader>
          <CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          	 <Grid item xs={12}>
			     <Grid container spacing={3}>
			     	<Grid item xs={12} sm={9} md={10}>
			      		<Grid container spacing={1}>
			      			<Grid item xs={12} sm={12} md={6}>
			      				<Grid container spacing={1}>
			      					<Grid item xs={12} sm={12} md={2}>
					      				<CustomSelect
					      					id="dateGb"
					      					labelText = "구분"
					      					setValue = {dateGbSet}
					      					option = {["ETA","ETD"]}
					      					inputProps={{onChange:event => setDateGbSet(event.target.value)}}
					      					formControlProps={{fullWidth: true}}
					      				/>
					      			</Grid>
					      			<Grid item xs={12} sm={12} md={10}>
					      				<Grid container spacing={1}>
					      					<Grid item xs={12} sm={12} md={6}>
								      			<CalendarBox
									       			labelText ="From"
									    			id="fromDate"
									    			format="yyyy-MM-dd"
									    			setValue={fromDate}
									      			onChangeValue={date => setFromDate(date)}
									       			formControlProps={{fullWidth: true}} 
								      			/>
								      		</Grid>
							      			<Grid item xs={12} sm={12} md={6}>
								      			<CalendarBox
									       			labelText ="To"
									    			id="toDate"
									    			format="yyyy-MM-dd"
									    			setValue={toDate}
									      			onChangeValue={date => setToDate(date)}
									       			formControlProps={{fullWidth: true}}
								      			/>
							      			</Grid>
						      			</Grid>
					      			</Grid>
						      	</Grid>
					        </Grid>
					      	<Grid item xs={12} sm={12} md={6}>
						        <Grid container spacing={1}>
							       	<Grid item xs={12} sm={12} md={6}>
				      					<Autocomplete
							       			options = {portCode}
							       			getOptionLabel = { options => options?"["+options[0]+"] "+options[1]:<TextField label="출발지"  fullWidth />}
							       			id="start"
							       			onChange={onSPortChange}
				      					    loading={true}
				      						//onClick={onPortSearchValue}
							       			//onInputChange={onPortSearchValue}
							       			renderInput={params => (
							    				<TextField {...params} label="출발지"  fullWidth />
							       			)}
				      					/>
						      		</Grid>
					      			<Grid item xs={12} sm={12} md={6}>
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
					      			</Grid> 	
					      		</Grid>
					      	</Grid>

					        <Grid item xs={12} sm={12} md={12} >
						        <Collapse in={expanded} timeout="auto" unmountOnExit>
						              <Grid container spacing={3}>
							    		<Grid item xs={12} sm={12} md={3}>
							    			<CustomInput
							        			labelText="BL No."
							        			id="blNo"
							        			inputProps={{onChange:event => setVesselName(event.target.value)}}
							        			formControlProps={{fullWidth: true}}
				      						/>
						      			</Grid>
					      				<Grid item xs={12} sm={12} md={3}>
						      				<CustomInput
							        			labelText="Vessel Name"
							        			id="vesselName"
							        			inputProps={{onChange:event => setVesselName(event.target.value)}}
							        			formControlProps={{fullWidth: true}}
						      				/>
					      				</Grid>
						      			<Grid item xs={12} sm={12} md ={6} style={{textAlignLast:'right'}}>
											<Button
												color="info"
												size="sm"
												style={{width:'115px'}}
												startIcon={<BackupIcon/>}
												onClick={e=>setAnchorE1(e.currentTarget)}
											>BL Upload</Button>
								            &nbsp;
											<Button
							  					color="info"
							    				size="sm"
							    				style={{width:'76px'}}
												startIcon={<StarIcon/>}
												onClick={e=>setAnchorE2(e.currentTarget)}
											>Star</Button>
								            &nbsp;
											<Button
												color="info"
								  				size="sm"
								  				style={{width:'76px'}}
												startIcon={<MapIcon/>}
												onClick={e=>setAnchorE3(e.currentTarget)}
											>Map</Button>
										</Grid>
									</Grid>
					            </Collapse>
					      	</Grid>	
				        </Grid>
			        </Grid>
			        <Grid item xs={12} sm={12} md style={{paddingTop:'0',paddingBottom:'10px'}}>
			        	<Button color="info" onClick = {onSubmit}  fullWidth>Search</Button>
			        </Grid>
		      	</Grid>
		      	<Grid item xs={12} style={{textAlignLast:'right',height:'28px'}}>
		      		{expanded?<RemoveBox onClick = {handleExpandClick} style={{color:'#00acc1'}}/>:<AddBox onClick = {handleExpandClick} style={{color:'#00acc1'}}/>}

		      	</Grid>
	      </Grid>
          <FixedPlugin
			//handleImageClick={handleImageClick}
			//handleColorClick={handleColorClick}
			//bgColor={color}
			//bgImage={image}
            fixedData={optionData}
			//handleViewClick={handleViewClick}
			handleFixedClick={handleFixedClick}
			fixedClasses={fixedClasses}
		   />
          <Popover
	      	id={id_bl}
	      	open={open_bl}
	      	anchorEl={anchorE1}
	      	onClose={handleClose}
	  		anchorReference="anchorPosition"
	  		anchorPosition={{top:100,left:690}}
	      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      	transformOrigin={{vertical:'top',horizontal:'center',}}
		  ><Blupload/>
		  </Popover>
		  <Popover
			id={id_hot}
			open={open_hot}
			anchorEl={anchorE2}
			onClose={handleClose}
			anchorReference="anchorPosition"
			anchorPosition={{top:80,left:650}}
			anchorOrigin={{vertical:'bottom',horizontal:'center',}}
			transformOrigin={{vertical:'top',horizontal:'center',}}
		  ><HotSet/>
		  </Popover>
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
          </CardBody>
        </Card>
	    <Modal
	     	open={openJoin}
	    	onClose={handleJoinClose}
	      ><JoinPage mode="0" onClose ={()=>setOpenJoin(false)} page="/svc" reTurnText="Login" />
	     </Modal>
      </GridItem>
      <GridItem xs={12}>
		    <Card style={{marginTop:'5px',marginBottom:'5px'}}>
				<CardBody style={{padding:'0px'}}>
					<Table
						tableHeaderColor="info"
		                tableHead={["BL No", "I/E", "CARRIER", "VESSEL/VOYAGE","CURRENT","POL(ETD/ATD)","POD(ETA/ATA)","ACTION"]}
		    			tableData={trackingList}
		            /> 
				</CardBody>
			</Card>
		</GridItem>
    </GridContainer>
  );
}
