# Bangumi

> 一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端
>
> 安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 40 个页面, 持续开发中...
>
> 尽量做到每个版本再各个板块都有新功能或优化 (iOS 在审了)

---

#### Download

安卓
[APK 下载地址](https://github.com/czy0729/Bangumi/releases)

[酷安](https://www.coolapk.com/apk/235642)

苹果还没过审, 有方法可以试用
[iOS 试用方法](https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD)

---

#### PowerBy

[bangumi-api](https://github.com/bangumi/api) 官方接口

[bangumi-onair](https://github.com/ekibun/bangumi_onair) 单集播放数据源

[bangumi-data](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[https://tinygrail.com](https://tinygrail.com) 小圣杯接口

[https://www.ningmoe.com](https://www.ningmoe.com) 柠萌瞬间接口

[https://app.anitama.net](https://app.anitama.net) Anitama 接口

---

#### Versions

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

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
