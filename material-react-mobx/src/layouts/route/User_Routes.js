import iconDirectionsBoat from "@material-ui/icons/DirectionsBoat";
import FCLSchedulePage from "views/Schedule/FclScheduleList.js";
import TrackingPage from 'views/Tracking/TrackingList.js';
import DemDetPage from 'views/DemDet/DemDetList.js';
import ScrapSchedule from "views/WebScrap/WebScrap.js";
import FclSchedule from "views/Schedule/FclScheduleList.js";
import DemDetMapPage from 'views/DemDet/Map/DemDetMap.js';
import UserProfile from "views/Member/UserProfile.js";
import UserSetting from "views/Member/UserServiceSetting.js";
import SampleData from "views/TestPage/SamplePage.js";
//Icon
import Person from "@material-ui/icons/Person";
import ScrapIcon from '@material-ui/icons/Description';
import MapIcon from "@material-ui/icons/Map";
import DemDetIcon from "@material-ui/icons/NotificationImportant";
import DirectionsBoat from  "@material-ui/icons/DirectionsBoat";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";

//import TestPage from "views/TestPage/TestPage1.js";

const serviceRoutes = [
	  {
		    path: "/tracking",
		    name: "Tracking Service",
		    rtlName: "tracking",
		    icon: DirectionsBoat,
		    component: TrackingPage,
		    layout: "/svc"
	  },
	  {
		path: "/demDet",
		name: "DEM/DET/STORAGE",
		rtlName: "demDet",
		icon: DemDetIcon,
		component: DemDetPage,
		layout: "/svc"
	  },
	  {
			path: "/fcl_sch",
			name: "Fcl Schedule",
			rtlName: "FCL SCHEDULE",
			icon: ScrapIcon,
			component: FclSchedule,
			layout: "/svc"
	   },
	  {
			path: "/scrap_sch",
			name: "Web Scrap Schedule",
			rtlName: "WebScrap",
			icon: ScrapIcon,
			component: ScrapSchedule,
			layout: "/svc"
	   },
	   {
		path: "/mapService",
		name: "Map",
		rtlName: "demDetMap",
		icon: MapIcon,
		component: DemDetMapPage,
		layout: "/svc"
  	  },
  	  {
  	    path: "/user",
  	    name: "User Profile",
  	    rtlName: "User Profile",
  	    icon: Person,
  	    component: UserProfile,
  	    layout: "/svc"
  	  },
  	  {
    	 path: "/setting",
    	 name: "User Service Settings",
    	 rtlName: "User Service Settings",
    	 icon: Person,
    	 component: UserSetting,
    	 layout: "/svc"
       },
   	  {
      	 path: "/sample",
      	 name: "Exp&Imp sample Data",
      	 rtlName: "Exp&Imp sample Data",
      	 icon: Person,
      	 component: SampleData,
      	 layout: "/svc"
         },
];

export default serviceRoutes;
