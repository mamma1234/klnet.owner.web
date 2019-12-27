import iconDirectionsBoat from "@material-ui/icons/DirectionsBoat";
import Template1 from "views/Service/Template1.js";


const serviceRoutes = [
  {
    path: "/template1",
    name: "Template1",
    icon: iconDirectionsBoat,
    component: Template1,
    layout: "/service"
  },
  {
    path: "/template2",
    name: "Template2",
    icon: iconDirectionsBoat,
    component: Template1,
    layout: "/service"
  }  
];

export default serviceRoutes;
