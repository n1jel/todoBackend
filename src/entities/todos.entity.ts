import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        isCompleted: { type: String, enum: ['0', '1', '2'], required: true, default: '0' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        endTime: { type: Date, required: true }
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model('todo', todoSchema);

export default Todo;