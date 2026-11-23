/*
 * @Author: czy0729
 * @Date: 2026-11-23 08:20:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-11-23 10:50:00
 *
 * htmlparser2 实现, 仅开关关闭时使用
 * - 依赖在 devDependencies, 不进入生产包
 * - 默认路径下只被对拍测试直接 import
 * - htmlparser2 无类型声明, 导出按 self 的 ParserLike / DomHandlerLike 标注
 */
import htmlparser2 from 'htmlparser2'

import type { DomHandlerLike, ParsedNode, ParserLike } from './self'

export const Parser: new (
  handler: DomHandlerLike,
  options?: { decodeEntities?: boolean }
) => ParserLike = htmlparser2.Parser

export const DomHandler: new (onEnd: (error: null, dom: ParsedNode[]) => void) => DomHandlerLike =
  htmlparser2.DomHandler
