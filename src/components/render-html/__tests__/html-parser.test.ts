/*
 * @Author: czy0729
 * @Date: 2026-11-23 08:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-23 21:34:02
 *
 * 解析器开关两侧对拍: html-parser/self (自研) vs html-parser/legacy (htmlparser2)
 * 两侧都按 html.jsx 的用法调用 (write / done / 结束回调)
 */
import { Parser as FacadeParser } from '@render-html-parser'
import { DomHandler as LegacyDomHandler, Parser as LegacyParser } from '../html-parser/legacy'
import { DomHandler as SelfDomHandler, Parser as SelfParser } from '../html-parser/self'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RENDER_HTML_SELF } = require('../../../utils/thirdParty/switch')

/** 去掉 parent/prev/next 引用, 只留结构可比较字段 (parentName 覆盖渲染层依赖的 parent 链) */
function normalize(nodes: any[]): any[] {
  return nodes.map(node => ({
    // htmlparser2 给 script/style 独立 type, self 统一为 'tag'; 两侧等价依赖 IGNORED_TAGS 含 script/style
    type: node.type === 'script' || node.type === 'style' ? 'tag' : node.type,
    name: node.name || '',
    parentName: node.parent ? node.parent.name || '' : '',
    attribs: node.attribs || {},
    data: node.data || '',
    children: node.children ? normalize(node.children) : []
  }))
}

function parseWithSelf(html: string, decodeEntities: boolean = true): any[] {
  let result: any[] = []
  const parser = new SelfParser(
    new SelfDomHandler((_err, dom) => {
      result = dom
    }),
    { decodeEntities }
  )
  parser.write(html)
  parser.done()

  return normalize(result)
}

function parseWithLegacy(html: string, decodeEntities: boolean = true): any[] {
  let result: any[] = []
  const parser = new LegacyParser(
    new LegacyDomHandler((_err, dom) => {
      result = dom
    }),
    { decodeEntities }
  )
  parser.write(html)
  parser.done()

  return normalize(result)
}

const CASES: [string, string][] = [
  ['嵌套行内标签', '<div class="quote"><q>引用</q>文本</div>'],
  ['空元素与换行', '加粗<b>粗</b>普通<br>换行'],
  ['链接与属性实体', '<a href="https://bgm.tv/a?b=1&amp;c=2" class="l">链接</a>'],
  ['文本实体', '实体 &amp; &lt; &#39; 与 &nbsp;'],
  ['隐式闭合 li', '<ul><li>1<li>2</ul>'],
  ['隐式闭合 p', '<p>a<p>b'],
  ['img 属性', '<img src="x.png" style="width: 100px; height: 50px">'],
  ['注释', '<!-- 注释 --><span>a</span>']
]

/**
 * 已知差异: self 复刻 HTML5 语义 (p 被块级元素隐式闭合), htmlparser2 3.x 只认 p / h1..h6
 * 渲染影响: 旧路径 p 被 childrenNeedAView 升级为 View 包住块级元素, 新路径是两个兄弟节点,
 * 嵌套层级与间距会有细微差异 (间距与浏览器一致)
 * [名称, html, self 顶层标签, htmlparser2 顶层标签]
 */
const DIVERGENT_CASES: [string, string, string[], string[]][] = [
  ['p 后块级', '<p>a<div>b</div>', ['p', 'div'], ['p']],
  ['p 后列表', '<p>a<ul><li>b</ul>', ['p', 'ul'], ['p']],
  ['p 后 hr', '<p>a<hr>b', ['p', 'hr'], ['p']]
]

describe('解析器开关两侧结构一致', () => {
  test('html-parser 出入口与开关一致', () => {
    expect(FacadeParser).toBe(RENDER_HTML_SELF ? SelfParser : LegacyParser)
  })

  test.each(CASES)('%s', (_name: string, html: string) => {
    expect(parseWithSelf(html)).toEqual(parseWithLegacy(html))
  })

  test.each(CASES)('%s (decodeEntities=false)', (_name: string, html: string) => {
    expect(parseWithSelf(html, false)).toEqual(parseWithLegacy(html, false))
  })
})

function topLevelTags(parse: (html: string) => any[], html: string): string[] {
  return parse(html)
    .map(node => node.name)
    .filter(Boolean)
}

describe('已知差异: p 的隐式闭合按 HTML5 语义', () => {
  test.each(DIVERGENT_CASES)(
    '%s',
    (_name: string, html: string, selfTags: string[], legacyTags: string[]) => {
      expect(topLevelTags(parseWithSelf, html)).toEqual(selfTags)
      expect(topLevelTags(parseWithLegacy, html)).toEqual(legacyTags)
    }
  )
})
