/*
 * @Author: czy0729
 * @Date: 2026-11-18 19:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 14:54:51
 *
 * 自研 mobx 开关 (DEV 全局)
 *  - true: src/utils/thirdParty/mobx
 *  - false: 官方 mobx (devDependencies, 仅供 DEV 对照排查)
 *  - 由 metro.config.js / jest.config.js 构建期读取; RN 的模块解析发生在打包期,
 *    修改后需重启 dev server (必要时加 --reset-cache)
 *  - NODE_ENV=production 或 EAS_BUILD 时恒为 true, 生产包不使用官方 mobx
 */
const MOBX_SELF = true

module.exports = {
  MOBX_SELF
}
