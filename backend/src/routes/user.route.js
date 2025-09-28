import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests } from '../controllers/user.controller.js';

const router = express.Router();

router.use(protectRoute); // 保护下面的所有路由

// 获取推荐用户
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

// 发送好友请求
router.post("/friend-request/:id", sendFriendRequest);
// 接受好友请求
router.put("/friend-request/:id/accept", acceptFriendRequest);
// TODO: 拒绝好友请求
// 获取别人发给我的好友请求
router.get("/friend-requests", getFriendRequests);
// 获取我发出的好友请求
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);
export default router;// 这里先占个位置，后续会添加用户相关的路由