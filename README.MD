<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/bangumi.png" width="100%" />

<p align="center">
  <img alt="Version: 4.8.0" src="https://img.shields.io/badge/Version-4.8.0-0366d6" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-33CC12" />
  <img alt="Codacy" src="https://api.codacy.com/project/badge/Grade/473bdb1186484703b4069148730a3c12?isInternal=true" />
  <img alt="jsdelivr" src="https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi/badge" />
</p>

---

一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端

项目对标 web, 本人并没有原生开发经验, 用于练手 RN, 安卓和 iOS 都做了兼容, 并最大限度保持一致

目前已开发不少于 70 个页面, 几乎涵盖源网站所有页面

Bangumi 是用于管理追番进度（不限于动漫、音乐、日剧、AVG）, 发现和讨论番组的第三方客户端

本人并没有原生开发经验, 用于练手 RN, 希望通过这个平台数据去学习更多

## Download

[安卓 APK 下载](https://github.com/czy0729/Bangumi/releases) | [酷安市场下载](https://www.coolapk.com/apk/235642)

苹果开发者账号已过期, 期间没能过审, 有缘再送审
[TestFlight](https://testflight.apple.com/join/pAaJ0MWU) | [Expo 试用方法](https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD) | [Expo 主页](https://expo.io/@bgm-ios-test/bangumi-pro)

## Features

[特有功能]

- 大部分资源覆盖到自维护 [CDN](https://github.com/czy0729/Bangumi-Subject), 访问速度++
- 图片使用 [CDN](https://github.com/czy0729/Bangumi-OSS), 有后处理, 比源网站更快、质量更高、流量更小
- 当季番剧精准到单集网络播放源 / 漫画源查询 / 找番剧 / 文库
- [小圣杯](https://bgm.tv/dev/app/1143) (角色交易空气游戏, App 独立设计 UI 和交互)

[基本功能]

- 番组进度管理
- 条目、角色详情
- 时间线 (用户动态)
- 超展开 (帖吧)
- 时光机 (个人中心) / 用户空间
- 不限于搜索 / 排行榜 / 索引 / 目录 / 每日放送 / 年鉴 / 标签

## Update

v4.8.0 - 2021/03/07

—— 新增 ——
- [x] [发现] 菜单按钮优化, 列出所有主要功能
- [x] [搜索] 搜索类型增加输入用户id去到用户空间
- [x] [人物] 人物更多资料跳转到外站

—— 优化 ——
- [x] [收藏] 私密按钮记忆
- [x] [帖子] 楼层菜单增加屏蔽用户
- [x] [帖子] 用户屏蔽范围覆盖到回复, 并且回复屏蔽人的子楼层也会隐藏
- [x] [年鉴] 把个人信息显示回来
- [x] 账号未成年时, 优化列表为空敏感内容提示

—— 小圣杯 4.0 ——
- [x] [通天塔] 新增页面
- [x] [资产重组] 页面新增通天塔献祭模块
- [x] [我的持仓] 因没有活股时, 圣殿角色不会显示, 所以新增持仓角色+圣殿合并数据的列表, 方便一览和排序
- [x] [人物查询] 修复了输入框不能输入文字的问题
- [x] 优化角色项数值显示, 用基础(实时)股息替代流动(圣殿)股息, 增加通天塔献祭数目、通天塔星星数

[CHANGELOGS](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

## PowerBy

[[bangumi-subject]](https://github.com/czy0729/Bangumi-Subject) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Subject/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Subject) 条目快照 CDN

[[bangumi-oss]](https://github.com/czy0729/Bangumi-OSS) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-OSS/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-OSS) 热门条目封面和活跃用户头像对象存储 CDN

[[bangumi-rakuen]](https://github.com/czy0729/Bangumi-Rakuen) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Rakuen/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Rakuen) 帖子快照 CDN

[[bangumi-mono]](https://github.com/czy0729/Bangumi-Mono) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Mono/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Mono) 人物快照 CDN

[[bangumi-static]](https://github.com/czy0729/Bangumi-Static) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Static/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Static) 发现数据快照 CDN

[[bangumi-onair]](https://github.com/ekibun/bangumi_onair) [![](https://data.jsdelivr.com/v1/package/gh/ekibun/bangumi_onair/badge)](https://www.jsdelivr.com/package/gh/ekibun/bangumi_onair) [ekibun](https://github.com/ekibun) 的单集播放数据源

[[bangumi-mosaic-tile]](https://github.com/weizhenye/bangumi-mosaic-tile) [weizhenye](https://github.com/weizhenye) 的用户统计瓷砖库

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[[bangumi-api]](https://github.com/bangumi/api) 官方接口

## Preview

#### 基础功能

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/1.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/1.png" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/2.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/2.png" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/3.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/3.png" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/4.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/4.png" width="100%" />

#### 小圣杯 (角色模拟炒股) 模块

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/5.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/5.png" width="100%" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/6.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/screenshot/3.10.0/6.png" width="100%" />

(被墙看不见图的可以复制 alt 打开)

## 后续迭代

现版本基本用户需要的功能已齐全, 接下来会使用友盟收集到的埋点数据(匿名), 尝试学习数据分析, 根据结果计划后续版本迭代的方向

[[bangumi-analysis]](https://github.com/czy0729/Bangumi-Analysis) 脱敏埋点数据

目前进程, 根据本 APP 最核心的页面 (条目), 先进行整合数据并进行简单的可视化模块搭建, 以下根据最近 30 天埋点数据情况, 显示平均一天事件触发次数和百分比

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/1.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/1.png" width="188" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/2.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/2.png" width="188" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/3.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/3.png" width="188" /><img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/4.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Analysis@master/screenshots/4.png" width="188" />

可以一眼了解到哪些功能需求强, 可以进行迭代, 也能明确哪些功能需求偏低, 适当进行隐藏或者移除, 发现存在 0 数据的事件, 可以考虑是不是埋点写法出了问题

## 免责声明

- 本项目所有数据信息均来自各种网站，不提供任何形式的媒体下载、直接播放和修改功能
- 本项目承诺不保存任何第三方用户信息
- 本项目代码仅供学习交流，不得用于商业用途，若侵权请联系

## 本地开发

** 提示 **

本人一直在 mac 环境下开发, iOS 跑 expo 客户端调试, 安卓跑真机 usb 调试, window 用法不详, 遇到跑不起来, 不要太过折腾, window 和 mac 的环境差异还是比较大的, 可以查阅 [Expo](https://github.com/expo/expo) 官方文档, 您可以选择同一局域网真机扫码调试, 需先下载 Expo App,

** 下载 **

推荐使用 npm, 切换 npm 官方源可以按下面操作, 不建议使用 taobao 源头, 可能会在跑环境时提示不允许代理,

```bash
npm config set registry https://registry.npmjs.org
```

国内环境, 首次下载包有可能会异常地慢

```bash
git clone https://github.com/czy0729/Bangumi
cd ./Bangumi
npm install // 不推荐使用 yarn, 因为项目部分库较旧的原因, 无法使用最新的包, 会手动修改 node_modules, 每次使用 yarn 新安装包会被识别并还原
```

** iOS 安装包遇到 react-native 包找不到的问题 **

最近项目使用的 Expo SDK 因官方问题, 现最新版本想在电脑上面跑起来需要手动修改包, 这个 sdk-39.0.3.tar.gz 的包我已经上传到 [蓝奏云](https://www.lanzous.com/iNFwLmfygvi), 下载后放在根目录再 install, 或者你可以尝试使用 0.63.x 的 rn 版本

** 前置操作, 否则 App 内图标均为问号 **

自定义 Iconfont, 把 assets/iconfont/ 下的目录 `vector-icons` 和 node_modules/@expo/ 下的目录 `vector-icons` 合并 (注意是合并不是替换, 假如不行, 就手动把文件夹下面的 2 个文件, 找到对应的地方替换, 观察文件修改日期是不是变化了), 原理其实就是用自己的字体文件把原有的 AntDesign 字体文件替换掉, 之后引用 Icon.AntDesign

** 遇到 undefined is not an object (evaluating '\_this.view.\_component.measureInWindow') **

把 components/@/react-native-safe-area-view/index.js 替换掉 node_modules/react-native-safe-area-view/index.js

** 启动 **

```bash
npm start // [iOS] 之后点击在浏览器打开的Expo Developer Tools, 点击 Run on iOS simulator

// or

react-native run-android // [android] 真机 usb 调试
```
