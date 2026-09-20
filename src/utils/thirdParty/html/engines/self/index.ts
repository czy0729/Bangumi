/*
 * @Author: czy0729
 * @Date: 2026-09-20 04:14:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-20 04:14:38
 *
 * 自研 cheerio 兼容引擎 (self 引擎) 对外出口
 * - 与 slim.ts 同构: default 导出一个 duck-type CheerioAPI 的对象
 *   (可调用 + .load), 经 resolveEngine / __setEngineForTest 消费
 * - 纯自研实现, 无任何第三方依赖
 */
import { createDocumentEngine } from './api'

import type { CheerioDoc } from '../../types'

const engine = createDocumentEngine() as unknown as CheerioDoc

export default engine
export { createDocumentEngine }
