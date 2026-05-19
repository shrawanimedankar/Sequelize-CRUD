const Teacher = require("../models/teacher");

const getAllTeachers = async (req, res)=>{
    try{
        const teachers = await Teacher.findAll({order:[["id", "ASC"]],});
        res.status(200).json({status:true, count:teachers.length, data:teachers,});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message,});
    }
};

const getTeacherById = async(req, res) =>{
    try{
       const { id } = req.body;
       const teacher = await Teacher.findByPk(id);
       if(!teacher){
        res.status(404).json({status:false, message:"Teacher not found"});
       }
       res.status(200).json({status:true, data: teacher,});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message,});
    }
};

const createTeacher = async(req, res)=>{
    try{
        const {name, email, subject }= req.body;
        const teacher = await Teacher.create({name, email,subject,});
        res.status(200).json({status:true, data:teacher,});
    }
    catch(error){
        if(error.name === "SequelizeUniqueConstraintError"){
            return res.status(409).json({success:false, message:"Email already exist"});
        }
        res.status(500).json({status:false, message:error.message,});
    }
};

const updateTeacher = async (req,res)=>{
   try{  
    const {id, name, email, subject} = req.body;
    const teacher = await Teacher.findByPk(id);

    if(!teacher){
        return res.status(404).json({status:false, message:"Teacher not found",});
    }
    await teacher.update({name, email, subject,});
    res.status(200).json({success:true, data:teacher,});
   }
    catch{
        if(error.name === "SequelizeUniqueConstraintError"){
            res.status(409).json({success:false, message:"Email already exist"});
        }
        res.status(500).json({success:false, message:error.message});
    }
};

const deleteTeacher = async (req, res)=>{
    try{
        const {id} = req.body;
        const teacher = await Teacher.findByPk(id);

        if(!teacher){
            return res.status(404).json({status:false, message:"Teacher with {id} not found"});
        }
        await teacher.destroy();
        res.status(200).json({ success: true,  message: "Teacher deleted successfully", });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message, });
  }
};

module.exports = {getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher};