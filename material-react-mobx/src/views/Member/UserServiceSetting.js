import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Access from "@material-ui/icons/AccessAlarm";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Grid from '@material-ui/core/Grid';
import Assign from "@material-ui/icons/AssignmentTurnedIn";

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
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  
  const topFilms = [
	  ['test1@test.co.kr'],
	  ['test2@test.co.kr'],
	  ['test3@test.co.kr'],
  ];
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
        <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		<CardIcon color="info" style={{height:'26px'}}>
			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		</CardIcon>
		<h4 className={classes.cardTitleBlack}>Tracking Setting </h4>
		<Button
		color="info"
			size="sm"
			//style={{width:'76px'}}
		//startIcon={<MapIcon/>}
		//onClick={e=>setAnchorE3(e.currentTarget)}
		>Save</Button>
	  </CardHeader>
          <CardBody>
          	<GridContainer>
          		<GridItem xs={12} sm={12} md={12}>
	          		<h4 className={classes.cardTitleBlack}><Assign style={{color:'#00acc1'}} />INDEX 
		          		<Switch
				  			//checked={searchGb}
				  			//onChange={onHandleChange('USER')}
				  			value="Y" 
				  				inputProps={{'aria-label':'checkbox'}}
		      			/>		
	          		</h4>
          		</GridItem>
          		<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>
		          	<Autocomplete
						style={{padding:'0px'}}
						multiple
					    size="small"
					    options = {topFilms}
							getOptionLabel = { options => options}
							id="useremail"
							//onChange={onSPortChange}
							//onInputChange={onPortSearchValue}
							filterSelectedOptions
							renderInput={params => (
									<TextField {...params} variant="outlined" placeholder="사용자명"  fullWidth />
							)}
					/>
          		</GridItem>
          		<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>
          			<Grid container spacing={1}>
			          	<Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
		      				<CustomSelect
		      					id="pol"
		      						size="small"
		      					labelText = "POL"
		      					//setValue = {dateGbSet}
		      					option = {["KRPUS","KRINC","KRKAN"]}
		      					//inputProps={{onChange:event => setDateGbSet(event.target.value)}}
		      					formControlProps={{
		      						fullWidth: true,
		      						variant:"outlined"		
		      					}}
		      					labelProps={{
		      						style:{top:'-16%'}
		      					}}
		      					inputProps={{
		      						inputProps:{
			      						name:'pol',
			      						id:'pol',
			      						style:{paddingTop:'10px',paddingBottom:'11px'},
			      					}
		      					}}
		      				/>
			          	</Grid>
			          	<Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
				          	<CustomSelect
		      					id="pod"
		      						size="small"
		      					labelText = "POD"
		      					//setValue = {dateGbSet}
		      					option = {["KRPUS","KRINC","KRKAN"]}
		      					//inputProps={{onChange:event => setDateGbSet(event.target.value)}}
		      					formControlProps={{
		      						fullWidth: true,
		      						variant:"outlined"		
		      					}}
		      					labelProps={{
		      						style:{top:'-16%'}
		      					}}
		      					inputProps={{
		      						inputProps:{
			      						name:'pod',
			      						id:'pod',
			      						style:{paddingTop:'10px',paddingBottom:'11px'},
			      					}
		      					}}
				          	/>
			          	</Grid>
				        <Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
				        	<TextField id="eta" size="small" label="eta" type="text" variant="outlined" fullWidth />
			          	</Grid>
				        <Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
				        	<TextField id="etd" size="small" label="etd" type="text" variant="outlined" fullWidth />
			          	</Grid>
			        </Grid>
			     </GridItem>
			     <GridItem xs={12} sm={12} md={12}>  		
          			<h4 className={classes.cardTitleBlack}><Access style={{color:'#00acc1'}} />NOTICE</h4>
      			</GridItem>
			    <GridItem xs={12} sm={12} md={12}>  
			    	<Grid container spacing={1}>
			    		<Grid item xs={12} sm={12} md={6} >
				    		<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={3} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										value="Y" 
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="ETA" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
			    		<Grid container spacing={1}>
				    		<Grid item xs={12} sm={12} md={3} >
								<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									value="Y" 
									inputProps={{'aria-label':'checkbox'}}
								/>
							</Grid>	
							<Grid item xs={12} sm={12} md={9} >
								<TextField id="etd" size="small" label="ETD" type="text" variant="outlined" fullWidth/>
							</Grid>
						</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
					    	<Grid container spacing={1}>
						   		<Grid item xs={12} sm={12} md={3} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										value="Y" 
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="DET" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
				    		<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={3} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										value="Y" 
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="DEM" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
       			</GridItem>
			    <GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>  
			    	<Grid container spacing={1}>
			    		<Grid item xs={12} sm={12} md={6}>
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										value="Y" 
										inputProps={{'aria-label':'checkbox'}}
									/>INSPECT
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
								<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									value="Y" 
									inputProps={{'aria-label':'checkbox'}}
								/>INSPECT OFF
						</Grid>
					</Grid>
				</GridItem>
				<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}> 
							<Grid container spacing={1}>
							   		<Grid item xs={12} sm={12} md={2} >
										<Switch
											//checked={searchGb}
											//onChange={onHandleChange('USER')}
											value="Y" 
											inputProps={{'aria-label':'checkbox'}}
										/>
									</Grid>	
									<Grid item xs={12} sm={12} md={10} >
										<TextField id="etd" size="small" label="EMAIL ADDRESS" type="text" variant="outlined" fullWidth/>
									</Grid>
							</Grid>
				</GridItem>
				<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>
					<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={2} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										value="Y" 
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={10}>
									<TextField id="etd" size="small" label="PHONE NUMBER" type="text" variant="outlined" fullWidth/>
								</Grid>
					 </Grid>
				</GridItem>
          	</GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
      <Card>
      <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		<CardIcon color="info" style={{height:'26px'}}>
			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		</CardIcon>
		<h4 className={classes.cardTitleBlack}>Dem & Det Setting </h4>
		<Button
		color="info"
			size="sm"
			//style={{width:'76px'}}
		//startIcon={<MapIcon/>}
		//onClick={e=>setAnchorE3(e.currentTarget)}
		>Save</Button>
	  </CardHeader>
        <CardBody>
          
        </CardBody>
      </Card>
    </GridItem>
    </GridContainer>
  );
}
