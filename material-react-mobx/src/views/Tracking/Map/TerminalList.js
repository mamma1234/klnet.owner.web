import React,{useState,useEffect} from "react";
import axios from 'axios';



export default function TermianlList(props) {
  
  const { portCode } = props; 
  const [usePort,setUsePort] = useState([]);

  useEffect(() => {
	    console.log('호출....');
	    axios.post("/pg/getPortLocation",{ portCode:portCode}).then(res => setUsePort(res.data));
	    //.then(res => console.log(JSON.stringify(res.data)));
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
    
  return (
		  <div>
	        <div>{portCode}</div>
	        <div>
	        <table border='1px solid #444444' border-collapse='collapse'>
	          <tr>
	            <td rowSpan='2' style={{width: '30px'}}></td>
	            <td colSpan='4' styles={{textAlign:'center'}}>IN</td>
	            <td colSpan='4' text-align='center'>OUT</td>
	          </tr>
	          <tr>
	            <td>DEM</td>
	            <td>DET</td>
	            <td>COMBINE</td>
	            <td>STO</td>
	            <td>DEM</td>
	            <td>DET</td>
	            <td>COMBINE</td>
	            <td>STO</td>
	          </tr>
	          {  }
	        </table>
	        </div>
	      </div>
  );
}
