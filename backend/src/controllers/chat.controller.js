import { generateStreamToken } from "../lib/stream.js";

// 获取 Stream Token 的控制器
export async function getStreamToken(req, res) {
    try {
        // 生成并返回 Stream Token
        const token = generateStreamToken(req.user._id);
        res.status(200).json({ token });
    } catch (error) {
        console.error("获取 Stream Token 错误:", error);
        res.status(500).json({ message: "服务器错误，请稍后再试" });
    }
}