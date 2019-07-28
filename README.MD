# Bangumi

> 这是一个基于`React-Native`的 [Bangumi](https://bangumi.tv) 第三方客户端
>
> 对安卓和 iOS 都做到兼容, 尽量保持一致, 目前已开发不少于30个页面, 持续开发中...
>
> 预估 v1.0 左右上架 iOS 和 GooglePlay (开发者有点小贵, 随缘...)

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
- [x] [超展开] IOS端不能回复, 可能要用新方法获取和管理cookie

v0.x
- [ ] [首页进度] 书籍能在列表里面操作看过下一章
- [ ] [条目] 优化章节点击 ‘看到’ 之后反馈, 使尽快提供反馈 (原因是部分章节比较多的, 操作之后依赖再请求章节数据来判断章节状态, 但这个接口非常大且慢. 部分有多季度的共用章节的动漫, 有可能会出问题, 可自行下拉刷新判断)
- [ ] [目录] 页面
- [ ] [时间胶囊] 查看吐槽
- [ ] [时间胶囊] 回复吐槽
- [ ] [帖子] 留言删除
- [ ] [帖子] 留言编辑
- [ ] 短信
- [ ] 统一部分样式, 比如不同的留言样式
- [ ] 夜间模式

v0.10
- [x] 导航栏改为5个菜单, 增加了首页和我的
- [x] [收藏] 页面增加消息提示, 并且会定时查询是否有新消息
- [x] [收藏] 安卓端章节点击的`本集讨论`字眼改为`(+N)章节标题`
- [x] [条目] 优化了封面图首次加载闪烁问题
- [x] [条目] 增加搜索Bilibili、腾讯视频、爱奇艺单集播放源(@ekibun 提供的数据)
- [x] [每日放送] 改为大图, 增加了已收藏提示、播放时间
- [ ] [帖子] 楼层增加好友标识
- [ ] [帖子] 增加只查看与我相关的楼层
- [x] [用户] 好友列表
- [x] [用户] 好友同步率
- [x] [用户] 好友最近操作时间(存活率)
- [ ] [索引] 页面
- [ ] [排行榜] 页面

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

---

#### Features

- 素材使用了主站上能找到的 (b38 求大佬贡献)
- 番组进度管理
- 条目详情 (支持 Ep 倒序)
- 人物详情 (最近出演、参与、出演)
- 时间胶囊
- 超展开 (各种人性化功能, 自定义屏蔽, 回复, 留言倒序, 电波提醒)
- 小组
- 搜索 / 标签
- 个人时光机, 其他用户空间 (完整, 可筛选, 可排序)
- 热门, 随便看看, 每日放送, 18 年鉴 (更沉浸, 内链接)

---

#### Page Preview

#### Home 进度

<img src="./preview/login_3.png" width="200" alt="login_3" /> <img src="./preview/home_3.png" width="200" alt="home_3" /> <img src="./preview/home_4.png" width="200" alt="home_4" /> <img src="./preview/home_7.png" width="200" alt="home_7" />

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

<img src="./preview/rakuen_3.png" width="200" alt="rakuen_3" /> <img src="./preview/topic_1.png" width="200" alt="topic_1" /> <img src="./preview/topic_5.png" width="200" alt="topic_5" /> <img src="./preview/topic_4.png" width="200" alt="topic_4" />

<img src="./preview/rakuen_0.png" width="200" alt="rakuen_0" /> <img src="./preview/group_1.png" width="200" alt="group_1" />

#### Zone 用户空间

<img src="./preview/zone_1.png" width="200" alt="zone_1" /> <img src="./preview/zone_2.png" width="200" alt="zone_2" />

#### User 个人时光机

<img src="./preview/user_1.png" width="200" alt="user_1" /> <img src="./preview/user_2.png" width="200" alt="user_2" />

#### Other 每日放送 / 电波提醒 / 设置

<img src="./preview/calendar_2.png" width="200" alt="calendar_2" /> <img src="./preview/notify_1.png" width="200" alt="notify_1" /> <img src="./preview/setting_1.png" width="200" alt="setting_1" />

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
