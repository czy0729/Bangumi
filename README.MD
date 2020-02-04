<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/bangumi.png" width="100%" />

<p align="center">
  <img alt="Version: 2.7.0" src="https://img.shields.io/badge/Version-2.7.0-0366d6" />
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

## Versions

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

## Update

v2.7.0 - 2020/02/04

—— 新功能 ——

- [x] [短信] 内容展示, 回复短信
- [x] [电波提醒] 短信(私信)列表
- [x] [用户空间] 添加发短信入口
- [x] [设置] 可调整全局字体大小

—— 优化 ——

- [x] [登陆] 可以选择域名登陆 (登陆失败的可以切换试试)

—— 修复 ——

- [x] [首页收藏] 修复了多季度番组进度条进度不正确的问题
- [x] [用户空间] 修复了不能折叠展开番组的问题

—— 小圣杯助手 ——

- [x] [我的拍卖] 添加取消拍卖按钮
- [x] 首页底部添加 [教程帖子直达]

v2.6.0 - 2020/01/25

—— 新功能 ——

- [x] [年鉴] 19 年鉴

—— 优化 ——

- [x] [年鉴] 静态文件迁移至 CDN
- [x] 大部分条目封面和用户头像转移到 CDN, 减少对 bgm 源头的连接数, 提升速度和稳定性

—— 修复 ——

- [x] [帖子] 修复了一个楼层解析错误导致闪退的问题
- [x] [吐槽] 修复了吐槽无法回复的问题

—— 小圣杯助手 ——

- [x] [交易] 删除出价 100 的限制
- [x] [资产重组] 圣殿折叠
- [x] [资产重组] 可以看见当前竞拍状态
- [x] [资金分析] 更新股息算法
- [x] [高级分析] 计算优化, 整合圣殿股息
- [x] [高级分析] 新增献祭推荐
- [x] [最新圣殿] 可以加载更多
- [x] 列表添加圣殿股息排序
- [x] 角色页面可以复制 bgm 链接

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
