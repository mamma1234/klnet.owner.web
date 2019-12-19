import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function SimpleTable(props) {
    const classes = useStyles();
    const { tableHead, tableBody, tableData, tableHeaderColor } = props;

    return(
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        align='center'
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key}>
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map(row => (
                        <TableRow key={row.rownum}>
                            <TableCell align='center'>{row.rownum}</TableCell>
                            <TableCell align='center'>{row.shipper_code}</TableCell>
                            <TableCell align='center'>{row.line_code}</TableCell>
                            <TableCell align='center'>{row.bkg_no}</TableCell>
                            <TableCell align='center'>{row.cntr_no}</TableCell>
                            <TableCell align='center'>{row.de_mt_yn}</TableCell>
                            <TableCell align='center'>{row.de_mt_in_out_time}</TableCell>
                            <TableCell align='center'>{row.de_mt_terminal}</TableCell>
                            <TableCell align='center'>{row.de_yn}</TableCell>
                            <TableCell align='center'>{row.de_in_out_time}</TableCell>
                            <TableCell align='center'>{row.de_terminal}</TableCell>
                            <TableCell align='center'>{row.ar_yn}</TableCell>
                            <TableCell align='center'>{row.ar_in_out_time}</TableCell>
                            <TableCell align='center'>{row.ar_terminal}</TableCell>
                        </TableRow>
                    ))}
                    {/* {tableData.map((prop, key) => {
                        <TableRow key={}>
                            <makeTableCell />
                        </TableRow>
                    })} */}
                </TableBody>
            </Table>
        </div>
    );
}

SimpleTable.defaultProps = {
    tableHeaderColor: "gray"
};

SimpleTable.propTypes = {
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
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};