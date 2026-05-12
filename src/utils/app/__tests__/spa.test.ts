/*
 * @Author: czy0729
 * @Date: 2026-05-12
 */
jest.mock('../../utils', () => ({
  urlStringify: (obj: Record<string, any>) =>
    Object.entries(obj)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
}))

import { getSPAId, getSPAParams } from '../spa'

describe('getSPAId', () => {
  it('驼峰命名正确转换', () => {
    expect(getSPAId('CatalogDetail')).toBe('screens-catalogdetail--catalog-detail')
  })

  it('带数字的命名', () => {
    expect(getSPAId('LoginV2')).toBe('screens-loginv2--login-v-2')
  })

  it('单个单词', () => {
    expect(getSPAId('Subject')).toBe('screens-subject--subject')
  })

  it('全大写 - 不会被拆分（正则只匹配小写后跟大写）', () => {
    const result = getSPAId('ABC')
    expect(result).toBe('screens-abc--abc')
  })

  it('空字符串', () => {
    const result = getSPAId('')
    expect(result).toBe('screens---')
  })

  it('带连续大写字母', () => {
    const result = getSPAId('MyURLHelper')
    // 'MyURLHelper' -> 'My-URLHelper' -> 'my-urlhelper'
    expect(result).toBe('screens-myurlhelper--my-urlhelper')
  })

  it('数字在名称中', () => {
    const result = getSPAId('V2Test')
    expect(result).toBe('screens-v2test--v-2test')
  })
})

describe('getSPAParams', () => {
  it('正常参数', () => {
    const result = getSPAParams('Subject', { cat: 'all' })
    expect(result).toContain('id=screens-subject--subject')
    expect(result).toContain('viewMode=story')
    expect(result).toContain('cat=all')
  })

  it('id 参数被过滤，使用 getSPAId 生成的 id', () => {
    const result = getSPAParams('Subject', { id: '123', cat: 'all' })
    // 应该包含自动生成的 id，而不是传入的 123
    expect(result).toContain('id=screens-subject--subject')
    expect(result).not.toContain('id=123')
  })

  it('无参数', () => {
    const result = getSPAParams('LoginV2')
    expect(result).toContain('id=screens-loginv2--login-v-2')
    expect(result).toContain('viewMode=story')
  })

  it('undefined 参数', () => {
    const result = getSPAParams('Subject', undefined)
    expect(result).toContain('id=screens-subject--subject')
  })

  // 已修复：falsy 值（0, false）不再被过滤
  it('falsy 值（0, false）保留', () => {
    const result = getSPAParams('Subject', { page: 0, debug: false, cat: 'all' })
    expect(result).toContain('cat=all')
    expect(result).toContain('page=0')
    expect(result).toContain('debug=false')
  })

  it('下划线前缀参数不被过滤', () => {
    const result = getSPAParams('Subject', { _url: 'test', cat: 'all' })
    expect(result).toContain('_url=test')
  })
})
