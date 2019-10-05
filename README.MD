# Bangumi

> 一个基于`React-Native`的 [Bangumi](https://bangumi.tv) 第三方客户端
>
> 安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 30 个页面, 持续开发中...
>
> 尽量做到每个版本再各个板块都有新功能或优化, 预估 v1.0 左右上架 iOS 和 GooglePlay (开发者有点小贵, 100 和 25 美元, 先鸽一下...)

---

#### Download

安卓
[APK 下载地址](https://github.com/czy0729/Bangumi/releases)

苹果还没过审, 有个方法可以试用
[iOS 试用方法](https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD)

---

#### Versions

v1.3.0 - 2019/10/05

—— 新功能 ——

- [x] [发现] 新增我收藏的人物、人物近况
- [x] [发现] 标签
- [x] [小圣杯] 交易榜单、新番榜单、我的买单、我的卖单、我的持仓, 列表可以自定义二次排序 (按持股数、持仓价值、活跃度、市场价、发行量、当前股价、涨跌、新番奖励)
- [x] [小圣杯] 股息预测
- [x] [小圣杯] 我的持仓显示圣殿 (等我弄懂怎么玩再对接小圣杯新功能)

—— 优化 ——

- [x] [人物] 吐槽箱改为倒序
- [x] [发现] 优化 UI
- [x] [搜索] 优化 UI
- [x] [个人中心] 在看、抛弃也显示天数
- [x] iOS 端的 Tabs 也可以使用手势退后
- [x] 加入了防止短时间内多次点击的机制 (400ms)
- [x] 更新了 bangumi-data, 兼容到 10 月番 (用于条目名称中日互转)
- [x] iOS 端底层 SDK 33 -> 35, 支持 iOS13 (安卓没什么收益不升级)

—— 修复 ——

- [x] [首页进度] 修复了新用户点击章节讨论之后页面卡住无法用的问题
- [x] [条目] 修复了开启了热力图, 当所有 ep 都没有讨论数的时候, 有几率报错闪退的问题
- [x] [搜索] 修复了人物搜索有时候失效的问题
- [x] [个人中心] 修复了当切换到一个很少数据的 tab 时, 位置错乱的问题 (还没完全修好所有情况)
- [x] [小圣杯] 修复了我的总资产有时显示不正确的问题
- [x] [小圣杯] 修复了 ICO 即将结束数据不正确的问题
- [x] [小圣杯] iOS 人物直达没有确定按钮, 需要额外加一个确认按钮
- [x] [小圣杯] 修复了我的持仓 ICO 头像点击链接错误的问题
- [x] [小圣杯] 资金日志 ICO 类型, 数据并没有角色 id, 点击头像不应跳转
- [x] [小圣杯] 修复了部分头像无法加载的问题 (现在假如还有不能看见的头像, 那就是被墙了)
- [x] [小圣杯] 修复了新版番市首富闪退的问题
- [x] [小圣杯] 修复了活跃时间错误 (永远显示刚刚) 的问题, 并且显示精准到分钟

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

---

#### Todos

v1.x

—— 预定功能 ——

- [ ] [超展开] 帖子本地收藏 (记录只保留在本地数据里)
- [ ] [时间胶囊] 查看、回复吐槽
- [ ] [帖子] 新增楼层滚动条
- [ ] [发现] 新增 online 人数
- [ ] [发现] 最近新增条目
- [ ] [帖子] 留言编辑和删除
- [ ] [人物] 人物最近演出角色
- [ ] [人物] 人物最近参与
- [ ] [人物] 收藏了该人物的成员
- [ ] [电波提醒] 短信
- [ ] [电波提醒] 跳转到帖子自动到达目标楼层
- [ ] 统一部分样式, 比如不同的留言、时间样式
- [ ] 夜间模式 (现在的写法开发这个工作量很巨大, iOS 上架后再做)
- [ ] 适配安卓的 Adaptive Icons

—— 小圣杯 ——

- [ ] 我的收藏
- [ ] 资金分析
- [ ] [小圣杯] 圣殿信息展示 (资产重组和竞拍功能待功能稳定再开发)

—— 优化 ——

- [ ] [超展开] 重写列表分析逻辑
- [ ] 对大部分主要页面的跳转做占位数据传递
- [ ] 优化 hm.js

—— 已知问题 ——

- [ ] [条目] 部分带偏移的动漫, 在线观看地址没正确偏移 (不太影响使用, 也许没办法解决)
- [ ] [电波提醒] 点击进入帖子也会刷新历史查看记录 (这个需求暂时不够数据做)
- [ ] [帖子] 修复了部分不允许跨域访问的图片看不见的问题
- [ ] [好友] 修复了昵称有时会出现这个人的小组的信息
- [ ] [个人中心] 修复了登陆过期后, 跳转到登陆, 成功后返回不重新请求, 导致一直 loading 的问题

---

#### Features

- 小圣杯 (更适合移动端的交互)
- 素材使用了主站上能找到的 (b38 求大佬贡献)
- 番组进度管理
- 条目详情
- 人物详情 (最近出演、参与、出演)
- 时间胶囊
- 超展开 (各种人性化功能, 屏蔽, 回复, 留言倒序, 电波提醒)
- 小组
- 搜索 / 标签 / 排行版
- 个人时光机 (完整, 可筛选, 可排序)
- 好友 / 用户空间
- 热门 / 随便看看 /每日放送 / 历年年鉴

---

#### Page Preview

#### 进度

<img src="./preview/11.png" width="200" alt="11" /> <img src="./preview/12.png" width="200" alt="12" /> <img src="./preview/13.png" width="200" alt="13" /> <img src="./preview/14.png" width="200" alt="14" />

#### 条目 / 人物

<img src="./preview/21.png" width="200" alt="21" /> <img src="./preview/22.png" width="200" alt="22" /> <img src="./preview/23.png" width="200" alt="23" /> <img src="./preview/24.png" width="200" alt="24" />

<img src="./preview/31.png" width="200" alt="31" /> <img src="./preview/32.png" width="200" alt="32" /> <img src="./preview/33.png" width="200" alt="33" /> <img src="./preview/34.png" width="200" alt="34" />

#### 发现

<img src="./preview/41.png" width="200" alt="41" /> <img src="./preview/42.png" width="200" alt="42" /> <img src="./preview/43.png" width="200" alt="43" /> <img src="./preview/44.png" width="200" alt="44" />

#### 超展开

<img src="./preview/51.png" width="200" alt="51" /> <img src="./preview/52.png" width="200" alt="52" /> <img src="./preview/53.png" width="200" alt="53" /> <img src="./preview/54.png" width="200" alt="54" />

#### 时间胶囊

<img src="./preview/61.png" width="200" alt="61" /> <img src="./preview/62.png" width="200" alt="62" /> <img src="./preview/63.png" width="200" alt="63" />

#### 索引

<img src="./preview/71.png" width="200" alt="71" /> <img src="./preview/72.png" width="200" alt="72" /> <img src="./preview/73.png" width="200" alt="73" /> <img src="./preview/74.png" width="200" alt="74" />

#### 空间 / 时光机

<img src="./preview/81.png" width="200" alt="81" /> <img src="./preview/82.png" width="200" alt="82" /> <img src="./preview/83.png" width="200" alt="83" /> <img src="./preview/84.png" width="200" alt="84" />

#### 小圣杯 (新)

<img src="./preview/01.png" width="200" alt="01" /> <img src="./preview/02.png" width="200" alt="02" /> <img src="./preview/03.png" width="200" alt="03" /> <img src="./preview/04.png" width="200" alt="04" />
<img src="./preview/05.png" width="200" alt="05" /> <img src="./preview/06.png" width="200" alt="06" /> <img src="./preview/07.png" width="200" alt="07" /> <img src="./preview/08.png" width="200" alt="08" />
<img src="./preview/09.png" width="200" alt="09" /> <img src="./preview/10.png" width="200" alt="10" />

#### Demo

[若要在线预览, 请先安装 expo app](https://expo.io/tools)

[这个 expo app 貌似不用梯子](https://apkpure.com/expo/host.exp.exponent)

<img src="./preview/expo-qr.png" width="200" alt="expo-qr" />

[expo 项目主页](https://expo.io/@a402731062/bangumi)

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

自定义 Iconfont, 把 assets/iconfont/ 下的目录 `vector-icons` 和 node_modules/@expo/ 下的目录 `vector-icons` 合并 (注意是合并不是替换, 假如不行, 就手动把文件夹下面的 2 个文件, 找到对应的地方替换, 观察文件修改日期是不是变化了), 原理其实就是用自己的字体文件把原有的 AntDesign 字体文件替换掉, 之后引用 Icon.AntDesign .

** 启动 **

```bash
npm start // 之后点击在浏览器打开的Expo Developer Tools, 点击 Run on iOS simulator
```

window 用法不详, 也不清楚到底能不能运行, 可以查阅 [Expo](https://github.com/expo/expo) 官方文档. 可以选择同一局域网真机扫码调试, 需先下载 Expo App
