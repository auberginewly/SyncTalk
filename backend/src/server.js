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
import path from 'path';

const app = express();
const PORT = process.env.PORT;

// // __dirname 不存在,需要手动创建
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist','index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // 启动服务器前连接数据库
  connectDB();
});
 