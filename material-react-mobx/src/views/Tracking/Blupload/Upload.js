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
import Modal from '@material-ui/core/Modal';
import JoinPage from "components/Form/Common/JoinPage.js";
import axios from 'axios';
import MaterialTable from 'material-table';
import leftPad from "left-pad";

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
	const [toDate,setToDate] = useState(new Date(setEndDate.setDate(setEndDate.getDate()+6)));

	const [lineCode,setLineCode] = useState([]);
	useEffect(() => {
		console.log('LINE CODE effect');
		axios.post("/loc/getCustomLineCode").then(res => setLineCode(res.data));
		// .then(res => console.log(JSON.stringify(res.data)));
		return () => {
			console.log('LINE CODE cleanup');
		};
	}, []);

	const [selectData,setSelectData] = useState([]);
	// useEffect(() => {
	// 	console.log('BL LIST effect');
	// 	axios.post("/loc/getMyBlList",{ carrierCode:carrierCode, fromDate:'20200101', toDate:'20200313', }).then(res => setSelectData(res.data));
		
	// 	return () => {
	// 		console.log(' BL LIST cleanup');
	// 	};
	// }, []);


	const [carrierCode,setCarrierCode] = useState("");
	const [anchorE, setAnchorE] = useState(null);
	const [anchorU, setAnchorU] = useState(null);
	const [openJoin,setOpenJoin] = useState(false);
  
	const handleOpenJoin = () => {
		setOpenJoin(true);
	};
  
	const handleJoinClose = () => {
		setOpenJoin(false);
	};
  
	const handleClose = () => {
		setAnchorE(null);
		setAnchorU(null);
	};
  
	const carrier_open = Boolean(anchorE);
	const upload_open = Boolean(anchorU);
	const carrier = carrier_open ? 'simple-popover1':undefined;
	const upload = upload_open ? 'simple-popover2':undefined;
  
	const onCarrierChange = (e,data) => {
		if(data) {setCarrierCode(data.LINE_CODE);} else {setCarrierCode("");}
	}

	

	const onSubmit = () => {
		//search
		// if( '' == carrierCode ) {
		// 	alert( "선사코드를 지정해주시기 바랍니다." );
		// 	return false;
		// }
		// console.log( "fromDate" + fromDate.format("yyyyMMdd"));
		let fromYMD = fromDate.getFullYear()+leftPad((fromDate.getMonth()+1), 2, "0")+leftPad((fromDate.getDate()), 2, "0");
		let toYMD = toDate.getFullYear()+leftPad((toDate.getMonth()+1), 2, "0")+leftPad((toDate.getDate()), 2, "0");
		if( fromYMD > toYMD ) {
			alert( "종료일자가 시작 일자보다 빠릅니다. 다시 확인하세요." );
			return false;
		}

		axios.post("/loc/getMyBlList",{ carrierCode:carrierCode, fromDate:fromYMD, toDate:toYMD,})
		.then(res => setSelectData(res));
	}

	return (	
		<div>
			<Card style={{marginBottom:'1px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>BL No List.</h4>
				</CardHeader>
				<CardBody style={{padding:'2px'}}>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
							<CalendarBox
							labelText ="Reg_Date From"
							id="fromDate"
							format="yyyy-MM-dd"
							setValue={fromDate}
							onChangeValue={date => setFromDate(date)}
							formControlProps={{fullWidth: true}} 
							/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
							<CalendarBox
							labelText =" Reg_Date To"
								id="toDate"
								format="yyyy-MM-dd"
								setValue={toDate}
								onChangeValue={date => setToDate(date)}
							formControlProps={{fullWidth: true}}
							/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<Autocomplete
									options = {lineCode}
									getOptionLabel = { option => option.LINE_NAME }
									id="carrierCode"
									onChange={onCarrierChange}
									renderInput={params => (
										<TextField {...params} label="선사" fullWidth />
									)}
								/>
							</Grid>
							<Grid item  xs={12} sm={12} md={3}>
								<SearchButton color="info" fullWidth onClick={onSubmit}>Search</SearchButton>
							</Grid>
						</Grid>
					</GridItem>
					<GridItem style={{textAlignLast:'right'}}>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="info"
								size="sm"
								style={{lineHeight:"1",}}
								startIcon={<BackupIcon/>}
								onClick={e=>setAnchorU(e.currentTarget)}
								>Excel Upload
							</Button>&nbsp;&nbsp;
							<Button
								variant="contained"
								color="info"
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
						</Grid>
					</GridItem>
				</CardBody>
			</Card>
			<Modal
				open={openJoin}
				onClose={handleJoinClose}
				>
				<JoinPage mode="0" page="/svc/tracking" reTurnText="Login" />
			</Modal>
			<Grid item xs={12}>
				{/* <Table
				tableHeaderColor="info"
				tableHead={["No", "BL No.", "Carrier", "Register Time"]}
				tableData={selectData}

				/> */}
				<MaterialTable
					title="BL Uplaod"
					columns={
						[{ title: 'No', field: 'num', editable:'never' }
						,{ title: 'LINE', field: 'carrier_code', editable:'never' }		   
						,{ title: 'BL No.', field: 'bl_bkg' }
						,{ title: 'Date', field: 'insert_date', editable:'never' }]
					}
					data={selectData.data}
					editable={{
						// onRowAdd: newData =>
						// 	new Promise(resolve => {
						// 		setTimeout(() => {
						// 			resolve();
						// 			setSelectData(prevState => {
						// 				const data = [...prevState.data];
						// 				data.push(newData);
						// 				return { ...prevState, data };
						// 			});
						// 		}, 600);
						// }),
						onRowUpdate: (newData, oldData) =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										axios.post("/loc/getPkMyBlList",{newData:newData}).then(res => {
											// 수정 처리.
											if ( res.data == '' ) {
												setSelectData(prevState => {
													axios.post("/loc/updateMyBlNo",{ oldData:oldData, newData:newData});
													const data = [...prevState.data];
													data[data.indexOf(oldData)] = newData;
													return { ...prevState, data };
												});
											} else {
												console.log("event 1");
												alert("["+newData.bl_bkg+"] 해당 BL 값은 이미 존재합니다. 변경이 불가합니다.");
												// data[data.indexOf(newData)] = oldData;
												// return { ...prevState, data };
											}
										});
										console.log("event 10");
									}
								}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									setSelectData(prevState => {
										const data = [...prevState.data];
										data.splice(data.indexOf(oldData), 1);
										// 삭제 처리.
										axios.post("/loc/deleteMyBlNo",{ oldData:oldData})
										return { ...prevState, data };
									});
								}, 600);
						}),
					}}
				/>
			</Grid>
		</div>   
  );
}
