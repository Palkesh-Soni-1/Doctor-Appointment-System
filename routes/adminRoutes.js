const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware")
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl')

const router = express.Router()

//getmethod || users
router.get("/getAllUsers", authMiddleware, getAllUsersController)

//getmethod || doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController)

//POST Account Status
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController)

module.exports = router
