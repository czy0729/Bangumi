<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@master/preview/bangumi.png" width="100%" />

<p align="center">
  <img alt="Version: 3.4.0" src="https://img.shields.io/badge/Version-3.4.0-0366d6" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-33CC12" />
  <img alt="Codacy" src="https://api.codacy.com/project/badge/Grade/473bdb1186484703b4069148730a3c12?isInternal=true" />
  <img alt="jsdelivr" src="https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi/badge" />
</p>

---

一个基于`React-Native`的 [Bangumi](https://bgm.tv) 第三方客户端

用于练手 RN, 安卓和 iOS 都做了兼容, 并最大限度保持一致, 目前已开发不少于 70 个页面, 几乎涵盖源网站所有页面

Bangumi 是用于管理追番进度（不限于动漫、音乐、日剧、AVG）, 发现和讨论番组的第三方客户端

仍在持续开发中...

## Download

安卓 [APK 下载](https://github.com/czy0729/Bangumi/releases) | [酷安下载](https://www.coolapk.com/apk/235642)

苹果好难审, 短时间内都没办法通过, 会跟苹果做长久作战. 目前有方法可以试用, 不会太复杂
[TestFlight] | [[iOS 试用方法]](https://github.com/czy0729/Bangumi/blob/master/IOS-TEST.MD)

## Features

[特有功能]

- 大部分资源覆盖到自维护 CDN, 访问速度+++
- 图片使用 CDN, 有后处理, 所以有比源网站更好的质量和更小的流量
- 小圣杯 (更适合移动端交互的角色交易空气游戏)
- 章节播放源 / 漫画源查询
- 资讯聚合

[基本功能]

- 番组进度管理
- 条目详情
- 角色
- 时间线 (用户动态)
- 超展开 (帖吧)
- 个人中心 / 用户空间
- 搜索 / 标签 / 排行榜 / 索引 / 目录 / 每日放送 / 年鉴

## Versions

[CHANGELOG](https://github.com/czy0729/Bangumi/blob/master/CHANGELOG.MD)

## Update

v3.4.0 - 2020/05/13

—— 优化 ——

- [x] [安卓] 整体优化渲染, 调整部分 UI
- [x] [安卓] 优化了首页收藏切换到发现内容交错闪屏的问题 (暂无法完全解决)

—— 小圣杯助手 v2.3.1 ——

- [x] [我的持仓] 修复安卓开了点击水纹效果的角色无法点击的问题

v3.3.0 - 2020/05/04

—— 新功能 ——

- [x] [超展开] 我的小组页面
- [x] [人物] 增加页面, 现实人物的作品列表
- [x] [人物] 增加页面, CV 的角色列表
- [x] [发现] 各类型板块增加频道页

—— 优化 ——

- [x] [登陆] 步骤 4/5 获取 token 失败后会自动重试 5 次, 之后才会触发失败 (实测能显著解决失败过多问题)
- [x] [条目] 中文和日文名字长按直接复制
- [x] [条目] 针对超多章节的条目(如柯南、火影), 添加一个从某集(如 100 集)起的功能, 做到能通过操作看到所有章节按钮
- [x] [发现] 优化首屏的条目数据
- [x] [标签] 页面默认排序取消默认排名排序 (标签页面慎用排名排序, 不然可能会出现什么标签内容都差不多的现象 )
- [x] 高频页面如条目优化请求量, 1 分钟内重复进入相同页面不会主动请求
- [x] 优化黑暗主题下部分页面 Loading 提示的颜色
- [x] 所有输入框, 手机键盘添加对应提交操作
- [x] 升级 bangumi-data@0.3.21 => 0.3.24

—— 修复 ——

- [x] [条目] 修复了详细展开后, 有时候底部文字缺失的问题
- [x] [条目] 修复了多章节条目, 章节按钮轮播显示的情况, 轮播第一页数据不符的问题
- [x] [用户空间] 修复了切换 Tab 没请求数据的问题
- [x] 修复了某些情况点击输入框, 输入法弹不出来的问题
- [x] 检查 Input 里面靠后显示的数字, 部分机型不显示的问题

—— 小圣杯助手 v2.3.0 ——

- [x] 全局人物收藏
- [x] 一键勾选角色进行献祭
- [x] 金额缩略模式下, 股息预测显示的数据也会缩略
- [x] 部分大列表页面优化请求量, 1 分钟内重复进入相同页面不会主动请求
- [x] [高级分析] 推荐拍卖流动股和固定资产分开两个页面

—— iOS ——

- [x] [iOS] 修复切页动画中, 首页几个使用毛玻璃的头部 , 样式暂时丢失的问题

## PowerBy

[[bangumi-subject]](https://github.com/czy0729/Bangumi-Subject) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Subject/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Subject) 条目快照 CDN

[[bangumi-oss]](https://github.com/czy0729/Bangumi-OSS) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-OSS/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-OSS) 热门条目封面和活跃用户头像对象存储 CDN

[[bangumi-rakuen]](https://github.com/czy0729/Bangumi-Rakuen) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Rakuen/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Rakuen) 帖子快照 CDN

[[bangumi-mono]](https://github.com/czy0729/Bangumi-Mono) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Mono/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Mono) 人物快照 CDN

[[bangumi-static]](https://github.com/czy0729/Bangumi-Static) [![](https://data.jsdelivr.com/v1/package/gh/czy0729/Bangumi-Static/badge)](https://www.jsdelivr.com/package/gh/czy0729/Bangumi-Static) 发现数据快照 CDN

[[bangumi-api]](https://github.com/bangumi/api) 官方接口

[[bangumi-onair]](https://github.com/ekibun/bangumi_onair) 单集播放数据源

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) 番组数据索引

[[tinygrail.com]](https://tinygrail.com) 小圣杯接口

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

<img src="https://cdn.jsdelivr.net/gh/czy0729/bangumi@latest/preview/expo-qr.png" width="200" alt="expo-qr" />

[expo 项目主页](https://expo.io/@bangumi-ios-test/bangumi)

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
npm install // 不推荐使用yarn, 因为后面会魔改node_modules, 使用yarn会被识别并还原
```

** 前置操作 **

自定义 Iconfont, 把 assets/iconfont/ 下的目录 `vector-icons` 和 node_modules/@expo/ 下的目录 `vector-icons` 合并 (注意是合并不是替换, 假如不行, 就手动把文件夹下面的 2 个文件, 找到对应的地方替换, 观察文件修改日期是不是变化了), 原理其实就是用自己的字体文件把原有的 AntDesign 字体文件替换掉, 之后引用 Icon.AntDesign .

** 启动 **

```bash
npm start // [iOS] 之后点击在浏览器打开的Expo Developer Tools, 点击 Run on iOS simulator

// or

react-native run-android // [android] 真机 usb 调试
```

本人一直在 mac 环境下开发, iOS 跑 expo 客户端调试, 安卓跑真机 usb 调试. window 用法不详, 也不清楚到底能不能运行, 可以查阅 [Expo](https://github.com/expo/expo) 官方文档. 可以选择同一局域网真机扫码调试, 需先下载 Expo App
