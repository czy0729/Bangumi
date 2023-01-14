![header](https://user-images.githubusercontent.com/13514316/171256692-e131a6ca-a8e7-47c6-aef0-7a195d2820a9.png)

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

目前已开发不少于 90 个页面，基于移动端重新设计布局，几乎涵盖网站所有页面

Bangumi 是用于管理追番进度（不限于动漫、音乐、日剧、游戏、AVG），发现和讨论番组

本人并没有原生开发经验，用于练手 RN，希望通过这个平台数据去学习更多

更多涉及到本 APP 的说明，可前往 [语雀](https://www.yuque.com/chenzhenyu-k0epm/znygb4) 查看

## Download

[安卓 APK 下载](https://github.com/czy0729/Bangumi/releases)

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
    alt="Get it on F-Droid"
    height="64">](https://f-droid.org/packages/com.czy0729.bangumi)

Google Play 被恶意举报已被暂停申诉无果，因为不同渠道包互斥，只能建议之前使用此渠道的用户卸载后使用其他渠道

[AltStore 侧载](https://www.yuque.com/chenzhenyu-k0epm/znygb4/qw4xr3) | [iOS 上当前能使用的方法](https://github.com/czy0729/Bangumi/blob/master/web/IOS-TEST.MD) | [Expo 主页](https://expo.dev/@bgmtv/bangumi-pro)

苹果开发者账号已过期，期间没能过审，有缘再送审（100 刀喂狗了 bgm38）

不得不感叹对于版权敏感的应用想上架一个正常渠道太难了，就算不涉及侵权问题都会被误伤

## Features

### 基本功能

- 番组进度管理
- 条目、角色详情
- 时间线（用户动态）
- 超展开（帖吧）
- 时光机（个人中心）、用户空间
- 不限于搜索、排行榜、索引、目录、每日放送、年鉴、标签
- 其他站点同步到 bgm 功能

### 特色功能

- 封面图片和大部分脱敏静态数据覆盖到自费国内 CDN 中间层，访问高速化
- 当季番剧精准到单集网络播放源、漫画源查询，找番剧、文库、游戏、音乐
- 番剧、游戏截图预览
- [小圣杯](https://bgm.tv/dev/app/1143)（角色交易空气游戏, App 独立设计 UI 和交互）

## Update

v7.6.0 -2023/01/14

[图文说明](https://www.yuque.com/chenzhenyu-k0epm/znygb4/csleloiptpy496h8?singleDoc)

—— 新增 ——

- [x] [条目] 加入了 卜卜口 (itorr) 提供的动画巡礼地图信息块
- [x] [条目] 评分块右上方新增网页新功能 (透视) 的入口

—— 优化 ——

- [x] [人物] 新增 (谁收藏了) 块
- [x] [pm] 加入了滚动到顶和到底的按钮
- [x] [首页进度] 增加设置: 长篇动画从最后看过开始显示
- [x] [空间] 现在能显示封禁用户的封禁信息了

—— 修复 ——

- [x] [首页收藏] 修复了获取章节时长失效的问题
- [x] [帖子] 修复了特定情况楼层解析错误的问题

[CHANGELOGS](https://github.com/czy0729/Bangumi/blob/master/web/CHANGELOG.MD)

## Preview

![1](https://user-images.githubusercontent.com/13514316/198988958-df666fd6-5bb7-478f-a3da-86c117c76fe8.png)
![2](https://user-images.githubusercontent.com/13514316/198989007-41ce1f7a-db85-4357-808b-a3e7db23f56a.png)
![3](https://user-images.githubusercontent.com/13514316/198989038-286494f3-8430-452b-a888-c9e9957c6025.png)
![4](https://user-images.githubusercontent.com/13514316/198989049-a639753b-6bf8-478d-a77b-df8e12ccd247.png)
![7](https://user-images.githubusercontent.com/13514316/198995899-8f85200f-25fd-4c41-8700-c02224321aa4.png)
![5](https://user-images.githubusercontent.com/13514316/198989028-65a2acf7-7d11-459f-ac80-60579fa946c8.png)
![6](https://user-images.githubusercontent.com/13514316/198990602-ddcd3ecd-7736-4798-8bf4-c28b4214e978.png)

## 免责声明

- 本项目所有数据信息均来自各种网站，不提供任何形式的媒体下载、直接播放和修改功能
- 本项目承诺不保存任何第三方用户信息
- 本项目代码仅供学习交流，不得用于商业用途，若侵权请联系

---

## PowerBy

[![](https://data.jsdelivr.com/v1/package/gh/ekibot/bangumi-onair/badge)](https://www.jsdelivr.com/package/gh/ekibot/bangumi-onair) [[Bangumi-OnAir]](https://github.com/ekibot/bangumi-onair) [ekibun](https://github.com/ekibun) 的单集播放数据源

[[bangumi-mosaic-tile]](https://github.com/weizhenye/bangumi-mosaic-tile) [weizhenye](https://github.com/weizhenye) 的用户统计瓷砖库

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[[bangumi-api]](https://github.com/bangumi/api) 官方接口

## 本地开发

** 最近 **

最近在升级 react-navigation@3 到 @5.x 的版本，因为安卓的 react-native 包比较老旧，不升级前不能支持 @6.x 版本，而 @5.x 与 @6.x 其实相差不大

目前因安卓端基本适配完成，iOS 端尚未适配，所以想在 mac 上跑起来，请切换到上一个 tag 的版本再运行

** 提示 **

本人一直在 mac 环境下开发，iOS 跑 expo 客户端调试，安卓跑真机 usb 调试，window 用法不详，遇到跑不起来，不要太过折腾，window 和 mac 的环境差异还是比较大的，可以查阅 [Expo](https://github.com/expo/expo) 官方文档，您可以选择同一局域网真机扫码调试，需先下载 Expo App

当前 iOS 和 android 是使用不同的包进行开发的，请使用正确的 package.json 进行包安装，配置在 ./web/package.[android | ios].json

** 安卓开发 **

请务必阅读 ./android/README.MD

** 下载 **

不要使用 taobao 源头，可能会在跑环境时提示不允许代理

```bash
npm config set registry https://registry.npmjs.org
```

国内环境，首次下载包有可能会异常地慢

因用了很多旧的依赖包，里面的包版本依赖混乱，为了不出错请使用 yarn 安装

```bash
git clone https://github.com/czy0729/Bangumi
cd ./Bangumi
yarn
```

** 启动 **

```bash
npm start // [iOS] 之后点击在浏览器打开的 Expo Developer Tools，点击 Run on iOS simulator

// or

react-native run-android // [android] 真机 usb 调试

```

** 安卓真机 usb 调试遇到的问题 **

- 不能安装请尝试在命令前添加 sudo

- 安卓系统请打开开发者调试模式，需要至少进行一次打开 Android Studio 的同时连接 usb 允许添加调试

- 调试请保证给应用安装权限，允许悬浮窗权限

- 遇到 spawnSync adb ENOENT，参考 [stackoverflow](https://stackoverflow.com/questions/38835931/react-native-adb-reverse-enoent)

- 第一次就遇到打包失败，看看是不是遇到 read timeout 等问题，表示需要科学上网。明明前一天还能打包成功，后一天就失败，也可能是依赖包无法获取的问题，因为 gradlew 依赖包只有 24 小时的缓存时间，尝试使用 --offline 命令

** 补充常见错误，已在 mac M1 上调试成功 **

最近购入了 M1，尝试实用新环境，iOS expo 运行一路顺风，但是打包 apk 遇到很多问题，总结如下：

- 一定要使用 JAVA jdk 8，不是 jre！[[jdk 8 下载地址]](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)，善用 `java -version` 和 `/usr/libexec/java_home -V` 命令查看正在使用的是不是 jdk1.8.0_281.jdk

- 打包前一定要安装 watchman，不然会遇到监听文件过多错误

- 打包遇到失败，请进入 android 目录下执行 `./gradlew clean` 后再重新打包

- 打包失败，看见错误提示上面有 node_modules 包的名字，请尝试把这个包下载补全

## 投食

觉得 APP 好用的

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" width="188" style="vertical-align: top" /> <img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" width="188" style="vertical-align: top" />

## 统计

![czy0729.bangumi](https://visitor-badge.glitch.me/badge?page_id=czy0729.bangumi)
