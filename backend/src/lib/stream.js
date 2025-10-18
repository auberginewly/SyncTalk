import {StreamChat} from 'stream-chat';
import "dotenv/config";

// 确保在环境变量中设置了 STREAM_API_KEY 和 STREAM
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

// 检查 API Key 和 Secret 是否存在
if (!apiKey || !apiSecret) {
  console.error("缺失 Stream API Key 或 Secret");
}

// 初始化 Stream 客户端
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// 创建或更新 Stream 用户
export const upsertStreamUser = async (userData) => {
    try {
        // userData 应包含 id, name, image 等字段
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("创建 Stream 用户失败:", error);
    }
}

//todo
export const generateStreamToken = (userId) => {
    try {
        // 保证 userId 是字符串
        const userIDStr = userId.toString();
        return streamClient.createToken(userIDStr);       
    } catch (error) {
        console.error("生成 Stream Token 失败:", error);
    }
}