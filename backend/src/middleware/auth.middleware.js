import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "未授权，请登录" });
    }

    // 验证JWT令牌
    // 解码
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "无效的令牌，请重新登录" });
    }

    // 查找用户 不返回密码字段
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: "用户不存在，请重新登录" });
    }           
    req.user = user;
    next();
  } catch (error) {
    console.error("保护路由错误:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
};