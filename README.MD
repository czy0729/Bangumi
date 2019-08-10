# Bangumi

> 一个基于`React-Native`的 [Bangumi](https://bangumi.tv) 第三方客户端
>
> 安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 30 个页面, 持续开发中...
>
> 尽量做到每个版本再各个板块都有新功能或优化, 预估 v1.0 左右上架 iOS 和 GooglePlay (开发者有点小贵, 100 和 25 美元, 先鸽一下...)

---

#### Download

[APK 下载地址](https://github.com/czy0729/Bangumi/releases)

---

#### Todos

v0.11
—— 新功能 ——

- [ ] [条目] 优化章节点击 ‘看到’ 之后反馈, 使尽快提供反馈 (原因是部分章节比较多的, 操作之后依赖再请求章节数据来判断章节状态, 但这个接口非常大且慢. 部分有多季度的共用章节的动漫, 有可能会出问题, 可自行下拉刷新判断)
- [x] [条目] 增加搜索 acfun、youku 单集播放源(@ekibun 提供的数据)
- [ ] [标签] 新增页面
- [ ] [时间胶囊] 查看和回复吐槽
- [ ] [人物] 增加人物近况
- [ ] [超展开] 帖子本地收藏 (记录只保留在本地数据里)
- [ ] [超展开] 坟贴标识
- [ ] [帖子] 表情导致部分文本丢失
- [ ] [帖子] 留言编辑和删除
- [ ] [电波提醒] 短信
- [ ] [发现] 对接了 2017-2010 的年鉴
- [ ] [用户空间] 同步率
- [ ] [用户空间] 添加对方为好友
- [ ] [个人中心] 增加跳转到自己的 netabare
- [ ] 条目名字、文章内容、回复内容能自由选择文字复制
- [ ] 更新 bangumi-data@0.3.0

—— 优化 ——

- [ ] [条目] 调整在看、在玩、在听等字眼
- [x] [发现] 减少初次渲染的图片数量
- [x] [电波提醒] 优化了页面
- [ ] [个人中心] 安卓端优化布局, 因部分安卓机型不兼容, 不使用渐变的布局
- [x] 统一安卓和 iOS 的 ActionSheet 样式

—— 修复 ——

- [ ] [帖子] 修复了文章和留言里面的图片加载困难的问题
- [ ] [帖子] 修复了部分样式混搭文本不显示的问题
- [ ] [个人中心] 修复了切换 tab 顶部距离问题
- [x] [个人中心] 现在一定能看见设置图标, 避免登陆过期时不能登出
- [ ] 修复了主站样式更新, 导致所有列表星星消失的问题
- [ ] 修复了部分机型状态栏颜色的问题
- [ ] 修复了部分机型一行文字同时存在多种字号, 大的字号文本看不全的问题

---

#### Versions

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

#### Demo

[若要在线预览, 请先安装 expo app](https://expo.io/tools)

[这个 expo app 貌似不用梯子](https://apkpure.com/expo/host.exp.exponent)

<img src="./preview/expo-qr.png" width="200" alt="expo-qr" />

[expo 项目主页](https://expo.io/@a402731062/bangumi)

---

#### Page Preview

#### Home 进度

<img src="./preview/login_3.png" width="200" alt="login_3" /> <img src="./preview/home_3.png" width="200" alt="home_3" /> <img src="./preview/home_4.png" width="200" alt="home_4" /> <img src="./preview/home_8.png" width="200" alt="home_8" />

#### Subject 条目

<img src="./preview/s_1.png" width="200" alt="s_1" /> <img src="./preview/s_2.png" width="200" alt="s_2" /> <img src="./preview/s_6.png" width="200" alt="s_6" />

<img src="./preview/s_4.png" width="200" alt="s_4" /> <img src="./preview/s_5.png" width="200" alt="s_5" />

#### Discovery 发现

<img src="./preview/discovery_4.png" width="200" alt="discovery_4" /> <img src="./preview/discovery_3.png" width="200" alt="discovery_3" /> <img src="./preview/award_1.png" width="200" alt="award_1" /> <img src="./preview/award_2.png" width="200" alt="award_2" />

#### Search 搜索 / 标签

<img src="./preview/search_1.png" width="200" alt="search_1" /> <img src="./preview/search_2.png" width="200" alt="search_2" /> <img src="./preview/search_3.png" width="200" alt="search_3" /> <img src="./preview/tag_1.png" width="200" alt="tag_1" />

#### Mono 人物

<img src="./preview/mono_2.png" width="200" alt="mono_2" /> <img src="./preview/mono_3.png" width="200" alt="mono_3" /> <img src="./preview/mono_4.png" width="200" alt="mono_4" />

#### Timeline 时间胶囊

<img src="./preview/timeline_2.png" width="200" alt="timeline_2" /> <img src="./preview/timeline_4.png" width="200" alt="timeline_4" />

#### Rakuen 超展开

<img src="./preview/rakuen_3.png" width="200" alt="rakuen_3" /> <img src="./preview/topic_1.png" width="200" alt="topic_1" /> <img src="./preview/topic_5.png" width="200" alt="topic_5" /> <img src="./preview/topic_4.png" width="200" alt="topic_4" />

<img src="./preview/rakuen_0.png" width="200" alt="rakuen_0" /> <img src="./preview/group_1.png" width="200" alt="group_1" />

#### Zone 用户空间

<img src="./preview/zone_1.png" width="200" alt="zone_1" /> <img src="./preview/zone_2.png" width="200" alt="zone_2" />

#### User 个人时光机 / 好友

<img src="./preview/user_3.png" width="200" alt="user_3" /> <img src="./preview/user_2.png" width="200" alt="user_2" /> <img src="./preview/friends_1.png" width="200" alt="friends_1" />

#### Other 排行榜 / 每日放送 / 电波提醒 / 设置

<img src="./preview/rank_1.png" width="200" alt="rank_1" /> <img src="./preview/calendar_2.png" width="200" alt="calendar_2" /> <img src="./preview/notify_1.png" width="200" alt="notify_1" /> <img src="./preview/setting_1.png" width="200" alt="setting_1" />

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
