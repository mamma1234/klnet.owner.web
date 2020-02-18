import iconDirectionsBoat from "@material-ui/icons/DirectionsBoat";
import FCLSchedulePage from "views/Schedule/FclScheduleList.js";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import TrackingPage from 'views/Tracking/TrackingList.js';
import DemDetPage from 'views/DemDet/DemDetList.js';
import DemDetIcon from "@material-ui/icons/NotificationImportant";
import ScrapIcon from '@material-ui/icons/Description';
import ScrapSchedule from "views/WebScrap/WebScrap.js";




const serviceRoutes = [
	  {
		    path: "/tracking",
		    name: "Tracking Service",
		    rtlName: "tracking",
		    icon: LocalAirportIcon,
		    component: TrackingPage,
		    layout: "/own"
	  },
	  {
		path: "/demDet",
		name: "DEM/DET/STORAGE",
		rtlName: "demDet",
		icon: DemDetIcon,
		component: DemDetPage,
		layout: "/own"
	  },
	  {
			path: "/scrap_sch",
			name: "Web Scrap Schedule",
			rtlName: "WebScrap",
			icon: ScrapIcon,
			component: ScrapSchedule,
			layout: "/own"
		  },
];

export default serviceRoutes;
