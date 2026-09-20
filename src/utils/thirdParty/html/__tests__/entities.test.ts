/*
 * @Author: czy0729
 * @Date: 2026-09-20 12:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:56
 *
 * 除「超出 BMP 的码点按码点解码」为有意修正 (旧实现用 String.fromCharCode, 做不到) 外,
 * 其余期望值由旧 html-entities-decoder 差分冻结, 与 HTML5 命名实体表一致
 * 相对旧 decodeHTMLEntities (HTMLDecode 的 6 个基础命名实体 + 带分号数字实体) 的行为变更:
 * 命名实体扩到全表、数字实体不再要求分号、非法码点 (0 / 越界 / 代理项) 回退原文;
 * 变更对 decodeHTMLEntities 的全部使用方生效
 */
jest.mock('../../../utils', () => ({
  safeObject: obj => obj
}))

import { LEGACY_ENTITIES, NAMED_ENTITIES } from '../entities'
import { decodeHTMLEntities } from '../index'

describe('命名实体', () => {
  it('全表带分号', () => {
    const failed: string[] = []
    Object.keys(NAMED_ENTITIES).forEach(name => {
      const input = `&${name};`
      const result = decodeHTMLEntities(input)
      if (result !== NAMED_ENTITIES[name]) failed.push(`${input} => ${result}`)
    })

    expect(failed).toEqual([])
  })

  it('legacy 可以不带分号', () => {
    const failed: string[] = []
    Object.keys(LEGACY_ENTITIES).forEach(name => {
      const input = `&${name}`
      const result = decodeHTMLEntities(input)
      if (result !== LEGACY_ENTITIES[name]) failed.push(`${input} => ${result}`)
    })

    expect(failed).toEqual([])
  })

  it('混合文本', () => {
    expect(decodeHTMLEntities('&copy; 2026 &amp; more')).toBe('© 2026 & more')
    expect(decodeHTMLEntities('&nbsp;&nbsp;')).toBe('\u00a0\u00a0')
    expect(decodeHTMLEntities('&lt;b&gt;')).toBe('<b>')
    expect(decodeHTMLEntities('&amp;&lt;')).toBe('&<')
  })
})

describe('非实体内容原样保留', () => {
  it('查不到的实体名', () => {
    expect(decodeHTMLEntities('&unknown;')).toBe('&unknown;')
    expect(decodeHTMLEntities('&#xZZ;')).toBe('&#xZZ;')
    expect(decodeHTMLEntities('&#a;')).toBe('&#a;')
  })

  it('不足两个字符的候选', () => {
    expect(decodeHTMLEntities('&#;')).toBe('&#;')
    expect(decodeHTMLEntities('&#x;')).toBe('&#x;')
    expect(decodeHTMLEntities('&')).toBe('&')
    expect(decodeHTMLEntities('&&')).toBe('&&')
    expect(decodeHTMLEntities('')).toBe('')
  })

  it('不带分号的残串不参与解码', () => {
    expect(decodeHTMLEntities('&amp x')).toBe('&amp x')
    expect(decodeHTMLEntities('&nope &amp;')).toBe('&nope &amp;')
  })

  it('无 & 的字符串直接返回', () => {
    expect(decodeHTMLEntities('a & b')).toBe('a & b')
    expect(decodeHTMLEntities('普通文本')).toBe('普通文本')
  })
})

describe('数字实体', () => {
  it('十进制与十六进制', () => {
    expect(decodeHTMLEntities('&#39;')).toBe("'")
    expect(decodeHTMLEntities('&#x27;')).toBe("'")
    expect(decodeHTMLEntities('&#38;')).toBe('&')
    // 贪婪匹配会吞掉后半个 `#39;`, 属畸形输入的副作用
    expect(decodeHTMLEntities('&#39#39;')).toBe("'")
  })

  it('超出 BMP 的码点按码点解码', () => {
    expect(decodeHTMLEntities('&#x1F600;')).toBe('😀')
    expect(decodeHTMLEntities('&#128512;')).toBe('😀')
    expect(decodeHTMLEntities('&#x1f600')).toBe('😀')
  })

  it('零 / 越界 / 代理项 / 负数保留原文', () => {
    expect(decodeHTMLEntities('&#0;')).toBe('&#0;')
    expect(decodeHTMLEntities('&#1114112;')).toBe('&#1114112;')
    expect(decodeHTMLEntities('&#55357;')).toBe('&#55357;')
    expect(decodeHTMLEntities('&#-5;')).toBe('&#-5;')
  })
})

describe('HTML5 实体表取值', () => {
  it('希腊字母', () => {
    expect(decodeHTMLEntities('&lambda;')).toBe('λ')
    expect(decodeHTMLEntities('&nu;')).toBe('ν')
  })

  it('尖括号', () => {
    expect(decodeHTMLEntities('&lang;')).toBe('⟨')
    expect(decodeHTMLEntities('&rang;')).toBe('⟩')
  })

  it('exist 与已废弃的 exists', () => {
    expect(decodeHTMLEntities('&exist;')).toBe('∃')
    expect(decodeHTMLEntities('&exists;')).toBe('&exists;')
  })
})
