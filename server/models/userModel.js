import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import { Jwt } from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    tokens:{type:Array}
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}
);



const userModel = mongoose.model("User", userSchema);



export default userModel;