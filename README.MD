<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/bangumi.png" width="100%" />

<p align="center">
  <img alt="Version: 5.4.0" src="https://img.shields.io/badge/Version-5.4.0-0366d6" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-33CC12" />
  <img alt="Codacy" src="https://api.codacy.com/project/badge/Grade/473bdb1186484703b4069148730a3c12?isInternal=true" />
  <img alt="jsdelivr" src="https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi/badge" />
</p>

---

一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端

安卓和 iOS 都做了兼容，并最大限度保持一致

目前已开发不少于 70 个页面，基于移动端重新设计布局，几乎涵盖网站所有页面

Bangumi 是用于管理追番进度（不限于动漫、音乐、日剧、游戏、AVG），发现和讨论番组

本人并没有原生开发经验，用于练手 RN，希望通过这个平台数据去学习更多

## Download

[安卓 APK 下载](https://github.com/czy0729/Bangumi/releases) | [酷安市场下载](https://www.coolapk.com/apk/235642) | Google Play 被恶意举报已被暂停申诉无果，因为不同渠道包互斥，只能建议之前使用此渠道的用户卸载后使用其他渠道

苹果开发者账号已过期，期间没能过审，有缘再送审（100 刀喂狗了 bgm38）
[iOS 上当前能使用的方法](https://github.com/czy0729/Bangumi/blob/master/web/IOS-TEST.MD) | [Expo 主页](https://expo.io/@bgm-ios-test/bangumi-pro)

## Features

### 基本功能

- 番组进度管理
- 条目、角色详情
- 时间线（用户动态）
- 超展开（帖吧）
- 时光机（个人中心）、用户空间
- 不限于搜索、排行榜、索引、目录、每日放送、年鉴、标签

### 特色功能

- 大部分资源覆盖到自维护 [CDN](https://github.com/czy0729/Bangumi-Subject)，访问高速化
- 图片使用 [CDN](https://github.com/czy0729/Bangumi-OSS)，有后处理，比源网站更快、质量更高、流量更小
- 当季番剧精准到单集网络播放源、漫画源查询，找番剧、文库、游戏、音乐
- 番剧、游戏截图预览
- [小圣杯](https://bgm.tv/dev/app/1143)（角色交易空气游戏, App 独立设计 UI 和交互）

## Recently Update

v5.4.0 - 2021/10/27

—— 新增 ——

- [x] [发现] 支持自定义菜单排序
- [x] [帖子] 支持 bgm 内条目、人物、帖子等链接直接显示成信息块（超展开设置可关闭）
- [x] [帖子] 支持正文内容猜测条目，可以直接跳转到对应条目（实验性，超展开设置可关闭）

—— 优化 ——

- [x] [条目] 书籍条目，数据足够的情况显示进度条
- [x] [帖子] 楼层旁边菜单增加翻译功能
- [x] [超展开设置] 可添加屏蔽关键字
- [x] [设置] 现在同步设置也会同步超展开的设置/屏蔽词了
- [x] [时光机] 方格布局可以在设置自定义个数
- [x] 用图标区分直接打开浏览器的跳转

—— 修复 ——

- [x] [条目] 修复了放送日为周日，自定义放送时间没默认填入的问题
- [x] [帖子] 修复了书籍类条目帖子闪退的问题
- [x] [帖子] 回复框优化了链接的插入写法，优化了插入 bgm 表情和 BBCode 后的光标位置
- [x] [小圣杯] 修复了 ico 角色详情页面进入人物页面，id 错误的问题

—— 已知问题 ——

- [ ] 在交叉使用多个账号，或者在彻底删除一个条目的收藏后，列表上会出现叠加的【已收藏】状态标记

[CHANGELOGS](https://github.com/czy0729/Bangumi/blob/master/web/CHANGELOG.MD)

## Next

- [发现] 支持自定义菜单排序

https://user-images.githubusercontent.com/13514316/137933757-4dba738f-e081-4fcf-8827-6c7d6c2ae89e.mp4

## PowerBy

[![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Subject/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Subject) [[Bangumi-Subject]](https://github.com/czy0729/Bangumi-Subject) 条目快照

[![](https://data.jsdelivr.com/v1/package/gh/ekibot/bangumi-onair/badge)](https://www.jsdelivr.com/package/gh/ekibot/bangumi-onair) [[Bangumi-OnAir]](https://github.com/ekibot/bangumi-onair) [ekibun](https://github.com/ekibun) 的单集播放数据源

[![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Mono/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Mono) [[Bangumi-Mono]](https://github.com/czy0729/Bangumi-Mono)人物快照

[![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-OSS/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-OSS) [[Bangumi-OSS]](https://github.com/czy0729/Bangumi-OSS) 热门条目封面和活跃用户头像对象存储

[![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Rakuen/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Rakuen) [[Bangumi-Rakuen]](https://github.com/czy0729/Bangumi-Rakuen) 帖子快照

[![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Static/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Static) [[Bangumi-Static]](https://github.com/czy0729/Bangumi-Static) 聚合静态数据

[![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Game/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Game) [[Bangumi-Game]](https://github.com/czy0729/Bangumi-Game) 游戏条目扩展数据

[[bangumi-mosaic-tile]](https://github.com/weizhenye/bangumi-mosaic-tile) [weizhenye](https://github.com/weizhenye) 的用户统计瓷砖库

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[[bangumi-api]](https://github.com/bangumi/api) 官方接口

## Preview

#### 基础功能

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/1.jpg" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/1.jpg" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/2.jpg" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/2.jpg" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/3.jpg" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/3.jpg" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/4.jpg" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/4.jpg" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/5.jpg" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/5.jpg" width="100%" />

#### 小圣杯（角色模拟炒股）模块

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/6.jpg" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/6.jpg" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/7.jpg" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210622/data/screenshot/4.13.0/7.jpg" width="100%" />

（被墙看不见图的可以复制 alt 打开）

## 免责声明

- 本项目所有数据信息均来自各种网站，不提供任何形式的媒体下载、直接播放和修改功能
- 本项目承诺不保存任何第三方用户信息
- 本项目代码仅供学习交流，不得用于商业用途，若侵权请联系

---

## 本地开发

** 提示 **

本人一直在 mac 环境下开发，iOS 跑 expo 客户端调试，安卓跑真机 usb 调试，window 用法不详，遇到跑不起来，不要太过折腾，window 和 mac 的环境差异还是比较大的，可以查阅 [Expo](https://github.com/expo/expo) 官方文档，您可以选择同一局域网真机扫码调试，需先下载 Expo App

** 下载 **

不要使用 taobao 源头，可能会在跑环境时提示不允许代理

```bash
npm config set registry https://registry.npmjs.org
```

国内环境，首次下载包有可能会异常地慢

```bash
git clone https://github.com/czy0729/Bangumi
cd ./Bangumi
npm install
```

** 启动 **

```bash
npm start // [iOS] 之后点击在浏览器打开的Expo Developer Tools，点击 Run on iOS simulator

// or

react-native run-android // [android] 真机 usb 调试

```

** 安卓真机 usb 调试遇到的问题 **

- 不能安装请尝试在命令前添加 sudo

- 安卓系统请打开开发者调试模式，需要至少进行一次打开 Android Studio 的同时连接 usb 允许添加调试

- 调试请保证给应用安装权限，允许悬浮窗权限

- 遇到 spawnSync adb ENOENT，参考 [stackoverflow](https://stackoverflow.com/questions/38835931/react-native-adb-reverse-enoent)

** 补充常见错误，已在 mac M1 上调试成功 **

最近购入了 M1，尝试实用新环境，iOS expo 运行一路顺风，但是打包 apk 遇到很多问题，总结如下：

- 一定要使用 JAVA jdk 8，不是 jre！[[jdk 8 下载地址]](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)，善用 `java -version` 和 `/usr/libexec/java_home -V` 命令查看正在使用的是不是 jdk1.8.0_281.jdk（类似）

- 打包前一定要安装 watchman，不然会遇到监听文件过多错误

- 打包遇到失败，请进入 android 目录下执行 `./gradlew clean` 后再重新打包

- 打包失败，看见错误提示上面有 node_modules 包的名字，请尝试把这个包下载补全

## 投食

觉得 APP 好用的

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" width="188" style="vertical-align: top" /> <img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" width="188" style="vertical-align: top" />

## 后续迭代

现版本基本用户需要的功能已齐全，接下来会使用友盟收集到的埋点数据（匿名），尝试学习数据分析，根据结果计划后续版本迭代的方向

[[bangumi-analysis]](https://github.com/czy0729/Bangumi-Analysis) 脱敏埋点数据

目前进程，根据本 APP 最核心的页面（条目），先进行整合数据并进行简单的可视化模块搭建，以下根据最近 30 天埋点数据情况，显示平均一天事件触发次数和百分比

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/1.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/1.png" width="188" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/2.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/2.png" width="188" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/3.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/3.png" width="188" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/4.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/4.png" width="188" />

可以一眼了解到哪些功能需求强，可以进行迭代，也能明确哪些功能需求偏低，适当进行隐藏或者移除，发现存在 0 数据的事件，可以考虑是不是埋点写法出了问题
