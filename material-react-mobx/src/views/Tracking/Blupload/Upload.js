import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import BackupIcon from "@material-ui/icons/Backup";
import StarIcon from "@material-ui/icons/Stars";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import SearchButton from "components/CustomButtons/Button.js";
import Popover from  '@material-ui/core/Popover';
import CarrierInfo from "views/Tracking/Blupload/CarrierInfo.js";
import Excel from "views/Tracking/Blupload/ExcelUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const setDate = new Date();
  const setEndDate = new Date();
  const [fromDate,setFromDate] = useState(new Date());
  const [toDate,setToDate] = useState(setEndDate.setDate(setEndDate.getDate()+6));
  const [selectData,setSelectData] = useState([]);
  const [carrierCode,setCarrierCode] = useState("");
  const [anchorE, setAnchorE] = useState(null);
  const [anchorU, setAnchorU] = useState(null);
  
  useEffect(() => {
	    console.log('effect');
	    axios.post("/api/getCarrierInfo").then(res => setSelectData(res.data));
	    //.then(res => console.log(JSON.stringify(res.data)));
	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  const handleClose = () => {
	  setAnchorE(null);
	  setAnchorU(null);
  }
  
  const carrier_open = Boolean(anchorE);
  const upload_open = Boolean(anchorU);
  const carrier = carrier_open ? 'simple-popover1':undefined;
  const upload = upload_open ? 'simple-popover2':undefined;
  
  const onCarrierChange = (e,data) => {
	  console.log(data.LINE_CODE);
	  if(data) {setCarrierCode(data.LINE_CODE);} else {setCarrierCode("");}
	  
  }
  
  return (	
    <div style={{width:700,height:650,overflow:"auto"}}>
      <GridItem xs={12} sm={12} md={12}>
      	<Card style={{marginBottom:'1px'}}>
	        <CardHeader color="warning" stats icon >
		        <CardIcon color="warning">
		        <Icon>content_copy</Icon>
		        </CardIcon>
			    <h4 className={classes.cardTitleBlack}>BL No. UpLoad</h4>
		      </CardHeader>
          <CardBody style={{padding:'1px'}}>
          	<GridItem xs={12}>
          		<GridContainer>
          			<GridItem xs={12} sm={12} md={9}>
          				<GridContainer>
          					<GridItem xs={12} sm={12} md={4}>
								<CalendarBox
				      				labelText ="Reg_Date From"
				    				id="fromDate"
				    				format="yyyy-MM-dd"
				    				setValue={fromDate}
				      				onChangeValue={date => setFromDate(date)}
				      			formControlProps={{fullWidth: true}} 
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={4}>
								<CalendarBox
				      			labelText =" Reg_Date To"
				    				id="toDate"
				    				format="yyyy-MM-dd"
				    				setValue={toDate}
				      				onChangeValue={date => setToDate(date)}
				      			formControlProps={{fullWidth: true}}
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
					<GridItem>
						<SearchButton color="warning">Search</SearchButton>
					</GridItem>
				</GridContainer>
			</GridItem>
			<GridItem style={{textAlignLast:'right'}}>
						<Button
						variant="contained"
						color="warning"
						size="sm"
						style={{lineHeight:"1",}}
						startIcon={<BackupIcon/>}
						onClick={e=>setAnchorU(e.currentTarget)}
					 	>Excel Upload
					 </Button>
		            &nbsp;&nbsp;
					<Button
						variant="contained"
						color="warning"
						size="sm"
						style={{lineHeight:"1",}}
						startIcon={<StarIcon/>}
					    onClick={e=>setAnchorE(e.currentTarget)}
					>Carrier Info
					</Button>
					<Popover
		            	id={upload}
		            	open={upload_open}
		            	anchorEl={anchorU}
		            	onClose={handleClose}
		            	anchorOrigin={{vertical:'top',horizontal:'center',}}
		            	transformOrigin={{vertical:'center',horizontal:'right',}}
					><Excel/>
					</Popover>
					<Popover
  		            	id={carrier}
  		            	open={carrier_open}
  		            	anchorEl={anchorE}
  		            	onClose={handleClose}
	            		anchorOrigin={{vertical:'top',horizontal:'center',}}
	            		transformOrigin={{vertical:'center',horizontal:'right',}}
					><CarrierInfo/>
					</Popover>
			</GridItem>
          </CardBody>
          </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
          <CardBody className={classes.gridStyle1}>
            <Table
              tableHeaderColor="warning"
              tableHead={["No", "BL No.", "Carrier", "Register Time"]}
              tableData={[
                ["1", "SNKO000000001", "SNKO", "2020-01-15 09:30"],
                ["2", "SNKO000000002", "SNKO", "2020-01-15 09:30"],
                ["3", "SNKO000000003", "SNKO", "2020-01-15 09:30"],
                ["4", "SNKO000000004",  "SNKO", "2020-01-15 09:30"],
                ["5", "SNKO000000005",  "SNKO", "2020-01-15 09:30"],
                ["6", "SNKO000000006",  "SNKO", "2020-01-15 09:30"],
                ["7", "SNKO000000007",  "SNKO", "2020-01-15 09:30"]
              ]}
            />
          </CardBody>
      </GridItem>
    </div>
    
  );
}
