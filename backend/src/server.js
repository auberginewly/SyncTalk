import express from 'express';
// import dotenv from 'dotenv';    
// dotenv.config();
// 使用 'dotenv/config' 直接加载环境变量 这样也行
import 'dotenv/config';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // 解析 JSON 请求体

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // 启动服务器前连接数据库
  connectDB();
});
