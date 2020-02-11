/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";
import Radio from '@material-ui/core/Radio';

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";

import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

export default function FixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown show");
  const [bg_checked, setBg_checked] = React.useState(true);
  const [bgImage, setBgImage] = React.useState(props.bgImage);
  const [viewVlaue, setViewVlaue] = React.useState("list");
  
  const handleClick = () => {
    props.handleFixedClick();
  };
  
  const handleViewClick = e => {
	  console.log(">>>>>2"+e.target.value);
	  props.handleViewClick(e.target.value); 
	  setViewVlaue(e.target.value);
  };

  return (
    <div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive
      })}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu" style={{width:'320px'}}>
          <li className="header-title">View</li>
          <li className="adjustments-line">
	          <Radio
				checked={viewVlaue === 'list'}
				onChange={handleViewClick}
				value='list'
				name='viewRadio'
	          />List
	          <Radio
				checked={viewVlaue === 'map'}
				onChange={handleViewClick}
				value='map'
				name='viewRadio'
	          />Map
          </li>
          <li className="header-title">자료연계(BL)</li>
          <li className="adjustments-line">
	        <CustomInput
				labelText="적하목록 상호명"
				id="vesselName"
				//inputProps={{onChange:event => setVesselName(event.target.value)}}
				formControlProps={{width:'100px'}}
			/>
		  </li>
          <li className="header-title">INDEX</li>
          <li className="header-title">NOTICE</li>
          <li className="adjustments-line">
	      	<Switch
	      		//checked={}
	      		//onChange={}
	      		value="checked"
	      		inputProps={{'aria-label':'checkbox'}}
	      	/>ETA : <input type='text' id='eta_value' name ='eta_value' aria-label='eta' style={{width:"40px"}} />
		  <Switch
    		//checked={}
    		//onChange={}
    		value="checked"
    		inputProps={{'aia-label':'checkbox'}}
		  />ETD : <input type='text' id='etd_value' name ='etd_value' style={{width:"40px"}}/>
		  </li>
		  <li className="adjustments-line">
	      	<Switch
      		//checked={}
      		//onChange={}
      		value="checked"
      		inputProps={{'aria-label':'checkbox'}}
	      	/>DET : <input type='text' id='det_value' name ='det_value' style={{width:"40px"}} />
	      	<Switch
      		//checked={}
      		//onChange={}
      		value="checked"
      		inputProps={{'aia-label':'checkbox'}}
	      	/>DEM : <input type='text' id='dem_value' name ='dem_value' style={{width:"40px"}} />
		  </li>
		  <li className="adjustments-line">
	      	<Switch
      		//checked={}
      		//onChange={}
      		value="checked"
      		inputProps={{'aria-label':'checkbox'}}
	      	/>INSPECT
	      	<Switch
	      		//checked={}
	      		//onChange={}
	      		value="checked"
	      		inputProps={{'aria-label':'checkbox'}}
	      	/>EMAIL
	      	<Switch
	      		//checked={}
	      		//onChange={}
	      		value="checked"
	      		inputProps={{'aria-label':'checkbox'}}
	      	/>SMS 
		  </li>
          <li className="header-title">GRID SET</li>
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};
