import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";

import SnkTable from "views/WebScrap/SnkTable.js";
import KmdTable from "views/WebScrap/KmdTable.js";
import YmlTable from "views/WebScrap/YmlTable.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import { stringify } from "querystring";
import {DatePicker} from '@material-ui/pickers';

import Moment from 'moment'
const styles = {
    textCenter: {
        textAlign: "center"
    }
};

const useStyles = makeStyles( styles );

class WebScrapList extends React.Component {
    constructor() {
        super();
        this.state = {
            snk_master_data: [],
            snk_detail_data: [],
            kmd_master_data: [],
            yml_master_data: [],
            bl_no: "",
            search_date: ""
        };
    }


    handleOnChange = (e) => {
        const bl_no = this.state.bl_no;
        const search_date = this.state.search_date;
        this.searchSnkWebScrap(bl_no, search_date);
        this.searchKmdWebScrap(bl_no, search_date);
        this.searchYmlWebScrap(bl_no, search_date);
    }
    searchSnkWebScrap = (bl_no, search_date) => {
        return fetch("/loc/snkMasterList"
        ,{method:'POST', body: JSON.stringify({
            bl_no : bl_no
           ,search_date : search_date
        }
        )
        ,headers: {"Content-Type":"application/json"}})
        .then(res => res.json())
        .then(snk_master_data => this.setState({snk_master_data}));
    }
    searchKmdWebScrap = (bl_no, search_date) => {
        return fetch("/loc/kmdMasterList"
        ,{method:'POST', body: JSON.stringify({
            bl_no : bl_no
           ,search_date : search_date
        }
        )
        ,headers: {"Content-Type":"application/json"}})
        .then(res => res.json())
        .then(kmd_master_data => this.setState({kmd_master_data}));
    }
    searchYmlWebScrap = (bl_no, search_date) => {
        return fetch("/loc/ymlMasterList"
        ,{method:'POST', body: JSON.stringify({
            bl_no : bl_no
           ,search_date : search_date
        }
        )
        ,headers: {"Content-Type":"application/json"}})
        .then(res => res.json())
        .then(yml_master_data => this.setState({yml_master_data}));
    }

    onValueChange = name => event => {
        console.log( "---------------------",name, event.target);
        
        this.setState({
            [name]: event.target.value,
        });
    }

    componentDidMount() {
        this.changeDate(new Date())
    }

    changeDate = date => {
        console.log( Moment(date).format('YYYYMMDD'));
         this.setState( { search_date : Moment(date).format('YYYYMMDD') })
    }

    render() {
        const { snk_master_data } = this.state;
        const { kmd_master_data } = this.state;
        const { yml_master_data } = this.state;
        const classes = makeStyles( styles );
        return (
            <form>
                <Card>
                    <CardContent className={classes.card}>
                        <GridContainer>
                            <GridItem xs={12} sm={3}>
                                <CalendarBox
                                    labelText ="스크랩일"
                                    id="search_date"
                                    format="yyyy-MM-dd"
                                    // selectedDate = {new Date()}
                                    // setSelectedDate = {new Date()}
                                    // value= {}
                                    // inputProps={{onBlur:this.onValueChange('search_date')}}
                                    inputProps={this.changeDate}
                                    // onChange={this.changeDate}
                                    formControlProps={{
                                                    fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="B/L NO"
                                    id="bl_no"
                                    inputProps={{onBlur:this.onValueChange('bl_no')}}
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
                    <CustomTabs headerColor="primary"
                        tabs={[
                        {
                            tabName: "SNK"
                            ,tabIcon: Face
                            ,tabContent: (
                                <SnkTable
                                    tableHeaderColor="primary"
                                    tableHead={["SEQ", "LINE", "B/L NO", "CNTR NO", "SIZE/TYPE", "COC/SOC", "RECIPIENT", "DEPARTURE", "ETD", "ARRIVAL", "ETA", "DELIVERY", "VESSEL", "VOY NO"]}
                                    tableData={snk_master_data}
                                />
                            )
                        }
                        ,{
                            tabName: "KMD"
                            ,tabIcon: Face
                            ,tabContent: (
                                <KmdTable
                                    tableHeaderColor="primary"
                                    tableHead={["SEQ", "LINE", "B/L NO", "BOOKING NO", "CNTR NO", "CNTR TRACE"]}
                                    tableData={kmd_master_data}
                                />
                            )
                        }
                        ,{
                            tabName: "YML"
                            ,tabIcon: Face
                            ,tabContent: (
                                <YmlTable
                                    tableHeaderColor="primary"
                                    tableHead={["SEQ", "LINE", "B/L NO", "CNTR NO", "RECIPIENT", "LOADING", "DISCHARGE", "DELIVERY", "VESSEL", "VOYAGE NO", "NO OF PKG", "ON BOARD DATE", "GROSS CARGO WEIGHT", "NO OF CNTR", "MEASUREMENT", "CNTR SIZE", "CNTR_TYPE", "SEAL NO", "MOVE TYPE", "DATE TIME", "LATEST EVENT", "PLACE"]}
                                    tableData={yml_master_data}
                                />
                            )
                        }]}>

                    </CustomTabs>
                </Card>
            </form>
        )
    }
}

export default function WebScrap() {

    const classes = useStyles();

    return (
        <GridContainer>
        {/* <GridItem xs={12} sm={12} md={12}> */}
            <Card>
                <CardBody>
                    <WebScrapList />
                </CardBody>
            </Card>
        {/* </GridItem>     */}
        </GridContainer>
    );
}