import iconDirectionsBoat from "@material-ui/icons/DirectionsBoat";
import FCLSchedulePage from "views/Schedule/FclScheduleList.js";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import TrackingPage from 'views/Tracking/TrackingList.js';
import DemDetPage from 'views/DemDet/DemDetList.js';
import DemDetIcon from "@material-ui/icons/NotificationImportant";
import ScrapIcon from '@material-ui/icons/Description';
//import ScrapSchedule from "views/WebScrap/WebScrap.js";
import FclSchedule from "views/Schedule/FclScheduleList.js";

const serviceRoutes = [
	  {
		    path: "/tracking",
		    name: "Tracking Service",
		    rtlName: "tracking",
		    icon: LocalAirportIcon,
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
];

export default serviceRoutes;
