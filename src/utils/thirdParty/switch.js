/*
 * @Author: czy0729
 * @Date: 2026-11-23 08:50:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-11-23 10:05:00
 *
 * 自研第三方替换总开关 (DEV 全局), 构建期由 metro.config.js / jest.config.js / .storybook/main.js 读取
 *  - true: 使用自研实现 (release / dev 运行时唯一路径)
 *  - false: 交回第三方包 (devDependencies, 仅供 DEV 对照排查)
 *  - 切换后模块解析不会自动更新: Metro 需重启 dev server 并加 --reset-cache,
 *    Storybook 需重启 (必要时清 webpack 缓存), Jest 直接重跑即可
 *  - NODE_ENV=production 或 EAS_BUILD 时各项恒为 true, 生产包不包含对应第三方包
 */
module.exports = {
  /** mobx → thirdParty/mobx (facade) */
  MOBX_SELF: true,

  /** @render-html-parser → components/render-html/html-parser/{self,legacy} */
  RENDER_HTML_SELF: true
}
