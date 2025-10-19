## 💡 SyncTalk

-----

### 🌟 项目简介 (Introduction)

**SyncTalk** 是一个创新的语言学习社交平台,旨在连接全球语言学习者,通过实时文字聊天和视频通话功能,帮助用户在真实的交流场景中提升语言能力。

#### 核心特性 (Core Features)

- 🌍 **智能好友推荐**: 基于学习语言和母语匹配,智能推荐合适的语言交换伙伴
- 💬 **实时聊天系统**: 集成 Stream Chat SDK,提供流畅的即时通讯体验
- 📹 **视频通话功能**: 基于 Stream Video SDK,支持高质量的一对一视频对话
- 👥 **好友管理系统**: 完整的好友请求、接受、管理功能
- 🔔 **消息通知**: 实时接收好友请求和聊天消息通知
- 🎨 **现代化界面**: 采用 Tailwind CSS 和 DaisyUI 打造的精美响应式界面
- 🌗 **主题切换**: 支持明暗主题自由切换,提供个性化用户体验

#### 适用场景 (Use Cases)

- 寻找母语为目标语言的语言交换伙伴
- 与全球各地的学习者进行实时语言练习
- 通过视频通话进行面对面的口语交流
- 建立国际友谊,拓展跨文化交流

### 🛠 技术栈 (Tech Stack)

#### 前端 (Frontend)
- ⚛️ **React 19** - 现代化的用户界面框架
- 🚀 **Vite** - 快速的构建工具
- 🎨 **Tailwind CSS + DaisyUI** - 实用优先的 CSS 框架和组件库
- 🔄 **React Router v7** - 客户端路由管理
- 📡 **TanStack Query** - 强大的异步状态管理
- 💬 **Stream Chat SDK** - 实时聊天功能集成
- 📹 **Stream Video SDK** - 视频通话功能集成
- 🐻 **Zustand** - 轻量级全局状态管理
- 🎯 **Lucide React** - 现代化图标库

#### 后端 (Backend)
- 🟢 **Node.js + Express** - 服务端框架
- 🍃 **MongoDB + Mongoose** - NoSQL 数据库
- 🔐 **JWT** - 用户认证与授权
- 🔑 **bcrypt** - 密码加密
- 🍪 **cookie-parser** - Cookie 管理
- 🌊 **Stream API** - 聊天和视频服务集成
- ⚡ **dotenv** - 环境变量管理

### 🚀 安装与运行 (Installation & Setup)

#### 1\. 克隆项目 (Clone the repository)

```bash
git clone https://github.com/auberginewly/SyncTalk.git
cd SyncTalk
```

#### 2\. 后端设置 (Backend Setup)

进入 `backend` 目录，安装依赖并启动服务：

```bash
cd backend
npm install
# 创建 .env 文件并配置数据库连接等环境变量
npm start # 或 node server.js
```

默认情况下，后端服务将在 `http://localhost:3000` 运行。

#### 3\. 前端设置 (Frontend Setup)

返回项目根目录，进入 `frontend` 目录，安装依赖并启动客户端：

```bash
cd ../frontend
npm install
npm run dev # 或 npm start
```

默认情况下，前端应用将在 `http://localhost:5173` (具体端口根据前端框架而定) 运行。

### 📚 使用指南 (Usage)

#### 快速开始
1. **注册账号**: 填写用户名、邮箱、密码,并选择母语和学习语言
2. **完善资料**: 添加个人简介、所在地等信息
3. **发现好友**: 浏览系统推荐的语言学习伙伴,发送好友请求
4. **开始聊天**: 好友请求被接受后,即可开始实时文字聊天
5. **视频通话**: 在聊天页面点击视频通话按钮,开始面对面交流

#### 主要功能页面
- **首页 (Home)**: 查看已添加好友和推荐用户
- **通知 (Notifications)**: 管理收到的好友请求
- **聊天 (Chat)**: 实时文字消息交流
- **视频通话 (Call)**: 一对一视频对话

### 🤝 贡献 (Contributing)

欢迎所有形式的贡献！如果您有任何 Bug 报告或功能建议，请通过以下方式：

1.  **Fork** 本仓库。
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交您的修改 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到您的分支 (`git push origin feature/AmazingFeature`)。
5.  提交一个 **Pull Request**。

### 📄 许可证 (License)

本项目采用 **MIT 许可证** 开源。更多信息请查看 [LICENSE](https://www.google.com/search?q=LICENSE) 文件。

### 📧 联系 (Contact)

项目维护者：[auberginewly](https://github.com/auberginewly)

项目链接：[https://github.com/auberginewly/SyncTalk](https://github.com/auberginewly/SyncTalk)

-----
