# Bangumi

> 这是一个基于`React-Native`的 [Bangumi](https://bgm.tv) 客户端
>
> 对安卓和 iOS 都做到兼容, 安卓实机样式效果会有部分差异, 尽量保持一致, 功能持续开发中...

---

#### Download

[APK 下载地址](https://github.com/czy0729/Bangumi/releases)

---

#### Demo

[若要在线预览, 请先安装 expo app](https://expo.io/tools), [这个 expo app 貌似不用梯子](https://apkpure.com/expo/host.exp.exponent)

<img src="./preview/expo-qr.png" width="240" alt="expo-qr" />

[expo 项目主页](https://expo.io/@a402731062/bangumi)

---

#### Todos

已知问题

- [ ] [条目] 部分带偏移的动漫, 在线观看地址没正确偏移 (不太影响使用, 也许无办法解决)
- [ ] [超展开] 楼层内容某些情况偏移
- [ ] [超展开] 复杂的楼层内容显示不全
- [ ] [超展开] IOS 端不能回复, 可能要用新方法获取和管理 cookie

v0.x

- [ ] [登陆] 不使用 webview, 尝试新的方式登陆
- [ ] [条目] 匹配更多的在线观看源
- [ ] [用户] 同步率
- [ ] [每日放送] 添加播放时间
- [ ] [索引] 页面
- [ ] [目录] 页面

v0.7

- [x] 调整了首页收藏排列顺序, 规则为置顶 > 放送中 > 上次操作时间 > 其他, 长按收藏的图片可以置顶
- [x] [随便看看] 新增 (随机动画条目列表)
- [x] [条目] 若有的话, 动画的 ep 可以点击去到柠萌在线观看地址
- [x] [用户] 关于 TA

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

---

#### Features

- 素材使用了主站上能找到的 (bgm38 求大佬贡献)
- 番组进度管理
- 条目详情 (支持 Ep 倒序)
- 人物详情 (最近出演角色, 最近参与, 出演)
- 时间胶囊
- 超展开 (直接回复, 支持留言倒序, 整合章节内容, 电波提醒)
- 搜索 / 标签
- 其他用户空间, 个人时光机 (完整的, 可筛选标签, 可排序的收藏记录)
- 热门, 随便看看, 每日放送, 18 年鉴 (更沉浸, 内链接, 隐藏非必要内容)

---

#### Getting Started

** 下载 **

注意, 某个依赖包在淘宝源里面 404, 要切换为 npm 官方源

```bash
npm config set registry https://registry.npmjs.org
```

国内环境, 首次下载包有可能会异常地慢

```bash
git clone https://github.com/czy0729/Bangumi
cd ./Bangumi
npm install // or yarn 因为后全面会替换掉node_modules的icon, 使用yarn可能会出现回退的现象
```

** 前置操作 **

把 assets/iconfont/ 下的目录 vector-icons 替换掉 node_modules/@expo/ 下的 vector-icons

** 启动 **

```bash
npm start // 之后点击在浏览器打开的Expo Developer Tools, 点击 Run on iOS simulator
```

window 用法不详, 也不清楚到底能不能运行, 可以查阅 [Expo](https://github.com/expo/expo) 官方文档. 可以选择同一局域网真机扫码调试, 需先下载 Expo App

---

#### Page Preview

#### Login 登陆

<img src="./preview/login_1.png" width="200" alt="login_1" /> <img src="./preview/login_2.png" width="200" alt="login_2" />

#### Home 进度

<img src="./preview/home_3.png" width="200" alt="home_3" /> <img src="./preview/home_4.png" width="200" alt="home_4" /> <img src="./preview/home_7.png" width="200" alt="home_7" />

#### Subject 条目

<img src="./preview/s_1.png" width="200" alt="s_1" /> <img src="./preview/s_2.png" width="200" alt="s_2" /> <img src="./preview/s_6.png" width="200" alt="s_6" />

<img src="./preview/s_4.png" width="200" alt="s_4" /> <img src="./preview/s_5.png" width="200" alt="s_5" />

#### Discovery 首页聚合 / 更沉浸的年鉴

<img src="./preview/discovery_2.png" width="200" alt="discovery_2" /> <img src="./preview/discovery_3.png" width="200" alt="discovery_3" /> <img src="./preview/award_1.png" width="200" alt="award_1" /> <img src="./preview/award_2.png" width="200" alt="award_2" />

#### Search 搜索 / 标签

<img src="./preview/search_1.png" width="200" alt="search_1" /> <img src="./preview/search_2.png" width="200" alt="search_2" /> <img src="./preview/search_3.png" width="200" alt="search_3" /> <img src="./preview/tag_1.png" width="200" alt="tag_1" />

#### Mono 人物

<img src="./preview/mono_2.png" width="200" alt="mono_2" /> <img src="./preview/mono_3.png" width="200" alt="mono_3" /> <img src="./preview/mono_4.png" width="200" alt="mono_4" />

#### Timeline 时间胶囊

<img src="./preview/timeline_2.png" width="200" alt="timeline_2" /> <img src="./preview/timeline_3.png" width="200" alt="timeline_3" />

#### Rakuen 超展开

<img src="./preview/rakuen_1.png" width="200" alt="rakuen_1" /> <img src="./preview/topic_1.png" width="200" alt="topic_1" /> <img src="./preview/topic_4.png" width="200" alt="topic_4" />

#### Zone 用户空间

<img src="./preview/zone_1.png" width="200" alt="zone_1" /> <img src="./preview/zone_2.png" width="200" alt="zone_2" />

#### User 个人时光机

<img src="./preview/user_1.png" width="200" alt="user_1" /> <img src="./preview/user_2.png" width="200" alt="user_2" />

#### Other 每日放送 / 电波提醒 / 设置

<img src="./preview/calendar_1.png" width="200" alt="calendar_1" /> <img src="./preview/notify_1.png" width="200" alt="notify_1" /> <img src="./preview/setting_1.png" width="200" alt="setting_1" />
