![header](https://user-images.githubusercontent.com/13514316/171256692-e131a6ca-a8e7-47c6-aef0-7a195d2820a9.png)

<p align="center">
  <img alt="release" src="https://img.shields.io/github/v/release/czy0729/Bangumi" />
  <img alt="license" src="https://img.shields.io/github/license/czy0729/Bangumi" />
  <img alt="stars" src="https://img.shields.io/github/stars/czy0729/Bangumi" />
  <img alt="forks" src="https://img.shields.io/github/forks/czy0729/Bangumi" />
  <img alt="issues" src="https://img.shields.io/github/issues/czy0729/Bangumi" />
  <img alt="codacy" src="https://img.shields.io/codacy/grade/473bdb1186484703b4069148730a3c12" />
  <img alt="downloads" src="https://img.shields.io/github/downloads/czy0729/Bangumi/total" />
</p>

# Bangumi

一个基于 `react-native` 的 [Bangumi](https://bgm.tv) 第三方客户端

Bangumi 是一个用于管理追番进度（不限于动漫、音乐、日剧、游戏、AVG），发现和讨论番组的网站

iOS 和安卓都做了兼容，并最大限度保持一致

目前已开发不少于 100 个页面，基于移动端重新设计布局，几乎涵盖网站所有页面

本人并没有原生开发经验，用于练手 react-native，希望通过这个平台去学习更多

更多涉及到本项目的说明，可前往 [语雀](https://www.yuque.com/chenzhenyu-k0epm/znygb4) 查看

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

# 下载

[安卓 APK 下载](https://github.com/czy0729/Bangumi/releases)

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
    alt="Get it on F-Droid"
    height="64">](https://f-droid.org/packages/com.czy0729.bangumi)

[AltStore 侧载](https://www.yuque.com/chenzhenyu-k0epm/znygb4/qw4xr3) | [iOS 上当前能使用的方法](https://github.com/czy0729/Bangumi/blob/master/web/IOS-TEST.MD) | [Expo 主页](https://expo.dev/@bgmtv/bangumi-pro)

- Google Play 被恶意举报已搁置

- 苹果 100 刀开发者账号已过期，期间没能过审，因为功能太多而且会涉及到社区、版权敏感等问题，而且最近还有备案条件，不可能再送审了

# 功能

## 基本功能

- 番组进度管理
- 条目、角色详情
- 时间线（用户动态）
- 超展开（帖吧）
- 时光机（个人中心）、用户空间
- 不限于搜索、排行榜、索引、目录、每日放送、年鉴、标签

## 特色功能

- 其他站点同步到 bgm 功能（bilibili、豆瓣）
- 封面图片和大部分脱敏静态数据覆盖到自费 CDN 中间层，访问高速化（意思大概是网页版遇到很慢或者挂掉的情况客户端也能正常获取数据）
- 番剧、游戏截图预览
- ~~当季番剧精准到单集网络播放源~~、漫画源查询，找番剧、文库、游戏、音乐
- [小圣杯](https://bgm.tv/dev/app/1143)（角色交易空气游戏，客户端独立设计 UI 和交互）

# 版本

## v8.10.0 - 2024/05/21

### 新增

- [x] [发现] 新增了几种由网站用户维护数据的月刊入口

### 优化

- [x] 部分页面流畅性优化，部分地方新增了动画，不详细叙述
- [x] 优化了片假名显示多个罗马音的位置
- [x] [条目] 评分右侧菜单合并了跳转按钮使其更简洁，使用菜单跳转
- [x] [设置] 百度翻译支持了自定义账号
- [x] [自定义源头] 更新了数据

### 修复

- [x] 修复了不明原因产生的 bgm 表情偏移的问题
- [x] [超展开设置] 修复了不能取消屏蔽小组的问题
- [x] [条目] 修复了部分 NSFW 条目中, 人物图片格式使用不当的问题
- [x] [小圣杯] 修复了侧边角色近况记录点击闪退的问题
- [x] [小圣杯] 资产重组页面整体修复

[所有更新 CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/web/CHANGELOG.MD)

# 在线

基于 @storybook/react-native 生成的 iframe.html，尽量少入侵原项目的基础上，开发了一个完整的单页面流程（当然这样是不考虑性能问题的，不可能与正常开发的，例如使用 Next.js 的相提并论）

## Storybook 组件面板预览

[国内部署](https://bangumi-app.5t5.top) | [gh-pages](https://czy0729.github.io/Bangumi-Storybook/storybook-static)

## SPA 应用预览（网页收藏管理条目相关功能不定期开发中，已支持基本的信息展示，移动端最佳）

[国内部署](https://bangumi-app.5t5.top/iframe.html?viewMode=story&id=screens-discovery--discovery) | [gh-pages](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-discovery--discovery&viewMode=story)

# 预览

以下为 2024 年 5 月份，一些 UI 相对不重复的页面截屏

![00](https://github.com/czy0729/Bangumi/assets/13514316/82961f80-172a-4dc6-b068-68d9a54e7210)
![10](https://github.com/czy0729/Bangumi/assets/13514316/0f067075-af96-42eb-8120-6eee1d2eaaa7)
![20](https://github.com/czy0729/Bangumi/assets/13514316/07ead8c8-fcc1-4fe8-ad25-43c5906aef3b)
![30](https://github.com/czy0729/Bangumi/assets/13514316/6abd6475-ae22-46dd-833c-67bd914eaeac)
![40](https://github.com/czy0729/Bangumi/assets/13514316/9460a475-e1bb-4a07-b3dc-bd71ccaee2ed)
![50](https://github.com/czy0729/Bangumi/assets/13514316/981d4b30-cc0a-4865-a049-0ea654d71669)
![60](https://github.com/czy0729/Bangumi/assets/13514316/eb3e6f5c-b43f-4c61-a03f-830c3082d718)
![70](https://github.com/czy0729/Bangumi/assets/13514316/a753a8a7-701e-46cb-95e6-ea172ff1137b)
![80](https://github.com/czy0729/Bangumi/assets/13514316/8e05e8fe-15bc-4801-9834-575d9ad59a2d)
![90](https://github.com/czy0729/Bangumi/assets/13514316/bbd669e9-1752-40d5-a318-626d13c10704)
![100](https://github.com/czy0729/Bangumi/assets/13514316/027d8499-51a8-4f89-b81e-652fc8210e6f)
![110](https://github.com/czy0729/Bangumi/assets/13514316/9e0bfb5d-c5e7-48cb-988d-5a79f5f3cf14)

# 开发心得

这个 repo 已经持续开发多年，当年并没有今天如此多简单而且优秀的方案和第三方库，比如 react hooks、react-native-fast-image、react-native-reanimated、expo libraries，甚至连 pressable、color scheme 的概念都没有。所以代码上会存在大量老旧的，又或者与你现在了解到的 react-native 很多雷同的实现，都已经很难通过使用新的方案迭代过来了。

使用 react-native 开发一个 App，想做到流畅是需要下很大的功夫的，但不要说什么 rn 不行了，被放弃了不如 Flutter，写法没问题的话一样流畅得很。其实跟开发 web 应用没多大区别，但几年开发下来，关键影响到流畅度，无非就几个点：

- 图片不要渲染过大的（图片是所有里面最影响流畅性的）
- 尽量减少同时请求数、慢请求（包括图片的请求）
- 对不可见区域延迟渲染
- 多写函数式编程，多写异步逻辑，少用 this，少写循环
- 计算过的结果尽量缓存

# 本地开发

## 关于环境

<details>
<summary><b>详细</b></summary>

本人一直在 mac 环境下开发，iOS 使用 expo 客户端调试，安卓跑真机 usb 调试。

由于 4 年的迭代，不管是对于本项目，还是最初使用的 expo 来说，都已经大相径庭。iOS 目前只能跑在 expo 上，而安卓只能跑在 metro 上。

在 iOS 上想充分使用 expo 客户端简化调试流程，所以不会引入 expo 不支持的第三方库。而安卓上面想要最高的性能，所以后期已经从 expo 上面 eject 出来了，用上了很多第三方的性能优化库替代了原来的组件。

若你想在本地调试，不要在根目录安装包，而请先到 ./packages/[目标环境]/ 下使用 yarn 安装包，然后使用命令 yarn env [xxx] 来切换到目标开发环境，最后请参考这个时候根目录的 package.json 中的命令开发。通常预置的本地调试命令是 yarn dev。

遇到跑不起来，不要太过折腾，推荐在运行本项目之前，就应该使用官方提供的工作流预先把所有环境需要的库都安装好了。window 和 mac 的环境差异还是比较大的，可以查阅 [Expo](https://github.com/expo/expo) 官方文档。

</details>

## 关于 NPM

<details>
<summary><b>详细</b></summary>

不要使用 taobao 源头，可能会在跑环境时提示不允许代理。

```bash
npm config set registry https://registry.npmjs.org
```

国内环境，首次下载包有可能会异常地慢。因用了很多旧的依赖包，里面的包版本依赖混乱，为了不出错请使用 yarn 安装。

```bash
git clone https://github.com/czy0729/Bangumi
cd ./Bangumi
yarn
```

</details>

## 安卓真机 usb 调试遇到的问题

<details>
<summary><b>详细</b></summary>

不能安装请尝试在命令前添加 sudo。

安卓系统请打开开发者调试模式，需要至少进行一次打开 Android Studio 的同时连接 usb 允许添加调试。

调试请保证给应用安装权限，允许悬浮窗权限。

遇到 spawnSync adb ENOENT，参考 [stackoverflow](https://stackoverflow.com/questions/38835931/react-native-adb-reverse-enoent)。

第一次就遇到打包失败，看看是不是遇到 read timeout 等问题，表示需要科学上网。明明前一天还能打包成功，后一天就失败，也可能是依赖包无法获取的问题，因为 gradlew 依赖包只有 24 小时的缓存时间，尝试使用 --offline 命令。

</details>

## 常见错误，包括 mac M1

<details>
<summary><b>详细</b></summary>

已在 mac M1 上调试成功，最近购入了 M1，尝试实用新环境，iOS expo 运行一路顺风，但是打包 apk 遇到很多问题，总结如下：

- 一定要使用正确的 JAVA jdk，不是 jre！

- 打包前一定要安装 watchman，不然会遇到监听文件过多错误

- 打包遇到失败，请进入 android 目录下执行 `./gradlew clean` 后再重新打包

- 打包失败，看见错误提示上面有 node_modules 包的名字，请尝试把这个包下载补全

- 若出现各种无法预料的问题，请一定要尝试重启机器

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

开发迭代不易，觉得客户端好用的，有能力的可以投喂一下，也可以给个星星

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" width="188" style="vertical-align: top" /> <img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" width="188" style="vertical-align: top" />

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fczy0729%2FBangumi&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=views&edge_flat=false)](https://hits.seeyoufarm.com)
