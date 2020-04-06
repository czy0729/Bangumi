<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/bangumi.png" width="100%" />

<p align="center">
  <img alt="Version: 3.1.0" src="https://img.shields.io/badge/Version-3.1.0-0366d6" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-33CC12" />
  <img alt="Codacy" src="https://api.codacy.com/project/badge/Grade/473bdb1186484703b4069148730a3c12?isInternal=true" />
  <img alt="jsdelivr" src="https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi/badge" />
</p>

---

一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端

安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 70 个页面, 持续开发中...

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

v3.1.0 - 2020/04/06

—— 新功能 ——

- [x] [发现] 全站日志模块 (带过滤游客日志)
- [x] [条目] PS4 游戏可以跳转到 psnine 查看奖杯

—— 优化 ——

- [x] [条目] 漫画若有数据, 显示正确的 chap 和 vol 数目
- [x] [条目] 漫画的单行本板块, 漫画卷号一定显示 (例 `ダーリン・イン・ザ…` 改为 `ダーリン・… (001)`)
- [x] [条目] 添加了 2 个搜索 comic 的源头(新新漫画, 漫画 123)
- [x] [条目] 分数新 UI
- [x] [发现] 首页热门条目 CDN 化, 加速渲染
- [x] [日志] 详情页补充关联条目

—— 修复 ——

- [x] [条目] 修复了条目页面, 文字不能自由选择复制的问题 (安卓)
- [x] [帖子] 修复了章节讨论, 每个首楼层没有回复按钮的问题
- [x] [我的] 修复了标签过多, 没有匹配到标签的问题

—— 小圣杯助手 v2.1.0 ——

- [x] [幻想乡刮刮乐] 修复了抽奖后数据显示的问题
- [x] [资金日志] 修复了遇到 ICO 失败记录闪退的问题
- [x] [用户中心] 可以查看别人的小圣杯信息
- [x] [交易] 买入总额大于 2W 的订单增加确认提示, 防止误操作
- [x] [交易] 冰山订单价格永远置前

## Page Preview

单独预览 [日间模式](https://github.com/czy0729/Bangumi/blob/master/web/LIGHT-MODE.MD) | [黑暗模式](https://github.com/czy0729/Bangumi/blob/master/web/DARK-MODE.MD)

#### 展示用

<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/preview-1.jpg" width="280px" alt="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/preview-1.jpg" /><img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/preview-2.jpg" width="280px" alt="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/preview-2.jpg" /><img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/preview-3.jpg" width="280px" alt="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/all/preview-3.jpg" />

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
