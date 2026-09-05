/*
 * @Author: czy0729
 * @Date: 2026-09-05 04:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 17:33:12
 */
import type { CheerioDoc } from '../types'

/**
 * HTML 解析引擎
 * - 生产固定使用 cheerio 1.0 slim (纯 htmlparser2 v9, 无 parse5/lodash/undici)
 * - slim 延迟到 resolveEngine 首次调用时 require: 本文件在 @utils 入口链上,
 *   顶层静态 import 会让 cheerio 随启动求值
 * - legacy (cheerio-without-node-native 0.20) 仅测试对照用, 本文件不引用它,
 *   因此不会进入生产 bundle; battery 测试通过 __setEngineForTest 注入
 */
let testEngineOverride: CheerioDoc | null = null
let slimEngine: CheerioDoc | null = null

/** 仅测试用: 注入引擎替换默认 slim, 传 null 恢复 */
export function __setEngineForTest(engine: CheerioDoc | null) {
  testEngineOverride = engine
}

export function resolveEngine(): CheerioDoc {
  if (testEngineOverride) return testEngineOverride

  if (!slimEngine) {
    // 兼容两种模块形态: 原始 CJS 导出, 或经 babel interop 后挂在 default 上
    const mod = require('./slim') as { default?: CheerioDoc } & CheerioDoc
    slimEngine = mod.default || mod
  }
  return slimEngine
}
