/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 23:14:37
 */
import { getSupporterConfig } from '@utils/kv/worker'
import { restoreNativeUrl } from '../native-url'

jest.mock('@utils/kv/worker', () => ({
  getSupporterConfig: jest.fn()
}))

/** 内置配置 (与真实形态一致: 域名 + 密钥) */
const MOCK_CONFIG = {
  host: 'https://supporter.example.com',
  secret: 'supporter-secret',
  lainHost: 'https://supporter-lain.example.com',
  lainSecret: 'supporter-lain-secret'
}

const mockGetSupporterConfig = getSupporterConfig as jest.MockedFunction<typeof getSupporterConfig>

beforeEach(() => {
  mockGetSupporterConfig.mockReturnValue({ ...MOCK_CONFIG })
})

describe('restoreNativeUrl - 主节点', () => {
  it('域名替换为 bgm.tv', () => {
    expect(restoreNativeUrl('https://supporter.example.com/subject/1')).toBe(
      'https://bgm.tv/subject/1'
    )
  })

  it('保留 path / query / hash', () => {
    expect(restoreNativeUrl('https://supporter.example.com/a/b?c=1&d=2#e')).toBe(
      'https://bgm.tv/a/b?c=1&d=2#e'
    )
  })

  it('域名比对不区分大小写', () => {
    expect(restoreNativeUrl('https://SUPPORTER.Example.COM/x')).toBe('https://bgm.tv/x')
  })

  it('带端口时端口一并去掉', () => {
    expect(restoreNativeUrl('https://supporter.example.com:8080/x')).toBe('https://bgm.tv/x')
  })
})

describe('restoreNativeUrl - 图片节点', () => {
  it('域名替换为 lain.bgm.tv 并移除签名参数', () => {
    expect(restoreNativeUrl('https://supporter-lain.example.com/pic/a.jpg?v=abcd')).toBe(
      'https://lain.bgm.tv/pic/a.jpg'
    )
  })

  it('协议相对地址同样还原', () => {
    expect(restoreNativeUrl('//supporter-lain.example.com/pic/a.jpg?v=abcd')).toBe(
      'https://lain.bgm.tv/pic/a.jpg'
    )
  })

  it('签名与其它参数混合时只移除签名', () => {
    expect(restoreNativeUrl('https://supporter-lain.example.com/pic/a.jpg?v=abcd&w=1')).toBe(
      'https://lain.bgm.tv/pic/a.jpg?w=1'
    )
  })

  it('无签名参数时保留原 query', () => {
    expect(restoreNativeUrl('https://supporter-lain.example.com/pic/a.jpg?w=1')).toBe(
      'https://lain.bgm.tv/pic/a.jpg?w=1'
    )
  })
})

describe('restoreNativeUrl - 不命中时原样返回', () => {
  it.each([
    'https://bgm.tv/subject/1',
    'https://lain.bgm.tv/pic/a.jpg',
    'https://my-worker.example.com/x',
    'https://supporter.example.com.evil.com/x',
    'https://evil-supporter.example.com/x',
    'https://xsupporter.example.com/x',
    'https://supporter.example.com.cn/x',
    'https://supporter.example.com:8080.evil.com/x'
  ])('%s', url => {
    expect(restoreNativeUrl(url)).toBe(url)
  })
})

describe('restoreNativeUrl - 非法入参', () => {
  it('空串原样返回', () => {
    expect(restoreNativeUrl('')).toBe('')
  })

  it('非字符串原样返回', () => {
    expect(restoreNativeUrl(undefined as unknown as string)).toBeUndefined()
    expect(restoreNativeUrl(null as unknown as string)).toBeNull()
    expect(restoreNativeUrl(123 as unknown as string)).toBe(123)
  })

  it('无协议或无域名原样返回', () => {
    expect(restoreNativeUrl('/subject/1')).toBe('/subject/1')
    expect(restoreNativeUrl('subject/1')).toBe('subject/1')
  })
})

describe('restoreNativeUrl - 内置配置缺失', () => {
  it('配置解不出域名时不做任何替换', () => {
    mockGetSupporterConfig.mockReturnValue({ host: '', secret: '', lainHost: '', lainSecret: '' })

    expect(restoreNativeUrl('https://supporter.example.com/x')).toBe(
      'https://supporter.example.com/x'
    )
    expect(restoreNativeUrl('https://supporter-lain.example.com/pic/a.jpg?v=abcd')).toBe(
      'https://supporter-lain.example.com/pic/a.jpg?v=abcd'
    )
  })
})
