import React,{useState} from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";


import GridContainer from "components/Grid/GridContainer.js";
import TableList from "components/Table/TableSmallLine.js";
import GridItem from "components/Grid/GridItem.js";
import Popover from  '@material-ui/core/Popover';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Card from "components/Card/Card.js";
import Access from "@material-ui/icons/AccessAlarm";
import Assign from "@material-ui/icons/AssignmentTurnedIn";

import Icon from '@material-ui/core/Icon';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";

import CntrListTable from "views/Tracking/TrackingCntrList.js";
import Slider from "components/Slide/Slider.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);


export default function ToggleTable(props) {


  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;

  const handleAddFunction = () => {
    props.onClickHandle();
  }

  console.log(tableData);

  
  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px',textAlignLast:'center'}}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    style={{borderBottomWidth:'3px'}}
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
           {tableData.map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
                  );
                })}
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter >
        	<TableRow  >
        	<TableCell style={{textAlignLast:'center'}} colSpan={tableHead.length}><Button
				    color="info"
					onClick={handleAddFunction}
				>더보기</Button></TableCell>
        	</TableRow>
        </TableFooter>: null )}
      </Table>
    </div>
  );
}

ToggleTable.defaultProps = {
  tableHeaderColor: "gray"
};

ToggleTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};


 class TableRows extends React.Component {
  state = { openPopup:false,expanded: false , port: [], iconstate:"add_circle", rowStyle:"borderTopStyle:'dashed'"};

  componentDidMount() {
	    this.scheduleToSearch();
	  }
  
  // 테이블 조회
  scheduleToSearch = () => {

/*    return axios ({
		url:'/loc/getScheduleDetailList',
		method:'POST',
		data: {carrierCode : this.props.data.LINE_CODE,
			   startPort : this.props.data.START_PORT,
			   endPort : this.props.data.END_PORT,
			   voyage : this.props.data.VOYAGE_NO,
			   vesselName : this.props.data.VESSEL_NAME
			   }
	}).then(response => this.setState({port:response.data }));*/
    
  }
 
  // 로우 생성
  toggleExpander = () => {
    if (!this.state.expanded) {
      this.setState({ expanded: true ,iconstate:"remove_circle",rowStyle:"borderTopStyle:'dashed'"}, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false , iconstate:"add_circle" });
        }
      });
    }

  };
  
  handleClickOpen = () => {
	  this.setState({ openPopup: true });
  }
  
  handleClickClose = () => {
	  this.setState({ openPopup: false });
  }
  
  
  render() {
     const { data } = this.props;
     const { port } = this.state;
     let point =0;
     
     port.map((data, index) => {
     if (data[3] == "Y") {
    	 point = index;
     	}
     	});

    return [
      <TableRow  key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
        <TableCell style={{padding:'0px',textAlignLast:'center',borderBottomWidth:'3px'}} >{data.bl_bkg}{data.ord == 0?<StarIcon style={{color:'#00acc1'}} />:<StarBorderIcon style={{color:'#00acc1'}} />}</TableCell>
        <TableCell style={{padding:'0px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.ie_type}</TableCell>
        <TableCell style={{padding:'0px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.carrier_code !="" && data.carrier_code != "SNK" && data.carrier_code.length ==3?<img src={require("images/carrier/"+data.carrier_code+".gif")} />:data.carrier_code}</TableCell>
        <TableCell style={{padding:'0px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.vsl_name}<br/>{data.voyage?"("+data.voyage+")":""}</TableCell>
        <TableCell style={{padding:'0px',textAlignLast:'center',borderBottomWidth:'3px'}} onClick={this.handleClickOpen}>{data.status}
		</TableCell>
		<Popover
      	id="popover"
      	open={this.state.openPopup}
      	onClose={this.handleClickClose}
		anchorReference="anchorPosition"
		anchorPosition={{top:80,left:550}}
      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
      	transformOrigin={{vertical:'top',horizontal:'center',}}
        > <CntrListTable blNo={data.bl_bkg} carrierCode={data.carrier_code}/>
	</Popover>
        <TableCell style={{padding:'5px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.pol}<br/>{data.pol_atd}{data.pol_atd?"("+data.pol_dday+")":""}</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.pod}<br/>{data.pod_etd}{data.pod_etd?Math.sign(data.pod_dday)==1?"("+data.pod_dday+")":"("+data.pod_dday+")":""}</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center',borderBottomWidth:'3px'}}><Slider /></TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center',borderBottomWidth:'3px'}}><Icon style={{color:'#00acc1'}} onClick={this.toggleExpander}>{this.state.iconstate}</Icon></TableCell>
      </TableRow>,
      this.state.expanded && (
        <TableRow key = {this.props.index+1} style={{marginTop:'5px',marginBottom:'5px',borderTopStyle:'double',borderTopColor:'whitesmoke'}}>
          <TableCell colSpan={8} style={{padding:'10px'}}>
            <div ref="expanderBody">
	          	<GridItem xs={12}>
		          	<GridContainer>
		          		<GridItem xs={12} sm={12} md={6}>
		          		<div><Access style={{color:'#00acc1'}} />DEM / DET Service</div>
			          		<Card style={{marginTop:'5px',marginBottom:'5px'}}>
			          		
					          	<TableList
					                tableHeaderColor={this.props.color}
					                tableHead={["ACT", "DEM", "DET"]}
										tableData={[
							            ["DEPATURE 2020-01-29", "2020-01-29", "2020-01-29"],
							            ["LOGING 2020-01-29", "2020-01-29", "2020-01-29"]
							          ]}
					          	/>
				          	</Card>
			          	</GridItem>
			          	<GridItem xs={12} sm={12} md={6}>
			          		<div><Assign style={{color:'#00acc1'}} />CUSTOM</div>
				          	<Card style={{marginTop:'5px',marginBottom:'5px'}}>
					          	<TableList
					                tableHeaderColor={this.props.color}
					                tableHead={["EXPORT LICENSE", "INSPECT", "CLEARLANCE"]}
										tableData={[
							            ["Y", "N", "반입신고(2020-01-29 00:00)"],
							            ["N", "N", ""]
							          ]}
					          	/>
				          	</Card>			          
			          	</GridItem>
			          	</GridContainer>
			          </GridItem>
            </div>
          </TableCell>
        </TableRow>    
      )
    ];
  }
}
