const express =require("express");
const validateToken =require("../middleware/validateToken")
const {userLogin,userRegister,home} =require("../controller/userController")
const router=express.Router();
router.route('/').post(userRegister)
router.route('/login').post(userLogin);
router.route('/home').get(validateToken,home);
module.exports = router;
