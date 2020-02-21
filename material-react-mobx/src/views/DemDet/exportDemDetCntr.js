import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomTable from "views/DemDet/CustomTableCntr.js";
import { CardContent, MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
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

class SearchToCntr extends React.Component {

  constructor() {
    super();
    this.state = {
      cntrData: [],
      bkgNo: "",
      cntrNo: "",
      emptyOutYn: "",
      fullInYn: "",
      expCoarriYn: ""
    };
  }
  
  handleOnChange = (e) => {
    const bkgNo = this.state.bkgNo; 
    const cntrNo = this.state.cntrNo;
    const emptyOutYn = this.state.emptyOutYn;
    const fullInYn = this.state.fullInYn;
    const expCoarriYn = this.state.expCoarriYn;

    alert("선택한 값들: (부킹번호:"+bkgNo+"/컨테이번호:"+cntrNo+"/엠티반출여부:"+emptyOutYn+"/풀반입여부:"+fullInYn +"/선적여부:"+expCoarriYn + " 데이터 조회 시작");

    this.cntrSearch();
  }

  cntrSearch = () => {
    return fetch('/loc/exportDemDetCntr')
      .then(res => res.json())
      .then(cntrData => this.setState({cntrData}));
  }

  onValueChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  componentDidMount() {

  }

  render() {
    const { cntrData } = this.state;
    const classes = makeStyles(styles);

    return(
      <form>
        <Card>
          <CardContent className = {classes.card}>
            <GridContainer>
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
                  labelText="Container No"
                  id="cntrNo"
                  inputProps={{onBlur:this.onValueChange('cntrNo')}}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="emptyOutYnLabel">Empty반출여부</InputLabel>
                  <Select
                    labelId="emptyOutYnLabel"
                    id="emptyOutYnSelect"
                    onChange={this.onValueChange('emptyOutYn')} >
                    <MenuItem value="ALL">ALL</MenuItem>
                    <MenuItem value="Y">Y</MenuItem>
                    <MenuItem value="N">N</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="fullInYnLabel">Full반입여부</InputLabel>
                  <Select
                    labelId="fullInYnLabel"
                    id="fullInYnSelect"
                    onChange={this.onValueChange('fullInYn')} >
                    <MenuItem value="ALL">ALL</MenuItem>
                    <MenuItem value="Y">Y</MenuItem>
                    <MenuItem value="N">N</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="exportCoarriYnLabel">Empty반출여부</InputLabel>
                  <Select
                    labelId="exportCoarriYnLabel"
                    id="exportCoarriYnSelect"
                    onChange={this.onValueChange('expCoarriYn')} >
                    <MenuItem value="ALL">ALL</MenuItem>
                    <MenuItem value="Y">Y</MenuItem>
                    <MenuItem value="N">N</MenuItem>
                  </Select>
                </FormControl>
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
                  tableHead = {["No", "Shipper Code", "Line", "Bkg No", "Cntr No", "Empty 반출", "Empty 반출일시", "Emtpy 반출터미널", "Full 반입", "Full 반입일시", "Full 반입터미널", "적하", "적하일시", "적하터미널"]}
                  tableData = { cntrData }
                  tableHeaderColor = "primary"
                />
              </GridItem>
            </GridContainer>
          </CardContent>
        </Card>
      </form>
    );

  }

}

export default function CntrList() {
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
            <SearchToCntr />
          </CardBody>
        </Card>
      </GridItem>    
    </GridContainer>
 );
}