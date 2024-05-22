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
