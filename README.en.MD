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

This is a third-party [Bangumi](https://bgm.tv) client based on React-Native, supporting both Android and iOS while striving for consistency. Over 90 pages have been developed, covering all pages on the website. Bangumi is used for managing progress and discussing anime, music, dramas, games, like [MAL](https://myanimelist.net). This app was developed as an RN exercise, with the hope of learning more through the platform's data. For more information, visit the documentation on [Yuque](https://www.yuque.com/chenzhenyu-k0epm/znygb4).

## Download

Because of bangumi is a totally chinese website, so there is no plan to translate into other languages.

[APK or IPA release](https://github.com/czy0729/Bangumi/releases)

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
    alt="Get it on F-Droid"
    height="64">](https://f-droid.org/packages/com.czy0729.bangumi)

[AltStore sideload IPA](https://www.yuque.com/chenzhenyu-k0epm/znygb4/qw4xr3) | [iOS used case](https://github.com/czy0729/Bangumi/blob/master/web/IOS-TEST.MD) | [Expo website](https://expo.dev/@bgmtv/bangumi-pro)

## Features

### Basic

- Anime watched progress management
- Animes and characters wiki
- BBS
- Users timelines
- User center
- More than search, rank, index, daily broadcast, yearbook, and tags
- Other sites watched data synchronize

### Enhanced

- Cover picture and most static data thought self's CDN
- The current season's dramas can be accurately queried from the network broadcast
- Screenshot preview of subject

## Update

[CHANGELOGS](https://github.com/czy0729/Bangumi/blob/master/web/CHANGELOG.MD)

## Storybook Preview

Preview at [https://czy0729.github.io/Bangumi-Storybook/storybook-static](https://czy0729.github.io/Bangumi-Storybook/storybook-static)

## Preview

![101](https://github.com/czy0729/Bangumi/assets/13514316/964c1e0a-d130-4f78-b45f-cbad9273620e)
![102](https://github.com/czy0729/Bangumi/assets/13514316/b88bd1c2-e18f-4809-b28d-776cbedd5a35)
![103](https://github.com/czy0729/Bangumi/assets/13514316/d9220c19-3a9d-481a-bbab-b2d2b9a03efc)
![104](https://github.com/czy0729/Bangumi/assets/13514316/4be25bb5-a85a-46a6-a21c-4699612f7824)
![105](https://github.com/czy0729/Bangumi/assets/13514316/b20a579f-443d-4181-a627-cf9129e894d1)
![106](https://github.com/czy0729/Bangumi/assets/13514316/209da7d4-e7f8-441d-9ae8-b7ee6c31d94a)
![107](https://github.com/czy0729/Bangumi/assets/13514316/c15d75df-5b10-4911-b957-1f0b3fd4bc74)
![108](https://github.com/czy0729/Bangumi/assets/13514316/4ca73742-7484-4ebd-8c5c-82b108ffc799)
![109](https://github.com/czy0729/Bangumi/assets/13514316/fa7a145e-9c9a-407f-bad8-74c5a46c294a)
![110](https://github.com/czy0729/Bangumi/assets/13514316/8307835a-3549-4806-a2db-0754c0edcf21)

## Disclaimers

- All data and information of the project are from various websites, without any form of media download, direct play and modification functions

- The project promises not to save any third-party user information

- This project code is for learning and communication only, and shall not be used for commercial purposes. In case of infringement, please contact

---

## PowerBy

[![](https://data.jsdelivr.com/v1/package/gh/ekibot/bangumi-onair/badge)](https://www.jsdelivr.com/package/gh/ekibot/bangumi-onair) [[Bangumi-OnAir]](https://github.com/ekibot/bangumi-onair) [ekibun](https://github.com/ekibun)

[[bangumi-mosaic-tile]](https://github.com/weizhenye/bangumi-mosaic-tile) [weizhenye](https://github.com/weizhenye)

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data)

[[bangumi-api]](https://github.com/bangumi/api)

## Develop

For various reasons since 2019, this repository has been under development for many years. Back then, there weren't as many simple and excellent solutions and third-party libraries available as there are today, such as react hooks, react-native-fast-image, react-native-reanimated, expo libraries, and even concepts like pressable and color scheme were non-existent. Therefore, there are a large number of outdated implementations in the codebase, or implementations that are very similar to what you now know in React Native, making it difficult to iterate using newer approaches.

This repo current is building applications with Expo tools, iOS on [managed-workflow](https://docs.expo.dev/introduction/managed-vs-bare/#managed-workflow), and Android on bare-workflow.

So is very easy to run on mac with command `npm start`, and watch result on Expo client.

But very troublesome on windows, it is not recommended that you run on windows.

## Support

<img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png" width="188" style="vertical-align: top" /> <img src="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" alt="https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png" width="188" style="vertical-align: top" />

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fczy0729%2FBangumi&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=views&edge_flat=false)](https://hits.seeyoufarm.com)
