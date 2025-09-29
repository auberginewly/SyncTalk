import express from 'express';
// import dotenv from 'dotenv';    
// dotenv.config();
// 使用 'dotenv/config' 直接加载环境变量 这样也行
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT;

// 解决跨域问题
app.use(cors({
  origin: 'http://localhost:5173', // 前端应用的URL
  credentials: true, // 允许前端发送携带Cookie
}));
app.use(express.json()); // 解析 JSON 请求体
app.use(cookieParser()); // 解析 Cookie

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // 启动服务器前连接数据库
  connectDB();
});
 