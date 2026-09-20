/*
 * @Author: czy0729
 * @Date: 2026-09-05 04:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 17:33:12
 */
import type { CheerioDoc } from '../types'

/**
 * HTML 解析引擎
 * - 生产固定使用自研 self 引擎 (engines/self/, 纯 TS 无第三方依赖),
 *   与 cheerio 1.0 的输出经 battery / decode 对拍测试逐字节锁定
 * - self 延迟到 resolveEngine 首次调用时 require: 本文件在 @utils 入口链上,
 *   顶层静态 import 会让引擎随启动求值
 * - 不提供运行时逃生门 (静态 require 会让 cheerio 重新进入生产包);
 *   slim / legacy 引擎仅被测试文件直接 import 注入 (__setEngineForTest),
 *   生产代码无引用, 不会进入 bundle。如需回退, 改回 require('./slim') 一行
 */
let testEngineOverride: CheerioDoc | null = null
let selfEngine: CheerioDoc | null = null

/** 仅测试用: 注入引擎替换默认 self, 传 null 恢复 */
export function __setEngineForTest(engine: CheerioDoc | null) {
  testEngineOverride = engine
}

export function resolveEngine(): CheerioDoc {
  if (testEngineOverride) return testEngineOverride

  if (!selfEngine) {
    // 兼容两种模块形态: 原始 CJS 导出, 或经 babel interop 后挂在 default 上
    const mod = require('./self') as { default?: CheerioDoc } & CheerioDoc
    selfEngine = mod.default || mod
  }
  return selfEngine
}
