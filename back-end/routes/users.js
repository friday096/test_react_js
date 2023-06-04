var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware")

/////////////////controller//////////////////
const loginController = require('../controller/user/loginController')
const projectController = require('../controller/user/projectController')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

////////////////////////////////// LOGIN CONTROLLER API /////////////////////////////////////////
router.post('/registration',loginController.registration)
router.post('/login',loginController.login)
router.post('/sendOtp',loginController.sendOtp)
router.put('/forgotPassword',loginController.forgotPassword)
router.get('/getUserTokenData',[authJwt.verifyToken],loginController.getUserTokenData)
router.post('/emailVerification',loginController.emailVerification)

////////////////////////////////// PROJECT CONTROLLER API /////////////////////////////////////////
            /////////////// PROJECT API's ///////////////////
  router.post('/addProject',[authJwt.verifyToken],projectController.addProject) 
  router.post('/checkTemplateDateTime',[authJwt.verifyToken],projectController.checkTemplateDateTime)
  router.post('/checkEditTemplateDateTime',[authJwt.verifyToken],projectController.checkEditTemplateDateTime)

  router.put('/updateProject',[authJwt.verifyToken],projectController.updateProject)
  router.get('/getProject',[authJwt.verifyToken],projectController.getProject)
  router.delete('/deleteProject/:project_id',[authJwt.verifyToken],projectController.deleteProject)
              /////////////// TEMPLATE API's ///////////////////
  // router.delete('/deleteTemplate/:template_id',[authJwt.verifyToken],projectController.deleteTemplate)
  router.post('/editProjectTemp',[authJwt.verifyToken],projectController.editProjectTemp)
  router.post('/uploadTemplateImage',[authJwt.verifyToken],projectController.uploadTemplateImage)










module.exports = router;
