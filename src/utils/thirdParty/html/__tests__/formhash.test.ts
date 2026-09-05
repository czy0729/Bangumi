/*
 * @Author: czy0729
 * @Date: 2026-09-02 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 17:30:36
 *
 * getFormhash 对照测试
 * - 正则实现与原 cheerio 实现 (cheerio.load(html)('input[name=formhash]').attr('value'))
 *   在各种标记形态下逐例对照, 保证替换后行为一致
 */
import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { resolveEngine } from '../engines'
import { getFormhash } from '../index'

/**
 * 原 cheerio 实现语义 (cheerio-without-node-native 原生 load, 含 data || '' 兜底), 仅测试内使用
 *  - 未命中时 cheerio 返回 undefined, getFormhash 返回 '', 调用点均为 falsy 判断/赋值, 语义等价;
 *    唯一例外是 update-tourist 把返回值序列化进请求体, undefined → `formhash=undefined`、
 *    '' → `formhash=`, 差异仅在登录失败的路径上, 服务端均拒绝, 无实际影响
 */
function getFormhashViaCheerio(html: string): string {
  return (
    resolveEngine()
      .load(html || '')('input[name=formhash]')
      .attr('value') || ''
  )
}

/** 对照断言: 两种实现结果一致, 且与显式期望一致 */
function expectSame(html: string, expected: string) {
  expect(getFormhash(html)).toBe(expected)
  expect(getFormhashViaCheerio(html)).toBe(expected)
}

const CASES: [string, string, string][] = [
  [
    'name 在前 value 在后 (双引号)',
    '<form><input type="hidden" name="formhash" value="abc123def456"></form>',
    'abc123def456'
  ],
  [
    'value 在前 name 在后 (双引号)',
    '<form><input type="hidden" value="xyz789abc" name="formhash"></form>',
    'xyz789abc'
  ],
  ['单引号属性', "<input type='hidden' name='formhash' value='a1b2c3d4'>", 'a1b2c3d4'],
  ['无引号属性', '<input type=hidden name=formhash value=e5f6a7b8>', 'e5f6a7b8'],
  ['等号两侧含空格', '<input type="hidden" name = "formhash" value = "c1d2e3f4a5">', 'c1d2e3f4a5'],
  ['data-name 嵌 formhash 不应命中', '<input data-name="formhash" value="should-not-match">', ''],
  [
    '属性值内含 value= 且无真实 value 属性, 不应误命中',
    '<input name="formhash" data-x="value=evil">',
    ''
  ],
  [
    '属性值内含 value= 不影响真实 value 属性',
    '<input name="formhash" data-x="value=evil" value="real1value">',
    'real1value'
  ],
  ['属性带反斜杠自闭合', '<input name="formhash" value="1234567890abcdef" />', '1234567890abcdef'],
  [
    '多个 input, formhash 不是第一个',
    '<input name="referer" value="/"><input name="formhash" value="ffffffffffffffff">',
    'ffffffffffffffff'
  ],
  [
    'input 标签含换行属性',
    '<input\n  type="hidden"\n  name="formhash"\n  value="aaaa1111bbbb2222"\n>',
    'aaaa1111bbbb2222'
  ],
  [
    'name 含 formhash 前缀 (formhash_x) 不应命中',
    '<input name="formhash_x" value="should-not-match">',
    ''
  ],
  ['页面无 formhash 返回空', '<html><body><input name="submit" value="登录"></body></html>', ''],
  ['空字符串返回空', '', ''],
  ['undefined 兜底为空', undefined as any, '']
]

describe('getFormhash', () => {
  it('运行时结构符合类型定义', () => {
    expect(typeof getFormhash).toBe('function')
    expect(getFormhash()).toBe('')
  })

  describe('与 cheerio 实现对照', () => {
    CASES.forEach(([name, html, expected]) => {
      it(name, () => {
        expectSame(html, expected)
      })
    })
  })

  describe('真实 fixture 对照', () => {
    const FIXTURE_DIRS = [
      'src/stores/rakuen/__tests__/html',
      'src/stores/discovery/__test__/html',
      'src/stores/search/__test__/html',
      'src/stores/timeline/__tests__/html',
      'src/stores/user/__tests__/html'
    ].map(rel => resolve(__dirname, '../../../../..', rel))

    FIXTURE_DIRS.forEach(dir => {
      readdirSync(dir)
        .filter(name => name.endsWith('.html'))
        .sort()
        .forEach(name => {
          const html = readFileSync(resolve(dir, name), 'utf-8')
          it(`${name} 两种实现一致`, () => {
            expect(getFormhash(html)).toBe(getFormhashViaCheerio(html))
          })
        })
    })
  })
})
