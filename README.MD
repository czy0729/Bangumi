# Bangumi

> 一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端
>
> 安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 50 个页面, 持续开发中...
>
> 尽量做到每个版本再各个板块都有新功能或优化

---

#### Download

安卓 [[APK 下载]](https://github.com/czy0729/Bangumi/releases) | [[酷安下载]](https://www.coolapk.com/apk/235642)

苹果好难审, 短时间内都没办法通过, 会跟苹果做长久作战. 目前有方法可以试用, 不会太复杂 [[iOS 试用方法]](https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD)

---

#### Versions

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

---

#### Todos

v2.1.0 - 2019/12/14

—— 新功能 ——

- [x] [全站] 黑暗模式 (稳定)
- [x] [首页进度] 更实用的条目排序(具体顺序: 放送中还有未看 > 放送中没未看 > 明天放送还有未看 > 明天放送中没未看 > 未完结新番还有未看 > 网页端默认排序)
- [x] [首页进度] 抛弃官方的放送中, 使用正确的时间, 会显示今天和明天放送条目的放送时间
- [x] [帖子] 删除留言
- [x] [设置] 显示缓存的数据大小(不包括图片)

—— 优化 ——

- [x] [帖子] 顶部小组缩略图会使用缓存尽快出现, 减少显示抖动

—— 修复 ——

- [x] [条目] 修复部分运营商(例如广东电信) github 接口被墙, 导致不能获取更多播放源头问题
- [x] [每日放送] 修复部分运营商(例如广东电信) github 接口被墙, 导致无法获取最新条目放送信息问题

—— 小圣杯助手 ——

- [x] [资产重组] 献祭支持股权融资模式
- [x] [设置] 可以设置为红涨绿跌(默认是绿涨红跌)
- [x] [交易] 自动拆单
- [x] [交易] 一键取消所有买卖挂单
- [x] [交易] 显示角色发行价
- [x] [交易] 折叠过多的交易记录
- [x] [交易] 委托和历史记录, 点击显示具体时间
- [x] [资产重组] 显示各个等级塔的数量
- [x] [资产重组] 修复了黑暗模式高级塔没有边框的问题

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

#### PowerBy

[[bangumi-api]](https://github.com/bangumi/api) 官方接口

[[bangumi-onair]](https://github.com/ekibun/bangumi_onair) 单集播放数据源

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[[tinygrail.com]](https://tinygrail.com) 小圣杯接口

[[www.ningmoe.com]](https://www.ningmoe.com) 柠萌瞬间接口

[[app.anitama.net]](https://app.anitama.net) Anitama 接口

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
