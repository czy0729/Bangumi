# Bangumi

> 这是一个基于`React-Native`的 [Bangumi](https://bangumi.tv) 第三方客户端
>
> 对安卓和 iOS 都做到兼容, 尽量保持一致, 功能持续开发中...
>
> 预估 v1.0 左右上架 iOS 和 GooglePlay

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

- [ ] [首页进度] 书籍能在列表里面操作看过下一章
- [ ] [条目] 优化章节点击 ‘看到’ 之后反馈, 使尽快提供反馈 (原因是部分章节比较多的, 操作之后依赖再请求章节数据来判断章节状态, 但这个接口非常大且慢. 部分有多季度的共用章节的动漫, 有可能会出问题, 可自行下拉刷新判断)
- [ ] [条目] 匹配更多的在线观看源
- [ ] [索引] 页面
- [ ] [目录] 页面
- [ ] [排行榜] 页面
- [ ] [条目] 增加搜索 Bilibili 播放源
- [ ] [时间胶囊] 查看吐槽
- [ ] [时间胶囊] 回复吐槽
- [ ] [帖子] 留言删除
- [ ] [帖子] 留言编辑
- [ ] [用户] 好友列表
- [ ] [用户] 好友存活率
- [ ] [用户] 同步率
- [ ] 统一部分样式, 比如不同的留言样式
- [ ] 夜间模式 (下个版本吧)

v0.9
PS: 这次版本用 0.9 吧, 0.8 在我开发期间不知道什么原因, 被热推送了.
本次版本代码层面上改动较大, 若发现原功能不正常了, 恳请反馈

- [x] [登陆] 流畅的邮箱密码直接登陆 (实验性, 可能会出现掉线现象; 若发现影响后续功能使用, 可暂时切回旧版登陆)
- [x] [首页进度] 缩略图可长按, 加入了 ‘全部展开’ 和 ‘全部收起’
- [x] [小组] 新增小组页面
- [x] [超展开] 增加独立设置页, 方便扩展
- [x] [超展开] 可以设置屏蔽默认头像用户且少回复的帖子 (有效屏蔽广告姬)
- [x] [超展开] 可以设置屏蔽小组、条目、人物 (对于我来说, 通常用于屏蔽不感兴趣的私有小组)
- [x] [超展开] 可以设置屏蔽用户帖子 (回复暂时不作处理)
- [x] [超展开] 列表可以选择直接进入对应小组、条目、人物
- [x] [超展开] 列表能反映曾看过的帖子有多少新回复, 表现为 (+总回复数) +新增回复数
- [x] [帖子] 优化了首次加载布局的抖动
- [x] [帖子] 修复帖子最后一行空白问题, 防止点击闪退
- [x] [帖子] 有新回复的帖子, 新楼层会有不同的背景颜色
- [x] [每日放送] 添加集数和评分
- [x] [用户] 好友列表 (暂为跳网页)
- [x] [个人收藏] 修复了设置过用户名的用户无法加载下一页数据的问题
- [x] [开发] 错误上报
- [x] 更新了 bangumi-data, 兼容到 7 月番

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

<img src="./preview/rakuen_3.png" width="200" alt="rakuen_3" /> <img src="./preview/topic_1.png" width="200" alt="topic_1" /> <img src="./preview/topic_5.png" width="200" alt="topic_5" /> <img src="./preview/topic_4.png" width="200" alt="topic_4" />

<img src="./preview/rakuen_0.png" width="200" alt="rakuen_0" /> <img src="./preview/group_5.png" width="200" alt="group_5" />

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
