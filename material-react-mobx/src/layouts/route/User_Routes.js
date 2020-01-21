import iconDirectionsBoat from "@material-ui/icons/DirectionsBoat";
import FCLSchedulePage from "views/Schedule/FclScheduleList.js";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import TrackingPage from 'views/Tracking/TrackingList.js';

const serviceRoutes = [
	  {
		    path: "/fcl_schedule",
		    name: "FCL-Schedule",
		    rtlName: "FCL Schedule",
		    icon: ScheduleIcon,
		    component: FCLSchedulePage,
		    layout: "/own"
	  },
	  {
		    path: "/tracking",
		    name: "Tracking Service",
		    rtlName: "tracking",
		    icon: LocalAirportIcon,
		    component: TrackingPage,
		    layout: "/own"
	  },
];

export default serviceRoutes;
