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


import BackupIcon from "@material-ui/icons/Backup";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import AddIcon from "@material-ui/icons/AddBox";
import DetailTable from "views/DemDet/DetailTable.js";

import axios from 'axios';

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



export default function DemDetList() {
  
  const [anchorCancel, setAnchorCancel] = useState(null);
  const [anchorExcel, setAnchorExcel] = useState(null);
  const [anchorAdd, setAnchorAdd] = useState(null);
  

  const [lineData, setLineData] = useState([]);
  const [listData, setListData] = useState([
    {CHK:"",LINE_CODE:"CMA",CNTR_NO:"CMAU4328321",DET:"10,000 KRW",DEM:"20,000 KRW",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"화주입력",DO:"I"},
    {CHK:"",LINE_CODE:"MAE",CNTR_NO:"MSKU4378241",DET:"",DEM:"20,000 KRW",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"",DO:"I"},
    {CHK:"",LINE_CODE:"CMA",CNTR_NO:"CMAU4238321",DET:"20,000 KRW",DEM:"150,000 KRW",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"화주요청",DO:"I"},
    {CHK:"",LINE_CODE:"APL",CNTR_NO:"APLU1234560",DET:"40,000 KRW",DEM:"34,000 KRW",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"1/27 반납예정",DO:"I"},
    {CHK:"",LINE_CODE:"KMD",CNTR_NO:"KMDU4328321",DET:"",DEM:"10,000 KRW",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"재수출",DO:"I"},
    {CHK:"",LINE_CODE:"KMD",CNTR_NO:"TEST1234560",DET:"",DEM:"50,000 KRW",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"정산완료",DO:"I"},
    {CHK:"",LINE_CODE:"YML",CNTR_NO:"TEST1234560",DET:"",DEM:"",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"",DO:"I"},
    {CHK:"",LINE_CODE:"ZIM",CNTR_NO:"TEST1234560",DET:"25,000 KRW",DEM:"20,000 KRW",COMBINE:"30,000 KRW",STORAGE:"5,000 KRW",REMARK:"",DO:"I"},
  ]
  );


  console.log(listData);

  const [mblNo,setMblNo] = useState("");
  const [cntrNo,setCntrNo] = useState("");

  
  
  const excelHandleClose = () => {
    setAnchorExcel(null);
  }
  
  const open_bl = Boolean(anchorExcel);
  const id_bl = open_bl ? 'simple-popover1':undefined;

  const classes = useStyles();  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>DEM/DET/STORAGE</h4>
            <p className={classes.cardCategoryWhite}>Demurrage & Detention</p>
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
                <MButton
                  variant="contained"
                  //color="primary"
                  size="small"
                  style={{lineHeight:"1",}}
                  startIcon={<CancelIcon/>}
                  onClick={e=>setAnchorCancel(e.currentTarget)}
                >초기화
                </MButton>
                &nbsp;&nbsp;
                <MButton
                  variant="contained"
                  //color="primary"
                  size="small"
                  style={{lineHeight:"1",}}
                  startIcon={<BackupIcon/>}
                  onClick={e=>setAnchorExcel(e.currentTarget)}
                >엑셀 업로드
                </MButton>
                  <Popover
                    id={id_bl}
                    open={open_bl}
                    anchorEl={anchorExcel}
                    onClose={excelHandleClose}
                    anchorOrigin={{vertical:'bottom',horizontal:'center',}}
                    transformOrigin={{vertical:'top',horizontal:'center',}}
                  ><ExcelUpload/>
                  </Popover>
                  &nbsp;&nbsp;
                  <MButton
                  variant="contained"
                  //color="primary"
                  size="small"
                  style={{lineHeight:"1",}}
                  startIcon={<AddIcon/>}
                  onClick={e=>setAnchorAdd(e.currentTarget)}
                >추가
                </MButton>
              </GridItem>
            </GridContainer>
          
            
          
          
          <CardContent className = {classes.card}>
            
            <GridContainer>
              <GridItem xm={12} sm={12} md={12} style={{textAlignLast:'right'}}>
                <MButton
                  variant="contained"
                  //color="primary"
                  size="small"
                  style={{lineHeight:"1",}}
                  startIcon={<BackupIcon/>}
                  onClick={e=>setAnchorExcel(e.currentTarget)}
                >저장
                </MButton>
                &nbsp;&nbsp;
                <MButton
                  variant="contained"
                  //color="primary"
                  size="small"
                  style={{lineHeight:"1",}}
                  startIcon={<BackupIcon/>}
                  onClick={e=>setAnchorExcel(e.currentTarget)}
                >삭제
                </MButton>
                &nbsp;&nbsp;
                <MButton
                  variant="contained"
                  //color="primary"
                  size="small"
                  style={{lineHeight:"1",}}
                  startIcon={<BackupIcon/>}
                  onClick={e=>setAnchorExcel(e.currentTarget)}
                >엑셀 다운로드
                </MButton>
                &nbsp;&nbsp;
                <MButton
                  variant="contained"
                  //color="primary"
                  size="small"
                  style={{lineHeight:"1",}}
                  startIcon={<BackupIcon/>}
                  onClick={e=>setAnchorExcel(e.currentTarget)}
                >상세보기
                </MButton>
              </GridItem>
              <GridItem xm={12} sm={12} md={12}>
                <DetailTable 
                  tableHeaderColor = "primary"
                  tableHead = {["선택","선사", "CNTR NO", "DETENTION", "DEMURRAGE", "COMBINED","STORAGE","REMARKS","DO신청"]}
                  tableData = { listData }
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