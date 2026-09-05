/*
 * @Author: czy0729
 * @Date: 2026-09-05 04:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 15:58:25
 */
import cheerioRN from 'cheerio-without-node-native'

import type { CheerioDoc } from '../types'

/**
 * cheerio 0.20 (cheerio-without-node-native) 引擎, 仅测试对照用
 * - 只被测试文件 (engine-battery) 直接 import 并经 __setEngineForTest 注入,
 *   生产代码无任何引用, 不会进入 bundle
 * - 体积较大 (436KB), 双引擎基线稳定后连同依赖一起删除
 * - 依赖链需要 htmlparser2 3.x: 根 package.json dependencies 里的 htmlparser2@^3.9.0
 *   就是给它占提升位的 (cheerio 1.x 的 htmlparser2 v9 嵌套安装, 互不干扰), 勿清理
 * - 0.20 的 module.exports 本身即函数 (可调用 + .load), 结构上与 CheerioAPI 兼容
 */
export default function legacyEngine(): CheerioDoc {
  // 兼容两种模块形态: 原始 CJS 导出本身即函数, 或经 babel interop 后挂在 default 上
  const mod = cheerioRN as unknown as { default?: CheerioDoc } & CheerioDoc
  return mod.default || mod
}
