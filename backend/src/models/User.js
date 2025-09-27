import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    nativeLanguage: { type: String, default: "" },
    learningLanguage: { type: String, default: "" },
    location: { type: String, default: "" },
    isOnboarded: { type: Boolean, default: false },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
// 自动添加 createdAt 和 updatedAt 字段 并自动维护它们的值 创建和更新文档时


// TODO
UserSchema.pre("save", async function (next) {
    // 只在密码被修改或是新用户时才加密
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword; // 👈 关键：将加密后的密码赋值回去
        next();
    } catch (error) {   
        next(error);
    }   
});

const User = mongoose.model("User", UserSchema);



export default User;    