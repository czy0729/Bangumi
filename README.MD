# Bangumi

> 这是一个基于`React-Native` 的 `Expo`写的 [Bangumi](https://bangumi.tv) 客户端
>
> 开发上对安卓和 iOS 都写了兼容, 开发环境是 iOS
>
> (暂时还没开发完毕, 项目里面还存在大量废弃文件. 还没打过包, 安卓实机效果有不少差异, 持续开发中...)

#### Features

---

- 番组进度管理
- 条目详情
- 时间胶囊
- 超展开
- 用户空间
- 搜索
- 时光机 (官方的 API 貌似不能显示全自己的所有收藏, 看来要改为网页解析)
- 每日放送 (优化中)
- 热门 (开发中)

#### Getting Started

---

** 下载 **

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

<img src="./preview/home_1.png" width="280" alt="home_1" /> <img src="./preview/login.png" width="280" alt="login" />

#### 进度

<img src="./preview/home_2.png" width="280" alt="home_2" /> <img src="./preview/home_3.png" width="280" alt="home_3" /> <img src="./preview/home_4.png" width="280" alt="home_4" />

#### 条目

<img src="./preview/subject_2.png" width="280" alt="subject_2" /> <img src="./preview/subject_1.png" width="280" alt="subject_1" />

<img src="./preview/subject_3.png" width="280" alt="subject_3" />

#### 搜索

<img src="./preview/search_1.png" width="280" alt="search_1" /> <img src="./preview/search_2.png" width="280" alt="search_2" /> <img src="./preview/search_3.png" width="280" alt="search_3" />

#### 人物

<img src="./preview/mono_1.png" width="280" alt="mono_1" /> <img src="./preview/mono_2.png" width="280" alt="mono_2" />

#### 时间胶囊

<img src="./preview/timeline_1.png" width="280" alt="timeline_1" /> <img src="./preview/timeline_2.png" width="280" alt="timeline_2" />

#### 超展开

<img src="./preview/rakuen_1.png" width="280" alt="rakuen_1" /> <img src="./preview/topic_1.png" width="280" alt="topic_1" />

<img src="./preview/topic_2.png" width="280" alt="topic_2" />

#### 用户空间

<img src="./preview/zone_1.png" width="280" alt="zone_1" /> <img src="./preview/zone_2.png" width="280" alt="zone_2" />

#### 每日放送(待继续开发)

<img src="./preview/calendar_1.png" width="280" alt="calendar_1" />

#### 时光机(待继续开发)

<img src="./preview/user_1.png" width="280" alt="user_1" />
