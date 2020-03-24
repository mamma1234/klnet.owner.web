import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomTable from "views/DemDet/CustomTable.js";
import { CardContent, TextField } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import MButton from '@material-ui/core/Button';

import Popover from  '@material-ui/core/Popover';
import ExcelUpload from "views/DemDet/PopUp/ExcelUpload.js";

import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";
import BackupIcon from "@material-ui/icons/Backup";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import AddIcon from "@material-ui/icons/AddBox";
import DetailTable from "views/DemDet/DetailTable.js";

import axios from 'axios';
//import {ExcelFile, ExcelSheet} from "react-export-excel";
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
{/*class Download extends React.Component {
  
  render() {
    const { data, index } = this.props;
    return (
      <ExcelFile>
        <ExcelSheet dataSet={data} name="Oraganization"/>
      </ExcelFile>
    )
  }
}*/}


export default function DemDetList(props) {
  
  const [anchorCancel, setAnchorCancel] = useState(null);
  const [anchorExcel, setAnchorExcel] = useState(null);
  const [anchorAdd, setAnchorAdd] = useState(null);
  
  
  const [demDetList,setDemDetList] = useState([]);
  const [openJoin,setOpenJoin] = useState(false);

  const [lineData, setLineData] = useState([]);
  

  const [mblNo,setMblNo] = useState("");
  const [cntrNo,setCntrNo] = useState("");
  const [paramData, setParamData] = useState('');
  useEffect(() => {
    
    console.log(props.location.state);
    if (props.location.state != undefined) {
      setParamData(props.location.state.param);
    }
      
    return () => {
        console.log('cleanup');
      };
  },[]);

  const excelHandleClose = () => {
    setAnchorExcel(null);
  }
  const onSubmit = () => {
    setDemDetList([]);
	  //search
	  axios.post("/loc/getDemDetList") 
      
	    .then(res => setDemDetList(res.data))
	    .catch(err => {
	       //console.log(err.response.status);
	        if(err.response.status == "403") {
	        	setOpenJoin(true);
	        }
	        //window.location.href = "/Landing";
	    });
    //alert("Tracking Info Search onSubmit");
    console.log(">>> demDetList : ",demDetList) ;
  }
  //console.log(paramData);
  
  const classes = useStyles();  
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          {/* <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>DEM/DET/STORAGE</h4>
            <p className={classes.cardCategoryWhite}>Demurrage & Detention</p>
          </CardHeader> */}
          <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		<CardIcon color="info" style={{height:'26px'}}>
			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		</CardIcon>
		<h4 className={classes.cardTitleBlack}>DEM/DET/STORAGE</h4>
	  </CardHeader>
          <CardBody>
          
            <GridContainer>
              <GridItem xs={1} sm={1}>
                <Autocomplete
                  options = {lineData}
                  getOptionLabel = { option => "["+option.carrier_code+"] "+option.carrier_hname}
                  id="lineCode"
                  /*
                  onKeyUp={this.onCarrierCodeSearch}
                  onChange={this.onCarrierCodeChange}
                  */
                  renderInput={params => (
                    <TextField {...params} label="선사" fullWidth />
                  )}
                />
              </GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <CustomInput
                  labelText="M-B/L NO"
                  id="mblNo"
                  inputProps={{onChange:event => setMblNo(event.target.value)}}
                  formControlProps={{fullWidth: true}}
                />
                
              </GridItem>
              <GridItem xs={2} sm={2} md={2}>
                <CustomInput
                  labelText="CNTR NO"
                  id="cntrNo"
                  inputProps={{onChange:event => setCntrNo(event.target.value)}}
                  formControlProps={{
                    fullWidth: true
                  }} 
                />
              </GridItem>
            
              <GridItem xs={7} sm={7} md={7} style={{textAlignLast:'right'}}>
                <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button>
                <Button color="info" onClick = {onSubmit} startIcon={<BackupIcon/>}>엑셀업로드</Button>
                <Button color="info" onClick = {onSubmit} startIcon={<AddIcon/>}>추가</Button>
              </GridItem>
              
            </GridContainer>
          
            
          
          
          <CardContent className = {classes.card}>
            
            <GridContainer>
              <GridItem xm={12} sm={12} md={12} style={{textAlignLast:'right'}}>
                <Button color="info" onClick = {onSubmit}  >조회</Button>
                <Button color="info" onClick = {onSubmit}  >저장</Button>
                <Button color="info" onClick = {onSubmit}  >삭제</Button>
                <Button color="info" //onClick = {Download} 
                id='btnExport' >엑셀다운로드</Button>
                <Button color="info" onClick = {onSubmit}  >상세보기</Button>
              </GridItem>
              
              <GridItem xm={12} sm={12} md={12}>
                <DetailTable 
                  tableHeaderColor = "info"
                  tableHead = {["선택","선사", "CNTR NO", "DETENTION", "DEMURRAGE", "COMBINED","STORAGE","REMARKS","DO신청"]}
                  tableData = { demDetList }
                />
                
              </GridItem>
            </GridContainer>
          </CardContent>
        
      
          </CardBody>
        </Card>
      </GridItem>    
    </GridContainer>
 );
}