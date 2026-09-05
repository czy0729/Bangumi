/*
 * @Author: czy0729
 * @Date: 2026-09-05 05:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 15:33:32
 *
 * cheerio/slim 类型声明
 * - ./slim 子路径仅在 package exports 中声明, 当前 moduleResolution 无法解析, 补环境声明
 * - 类型从根包 'cheerio' (有 main/types 入口, 可正常解析) 复用, 与官方 slim.d.ts 一致
 */
declare module 'cheerio/slim' {
  import type { CheerioAPI, CheerioOptions } from 'cheerio'

  export function load(
    content: string | Buffer | import('domhandler').AnyNode | Array<import('domhandler').AnyNode>,
    options?: CheerioOptions | null,
    isDocument?: boolean
  ): CheerioAPI

  export function contains(
    a: import('domhandler').AnyNode,
    b: import('domhandler').AnyNode
  ): boolean
}
