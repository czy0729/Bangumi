<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/bangumi.png" width="100%" />

<p align="center">
  <img alt="release" src="https://img.shields.io/github/v/release/czy0729/Bangumi" />
  <img alt="license" src="https://img.shields.io/github/license/czy0729/Bangumi" />
  <img alt="codacy" src="https://img.shields.io/codacy/grade/473bdb1186484703b4069148730a3c12" />
  <img alt="jsdelivr" src="https://img.shields.io/jsdelivr/gh/hm/czy0729/Bangumi" />
  <img alt="downloads" src="https://img.shields.io/github/downloads/czy0729/Bangumi/total" />
  <img alt="issues" src="https://img.shields.io/github/issues/czy0729/Bangumi" />
</p>

---

一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端

安卓和 iOS 都做了兼容，并最大限度保持一致

目前已开发不少于 70 个页面，基于移动端重新设计布局，几乎涵盖网站所有页面

Bangumi 是用于管理追番进度（不限于动漫、音乐、日剧、游戏、AVG），发现和讨论番组

本人并没有原生开发经验，用于练手 RN，希望通过这个平台数据去学习更多

## Download

[安卓 APK 下载](https://github.com/czy0729/Bangumi/releases) | [酷安市场下载](https://www.coolapk.com/apk/235642)

Google Play 被恶意举报已被暂停申诉无果，因为不同渠道包互斥，只能建议之前使用此渠道的用户卸载后使用其他渠道

[iOS 上当前能使用的方法](https://github.com/czy0729/Bangumi/blob/master/web/IOS-TEST.MD) | [Expo 主页](https://expo.io/@bgm-ios-test/bangumi-pro)

苹果开发者账号已过期，期间没能过审，有缘再送审（100 刀喂狗了 bgm38）

不得不感叹对于版权敏感的应用想上架一个正常渠道太难了，就算不涉及侵权问题都会被误伤

## Features

v6.1.0 - 2022/03/24

因 v6.0.0 后整个 APP 所有地方都涉及大量改动, 使用过程中遇到 bug、旧版本不同的表现、功能缺失, 请留言反馈

—— 新增 ——

- [x] 源头功能迭代, 允许自定义源头 (同步到云还在开发)

—— 优化 ——

- [x] [发现] 今日放送允许隐藏, 在自定义里面设置

—— 修复 ——

- [x] 修复了部分机型条目等页面排版错乱的问题
- [x] 修复了启动页不是进度的时候的表现问题
- [x] 修复了上个版本垂直切页动画不生效的问题, 并新增了新的切页动画【缩放】

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

v6.0.0 - 2022/03/16

因整个 APP 所有地方都涉及大量改动, 使用过程中遇到 bug、旧版本不同的表现、功能缺失, 请留言反馈

—— 新增 ——

- [x] 没有任何新功能

—— 优化 ——

- [x] [系统] 所有旧页面适配新路由写法, 代码重新组织, 触摸反应、切页动画等各方面流畅度有提升
- [x] [首页收藏] 因经常会误触, 暂时取消了封面和章节按钮的长按功能, 不影响使用

[CHANGELOGS](https://github.com/czy0729/Bangumi/blob/master/web/CHANGELOG.MD)

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

** 最近 **

最近在升级 react-navigation@3 到 @5.x 的版本，因为安卓的 react-native 包比较老旧，不升级前不能支持 @6.x 版本，而 @5.x 与 @6.x 其实相差不大

目前因安卓端基本适配完成，iOS 端尚未适配，所以想在 mac 上跑起来，请切换到上一个 tag 的版本再运行

** 提示 **

本人一直在 mac 环境下开发，iOS 跑 expo 客户端调试，安卓跑真机 usb 调试，window 用法不详，遇到跑不起来，不要太过折腾，window 和 mac 的环境差异还是比较大的，可以查阅 [Expo](https://github.com/expo/expo) 官方文档，您可以选择同一局域网真机扫码调试，需先下载 Expo App

当前 iOS 和 android 是使用不同的包进行开发的，请使用正确的 package.json 进行包安装，配置在 ./web/package.[android | ios].json

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

- 一定要使用 JAVA jdk 8，不是 jre！[[jdk 8 下载地址]](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)，善用 `java -version` 和 `/usr/libexec/java_home -V` 命令查看正在使用的是不是 jdk1.8.0_281.jdk

- 打包前一定要安装 watchman，不然会遇到监听文件过多错误

- 打包遇到失败，请进入 android 目录下执行 `./gradlew clean` 后再重新打包

- 打包失败，看见错误提示上面有 node_modules 包的名字，请尝试把这个包下载补全

## 投食

觉得 APP 好用的

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" width="188" style="vertical-align: top" /> <img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" width="188" style="vertical-align: top" />
