# Bangumi

> 一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端
>
> 安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 50 个页面, 持续开发中...
>
> 尽量做到每个版本再各个板块都有新功能或优化

---

#### Download

安卓 [[APK 下载]](https://github.com/czy0729/Bangumi/releases) | [[酷安下载]](https://www.coolapk.com/apk/235642)

苹果好难审, 短时间内都没办法通过, 会跟苹果做长久作战. 目前有方法可以试用, 不会太复杂
[TestFlight] | [[iOS 试用方法]](https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD)

---

#### Versions

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

---

#### Update

v2.4.0 - 2020/01/07

—— 新功能 ——

- [x] [发现] 目录 (自己收藏和创建的目录待下版本)
- [x] [条目] 章节右侧增加 [搜索] 功能 (暂支持一个动漫和三次元都非常齐全的源头, 未来会增加更多源头)

—— 优化 ——

- [x] [条目] 人工修正了最近新番的在线源头
- [x] [条目] 设置里可选择隐藏他人 bgm 评分
- [x] [小圣杯助手] 稍微再优化了部分业务流程
- [x] [小圣杯助手] 拖动条右方加入 [最大] 按钮

---

#### Features

- 小圣杯 (更适合移动端交互的角色交易 air game)
- 素材使用了主站上能找到的 (b38 求大佬贡献)
- 番组进度管理
- 条目详情
- 人物详情
- 时间胶囊
- 超展开 (帖子, 各种人性化功能, 屏蔽, 回复, 留言倒序, 电波提醒)
- 小组
- 搜索 / 标签 / 排行版
- 个人时光机 (完整, 可筛选, 可排序)
- 好友 / 用户空间
- 热门 / 随便看看 /每日放送 / 历年年鉴

---

#### Page Preview

<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/light/1-1.png" width="176" /><img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/light/1-2.png" width="176" /><img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/light/1-3.png" width="176" /><img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/light/1-4.png" width="176" /><img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/light/1-5.png" width="176" />

#### Demo

[若要在线预览, 请先安装 expo app](https://expo.io/tools)

[这个 expo app 貌似不用梯子](https://apkpure.com/expo/host.exp.exponent)

<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@latest/preview/expo-qr.png" width="200" alt="expo-qr" />

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
