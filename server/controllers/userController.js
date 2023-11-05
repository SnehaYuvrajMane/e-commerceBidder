import connectDB from "../database/db.js";
import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const secret = "thisisatestsecretkeythatihavegeneratedovertheapplication"

const registerUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    connectDB()
    
    try{

        const userExists = await userModel.findOne({ email });
        
        if (userExists) {
            res.json({message:"User Already Exists!!!"});
            return
           
        }
    }
    catch(error){
        console.log("Error occured");
    }
    
    const user = await userModel.create({
        name,
        email,
        password,
    });
    
    if (user) {
        res.status(201).json({
            status:"success",
        message:'User Created Successfully!!!'
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;

    connectDB();

    const user = await userModel.findOne({ email });


    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({email,name:user.name},secret)
        res.json({
            status:"success",
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    }
    else {
        res.json({status:'failed',message:"Invalid Credentials"})
    }   
}

export { registerUser, authUser };