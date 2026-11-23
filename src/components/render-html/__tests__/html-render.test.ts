/*
 * @Author: czy0729
 * @Date: 2026-11-23 10:55:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-23 23:38:45
 *
 * html.jsx 链路 smoke: 解析 → mapDOMNodesTORNElements → renderRNElements
 * 解析器按开关取 @render-html-parser, 两种开关下都覆盖全链路
 */
import { DomHandler, Parser } from '@render-html-parser'
import RNRenderHTML from '../html'

import type { ParsedNode } from '../html-parser/self'

// react-native-webview 为 ESM, jest 不转换, 用 mock 绕开 (本用例不渲染 iframe)
jest.mock('react-native-webview', () => ({ WebView: () => null }))
// 盘古排版与本链路无关, jest 环境下 syncSpacing 取不到实现, 只替换该导出
jest.mock('@utils/async', () => ({
  ...jest.requireActual('@utils/async'),
  syncSpacing: (text: string) => text
}))

/** 按 html.jsx 的用法跑解析与节点映射, 并确认渲染层不抛错 */
function mapHtml(html: string): any[] {
  let dom: ParsedNode[] = []
  const parser = new Parser(
    new DomHandler((_err, nodes) => {
      dom = nodes
    }),
    { decodeEntities: true }
  )
  parser.write(html)
  parser.done()

  const props: any = { ...(RNRenderHTML as any).defaultProps, html }
  const instance: any = new (RNRenderHTML as any)(props)
  instance.generateDefaultStyles()

  const nodes = instance.mapDOMNodesTORNElements(dom)
  expect(() => instance.renderRNElements(nodes, 'root', 0, props)).not.toThrow()

  return nodes
}

function collectData(nodes: any[]): string {
  return nodes
    .map(node => (node.data || '') + (node.children ? collectData(node.children) : ''))
    .join('')
}

test('实体 / p / img / br', () => {
  const nodes = mapHtml('<p>a&amp;b</p><img src="https://bgm.tv/x.png" alt="i"><br>c')
  const text = collectData(nodes)

  expect(text).toContain('a&b')
  expect(text).toContain('c')
  expect(nodes.map(node => `${node.tagName}:${node.wrapper}`)).toEqual([
    'p:Text',
    'img:View',
    'textwrapper:Text'
  ])
})

test('script / style 子树不进入文本', () => {
  const nodes = mapHtml('<div>a<script>var x = 1</script><style>.a{color:red}</style>b</div>')
  const text = collectData(nodes)

  expect(text).toContain('a')
  expect(text).toContain('b')
  expect(text).not.toContain('var x')
  expect(text).not.toContain('color:red')
  expect(nodes.map(node => `${node.tagName}:${node.wrapper}`)).toEqual(['div:View'])
})
