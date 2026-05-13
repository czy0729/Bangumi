![header](https://user-images.githubusercontent.com/13514316/171256692-e131a6ca-a8e7-47c6-aef0-7a195d2820a9.png)

<p align="center">
  <img alt="release" src="https://img.shields.io/github/v/release/czy0729/Bangumi" />
  <img alt="license" src="https://img.shields.io/github/license/czy0729/Bangumi" />
  <img alt="stars" src="https://img.shields.io/github/stars/czy0729/Bangumi" />
  <img alt="forks" src="https://img.shields.io/github/forks/czy0729/Bangumi" />
  <img alt="issues" src="https://img.shields.io/github/issues/czy0729/Bangumi" />
  <img alt="downloads" src="https://img.shields.io/github/downloads/czy0729/Bangumi/total" />
</p>

# Bangumi

A third-party [Bangumi](https://bgm.tv) client built with React Native. Compatible with both iOS and Android while maintaining maximum consistency across platforms.

Bangumi is a Chinese website for tracking anime, music, dramas, games, and more — think [MyAnimeList](https://myanimelist.net) but broader in scope, covering all media types. It is a fully Chinese community with no plans to provide i18n or localization. Over 100 pages have been developed, redesigned for mobile, covering nearly every page on the website.

Originally developed as a React Native exercise — through this project I've learned and continue to learn more about mobile development. For detailed project documentation, visit [Yuque](https://www.yuque.com/chenzhenyu-k0epm/znygb4) (Chinese).

[中文](https://github.com/czy0729/Bangumi/blob/master/README.MD)

# Download

[Android APK](https://github.com/czy0729/Bangumi/releases) | [AltStore Sideload](https://www.yuque.com/chenzhenyu-k0epm/znygb4/qw4xr3) | [iOS Current Methods](https://github.com/czy0729/Bangumi/blob/master/web/IOS-TEST.MD) | [Expo](https://expo.dev/@bgmtv/bangumi-pro)

- Google Play was removed due to a report — currently on hold
- iOS paid developer account has expired; given issues with community content, copyright, and regional regulations, no further App Store submissions are planned

# Features

## Basic Features (mirroring the website)

Links lead to web previews (view-only, no interaction)

- Anime/media progress tracking
- [Subject](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-subject--subject&viewMode=story&subjectId=62229) & [Character](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-mono--mono&viewMode=story&monoId=character%2F111328) details
- [Timeline](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-timeline--timeline&viewMode=story)
- [Forum (Rakuen)](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-rakuen--rakuen&viewMode=story) & [Topics](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-topic--topic&viewMode=story&topicId=group%2F350677)
- [Time Machine](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-user--user&viewMode=story&userId=sai) & [User Space](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-zone--zone&viewMode=story&userId=sai&hd=1)
- And more: [Daily Broadcast](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-calendar--calendar&viewMode=story), [Search](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-search--search&viewMode=story), [Rankings](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-rank--rank&viewMode=story), [New Episodes](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-staff--staff&viewMode=story), [Catalogs](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-catalog--catalog&viewMode=story), [Yearbook](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-yearbook--yearbook&viewMode=story), Tags, Logs, [Groups](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-group--group&viewMode=story&groupId=biweekly)

## Extended Features

- Limited sync of watch history from other sites (Crunchyroll, IMDb-style) to bgm.tv
- Cover images and most sanitized static data served via self-funded CDN for faster, more stable loading (even when the website is slow or down, the app still loads data normally)
- [Photo Wall](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-milestone--milestone&viewMode=story&subjectType=music&type=collect&bg=true&numColumns=4&autoHeight=true&cnFirst=true&numberOfLines=2&subTitle=%E6%97%B6%E9%97%B4&extraTitle=%E6%97%A0&starsFull=true&starsColor=true&lastTime=true&limit=100&userId=sukaretto), [Recommendations & AI Suggestions](https://www.yuque.com/chenzhenyu-k0epm/znygb4/hyrzz32whgurgg6t?singleDoc), Related Series, Curated Catalogs, [Rating Monthly](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-vib--vib&viewMode=story), [Category Rankings](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-typerank--typerank&viewMode=story&type=anime&tag=%E7%BB%AD%E4%BD%9C&subjectId=443428)
- Word Clouds: [Subjects](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-wordcloud--word-cloud&viewMode=story&subjectId=389156), [People](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-wordcloud--word-cloud&viewMode=story&monoId=person%2F40794), [Topics](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-wordcloud--word-cloud&viewMode=story&topicId=group%2F350677)
- ~~Per-episode streaming source lookup for current season anime~~, custom source management, [Find Anime/Books/Games](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-anime--anime&viewMode=story)
- [Anime Screenshot Preview](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-preview--preview&viewMode=story&subjectId=424883&cn=%E4%B8%8D%E6%97%B6%E7%94%A8%E4%BF%84%E8%AF%AD%E5%B0%8F%E5%A3%B0%E8%AF%B4%E7%9C%9F%E5%BF%83%E8%AF%9D%E7%9A%84%E9%82%BB%E6%A1%8C%E8%89%BE%E8%8E%89%E5%90%8C%E5%AD%A6) & game screenshot previews
- [Advanced Forum Filtering](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-rakuensetting--rakuen-setting&viewMode=story) & user blocking
- [Local Folder Subject Management](https://www.yuque.com/chenzhenyu-k0epm/znygb4/cq5vqctm7iohgldl?singleDoc) (with romaji filename scraping support)
- [Little Holy Grail](https://bgm.tv/dev/app/1143) (character trading game with custom UI and interactions)

# Preview

Below are screenshots from June 2025, showing various UI pages with minimal overlap. If images don't load, visit [Yuque](https://www.yuque.com/chenzhenyu-k0epm/znygb4/xcvi52hi66me2kwn?singleDoc) (Chinese).

![00](https://github.com/user-attachments/assets/5caae283-c172-4853-92cd-a96e8db9d4c5)
![10](https://github.com/user-attachments/assets/d38ac8b5-255e-4137-9a4d-584ec8e7fb85)
![20](https://github.com/user-attachments/assets/086a26c8-170f-43ad-9471-ff935edec5a1)
![30](https://github.com/user-attachments/assets/dda7d530-f133-4a98-8560-d0bfa678ef89)
![40](https://github.com/user-attachments/assets/000e06e5-0fc9-4ec8-b21d-b1eb9d200750)
![60](https://github.com/user-attachments/assets/7fddd964-61b5-44c3-bb02-8759d40dae13)
![70](https://github.com/czy0729/Bangumi/assets/13514316/a753a8a7-701e-46cb-95e6-ea172ff1137b)
![80](https://github.com/czy0729/Bangumi/assets/13514316/8e05e8fe-15bc-4801-9834-575d9ad59a2d)
![90](https://github.com/user-attachments/assets/442c4cdc-1772-49d7-85e3-6f126fbef438)
![100](https://github.com/user-attachments/assets/fa74ea9c-ced4-4979-8d30-0e9cfc45956e)
![110](https://github.com/czy0729/Bangumi/assets/13514316/027d8499-51a8-4f89-b81e-652fc8210e6f)
![120](https://github.com/czy0729/Bangumi/assets/13514316/9e0bfb5d-c5e7-48cb-988d-5a79f5f3cf14)

# Version

[Current Version Details](https://www.yuque.com/chenzhenyu-k0epm/znygb4/uchnd5v0cmxamohl?singleDoc) (Chinese)

[Full Changelog](https://github.com/czy0729/Bangumi/blob/master/web/CHANGELOG.MD) (Chinese)

# Online

A single-page application preview built with [@storybook/react-native 6.5](https://github.com/storybookjs/react-native), reconstructing a full navigation flow with minimal intrusion into the main project (performance is not optimized — not comparable to production apps built with Next.js, for example).

Key implementation: [navigate](https://github.com/czy0729/Bangumi/blob/5904f862203b8f805e24fdae5e1592431deae934/src/components/storybook/utils.ts#L23) | [window popstate](https://github.com/czy0729/Bangumi/blob/5904f862203b8f805e24fdae5e1592431deae934/.storybook/preview.js#L22)

As Expo for web has matured, a proper web version using the same codebase may be considered in the future.

[SPA Preview](https://czy0729.github.io/Bangumi-Storybook/storybook-static/iframe.html?id=screens-discovery--discovery&viewMode=story) (web collection management features are in progress; basic info display is supported, optimized for mobile)

[Storybook Component Panel](https://czy0729.github.io/Bangumi-Storybook/storybook-static)

# Development Notes

Development has been ongoing since React Native 0.37. Back then, there weren't nearly as many polished solutions and third-party libraries as today — no React Hooks, no react-native-reanimated, no Expo libraries, not even concepts like Pressable or color scheme. TypeScript was only added in the last couple of years, so many early designs didn't account for typing. Newer all-in-one solutions like expo-router and One have also emerged, capable of producing high-performance builds for both mobile and web. As a result, the codebase contains many legacy patterns that are difficult to refactor with modern approaches.

Making a React Native app feel smooth takes real effort — but with the right patterns, it can be just as smooth as native. After years of development, the key performance bottlenecks come down to a few things:

- Avoid rendering oversized images (the single biggest impact on smoothness)
- Minimize simultaneous and slow network requests (including image loads)
- Cache computed results whenever possible
- Defer rendering for off-screen areas (no built-in browser-like solution exists)
- Favor functional programming and async logic; minimize `this` usage and loops
- Reduce nesting depth where possible (even more critical for web)

# Local Development

## Environment

<details>
<summary><b>Details</b></summary>

Development is done on macOS — iOS uses the Expo client for debugging, Android runs on a physical device via USB.

After 4+ years of iteration, both this project and the original Expo setup have diverged significantly. iOS currently runs only on Expo, while Android runs on Metro.

To fully leverage Expo's streamlined debugging on iOS, no third-party libraries unsupported by Expo are used. On Android, maximum performance is prioritized, so it has been ejected from Expo and uses many third-party performance libraries as replacements.

To debug locally, do not install packages at the root. Instead, go to `./packages/[target-env]/`, install with `yarn`, then run `yarn env [xxx]` to switch to the target environment. Refer to the root `package.json` for available commands. The typical local dev command is `yarn dev`.

If things don't run, don't struggle too much — it's recommended to set up all prerequisites using the official workflow before running this project. Windows and macOS environments differ quite a bit; refer to the [Expo](https://github.com/expo/expo) documentation.

</details>

## NPM

<details>
<summary><b>Details</b></summary>

Do not use a mirror registry (e.g., taobao) — it may cause proxy errors during environment setup.

```bash
npm config set registry https://registry.npmjs.org
```

For the first download, packages may be slow. Due to many legacy dependencies with complex version requirements, use `yarn` to install.

```bash
git clone https://github.com/czy0729/Bangumi
cd ./Bangumi
yarn
```

</details>

## Android USB Debugging Issues

<details>
<summary><b>Details</b></summary>

If installation fails, try adding `sudo` before the command.

Enable developer debugging mode on Android. You need to open Android Studio at least once while connected via USB to allow debugging.

Make sure the app has installation and overlay permissions.

For `spawnSync adb ENOENT`, see [StackOverflow](https://stackoverflow.com/questions/38835931/react-native-adb-reverse-enoent).

If the first build fails with a read timeout, you may need a VPN. Builds that worked yesterday may fail today — gradlew dependencies only cache for 24 hours. Try `--offline`.

</details>

## Common Errors (Including Mac M1)

<details>
<summary><b>Details</b></summary>

Successfully debugged on Mac M1. iOS Expo runs smoothly, but APK builds had several issues:

- Make sure you're using the correct JAVA **JDK**, not JRE!
- Install watchman before building, otherwise you'll hit file watcher errors
- If the build fails, run `./gradlew clean` in the `android` directory and retry
- If a `node_modules` package is named in the error, try manually installing it
- For unpredictable issues, try restarting the machine

</details>

# Disclaimers

- All data and information come from various websites. No media download, direct playback, or modification functions are provided.

- The project does not store any third-party user information.

- This code is for learning and personal use only. Not for commercial use. Contact for takedown requests.

# Acknowledgements

[![](https://data.jsdelivr.com/v1/package/gh/ekibot/bangumi-onair/badge)](https://www.jsdelivr.com/package/gh/ekibot/bangumi-onair) [[Bangumi-OnAir]](https://github.com/ekibot/bangumi-onair) [ekibun](https://github.com/ekibun) — episode broadcast data

[[bangumi-mosaic-tile]](https://github.com/weizhenye/bangumi-mosaic-tile) [weizhenye](https://github.com/weizhenye) — user stats mosaic tile library

[[bangumi-data]](https://github.com/bangumi-data/bangumi-data) — media data index

[[bangumi-api]](https://github.com/bangumi/api) — official API

# Support

Development is a long journey. If you find the app useful, consider giving a star.

<a href="https://star-history.com/#czy0729/Bangumi&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=czy0729/Bangumi&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=czy0729/Bangumi&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=czy0729/Bangumi&type=Date" />
 </picture>
</a>
