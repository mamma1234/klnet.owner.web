/*eslint-disable*/
import React,{ useState, useEffect } from "react";
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
import axios from 'axios';

export default function FixedPlugin(props) {

  const [classes, setClasses] = React.useState("dropdown show");
  const {fixedData} = props;

  const [searchGb, setSearchGb] = useState(false);
  const [searchNm, setSearchNm] = useState("");
  
  const [searchPOL, setSearchPOL] = useState("");
  const [searchPOD, setSearchPOD] = useState("");
  const [searchETA, setSearchETA] = useState("");
  const [searchETD, setSearchETD] = useState("");
  
  const [noticeEtaYn, setNoticeEtaYn] = useState("N");
  const [noticeEtaVal, setNoticeEtaVal] = useState("");
  const [noticeEtdYn, setNoticeEtdYn] = useState("N");
  const [noticeEtdVal, setNoticeEtdVal] = useState("");
  
  const [noticeDetYn, setNoticeDetYn] = useState("N");
  const [noticeDetVal, setNoticeDetVal] = useState("");

  const [noticeDemYn, setNoticeDemYn] = useState("N");
  const [noticeDemVal, setNoticeDemVal] = useState("");
  
  const [noticeInspectYn, setNoticeInspectYn] = useState("N");
  const [noticeInspectOffYn, setNoticeInspectOffYn] = useState("N");
  
  const [noticeEmailYn, setNoticeEmailYn] = useState("N");
  const [noticeEmailVal, setNoticeEmailVal] = useState("");
  
  const [noticeSmsYn, setNoticeSmsYn] = useState("N");
  const [noticeSmsVal, setNoticeSmsVal] = useState("");
  
  

  
  useEffect(()=>{ 
	  if ( fixedData != undefined) {
		  setSearchGb(fixedData[0] ==="Y"?true:false);
		  setSearchNm(fixedData[1]);
		  setSearchPOL(fixedData[2]);
		  setSearchPOD(fixedData[3]);
		  setSearchETA(fixedData[4]);
		  setSearchETD(fixedData[5]);
		  
		  setNoticeEtaYn(fixedData[6] ==="Y"?true:false);
		  setNoticeEtaVal(fixedData[7]);
		  setNoticeEtdYn(fixedData[8] ==="Y"?true:false);
		  setNoticeEtdVal(fixedData[9]);
	
		  setNoticeDetYn(fixedData[10] ==="Y"?true:false);
		  setNoticeDetVal(fixedData[11]);
		  
		  setNoticeDemYn(fixedData[12] ==="Y"?true:false);
		  setNoticeDemVal(fixedData[13]);
		  
		  setNoticeInspectYn(fixedData[14] ==="Y"?true:false);
		  setNoticeInspectOffYn(fixedData[15] ==="Y"?true:false);
		  
		  setNoticeEmailYn(fixedData[16] ==="Y"?true:false);
		  setNoticeEmailVal(fixedData[17]);
		  
		  setNoticeSmsYn(fixedData[18] ==="Y"?true:false);
		  setNoticeSmsVal(fixedData[19]);
	  }
	  
	  return () => { 
	   console.log('cleanup');
	  }; 
	 },[fixedData]);
  
  const onChangeSearchGb = e => {
	  setSerachGb(e.target.value);
  }
  
  const handleClick = () => {

	  if (props.fixedClasses === "dropdown show") {
		  console.log("col0 :", searchGb!=true?"N":"Y", "col1 :", searchNm, "col2:",searchPOL,"col3:",searchPOD,
				"col4:",searchETA,"col5:",searchETD,"col6:",noticeEtaYn!=true?"N":"Y","col7:",noticeEtaVal,
				"col8:",noticeEtdYn!=true?"N":"Y","col9:",noticeEtdVal,"col10:",noticeDetYn!=true?"N":"Y","col11:",noticeDetVal,
				"col12:",noticeDemYn!=true?"N":"Y","col13:",noticeDemVal,"col14:",noticeInspectYn!=true?"N":"Y",
				"col15:",noticeInspectOffYn!=true?"N":"Y","col16:",noticeEmailYn!=true?"N":"Y","col17:",noticeEmailVal,
				"col18:",noticeSmsYn!=true?"N":"Y","col19:",noticeSmsVal);
		  axios.post("/com/setUserSetting",{col0 : searchGb!=true?"N":"Y", col1 : searchNm, col2:searchPOL,col3:searchPOD,
				col4:searchETA,col5:searchETD,col6:noticeEtaYn!=true?"N":"Y",col7:noticeEtaVal,
				col8:noticeEtdYn!=true?"N":"Y",col9:noticeEtdVal,col10:noticeDetYn!=true?"N":"Y",col11:noticeDetVal,
				col12:noticeDemYn!=true?"N":"Y",col13:noticeDemVal,col14:noticeInspectYn!=true?"N":"Y",
				col15:noticeInspectOffYn!=true?"N":"Y",col16:noticeEmailYn!=true?"N":"Y",col17:noticeEmailVal,
				col18:noticeSmsYn!=true?"N":"Y",col19:noticeSmsVal})
			//.then(res => console.log(JSON.stringify(res.data[0])))
			.catch(err => {
			if(err.response.status == "403") {
			//      	setOpenJoin(true);
			}
			}); 
	    }

    props.handleFixedClick();
  };

  
  const onHandleChange = name => e => {
	 // setSearchGb(fixedData[0]);
	  console.log("NAME:"+name);
	  if(name == "USER") {
		  setSearchGb(!searchGb);
	  }	else if(name == "ETA") {
		  setNoticeEtaYn(!noticeEtaYn);
	  }	else if(name == "ETD") {
		  setNoticeEtdYn(!noticeEtdYn);
	  }	else if(name == "DET") {
		  setNoticeDetYn(!noticeDetYn);
	  }	else if(name == "DEM") {
		  setNoticeDemYn(!noticeDemYn);
	  }	else if(name == "INS") {
		  setNoticeInspectYn(!noticeInspectYn);
	  }	else if(name == "INSOFF") {
		  setNoticeInspectOffYn(!noticeInspectOffYn);
	  }	else if(name == "EMAIL") {
		  setNoticeEmailYn(!noticeEmailYn);
	  }	else if(name == "SMS") {
		  setNoticeSmsYn(!noticeSmsYn);
	  }
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
        <ul className="dropdown-menu" style={{width:'320px',textAlignLast:'start'}}>
          <li className="header-title">INDEX</li>
      	  <li className="adjustments-line">
		     <Switch
		  		checked={searchGb}
		  		onChange={onHandleChange('USER')}
		  		value="Y" 
		  		inputProps={{'aria-label':'checkbox'}}
		  	/>사용자 : &nbsp;<input type='text' id='user_value' name='user_value' aria-label='사용자아이디' style={{width:"150px",height:"23px"}} onChange={event => setSearchNm(event.target.value)} value={searchNm} /></li>
		     <li className="adjustments-line" style={{paddingBottom: '10px'}}>
	          <div>
	          &nbsp;&nbsp;POL : <input type='text' id='search_pol_value' name='search_pol_value' aria-label='pol' style={{width:"80px",height:"23px"}} onChange={event => setSearchPOL(event.target.value)} value={searchPOL}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;POD : <input type='text' id='search_pod_value' name='search_pod_value' aria-label='pod' style={{width:"80px",height:"23px"}} onChange={event => setSearchPOD(event.target.value)} value={searchPOD}/>      
	          </div>
      	    <div>   
      	      &nbsp;&nbsp;ETA : <input type='text' id='search_eta_value' name='search_eta_value' aria-label='eta' style={{width:"100px",height:"23px"}}  onChange={event => setSearchETA(event.target.value)} value={searchETA}/>&nbsp;&nbsp;
      	      &nbsp;&nbsp;ETD : <input type='text' id='search_etd_value' name='search_etd_value' aria-label='etd' style={{width:"100px",height:"23px"}}  onChange={event => setSearchETD(event.target.value)} value={searchETD}/>
        	</div> 
          </li>

          <li className="header-title">NOTICE</li>
          <li className="adjustments-line">
	      	<Switch
	      		checked={noticeEtaYn}
	      		onChange={onHandleChange('ETA')}
	      		value="Y"
	      		inputProps={{'aria-label':'checkbox'}}
	      	/>ETA : <input type='text' id='eta_value' name ='eta_value' aria-label='eta' style={{width:"40px",height:"23px"}} onChange={event => setNoticeEtaVal(event.target.value)} value={noticeEtaVal} />
		  <Switch
    		checked={noticeEtdYn}
		  	onChange={onHandleChange('ETD')}
    		value="Y"
    		inputProps={{'aia-label':'checkbox'}}
		  />ETD : <input type='text' id='etd_value' name ='etd_value' style={{width:"40px",height:"23px"}} onChange={event => setNoticeEtdVal(event.target.value)} value={noticeEtdVal}/>
		  </li>
		  <li className="adjustments-line">
	      	<Switch
      		checked={noticeDetYn}
	      	onChange={onHandleChange('DET')}
      		value="Y"
      		inputProps={{'aria-label':'checkbox'}}
	      	/>DET : <input type='text' id='det_value' name ='det_value' style={{width:"40px",height:"23px"}} onChange={event => setNoticeDetVal(event.target.value)} value={noticeDetVal} />
	      	<Switch
      		checked={noticeDemYn}
	      	onChange={onHandleChange('DEM')}
      		value="Y"
      		inputProps={{'aia-label':'checkbox'}}
	      	/>DEM : <input type='text' id='dem_value' name ='dem_value' style={{width:"40px",height:"23px"}} onChange={event => setNoticeDemVal(event.target.value)} value={noticeDemVal}/>
		  </li>
		  <li className="adjustments-line">
	      	<Switch
	      		checked={noticeInspectYn}
		      	onChange={onHandleChange('INS')}
	      		value="Y"
	      		inputProps={{'aria-label':'checkbox'}}
		      	/>INSPECT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	      	<Switch
	      		checked={noticeInspectOffYn}
		      	onChange={onHandleChange('INSOFF')}
	      		value="Y"
	      		inputProps={{'aria-label':'checkbox'}}
		      	/>INSPECT OFF
	      	</li>
	      	<li className="adjustments-line">
	      	<Switch
	      		checked={noticeEmailYn}
	      		onChange={onHandleChange('EMAIL')}
	      		value="Y"
	      		inputProps={{'aria-label':'checkbox'}}
	      	/>EMAIL :&nbsp;&nbsp;<input type='text' id='email_value' name ='email_value' style={{width:"150px",height:"23px"}} onChange={event => setNoticeEmailVal(event.target.value)} value={noticeEmailVal}/>
	      	</li>
	      	<li className="adjustments-line">
	      	<Switch
	      		checked={noticeSmsYn}
	      		onChange={onHandleChange('SMS')}
	      		value="Y"
	      		inputProps={{'aria-label':'checkbox'}}
	      	/>SMS :&nbsp;&nbsp;<input type='text' id='sms_value' name ='sms_value' style={{width:"150px",height:"23px"}} onChange={event => setNoticeSmsVal(event.target.value)} value={noticeSmsVal}/>
		  </li>
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
  handleImageClick: PropTypes.func,
  fixedData: PropTypes.array,
};
