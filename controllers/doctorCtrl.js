const doctorModel = require("../models/doctorModel")
const appointmentModel = require('../models/appointmentModel');
const userModel = require("../models/userModels");
const getDoctorInfoController = async(req,res) =>{
    try{
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        res.status(200).send({
            success:true,
            message:'doctor data fetch success',
            data:doctor,
        });
    } catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in fetching doctor details"
        })
    }
}

const updateProfileController = async(req,res) =>{
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body)
        res.status(201).send({
            success:true,
            message:'Doctor Profile Updated',
            data:doctor,
        })
    } catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'doctor profile update issue',
            error
        })
    }
}

//get single doctor

const getDoctorByIdController = async(req,res)=>{
    try{
        console.log("get single doctor body   " , req.body);
        const doctor = await doctorModel.findById({_id:req.body.doctorId.trim()})
        res.status(200).send({
            success:true,
            message: "single doctor info fetched",
            data:doctor,
        });
    } catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in single doctor info"
        })
    }
}

//doctor appointment
const doctorAppointmentController = async(req,res) => {
    try{
        // console.log("Hurrey!!")
        // console.log("request  ",req.body.userId)
        const doctor = await doctorModel.findOne({userId : req.body.userId});
        // console.log("doctor id-: ", doctor)
        const id = doctor._id;
        // const appointments = await appointmentModel.find({doctorId:doctor._id,});
        const appointments = await appointmentModel.find({});
        console.log("appointments-:  ",appointments);
        // const appointments = appointment.find(obj=>obj.doctorId==='675e7f9050704715c3380638');
        // console.log("appointments-:  ",appointments);
        // console.log(typeof(doctor._id))
        // console.log("hello", (appointments[0]))
        res.status(200).send({
            success:true,
            message:"Doctor Appointments fetch Successfully",
            data:appointments,
        })
    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in doc appointments"
        })
    }
}

const updateStatusController = async(req,res) =>{
    try{
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status})
        const user = await userModel.findOne({_id:appointments.userId})
        const notification = user.notification;
        notification.push({
            type:'Status-updated',
            message:`A new appointment request from ${status}`,
            onClickPath:'/user/appointments'
        })
        await user.save();
        res.status(200).send({
            success:true,
            message: "Appointment status updated",
        }) 
    } catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in update status'
        })
    }
}

module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentController, updateStatusController}