import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
	root: {
		maringLeft:'20px',
		maringRigth:'20px',
		},
	}));

const marks = [
	{ value:0,label:'KRPUS'},
	{ value:20,label:'JPSIN'},
	{ value:50,label:'AUPSN'},
	{ value:100,label:'INNSO'},
];


export default function DiscreteSlider() {
	const classes = useStyles();
	
	return (
		<div style={{width: '800px',marginLeft: '50px',marginRight: '50px'}}>
			<Slider
				defaultValue={50}
				step={10}
				marks={marks}
				valueLabelDisplay="off"
			/>
		</div>
	);
}