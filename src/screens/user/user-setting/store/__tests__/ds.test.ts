/*
 * @Author: czy0729
 * @Date: 2026-07-10 06:02:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-10 06:41:38
 */
import { jest } from '@jest/globals'
import { systemStore } from '@stores'
import { buildSign, normalizeSign } from '../utils'

jest.mock(
  '@stores',
  () => ({
    _: {
      window: {
        height: 800
      }
    },
    systemStore: {
      setting: {
        workerApiProxy: '',
        workerProxy: '',
        workerProxyDisabled: true
      }
    }
  }),
  { virtual: true }
)

const MIRROR = 'https://bgmmi.anibt.net'

function enableProxy() {
  systemStore.setting.workerProxyDisabled = false
  systemStore.setting.workerProxy = MIRROR
}

function disableProxy() {
  systemStore.setting.workerProxyDisabled = true
  systemStore.setting.workerProxy = ''
}

beforeEach(() => {
  disableProxy()
})

describe('normalizeSign', () => {
  it('代理关闭时镜像站域名保持不变', () => {
    const sign = `[url=${MIRROR}/group/topic/350677]link[/url]`
    expect(normalizeSign(sign)).toBe(sign)
  })

  it('代理开启但 workerProxy 为空时域名不变', () => {
    systemStore.setting.workerProxyDisabled = false
    const sign = `[url=${MIRROR}/group/topic/350677]link[/url]`
    expect(normalizeSign(sign)).toBe(sign)
  })

  it('代理开启时镜像 hostname 被替换为 bgm.tv', () => {
    enableProxy()
    const sign = `[url=${MIRROR}/group/topic/350677]link[/url]`
    expect(normalizeSign(sign)).toBe('[url=https://bgm.tv/group/topic/350677]link[/url]')
  })

  it('代理开启时正确处理路径后的参数', () => {
    enableProxy()
    const sign = `[url=${MIRROR}/index/35176]index[/url]`
    expect(normalizeSign(sign)).toBe('[url=https://bgm.tv/index/35176]index[/url]')
  })

  it('代理开启时多个镜像 URL 全部被替换', () => {
    enableProxy()
    const sign = `[url=${MIRROR}/a]A[/url] and [url=${MIRROR}/b]B[/url]`
    expect(normalizeSign(sign)).toBe('[url=https://bgm.tv/a]A[/url] and [url=https://bgm.tv/b]B[/url]')
  })

  it('代理开启时非镜像 URL 不受影响', () => {
    enableProxy()
    const sign = `[url=${MIRROR}/topic]mirror[/url] [url=https://other.site/page]other[/url]`
    const result = normalizeSign(sign)
    expect(result).toContain('bgm.tv/topic')
    expect(result).toContain('other.site')
    expect(result).not.toContain(MIRROR)
  })

  it('代理开启时不含 URL 的文本原样返回', () => {
    enableProxy()
    const sign = 'just some text'
    expect(normalizeSign(sign)).toBe(sign)
  })

  it('代理开启时裸域名在文本中也替换', () => {
    enableProxy()
    const sign = `visit ${MIRROR} for more`
    expect(normalizeSign(sign)).toBe('visit https://bgm.tv for more')
  })

  it('代理开启时带端口的 hostname 也能正确处理', () => {
    systemStore.setting.workerProxyDisabled = false
    systemStore.setting.workerProxy = 'http://192.168.1.1:3000'
    const sign = 'go to http://192.168.1.1:3000/path'
    expect(normalizeSign(sign)).toBe('go to http://bgm.tv/path')
  })
})

describe('buildSign (integration)', () => {
  it('清空已有 avatar 后不残留 [avatar][/avatar]', () => {
    const { newbio: result } = buildSign(
      'hello [avatar]old_url[/avatar] world',
      '',
      'https://example.com/bg.jpg'
    )
    expect(result).not.toMatch(/\[avatar\]\[\/avatar\]/)
    expect(result).toContain('[size=0][bg]')
  })

  it('清空已有 bg 后不残留 [bg][/bg]', () => {
    const { newbio: result } = buildSign('hello [bg]old_bg[/bg] world', 'url', '')
    expect(result).not.toMatch(/\[bg\]\[\/bg\]/)
    expect(result).toContain('[size=0][avatar]')
  })

  it('同时清空已有 avatar 和 bg 后无任何空标签', () => {
    const { newbio: result } = buildSign('prefix [avatar]a[/avatar] and [bg]b[/bg] suffix', '', '')
    expect(result).not.toMatch(/\[(avatar|bg)\]\[\/(avatar|bg)\]/)
    expect(result).not.toMatch(/\[size=0\]/)
  })

  it('追加后清空，color 包裹的空标签也被清洗', () => {
    const { newbio: result } = buildSign('just text', '', '')
    expect(result).not.toMatch(/\[color=#444444\]/)
    expect(result).not.toMatch(/\[size=0\]/)
    expect(result).toBe('just text')
  })

  it('正常替换保留其他内容', () => {
    const { newbio: result } = buildSign(
      'hello [avatar]old[/avatar] and [bg]old[/bg] world',
      'new_a',
      'new_b'
    )
    expect(result).toBe('hello [avatar]new_a[/avatar] and [bg]new_b[/bg] world')
  })

  it('无标签时追加 [color=#444444][size=0] 包裹，清洗后不留空', () => {
    const { newbio: result } = buildSign('just text', 'new_a', 'new_b')
    expect(result).toBe(
      'just text[color=#444444][size=0][avatar]new_a[/avatar][/size][/color][color=#444444][size=0][bg]new_b[/bg][/size][/color]'
    )
  })

  it('已有 [size=0][bg] 但无 [color] 包裹时自动补上', () => {
    const { newbio: result } = buildSign(
      'text[size=0][bg]https://example.com/bg.jpg[/bg][/size]',
      '',
      'https://example.com/other.jpg'
    )
    expect(result).toContain('[color=#444444][size=0][bg]')
    expect(result).toContain('[/bg][/size][/color]')
  })

  it('代理开启时先替换镜像域名再处理标签', () => {
    enableProxy()
    const { newbio: result } = buildSign(
      `[url=${MIRROR}/topic]link[/url]`,
      'new_a',
      ''
    )
    expect(result).toContain('https://bgm.tv/topic')
    expect(result).not.toContain(MIRROR)
    expect(result).toContain('[size=0][avatar]')
  })
})
