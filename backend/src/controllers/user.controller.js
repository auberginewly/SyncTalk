import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

// 推荐用户
export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
        $and: [
            { _id: { $ne: currentUserId } }, // 排除当前用户自己
            { _id: { $nin: currentUser.friends } }, // 排除已经是好友的用户
            { isOnboarded: true } // 只推荐已完成新手引导的用户
        ],
    });
    res.status(200).json(recommendedUsers); 
  } catch (error) {
    console.error("获取推荐用户错误:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}

// 获取我的好友
export async function getMyFriends(req, res) {
    try {
        const user = await User
        .findById(req.user._id)
        .select('friends')
        .populate('friends', 'fullName profilePicture nativeLanguage learningLanguage'); // 只选择需要的字段
        res.status(200).json(user.friends);
    } catch (error) {   
        console.error("获取好友列表错误:", error.message);
        res.status(500).json({ message: "服务器错误，请稍后再试" });
    }
}

// 发送好友请求
export async function sendFriendRequest(req, res) {
    try {
        // 获取自己的 ID
        const myId = req.user._id;
           
        // 获取请求参数中的接收者 ID
        const { id: recipientId } = req.params;

        // 防止发送好友请求给自己
        if (myId.equals(recipientId)) {
            return res.status(400).json({ message: "不能给自己发送好友请求" });
        }

        // 检查接收者是否存在
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "请求的用户不存在" });
        }

        // 检查是否已成为朋友
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "已经是好友关系" });
        }

        // 检查请求是否已经存在
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });

        // 如果请求已存在，返回错误
        if (existingRequest) {
            return res.status(400).json({ message: "你们之间的好友请求已存在" });
        }

        // 创建新的好友请求
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });
        
        // 返回成功响应
        res.status(201).json(friendRequest);
    } catch (error) {
        console.error("发送好友请求错误:", error.message);
        res.status(500).json({ message: "服务器错误，请稍后再试" });
    }
}

// 获取别人发给我的已接收的好友请求
export async function acceptFriendRequest(req, res) {
    try {
        // 获取请求参数中的好友请求 ID
        const {id: requestId} = req.params;

        // 查找好友请求
        const friendRequest = await FriendRequest.findById(requestId);
        
        // 如果好友请求不存在，返回 404
        if (!friendRequest) {
            return res.status(404).json({message: "好友请求不存在"});
        }

        // 确保当前用户是请求的接收者
        if (!friendRequest.recipient.equals(req.user._id)) {
            return res.status(403).json({message: "没有权限处理此好友请求"});
        }

        // 更新双方的好友列表
        friendRequest.status = 'accepted';
        await friendRequest.save();

        // 将双方添加到彼此的好友列表中
        await User.findByIdAndUpdate(friendRequest.sender, {
            // addToSet 只有不重复的元素才会被添加
            $addToSet: { friends: friendRequest.recipient }
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({message: "好友请求已接受"});
    } catch (error) {
        console.error("接受好友请求错误:", error.message);
        res.status(500).json({ message: "服务器错误，请稍后再试" });
    }
}


// 获取别人发给我的处理/未处理的好友请求
export async function getFriendRequests(req, res) {
    try {
        // 查找所有发给当前用户的未处理好友请求（别人发给你的，你需要接受）
        const incomingRequests = await FriendRequest
        .find({ recipient: req.user._id, status: 'pending' })
        .populate('sender', 'fullName profilePicture nativeLanguage learningLanguage'); // 只选择需要的字段

        // 查找你发出的已被接受的请求（你发给别人的，对方已接受）
        const acceptedRequests = await FriendRequest
        .find({ sender: req.user._id, status: 'accepted' })
        .populate('recipient', 'fullName profilePicture nativeLanguage learningLanguage'); // 只选择需要的字段

        // 返回结果
        res.status(200).json({ incomingRequests, acceptedRequests });
    } catch (error) {
        // 捕获并处理错误
        console.error("获取好友请求错误:", error.message);
        res.status(500).json({ message: "服务器错误，请稍后再试" });
    }
}

// 获取我发出的好友请求
export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingRequests = await FriendRequest
        .find({ sender: req.user._id, status: 'pending' })
        .populate('recipient', 'fullName profilePicture nativeLanguage learningLanguage'); // 只选择需要的字段

        res.status(200).json(outgoingRequests);
    } catch (error) {
        // 捕获并处理错误
        console.error("获取发出的好友请求错误:", error.message);
        res.status(500).json({ message: "服务器错误，请稍后再试" });
    }
}