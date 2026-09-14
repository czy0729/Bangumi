/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import {
  getRedirectFromBody,
  getRedirectFromHeaders,
  getRedirectFromXhr,
  parseOAuthCode
} from '../redirect'

describe('parseOAuthCode', () => {
  it('提取 ?code=', () => {
    expect(parseOAuthCode('https://bgm.tv/dev/app?code=abc123')).toBe('abc123')
  })

  it('提取 &code= 并忽略后续参数', () => {
    expect(parseOAuthCode('https://bgm.tv/dev/app?state=1&code=abc123&x=2')).toBe('abc123')
  })

  it('兼容 #code= 与端口号场景', () => {
    expect(parseOAuthCode('https://bgm.tv/dev/app#code=abc123')).toBe('abc123')
    expect(parseOAuthCode('http://127.0.0.1:8080/dev/app?code=abc123')).toBe('abc123')
  })

  it('解码 URL 编码的 code', () => {
    expect(parseOAuthCode('https://bgm.tv/dev/app?code=a%2Bb%3Dc')).toBe('a+b=c')
  })

  it('无 code 时返回空串', () => {
    expect(parseOAuthCode()).toBe('')
    expect(parseOAuthCode('')).toBe('')
    expect(parseOAuthCode('https://bgm.tv/dev/app')).toBe('')
    expect(parseOAuthCode('https://bgm.tv/dev/app?state=1')).toBe('')
  })

  it('不会把路径里的 code 字样当参数', () => {
    expect(parseOAuthCode('https://bgm.tv/dev/xcode=1')).toBe('')
  })
})

describe('getRedirectFromHeaders', () => {
  it('兼容 x-redirect-url / X-Redirect-Url / location / Location', () => {
    expect(getRedirectFromHeaders({ 'x-redirect-url': 'a' })).toBe('a')
    expect(getRedirectFromHeaders({ 'X-Redirect-Url': 'b' })).toBe('b')
    expect(getRedirectFromHeaders({ location: 'c' })).toBe('c')
    expect(getRedirectFromHeaders({ Location: 'd' })).toBe('d')
  })

  it('无值或非字符串时返回空串', () => {
    expect(getRedirectFromHeaders()).toBe('')
    expect(getRedirectFromHeaders({})).toBe('')
    expect(getRedirectFromHeaders({ location: 123 })).toBe('')
  })
})

describe('getRedirectFromBody', () => {
  it('解析节点返回的 JSON location', () => {
    expect(getRedirectFromBody('{"location":"https://bgm.tv/dev/app?code=abc"}')).toBe(
      'https://bgm.tv/dev/app?code=abc'
    )
  })

  it('解析页面内跳转脚本', () => {
    expect(getRedirectFromBody('<script>location.href = "https://bgm.tv/x?code=1";</script>')).toBe(
      'https://bgm.tv/x?code=1'
    )
  })

  it('非字符串 / 无 location 时返回空串', () => {
    expect(getRedirectFromBody()).toBe('')
    expect(getRedirectFromBody({ location: 'a' })).toBe('')
    expect(getRedirectFromBody('<html>ok</html>')).toBe('')
  })
})

describe('getRedirectFromXhr', () => {
  it('优先取响应头', () => {
    expect(
      getRedirectFromXhr({
        responseURL: 'https://node.example.com/oauth/authorize',
        getResponseHeader: name =>
          name === 'x-redirect-url' ? 'https://bgm.tv/dev/app?code=1' : null
      })
    ).toBe('https://bgm.tv/dev/app?code=1')
  })

  it('响应头缺失时回退响应体', () => {
    expect(
      getRedirectFromXhr({
        responseURL: 'https://node.example.com/oauth/authorize',
        getResponseHeader: () => null,
        _response: '{"location":"https://bgm.tv/dev/app?code=2"}'
      })
    ).toBe('https://bgm.tv/dev/app?code=2')
  })

  it('最后回退最终地址', () => {
    expect(getRedirectFromXhr({ responseURL: 'https://bgm.tv/dev/app?code=3' })).toBe(
      'https://bgm.tv/dev/app?code=3'
    )
    expect(getRedirectFromXhr()).toBe('')
  })

  it('getResponseHeader 抛错时不影响后续兜底', () => {
    expect(
      getRedirectFromXhr({
        getResponseHeader: () => {
          throw new Error('boom')
        },
        responseURL: 'https://bgm.tv/dev/app?code=4'
      })
    ).toBe('https://bgm.tv/dev/app?code=4')
  })
})
