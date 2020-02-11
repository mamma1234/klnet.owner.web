import iconDirectionsBoat from "@material-ui/icons/DirectionsBoat";
import FCLSchedulePage from "views/Schedule/FclScheduleList.js";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import TrackingPage from 'views/Tracking/TrackingList.js';
import DemDetPage from 'views/DemDet/DemDetList.js';
import DemDetIcon from "@material-ui/icons/NotificationImportant";




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
];

export default serviceRoutes;
