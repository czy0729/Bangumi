/*
 * @Author: czy0729
 * @Date: 2026-09-05 04:40:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 15:58:30
 */
import { load } from 'cheerio/slim'

import type { CheerioAPI } from 'cheerio'

/**
 * dom-serializer 2.x (cheerio 1.x) 输出小写十六进制实体 (&#x6d4b;),
 * 0.20 (dom-serializer 0.1) 输出大写 (&#x6D4B;)
 * 在引擎边界归一为大写, 保证全部 .html() 消费点与 legacy 逐字节一致 (幂等)
 */
function normalizeEntityCase(fn: any) {
  if (!fn?.html || fn.__entityCaseNormalized__) return

  const rawHtml = fn.html
  fn.html = function (this: any, ...args: any[]) {
    const out = rawHtml.apply(this, args)
    return typeof out === 'string'
      ? out.replace(/&#x([0-9a-f]+);/g, (_match: string, hex: string) => `&#x${hex.toUpperCase()};`)
      : out
  }
  fn.__entityCaseNormalized__ = true
}

/**
 * cheerio 1.0 slim 引擎单例 (纯 htmlparser2 v9, 无 parse5/lodash/undici)
 * - cheerio 1.x 没有顶层可调用对象 (0.20 的 module.exports 本身是函数), 组合适配层:
 *   - .load(html, options) 直接转发 slim.load (对每个新文档做实体大小写归一)
 *   - $(element) 用空文档的 $ 包装节点, 节点树遍历基于节点自身引用, 跨 load 实例安全
 */
const $empty: CheerioAPI = load('')
normalizeEntityCase($empty.fn as any)

const adapter = ((target: any) => $empty(target as any)) as CheerioAPI
adapter.load = ((html: string, options?: object) => {
  const $ = load(html, options as any)
  normalizeEntityCase($.fn as any)
  return $
}) as CheerioAPI['load']

export default adapter
