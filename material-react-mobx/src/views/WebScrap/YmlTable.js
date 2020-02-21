import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { slideDown, slideUp } from "components/Slide/Slide.js";
import ExpandTable from "components/Table/Table.js";

import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const classess = makeStyles(theme => ({
    root: {
        padding: 0,
    },
}));

const useStyles = makeStyles(styles);

export default function ToggleTable(props) {
    const classes = useStyles();
    const { tableHead, tableData, tableHeaderColor } = props;
    return(
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                    <TableRow className={classes.tableHeadRow}>
                    {tableHead.map((prop, key) => {
                        return (
                        <TableCell
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
                            <TableRows key={key} index={key + 1} data={prop} />
                    );
                })}
                </TableBody>
            </Table>
        </div>
    )
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
    state = { expanded: false , port: []};

    // 테이블 조회
    // searchSnkWebScrap = () => {
    //     return fetch('/loc/vesselroute')
    //     .then(res => res.json())
    //     .then(port => this.setState({port}));
    // }

    
   
    // 로우 생성
    // toggleExpander = () => {
    //     if (!this.state.expanded) {
    //         this.setState({ expanded: true }, () => {
    //         if (this.refs.expanderBody) {
    //             slideDown(this.refs.expanderBody);
    //             this.scheduleToSearch();
    //         }
    //         });
    //     } else {
    //         slideUp(this.refs.expanderBody, {
    //             onComplete: () => {
    //                 this.setState({ expanded: false });
    //             }
    //         });
    //     }
    // };
  
  
    render() {
        const { data } = this.props;
        const { port } = this.state;
        let obj = [];
        port.map((port,index) => (
        obj[index] = [port.route_date,port.route_code,port.tt+" Day"]

        ))
        return [
            <TableRow  key={this.props.index}>
                <TableCell >{data.web_seq}</TableCell>
                <TableCell >{data.line_code}</TableCell>
                <TableCell >{data.bl_no}</TableCell>
                <TableCell >{data.cntr_no}</TableCell>
                <TableCell >{data.recipient}</TableCell>
                <TableCell >{data.loading}</TableCell>
                <TableCell >{data.discharge}</TableCell>
                <TableCell >{data.delivery}</TableCell>
                <TableCell >{data.vessel}</TableCell>
                <TableCell >{data.voyage_no}</TableCell>
                <TableCell >{data.no_of_packages}</TableCell>
                <TableCell >{data.on_board_date}</TableCell>
                <TableCell >{data.gross_cargo_weight}</TableCell>
                <TableCell >{data.no_of_containers}</TableCell>
                <TableCell >{data.measurement}</TableCell>
                <TableCell >{data.service_requirement}</TableCell>
                <TableCell >{data.cntr_size}</TableCell>
                <TableCell >{data.cntr_type}</TableCell>
                <TableCell >{data.seal_no}</TableCell>
                <TableCell >{data.move_type}</TableCell>
                <TableCell >{data.date_time}</TableCell>
                <TableCell >{data.latest_event}</TableCell>
                <TableCell >{data.place}</TableCell>
                <TableCell >{data.vgm}</TableCell>
            </TableRow>,
            this.state.expanded && (
                <TableRow key = {this.props.index+1}>
                    <TableCell><img src={require('../../images/carrier/'+data.line_code+'.gif')} /></TableCell>
                    <TableCell colSpan={2}>
                    <div ref="expanderBody"> 
                        <ExpandTable
                        tableHeaderColor="primary"
                        tableHead={["Day", "도착항", "T/T"]}
                        tableData={obj}
                        />
                    </div>
                    </TableCell>
                </TableRow>
            )
        ];
    }
}
  