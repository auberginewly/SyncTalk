import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
// 新增用户引导路由 只有新手用户能访问
router.post("/onboarding", protectRoute, onboard);

// 检查用户登录状态的路由
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({
        status: 'success',  
        user: req.user
    });
});
 
// 忘记密码

export default router;