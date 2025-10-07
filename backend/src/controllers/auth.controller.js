import { upsertStreamUser } from '../lib/stream.js';
import  User  from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
  // 注册逻辑
  const {  email, password, fullName } = req.body;
  try {
    // 保证所有字段不为空
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "所有字段均为必填项" });
    }
    // 密码长度至少6位
    if (password.length < 6) {
      return res.status(400).json({ message: "密码长度至少为6个字符" });
    }
    // 正则检测邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "无效的邮箱格式" });
    }
    // 邮箱是否已被注册
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "邮箱已被注册，请更换邮箱进行注册" });
    }

    const idx = Math.floor(Math.random() * 100) + 1; // 生成1-100随机数
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;  // 使用随机数生成头像URL

    const newUser = await User.create({ email, password, fullName, profilePicture: randomAvatar });
    // const newUser = new User({ email, password, fullName, profilePicture: randomAvatar });
    // await newUser.save();
    // 需要额外的 save() 调用 注册功能两种方式都行

    // 在 Stream 上创建或更新用户
    // trycatch 块捕获 Stream API 相关错误，防止影响主注册流程
    try {
      console.log("正在 Stream 上创建或更新用户:", newUser.fullName);
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePicture || "",
      });
      console.log(`在 Stream 上成功创建用户: ${newUser.fullName}`);
    } catch (error) {
      console.error("在 Stream 上创建或更新用户失败:", error);
    }

    //JWT令牌验证
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d'// 7天过期
    });

    res.cookie('jwt', token, {
      httpOnly: true, // 只能通过 HTTP(S) 协议访问，防止 XSS 攻击窃取
      secure: process.env.NODE_ENV === 'production', // 仅在生产环境中通过 HTTPS 传输
      sameSite: 'strict', // 防止 CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天 需要以毫秒为单位
    });

    res.status(201).json({ success:true, user:newUser });

  } catch (error) {
    console.error("注册错误:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}

export async function login(req, res) {
  try {
    // 登陆请求中提取邮箱和密码
    const { email, password } = req.body;
    // 保证邮箱和密码不为空
    if (!email || !password) {
      return res.status(400).json({ message: "邮箱和密码均为必填项" });
    }
    // 根据邮箱查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "邮箱或者密码不正确" });
    }
    // 验证密码是否匹配
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "邮箱或者密码不正确" });
    }
    //JWT令牌验证
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d'// 7天过期
    });

    res.cookie('jwt', token, {
      httpOnly: true, // 只能通过 HTTP(S) 协议访问，防止 XSS 攻击窃取
      secure: process.env.NODE_ENV === 'production', // 仅在生产环境中通过 HTTPS 传输
      sameSite: 'strict', // 防止 CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天 需要以毫秒为单位
    });

    res.status(200).json({ success:true, user });
  } catch (error) {
    console.error("登录错误:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}

export async function logout(req, res) {
  // 清除 JWT cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  // 返回成功响应
  res.status(200).json({ message: "成功登出" });
}

export async function onboard(req, res) {
  try {
    // 获取用户ID
    const userId = req.user._id;
    // 获取其他字段
    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
    // 检查必填字段
    if (!fullName || !bio || !nativeLanguage || !learningLanguage) {
      return res.status(400).json({
        message: "所有信息均为必填项",
        missingFields: [
          // 检查每个字段是否存在
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location"
        ].filter(Boolean)
      });
    }
    // 更新用户信息
    const updatedUser = await User.findByIdAndUpdate(userId, { 
      ...req.body,
      isOnboarded: true
    }, { new: true });
    // 检查更新后的用户信息
    if (!updatedUser) {
      return res.status(404).json({ message: "用户未找到" });
    }
    
    // 使用trycatch 块捕获 Stream API 相关错误，防止影响主更新流程
    try {
      // upsert 有的时候是更新update有的时候是创建insert
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePicture || "",
      });
      console.log(`在 Stream 上成功创建或更新用户资料: ${updatedUser.fullName}`);
    } catch (streamError) {
      console.error("在 Stream 上更新用户资料失败:", streamError.message);
    }

    // 返回成功响应
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    // 处理错误
    console.error("用户引导错误:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}