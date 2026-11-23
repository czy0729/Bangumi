/*
 * @Author: czy0729
 * @Date: 2026-11-23 08:20:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-11-23 10:50:00
 *
 * 自研 HTML 解析器, 供 html.jsx 使用
 * - 复用 thirdParty/html/engines/self 的 tokenizer, 产出 domhandler 兼容节点
 * - 只实现 html.jsx 用到的 Parser / DomHandler 面
 */
import { parse } from '@utils/thirdParty/html/engines/self/tokenizer'

import type { SelfNode } from '@utils/thirdParty/html/engines/self/dom'

/** 解析结果节点 (domhandler 兼容) */
export type ParsedNode = SelfNode

/** 结束回调式 handler */
export interface DomHandlerLike {
  end(dom: ParsedNode[]): void
}

/** write 累积 + done 一次性解析 */
export interface ParserLike {
  write(html: string): void
  done(): void
}

type OnEnd = (error: null, dom: ParsedNode[]) => void

/** 只提供结束回调, 不含流式事件 */
export class DomHandler implements DomHandlerLike {
  private onEnd: OnEnd

  constructor(onEnd: OnEnd) {
    this.onEnd = onEnd
  }

  end(dom: ParsedNode[]) {
    this.onEnd(null, dom)
  }
}

/** 只支持 write 累积 + done 一次性解析, 不提供流式事件 */
export class Parser implements ParserLike {
  private html = ''

  private handler: DomHandler

  private decodeEntities: boolean

  constructor(handler: DomHandler, options: { decodeEntities?: boolean } = {}) {
    this.handler = handler
    this.decodeEntities = options.decodeEntities !== false
  }

  write(html: string) {
    this.html += html
  }

  done() {
    this.handler.end(parse(this.html, this.decodeEntities).children)
  }
}
