![header](https://user-images.githubusercontent.com/13514316/171256692-e131a6ca-a8e7-47c6-aef0-7a195d2820a9.png)

<p align="center">
  <img alt="release" src="https://img.shields.io/github/v/release/czy0729/Bangumi" />
  <img alt="license" src="https://img.shields.io/github/license/czy0729/Bangumi" />
  <img alt="codacy" src="https://img.shields.io/codacy/grade/473bdb1186484703b4069148730a3c12" />
  <img alt="downloads" src="https://img.shields.io/github/downloads/czy0729/Bangumi/total" />
  <img alt="issues" src="https://img.shields.io/github/issues/czy0729/Bangumi" />
</p>

# Bangumi

一个基于 `React-Native` 的 [Bangumi](https://bgm.tv) 第三方客户端

安卓和 iOS 都做了兼容，并最大限度保持一致

目前已开发不少于 100 个页面，基于移动端重新设计布局，几乎涵盖网站所有页面

Bangumi 是用于管理追番进度（不限于动漫、音乐、日剧、游戏、AVG），发现和讨论番组

本人并没有原生开发经验，用于练手 React-Native，希望通过这个平台去学习更多

更多涉及到本 App 的说明，可前往 [语雀](https://www.yuque.com/chenzhenyu-k0epm/znygb4) 查看

[ENGLISH](https://github.com/czy0729/Bangumi/blob/master/README.en.MD)

# 目录

- [下载](#下载)
- [功能](#功能)
- [版本](#版本)
- [在线](#在线)
- [预览](#预览)
- [开发心得](#开发心得)
- [本地开发](#本地开发)
- [免责](#免责)
- [致谢](#致谢)
- [投食](#投食)
- [统计](#统计)

# 下载

[安卓 APK 下载](https://github.com/czy0729/Bangumi/releases)

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
    alt="Get it on F-Droid"
    height="64">](https://f-droid.org/packages/com.czy0729.bangumi)

[AltStore 侧载](https://www.yuque.com/chenzhenyu-k0epm/znygb4/qw4xr3) | [iOS 上当前能使用的方法](https://github.com/czy0729/Bangumi/blob/master/web/IOS-TEST.MD) | [Expo 主页](https://expo.dev/@bgmtv/bangumi-pro)

- Google Play 被恶意举报已被暂停申诉无果，因为不同渠道包互斥，只能建议之前使用此渠道的用户卸载后使用其他渠道

- 苹果 100 刀开发者账号已过期，期间没能过审，因为功能太多，而且会涉及到社区、版权敏感等问题，大概不会再送审

# 功能

### 基本功能

- 番组进度管理
- 条目、角色详情
- 时间线（用户动态）
- 超展开（帖吧）
- 时光机（个人中心）、用户空间
- 不限于搜索、排行榜、索引、目录、每日放送、年鉴、标签

### 特色功能

- 其他站点同步到 bgm 功能（bilibili、豆瓣）
- 封面图片和大部分脱敏静态数据覆盖到自费 CDN 中间层，访问高速化（大概是网页版挂掉了也能看）
- 番剧、游戏截图预览
- ~~当季番剧精准到单集网络播放源~~、漫画源查询，找番剧、文库、游戏、音乐
- [小圣杯](https://bgm.tv/dev/app/1143)（角色交易空气游戏, App 独立设计 UI 和交互）

# 版本

## v7.15.2 - 2023/06/24

### 优化

- [x] [吐槽] 吐槽页面改成了分页，避免多楼层同时加载过多头像卡死的问题
- [x] [条目] 对未收藏的条目，页面内的输入框和提交按钮不允许交互
- [x] 现在所有图片会根据渲染的容器，去选择合适大小的目标地址加载，以保证最快速度渲染

### 修复

- [x] [人物] 修复了页面功能失效相关问题
- [x] [评分] 修复了类型为好友时, 不能加载更多的问题
- [x] 修复了网页版增加的高清头像后，有些头像加载过大的问题

[CHANGELOGS](https://github.com/czy0729/Bangumi/blob/master/web/CHANGELOG.MD)

# 在线

基于 @storybook/react-native 生成的 iframe.html, 尽量少入侵原项目, 补全了一个完整的单页面应用

## Storybook 组件面板预览

[国内部署访问快](https://bangumi-app.5t5.top)

[gh-pages https://czy0729.github.io/Bangumi-Storybook/storybook-static](https://czy0729.github.io/Bangumi-Storybook/storybook-static)

## SPA 应用预览 (仍在开发中, 已支持基本预览, 移动端最佳)

[国内部署访问快](https://bangumi-app.5t5.top/iframe.html?viewMode=story&id=screens-discovery--discovery)

[gh-pages https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-discovery--discovery&viewMode=story](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-discovery--discovery&viewMode=story)

# 预览

以下为 2023 年 1 月份截屏，通常 2-3 周更新一次版本，因还在高速迭代阶段，版本之间 UI 可能存在较大差别

![0001](https://user-images.githubusercontent.com/13514316/212605771-d9186720-eefd-4780-ba3a-a923e60d3e76.jpg)
![0002](https://user-images.githubusercontent.com/13514316/212605778-16e7b879-c6ba-4695-b3a8-8289bab8e3a1.jpg)
![0003](https://user-images.githubusercontent.com/13514316/212605787-6791bf2b-af12-428e-b707-165b4a085154.jpg)
![0004](https://user-images.githubusercontent.com/13514316/212605792-d1f65d31-6fd7-4611-a2cd-cb6e5cfa8142.jpg)
![0005](https://user-images.githubusercontent.com/13514316/212605802-8328713e-294e-402e-a56f-24d2ce5e1673.jpg)
![0006](https://user-images.githubusercontent.com/13514316/212605809-13ac6114-0a5e-4443-855c-01f0908c27bd.jpg)
![0007](https://user-images.githubusercontent.com/13514316/212605812-3f742de1-bdcc-4524-ba24-1f8a8a8d164c.jpg)
![0008](https://user-images.githubusercontent.com/13514316/212605814-f118aa53-8c7c-4c6b-978c-2b2d7df8b69e.jpg)
![0009](https://user-images.githubusercontent.com/13514316/212605819-5ca59405-8636-4957-bc6b-731109300efa.jpg)
![0010](https://user-images.githubusercontent.com/13514316/212605826-6d4eec77-ac8e-4712-8373-09d606b70cbb.jpg)
![0011](https://user-images.githubusercontent.com/13514316/212605831-2457702d-0d5a-44c2-88c1-1a139c1e3cc9.jpg)

# 开发心得

使用 React-Native 开发一个 App，想做到流畅是需要下很大的功夫的。但几年开发下来，关键影响到流畅度，无非就几个点：

- 图片不要渲染过大的（图片是所有里面最影响流畅性的）
- 尽量减少同时请求数、慢请求（包括图片的请求）
- 对不可见区域延迟渲染
- 多写函数式编程，多写异步逻辑，少用 this，少写循环
- 计算过的结果尽量缓存

# 本地开发

`项目最近变更`

<details>
<summary><b>点击查看详细</b></summary>

最近在升级 react-navigation@3 到 @5.x 的版本，因为安卓的 react-native 包比较老旧，不升级前不能支持 @6.x 版本，而 @5.x 与 @6.x 其实相差不大

目前因安卓端基本适配完成，iOS 端尚未适配，所以想在 mac 上跑起来，请切换到上一个 tag 的版本再运行

 </details>

`关于环境`

<details>
<summary><b>点击查看详细</b></summary>

本人一直在 mac 环境下开发，iOS 跑 expo 客户端调试，安卓跑真机 usb 调试，window 用法不详，遇到跑不起来，不要太过折腾，window 和 mac 的环境差异还是比较大的，可以查阅 [Expo](https://github.com/expo/expo) 官方文档，您可以选择同一局域网真机扫码调试，需先下载 Expo App

当前 iOS 和 android 是使用不同的包进行开发的，请使用正确的 package.json 进行包安装，配置在 ./web/package.[android | ios].json

 </details>

`安卓开发`

<details>
<summary><b>点击查看详细</b></summary>

请务必阅读 ./android/README.MD

</details>

`关于 NPM`

<details>
<summary><b>点击查看详细</b></summary>

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

</details>

`本地调试`

<details>
<summary><b>点击查看详细</b></summary>

```bash
npm start // [iOS] 之后点击在浏览器打开的 Expo Developer Tools，点击 Run on iOS simulator

// or

react-native run-android // [android] 真机 usb 调试

```

</details>

`安卓真机 usb 调试遇到的问题`

<details>
<summary><b>点击查看详细</b></summary>

- 不能安装请尝试在命令前添加 sudo

- 安卓系统请打开开发者调试模式，需要至少进行一次打开 Android Studio 的同时连接 usb 允许添加调试

- 调试请保证给应用安装权限，允许悬浮窗权限

- 遇到 spawnSync adb ENOENT，参考 [stackoverflow](https://stackoverflow.com/questions/38835931/react-native-adb-reverse-enoent)

- 第一次就遇到打包失败，看看是不是遇到 read timeout 等问题，表示需要科学上网。明明前一天还能打包成功，后一天就失败，也可能是依赖包无法获取的问题，因为 gradlew 依赖包只有 24 小时的缓存时间，尝试使用 --offline 命令

</details>

`常见错误，包括 mac M1`

<details>
<summary><b>点击查看详细</b></summary>

已在 mac M1 上调试成功

最近购入了 M1，尝试实用新环境，iOS expo 运行一路顺风，但是打包 apk 遇到很多问题，总结如下：

- 一定要使用 JAVA jdk 8，不是 jre！[[jdk 8 下载地址]](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)，善用 `java -version` 和 `/usr/libexec/java_home -V` 命令查看正在使用的是不是 jdk1.8.0_281.jdk

- 打包前一定要安装 watchman，不然会遇到监听文件过多错误

- 打包遇到失败，请进入 android 目录下执行 `./gradlew clean` 后再重新打包

- 打包失败，看见错误提示上面有 node_modules 包的名字，请尝试把这个包下载补全

</details>

# 免责

- 本项目所有数据信息均来自各种网站，不提供任何形式的媒体下载、直接播放和修改功能
- 本项目承诺不保存任何第三方用户信息
- 本项目代码仅供学习交流，不得用于商业用途，若侵权请联系

# 致谢

[![](https://data.jsdelivr.com/v1/package/gh/ekibot/bangumi-onair/badge)](https://www.jsdelivr.com/package/gh/ekibot/bangumi-onair) [[Bangumi-OnAir]](https://github.com/ekibot/bangumi-onair) [ekibun](https://github.com/ekibun) 的单集播放数据源

[[bangumi-mosaic-tile]](https://github.com/weizhenye/bangumi-mosaic-tile) [weizhenye](https://github.com/weizhenye) 的用户统计瓷砖库

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[[bangumi-api]](https://github.com/bangumi/api) 官方接口

# 投食

觉得 App 好用的

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" width="188" style="vertical-align: top" /> <img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" width="188" style="vertical-align: top" />

# 统计

![czy0729.bangumi](https://visitor-badge.glitch.me/badge?page_id=czy0729.bangumi)
