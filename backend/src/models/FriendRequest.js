import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
    {
        sender: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        recipient: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        status: { 
            type: String, 
            // 稍后再考虑需不需要 rejected 状态
            enum: ["pending", "accepted"], 
            default: "pending" 
        },
    }, 
    { 
        timestamps: true 
    }
);

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;
