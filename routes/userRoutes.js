const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//login || post
router.post('/login',loginController);

//register || post
router.post('/register',registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController)

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController)

//Notification || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController)

//DeleteNotification || POST
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController)

//Get all doc
router.get("/getAllDoctors", getAllDoctorsController)

//book appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//check availability
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)

//appointments list
router.get('/user-appointments',authMiddleware, userAppointmentsController)

module.exports = router;

