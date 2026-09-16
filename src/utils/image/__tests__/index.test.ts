/*
 * @Author: czy0729
 * @Date: 2026-09-16 05:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 19:10:00
 */
import { applyLainProxy } from '../../proxy'
import { fixImageProtocol, getDirectImageUri, isRemoteImageUrl, resolveImageUri } from '../index'

jest.mock('../../proxy', () => ({
  // 展开真实实现: 本模块后续若用到 proxy 其它导出, 不会静默变成 undefined
  ...jest.requireActual('../../proxy'),
  // 记录代理入参, 用于断言「先补协议后代理」的顺序
  applyLainProxy: jest.fn((url: string) => `proxy(${url})`)
}))

const mockApplyLainProxy = applyLainProxy as jest.Mock

beforeEach(() => {
  mockApplyLainProxy.mockReset()
  mockApplyLainProxy.mockImplementation((url: string) => `proxy(${url})`)
})

describe('isRemoteImageUrl', () => {
  it('协议相对地址为远程', () => {
    expect(isRemoteImageUrl('//lain.bgm.tv/pic/crt/m/1.jpg')).toBe(true)
  })

  it('http / https 为远程 (大小写不敏感)', () => {
    expect(isRemoteImageUrl('https://lain.bgm.tv/pic/crt/m/1.jpg')).toBe(true)
    expect(isRemoteImageUrl('http://lain.bgm.tv/pic/crt/m/1.jpg')).toBe(true)
    expect(isRemoteImageUrl('HTTPS://lain.bgm.tv/pic/crt/m/1.jpg')).toBe(true)
  })

  it('缺 `//` 的畸形协议不算远程', () => {
    expect(isRemoteImageUrl('https:/uploads/a.png')).toBe(false)
    expect(isRemoteImageUrl('https:./x.png')).toBe(false)
    expect(isRemoteImageUrl('http:foo')).toBe(false)
    expect(isRemoteImageUrl('//')).toBe(false)
  })

  it('本地与相对地址不是远程', () => {
    expect(isRemoteImageUrl('file:///var/mobile/1.jpg')).toBe(false)
    expect(isRemoteImageUrl('content://media/1.jpg')).toBe(false)
    expect(isRemoteImageUrl('data:image/png;base64,xxx')).toBe(false)
    expect(isRemoteImageUrl('blob:http://localhost/xxx')).toBe(false)
    expect(isRemoteImageUrl('./local.png')).toBe(false)
    expect(isRemoteImageUrl('/var/mobile/1.jpg')).toBe(false)
  })

  it('空值与非字符串不是远程', () => {
    expect(isRemoteImageUrl('')).toBe(false)
    expect(isRemoteImageUrl(undefined)).toBe(false)
    expect(isRemoteImageUrl(null)).toBe(false)
    expect(isRemoteImageUrl(123)).toBe(false)
    expect(isRemoteImageUrl({ uri: 'https://lain.bgm.tv/1.jpg' })).toBe(false)
  })
})

describe('fixImageProtocol', () => {
  it('协议相对地址补 https', () => {
    expect(fixImageProtocol('//lain.bgm.tv/pic/crt/m/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/crt/m/1.jpg'
    )
  })

  it('lain 系图床的 http 升级为 https (含 lain.bangumi.tv)', () => {
    expect(fixImageProtocol('http://lain.bgm.tv/pic/crt/m/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/crt/m/1.jpg'
    )
    expect(fixImageProtocol('http://lain.bangumi.tv/pic/crt/m/1.jpg')).toBe(
      'https://lain.bangumi.tv/pic/crt/m/1.jpg'
    )
  })

  it('非 lain 域的 http 保持原样 (不做强制 https)', () => {
    expect(fixImageProtocol('http://i0.hdslb.com/x.jpg')).toBe('http://i0.hdslb.com/x.jpg')
    expect(fixImageProtocol('http://img.5t5.top/x.jpg')).toBe('http://img.5t5.top/x.jpg')
  })

  it('本地 / 相对地址 / 空值 / 非字符串原样返回', () => {
    expect(fixImageProtocol('file:///var/mobile/1.jpg')).toBe('file:///var/mobile/1.jpg')
    expect(fixImageProtocol('./local.png')).toBe('./local.png')
    expect(fixImageProtocol('')).toBe('')
    expect(fixImageProtocol(undefined)).toBe(undefined)
    expect(fixImageProtocol(123)).toBe(123)
  })

  it('不做质量段改写 (与 @utils/app/cover 的 fixedRemoteImageUrl 语义区分)', () => {
    expect(fixImageProtocol('https://lain.bgm.tv/r/800/pic/cover/s/x.jpg')).toBe(
      'https://lain.bgm.tv/r/800/pic/cover/s/x.jpg'
    )
  })
})

describe('getDirectImageUri', () => {
  it('历史旧代理域名的 /pic/ 地址归一化为官方域并补协议', () => {
    expect(getDirectImageUri('http://old-node.example.com/pic/cover/l/x.jpg')).toBe(
      'https://lain.bgm.tv/pic/cover/l/x.jpg'
    )
    expect(getDirectImageUri('//old-node.example.com/pic/cover/l/x.jpg')).toBe(
      'https://lain.bgm.tv/pic/cover/l/x.jpg'
    )
  })

  it('非 /pic/ 路径不受归一化影响, 只补协议', () => {
    expect(getDirectImageUri('//lain.bgm.tv/user/1.jpg')).toBe('https://lain.bgm.tv/user/1.jpg')
    expect(getDirectImageUri('https://lain.bgm.tv/pic/crt/m/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/crt/m/1.jpg'
    )
  })

  it('本地 / 相对地址 / 空值 / 非字符串原样返回, 且不触发代理', () => {
    expect(getDirectImageUri('file:///var/mobile/1.jpg')).toBe('file:///var/mobile/1.jpg')
    expect(getDirectImageUri('./local.png')).toBe('./local.png')
    expect(getDirectImageUri('')).toBe('')
    expect(getDirectImageUri(123)).toBe(123)
    expect(mockApplyLainProxy).not.toHaveBeenCalled()
  })
})

describe('resolveImageUri', () => {
  it('协议相对地址先补协议再代理', () => {
    expect(resolveImageUri('//lain.bgm.tv/pic/crt/m/1.jpg')).toBe(
      'proxy(https://lain.bgm.tv/pic/crt/m/1.jpg)'
    )
    expect(mockApplyLainProxy).toHaveBeenCalledTimes(1)
    expect(mockApplyLainProxy).toHaveBeenNthCalledWith(1, 'https://lain.bgm.tv/pic/crt/m/1.jpg')
  })

  it('lain 的 http 地址升级 https 后再代理', () => {
    expect(resolveImageUri('http://lain.bgm.tv/pic/crt/m/1.jpg')).toBe(
      'proxy(https://lain.bgm.tv/pic/crt/m/1.jpg)'
    )
    expect(mockApplyLainProxy).toHaveBeenNthCalledWith(1, 'https://lain.bgm.tv/pic/crt/m/1.jpg')
  })

  it('历史旧代理域名 + http: 归一化后补 https 再代理 (不能残留 http)', () => {
    expect(resolveImageUri('http://old-node.example.com/pic/cover/l/x.jpg')).toBe(
      'proxy(https://lain.bgm.tv/pic/cover/l/x.jpg)'
    )
    expect(mockApplyLainProxy).toHaveBeenNthCalledWith(1, 'https://lain.bgm.tv/pic/cover/l/x.jpg')
  })

  it('非 lain 域的 http 地址不强制 https, 只套代理', () => {
    expect(resolveImageUri('http://i0.hdslb.com/x.jpg')).toBe('proxy(http://i0.hdslb.com/x.jpg)')
  })

  it('不做质量段改写, 不放大请求体积', () => {
    expect(resolveImageUri('https://lain.bgm.tv/r/800/pic/cover/s/x.jpg')).toBe(
      'proxy(https://lain.bgm.tv/r/800/pic/cover/s/x.jpg)'
    )
  })

  it('畸形协议地址不补前缀 (幂等, 不产生 https:https:/a.png)', () => {
    expect(resolveImageUri('https:/uploads/a.png')).toBe('https:/uploads/a.png')
    expect(resolveImageUri('https:./x.png')).toBe('https:./x.png')
    expect(resolveImageUri('//')).toBe('//')
    expect(mockApplyLainProxy).not.toHaveBeenCalled()
  })

  it('已是 https 地址是幂等输入', () => {
    const uri = 'https://lain.bgm.tv/pic/crt/m/1.jpg'
    expect(resolveImageUri(uri)).toBe(`proxy(${uri})`)
    expect(fixImageProtocol(fixImageProtocol(uri))).toBe(uri)
  })

  it('直连 / ECH (代理原样返回) 时仅补协议, 不改变地址语义', () => {
    mockApplyLainProxy.mockImplementation((url: string) => url)

    expect(resolveImageUri('//lain.bgm.tv/pic/crt/m/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/crt/m/1.jpg'
    )
    expect(resolveImageUri('https://lain.bgm.tv/pic/crt/m/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/crt/m/1.jpg'
    )
  })

  it('本地与相对地址原样返回, 不触发代理', () => {
    expect(resolveImageUri('file:///var/mobile/1.jpg')).toBe('file:///var/mobile/1.jpg')
    expect(resolveImageUri('content://media/1.jpg')).toBe('content://media/1.jpg')
    expect(resolveImageUri('./local.png')).toBe('./local.png')
    expect(resolveImageUri('/var/mobile/1.jpg')).toBe('/var/mobile/1.jpg')
    expect(mockApplyLainProxy).not.toHaveBeenCalled()
  })

  it('空值与非字符串原样返回', () => {
    expect(resolveImageUri('')).toBe('')
    expect(resolveImageUri(undefined)).toBe(undefined)
    expect(resolveImageUri(123)).toBe(123)
    expect(mockApplyLainProxy).not.toHaveBeenCalled()
  })
})
