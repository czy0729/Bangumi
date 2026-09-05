# API 层

## 两种请求方式

- **`fetchAPI()`** — JSON API 调用，自动附加 Authorization header，支持重试
- **`fetchHTML()`** — HTML 页面抓取，携带 cookies，支持代理，cheerio 解析

## HTML 解析引擎

- 生产代码一律经 `src/utils/thirdParty/html`（`cheerio` / `cParse` / `cFind` / `cMap` / `cText` 等）使用，禁止直接 import 引擎包
- 底层引擎固定为 `cheerio/slim`（1.0，纯 htmlparser2），`engines/slim.ts` 构造单例适配层，由 `resolveEngine()` 懒加载
- 旧引擎 legacy（cheerio-without-node-native 0.20）仅测试对照用，生产代码不引用（不进 bundle）；双引擎基线稳定后删除
- 根 package.json dependencies 里的 `htmlparser2@^3.9.0` 是给 legacy 引擎占提升位的：占住根 node_modules 的 htmlparser2 槽位（3.x），cheerio 1.x 需要的 htmlparser2 v9 会被嵌套安装到自身目录下，两引擎互不干扰；不要"清理"掉它，也不要恢复顶层 resolutions 的 htmlparser2（会降级 cheerio 1.x 的依赖导致解析失败）
- formhash 提取统一用 `getFormhash(html)`（正则实现，引擎无关），不要再写 cheerio 选择器

## API 常量位置

- REST API: `src/constants/api/index.ts`（`API_SUBJECT()`, `API_USER_INFO()` 等）
- HTML 页面: `src/constants/html/`
- CDN: `src/constants/cdn/`
- 第三方: MAL、AniDB、Pixiv、Anitabi
