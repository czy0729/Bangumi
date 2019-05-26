# Bangumi

> 这是一个基于`React-Native` 的 `Expo`写的 [Bangumi](https://bangumi.tv) 客户端
>
> 开发上对安卓和 iOS 都写了兼容, 开发环境是 iOS
>
> (安卓实机样式效果会有部分差异, 尽量保持一致, 功能持续开发中...)

#### Features

---

- 暂时没有图标和启动图 (bgm38 求大佬贡献)
- 番组进度管理
- 条目详情 (支持 Ep 倒序)
- 时间胶囊
- 超展开列表
- 帖子内容 (支持留言倒序)
- 搜索
- 其他用户空间
- 个人时光机 (完整的收藏记录)
- 每日放送
- 电波提醒
- 热门聚合 (todo)
- 每月番组索引 (todo)
- 排行榜 (?)
- 各板块直接回复 (todo)

#### Getting Started

---

** 下载 **

注意, 某个依赖包在淘宝源里面 404, 要切换为 npm 官方源

```bash
npm config set registry https://registry.npmjs.org
```

```bash
git clone https://github.com/czy0729/Bangumi
cd ./Bangumi
yarn // or npm i
```

** 前置操作 **

把 assets/iconfont/ 下的目录 vector-icons 替换掉 node_modules/@expo/ 下的 vector-icons

** 启动 **

```bash
npm start
Run on iOS simulator
```

window 用法不详, 可以查阅 [Expo](https://github.com/expo/expo) 官方文档

#### Page Preview

---

#### 登陆

<img src="./preview/home_1.png" width="220" alt="home_1" /> <img src="./preview/login_1.png" width="220" alt="login_1" /> <img src="./preview/login_2.png" width="220" alt="login_2" />

#### 进度

<img src="./preview/home_2.png" width="220" alt="home_2" /> <img src="./preview/home_3.png" width="220" alt="home_3" /> <img src="./preview/home_4.png" width="220" alt="home_4" />

#### 条目

<img src="./preview/subject_1.png" width="220" alt="subject_1" /> <img src="./preview/subject_2.png" width="220" alt="subject_2" /> <img src="./preview/subject_3.png" width="220" alt="subject_3" />

#### 搜索

<img src="./preview/search_1.png" width="220" alt="search_1" /> <img src="./preview/search_2.png" width="220" alt="search_2" /> <img src="./preview/search_3.png" width="220" alt="search_3" />

#### 人物

<img src="./preview/mono_1.png" width="220" alt="mono_1" /> <img src="./preview/mono_2.png" width="220" alt="mono_2" />

#### 时间胶囊

<img src="./preview/timeline_1.png" width="220" alt="timeline_1" /> <img src="./preview/timeline_2.png" width="220" alt="timeline_2" /> <img src="./preview/timeline_3.png" width="220" alt="timeline_3" />

#### 超展开

<img src="./preview/rakuen_1.png" width="220" alt="rakuen_1" /> <img src="./preview/topic_1.png" width="220" alt="topic_1" /> <img src="./preview/topic_2.png" width="220" alt="topic_2" />

#### 用户空间

<img src="./preview/zone_1.png" width="220" alt="zone_1" /> <img src="./preview/zone_2.png" width="220" alt="zone_2" />

#### 个人时光机

<img src="./preview/user_1.png" width="220" alt="user_1" /> <img src="./preview/user_2.png" width="220" alt="user_2" />

#### 每日放送, 电波提醒, 设置

<img src="./preview/calendar_1.png" width="220" alt="calendar_1" /> <img src="./preview/notify_1.png" width="220" alt="notify_1" /> <img src="./preview/setting_1.png" width="220" alt="setting_1" />
