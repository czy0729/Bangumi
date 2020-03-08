<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/bangumi.png" width="100%" />

<p align="center">
  <img alt="Version: 2.9.0" src="https://img.shields.io/badge/Version-2.9.0-0366d6" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-33CC12" />
  <img alt="Codacy" src="https://api.codacy.com/project/badge/Grade/473bdb1186484703b4069148730a3c12?isInternal=true" />
  <img alt="jsdelivr" src="https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi/badge" />
</p>

---

一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端

安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 50 个页面, 持续开发中...

Bangumi 是用于管理追番进度（不限于动漫、音乐、日剧、AVG），发现和讨论番组的第三方客户端。

## Download

安卓 [APK 下载](https://github.com/czy0729/Bangumi/releases) | [酷安下载](https://www.coolapk.com/apk/235642)

苹果好难审, 短时间内都没办法通过, 会跟苹果做长久作战. 目前有方法可以试用, 不会太复杂
[TestFlight] | [[iOS 试用方法]](https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD)

## PowerBy

[[bangumi-subject]](https://github.com/czy0729/Bangumi-Subject) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Subject/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Subject) 本人维护的条目静态数据 CDN

[[bangumi-oss]](https://github.com/czy0729/Bangumi-OSS) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-OSS/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-OSS) 本人维护的热门条目封面和活跃用户头像对象存储 CDN

[[bangumi-api]](https://github.com/bangumi/api) 官方接口

[[bangumi-onair]](https://github.com/ekibun/bangumi_onair) 单集播放数据源

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[[tinygrail.com]](https://tinygrail.com) 小圣杯接口

## Features

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

## Versions

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

## Update

v2.9.0 - 2020/03/08

最近遇到一个情况, 安卓应用缓存到了 100M 之后, 就无法再写入了, 会出现每次进入 APP 数据都没缓存的问题, 请定期自行到安卓系统里(不是 APP 设置里面的那个)清除应用缓存.

—— 优化 ——

- [x] [帖子] 回复右上方小按钮, 我的和好友按钮没对应数据则不显示, 倒序改为针对整个帖子模块
- [x] [CDN] 现实人物
- [x] 换了一套图标
- [x] [UI] 数据展示缩减, 减少无意义元素、线条、阴影使更扁平, 重要文字增大, 辅助文字缩小, 某些地方删除换行, 时间样式统一

—— 小圣杯助手 v1.4.0 ——

- [x] 优化股息预测文字的显示
- [x] [萌王] 列表页
- [x] [交易] 修复安卓冰山按钮不能点击的问题
- [x] [资产重组] 竞拍数量旁边增加快捷补到 500、2500、最大的按钮
- [x] [道具列表] 我的道具页面, 混沌魔方使用
- [x] [英灵殿]、[拍卖推荐] 当角色在竞拍中, 列表项有竞拍中的标记
- [x] 董事会从人物页面移到 [资产重组]
- [x] [资产重组] 可以隐藏人物封面图
- [x] [我的持仓] 默认显示固定资产数目

## Page Preview

单独预览 [日间模式](https://github.com/czy0729/Bangumi/blob/master/web/LIGHT-MODE.MD) | [黑暗模式](https://github.com/czy0729/Bangumi/blob/master/web/DARK-MODE.MD)

#### 基础功能

<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/1.png" width="100%" alt="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/1.png" /><img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/d-2.png" width="100%" alt="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/d-2.png" />

#### 小圣杯模块

<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/t-1.png" width="100%" alt="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/t-1.png" />

(被墙看不见图的可以复制 alt 打开)

## Demo

[若要在线预览, 请先安装 expo app](https://expo.io/tools)

[这个 expo app 貌似不用梯子](https://apkpure.com/expo/host.exp.exponent)

<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@latest/preview/expo-qr.png" width="200" alt="expo-qr" />

[expo 项目主页](https://expo.io/@a402731062/bangumi)

## Getting Started

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
