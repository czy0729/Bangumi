/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import { parseSetCookieHeader, parseSetCookieItems } from '../set-cookie'

describe('parseSetCookieHeader', () => {
  it('优先读节点输出的合并头 x-set-cookie', () => {
    expect(
      parseSetCookieHeader({
        'x-set-cookie': 'chii_sid=a; path=/, chii_auth=b; path=/',
        'set-cookie': ['chii_sid=old']
      })
    ).toBe('chii_sid=a; path=/, chii_auth=b; path=/')
  })

  it('兼容 axios 解析出的多值数组 (每行一条), 不再只取第一条', () => {
    expect(
      parseSetCookieHeader({
        'set-cookie': ['chii_sid=a; path=/', 'chii_sec_id=b; expires=Sun, 20-Sep-2026 23:33:56 GMT']
      })
    ).toBe('chii_sid=a; path=/, chii_sec_id=b; expires=Sun, 20-Sep-2026 23:33:56 GMT')
  })

  it('兼容单值字符串与大小写写法', () => {
    expect(parseSetCookieHeader({ 'Set-Cookie': 'chii_sid=a' })).toBe('chii_sid=a')
    expect(parseSetCookieHeader({ 'X-Set-Cookie': 'chii_sid=a' })).toBe('chii_sid=a')
  })

  it('无 cookie 时返回空串', () => {
    expect(parseSetCookieHeader()).toBe('')
    expect(parseSetCookieHeader({})).toBe('')
    expect(parseSetCookieHeader({ 'set-cookie': [] })).toBe('')
    expect(parseSetCookieHeader({ 'set-cookie': ['', '  '] })).toBe('')
  })
})

describe('parseSetCookieItems', () => {
  it('多条独立 Set-Cookie 全部解析, 不丢 chii_sec_id', () => {
    const items = parseSetCookieItems({
      'set-cookie': [
        'chii_sid=aaa; expires=Sun, 20-Sep-2026 23:33:56 GMT; Max-Age=604800; path=/; domain=.bgm.tv',
        'chii_sec_id=bbb; expires=Mon, 13-Sep-2027 23:33:56 GMT',
        'chii_cookietime=2592000; expires=Mon, 13-Sep-2027 23:33:56 GMT'
      ]
    })

    expect(items.map(item => item.key)).toEqual(['chii_sid', 'chii_sec_id', 'chii_cookietime'])
    expect(items[1].value).toBe('bbb')
  })

  it('合并串里 expires 的逗号不会被误拆成新 cookie', () => {
    const items = parseSetCookieItems({
      'x-set-cookie':
        'chii_sid=aaa; expires=Sun, 20-Sep-2026 23:33:56 GMT; path=/, chii_auth=ccc; path=/'
    })

    expect(items.map(item => item.key)).toEqual(['chii_sid', 'chii_auth'])
    expect(items[1].value).toBe('ccc')
  })

  it('url 编码的值保持原样', () => {
    const items = parseSetCookieItems({
      'set-cookie': ['chii_sec_id=Prd%2BvKjbWWeEsA4U6JVJYUDkIgarFBzc3']
    })

    expect(items[0]).toEqual({
      key: 'chii_sec_id',
      value: 'Prd%2BvKjbWWeEsA4U6JVJYUDkIgarFBzc3'
    })
  })

  it('空片段与无 = 的片段被忽略', () => {
    expect(parseSetCookieItems({ 'set-cookie': ['', 'garbage'] })).toEqual([])
    expect(parseSetCookieItems()).toEqual([])
  })
})
