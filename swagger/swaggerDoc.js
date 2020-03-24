const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const app = express();

const router = express.Router();


const swaggerOption = {
    swaggerDefinition: {
      openapi:'3.0.0',
      info: {
        title:'Plism Plus API',
        version: '1.0.0',
        termsOfService: 'www.plismplus.com',
        description: 'Plism Plus Open API'
      },
      basePath : '/',
      schemes: ['http','https']
    },
    apis: ['./swagger/swaggerDoc.yaml']
  }

  const uiOption = {
    customSiteTitle: "Plism +",
    customfavIcon: "./favicon.png",
    //customCss: ".topbar{display : none;} .url{display:none;} .swagger-ui .topbar{background: #c80680;background: #c80680;background: -moz-linear-gradient(left, #c80680 0%, #731472 41%);background: -webkit-linear-gradient(left, #c80680 0%, #731472 41%);background: -o-linear-gradient(left, #c80680 0%, #731472 41%);background: -ms-linear-gradient(left, #c80680 0%, #731472 41%);background: linear-gradient(to right, #c80680 0%, #731472 41%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='$left', endColorstr='$right',GradientType=0);} "
    customCss: ".topbar{display : none;} .url{display:none;}"
    
  }

  const specs = swaggerJsdoc(swaggerOption);
  router.use('/favicon.png', express.static('./favicon.png'));
  router.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs, uiOption));
  
  
  
  module.exports = router;