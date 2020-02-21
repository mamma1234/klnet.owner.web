import React from "react";
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

class SearchToBkg extends React.Component {
  constructor() {
    super();
    this.state = {
      carrierData: [],
      bkgData: [],
      shipperCode: "",
      bkgNo: "",
      actualGubun: ""
    };
  }

  handleOnChange = (e) => {
    const carrierCode = this.state.carrierCode; 
    const shipperCode = this.state.shipperCode;
    const bkgNo = this.state.bkgNo;
    const actualGubun = this.state.actualGubun;

    alert("선택한 값들: (선사:"+carrierCode+"/화주코드:"+shipperCode+"/부킹번호:"+bkgNo+"/Actual구분:"+actualGubun + " 데이터 조회 시작");

    this.bkgSearch(bkgNo);
  }

  carrierToSearch = () => {
    return fetch('/loc/carrier')
      .then(res => res.json())
      .then(carrierData => this.setState({carrierData}));
  }

  bkgSearch = (vVal) => {
    //return fetch('/api/exportDemDetBkg?bkgNo='+vVal)
    return fetch('/loc/exportDemDet')
      .then(res => res.json())
      .then(bkgData => this.setState({bkgData}));
  }

  onCarrierCodeSearch = (event,values) => {
    const carrierCode = event.target.value;
    if(carrierCode.length > 0) {this.carrierCodeToSearch(carrierCode);}    
  }

  carrierCodeToSearch = (vVal) => {
    return fetch('/loc/carrier2?carrierName='+vVal)
      .then(res => res.json())
      .then(carrierData => this.setState({carrierData}));
  }

  onCarrierCodeChange = (e, values) => {
    this.setState({carrierCode: values.carrier_code})
  }

  onValueChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  componentDidMount() {
    this.carrierToSearch();
  }

  render() {
    const { carrierData, bkgData } = this.state;
    const classes = makeStyles(styles);

    return(
      <form>
        <Card>
          <CardContent className = {classes.card}>
            <GridContainer>
              <GridItem xs={12} sm={2}>
                <Autocomplete
                  options = {carrierData}
                  getOptionLabel = { option => "["+option.carrier_code+"] "+option.carrier_hname}
                  id="carrierCode"
                  onKeyUp={this.onCarrierCodeSearch}
                  onChange={this.onCarrierCodeChange}
                  renderInput={params => (
                    <TextField {...params} label="선사" fullWidth />
                  )}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Shipper Code"
                  id="shipperCode"
                  inputProps={{onBlur:this.onValueChange('shipperCode')}}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Bkg No"
                  id="bkgNo"
                  inputProps={{onBlur:this.onValueChange('bkgNo')}}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Actual/Dummy"
                  id="actualGubun"
                  inputProps={{onBlur:this.onValueChange('actualGubun')}}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
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
              <GridItem xm={12} sm={12} md={12}>
                <CustomTable
                  tableHeaderColor = "primary"
                  tableHead = {["Shipper Code", "Line", "Bkg No", "Actual/Dummy", "Expire Date"]}
                  tableData = { bkgData }
                />
              </GridItem>
            </GridContainer>
          </CardContent>
        </Card>
      </form>
    );

  }

}

export default function BkgList() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Export DEM/DET</h4>
            <p className={classes.cardCategoryWhite}>Demurrage & Detention</p>
          </CardHeader>
          <CardBody>
            <SearchToBkg />
          </CardBody>
        </Card>
      </GridItem>    
    </GridContainer>
 );
}