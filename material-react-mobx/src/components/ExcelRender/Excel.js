import React, { Component } from "react"; 
import { Popconfirm, Row, Col, Icon, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "components/ExcelRender/editable.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import TablePaging from "components/Table/TablePaging.js";

export default class ExcelPage extends Component {
  constructor(props) { 
    super(props); 
    this.state = { 
      cols: [], 
      rows: [], 
      errorMessage: null, 
      columns: [ 
        { 
          title: "NAME", 
          dataIndex: "name", 
          editable: true 
        }, 
        { 
          title: "AGE", 
          dataIndex: "age", 
          editable: true 
        }, 
        { 
          title: "GENDER", 
          dataIndex: "gender", 
          editable: true 
        }, 
        { 
          title: "Action", 
          dataIndex: "action", 
          render: (text, record) => 
            this.state.rows.length >= 1 ? ( 
              <Popconfirm 
                title="Sure to delete?" 
                onConfirm={() => this.handleDelete(record.key)} 
              > 
                <Icon 
                  type="delete" 
                  theme="filled" 
                  style={{ color: "red", fontSize: "20px" }} 
                /> 
              </Popconfirm> 
            ) : null 
        } 
      ] 
    }; 
  } 

  handleSave = row => { 
    const newData = [...this.state.rows]; 
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index]; 
    newData.splice(index, 1, { 
      ...item, 
      ...row 
    }); 
    this.setState({ rows: newData }); 
  }; 

  checkFile(file) { 
    let errorMessage = ""; 
    if (!file || !file[0]) { 
      return; 
    } 
    const isExcel = 
      file[0].type === "application/vnd.ms-excel" || 
      file[0].type === 
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; 
    if (!isExcel) { 
      errorMessage = "You can only upload Excel file!";
    } 
    console.log("file", file[0].type); 
    const isLt2M = file[0].size / 1024 / 1024 < 2; 
    if (!isLt2M) { 
      errorMessage = "File must be smaller than 2MB!";
    } 
    console.log("errorMessage", errorMessage); 
    return errorMessage; 
  } 

  fileHandler = fileList => { 
    console.log("fileList", fileList); 
    let fileObj = fileList; 
    if (!fileObj) { 
      this.setState({ 
        errorMessage: "No file uploaded!" 
      }); 
      return false; 
    } 
    console.log("fileObj.type:", fileObj.type); 
    if ( 
      !( 
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type === 
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
      ) 
    ) { 
      this.setState({ 
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      }); 
      return false; 
    } 
    //just pass the fileObj as parameter 
    ExcelRenderer(fileObj, (err, resp) => { 
      if (err) { 
        console.log(err); 
      } else { 
        let newRows = []; 
        resp.rows.slice(1).map((row, index) => { 
          if (row && row !== "undefined") { 
            newRows.push([row[0],row[1],row[2]]); 
          } 
        }); 

        if (newRows.length === 0) { 
          this.setState({ 
            errorMessage: "No data found in file!" 
          }); 
          return false; 
        } else { 
          this.setState({ 
            cols: resp.cols, 
            rows: newRows, 
            errorMessage: null 
          }); 
        } 
      } 
    }); 
    return false; 
  }; 

  handleSubmit = async () => { 
    console.log("submitting: ", this.state.rows); 
    //submit to API 
    //if successful, banigate and clear the data 
    //this.setState({ rows: [] }) 
  }; 

  handleDelete = key => { 
    const rows = [...this.state.rows]; 
    this.setState({ rows: rows.filter(item => item.key !== key) });
  }; 
  /*handleAdd = () => { 
    const { count, rows } = this.state; 
    const newData = { 
      key: count, 
      name: "User's name", 
      age: "22", 
      gender: "Female" 
    }; 
    this.setState({ 
      rows: [newData, ...rows], 
      count: count + 1 
    }); 
  }; */

  render() { 
    const components = { 
      body: { 
        row: EditableFormRow, 
        cell: EditableCell 
      } 
    }; 
    const columns = this.state.columns.map(col => { 
      if (!col.editable) { 
        return col; 
      } 
      return { 
        ...col, 
        onCell: record => ({ 
          record, 
          editable: col.editable, 
          dataIndex: col.dataIndex, 
          title: col.title, 
          handleSave: this.handleSave 
        }) 
      }; 
    }); 
    return ( 
    		<div>
    	   		<CardHeader color="primary">
    	   			<h4 >Importing Excel Component</h4>
    	        </CardHeader>
    	        <CardBody>
    	        	<GridContainer>
    	          		<GridItem xs={12} sm={12} md={7}>
    	          			<Upload 
    	          				name="file" 
    	          				beforeUpload={this.fileHandler} 
    	          				onRemove={() => this.setState({ rows: [] })} 
    	          				multiple={false} 
    	          			> 
		                    <Button> 
		                    <Icon type="upload" /> Click to Upload Excel File
		                    </Button> 
		                    </Upload>
		                 </GridItem>
	    	          	<GridItem xs={12} sm={12} md={5}>
	    	          		<Button onClick={this.handleSubmit} > Submit Data </Button>
	    	          	</GridItem>
    	          		</GridContainer>
		                <TablePaging
		                	tableHeaderColor="primary"
		                	tableHead={["Name", "Country", "City", "Salary"]}
		                	tableData={this.state.rows}
		                />
    	          </CardBody>
    	       </div>
    	       
    	    
    ); 
  } 
}