const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUserData,
  loginUser,
  getAllSellers,
  getAllBuyers,
  getAllDelivery,
  createAdminUser,
  loginAdminUser
} = require('../services/user.service')


router.get('/getallusers', getAllUsers);
router.post('/createuser', createUser);
router.post('/createadmin', createAdminUser);
router.get('/getuser', getUser);
router.put('/updateuser', updateUser);
router.delete('/deleteuser', deleteUserData);
router.post('/loginuser', loginUser);
router.post('/loginadmin', loginAdminUser);
router.get('/getallsellers', getAllSellers);
router.get('/getallbuyers', getAllBuyers);
router.get('/getalldeliverers', getAllDelivery);

module.exports = router;