import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.password
    }
});

const User = mongoose.model('User', userSchema);

export default User;