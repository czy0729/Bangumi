/*
 * @Author: czy0729
 * @Date: 2026-09-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 10:00:00
 */
import { isTrustedImageDomain, normalizeLainImageUrl } from '../normalize'

jest.mock('@constants/cdn/ds', () => ({
  HOST_CDN_AVATAR: 'https://cdn-avatar.example.com',
  HOST_DOGE: 'https://doge.example.com'
}))

describe('normalizeLainImageUrl - 旧代理域名还原', () => {
  it('旧节点域名 + /pic/ 路径 → 还原官方域, 业务参数保留, 节点签名移除', () => {
    expect(
      normalizeLainImageUrl(
        'https://lain.bangumi.pro/pic/user/l/000/83/30/833068.jpg?r=1754799711&hd=1&v=abcd'
      )
    ).toBe('https://lain.bgm.tv/pic/user/l/000/83/30/833068.jpg?r=1754799711&hd=1')
  })

  it('协议相对地址保留协议相对写法', () => {
    expect(normalizeLainImageUrl('//old-node.example.com/pic/user/l/1.jpg?v=abcd')).toBe(
      '//lain.bgm.tv/pic/user/l/1.jpg'
    )
  })

  it('带 /r/WxH/ 前缀的封面路径同样还原', () => {
    expect(
      normalizeLainImageUrl('https://old-node.example.com/r/400/pic/cover/m/1.jpg?v=abcd')
    ).toBe('https://lain.bgm.tv/r/400/pic/cover/m/1.jpg')
  })

  it('带端口时端口一并去掉', () => {
    expect(normalizeLainImageUrl('https://old-node.example.com:8443/pic/user/l/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/user/l/1.jpg'
    )
  })

  it('查询串全是签名参数时整体移除', () => {
    expect(normalizeLainImageUrl('https://old-node.example.com/pic/user/l/1.jpg?v=abcd')).toBe(
      'https://lain.bgm.tv/pic/user/l/1.jpg'
    )
  })
})

describe('normalizeLainImageUrl - 受信域名不处理', () => {
  it.each([
    'https://lain.bgm.tv/pic/user/l/1.jpg',
    '//lain.bgm.tv/pic/user/l/1.jpg?v=abcd',
    'https://lain.bangumi.tv/pic/user/l/1.jpg',
    'https://cdn-avatar.example.com/pic/user/123/456.jpg/bgm_poster_200',
    'https://cdn.jsdelivr.net/pic/user/l/1.jpg',
    'https://p.sda1.dev/pic/user/l/1.jpg',
    'https://lsky.ry.mk/pic/user/l/1.jpg',
    'https://doge.example.com/assets/default.png'
  ])('%s', url => {
    expect(normalizeLainImageUrl(url)).toBe(url)
  })
})

describe('normalizeLainImageUrl - sda1.dev 收敛', () => {
  it('p.sda1.dev (由常量精确覆盖) 仍受信', () => {
    const url = 'https://p.sda1.dev/pic/user/l/1.jpg'
    expect(normalizeLainImageUrl(url)).toBe(url)
  })

  it('其它 sda1.dev 子域不再受信, 按旧代理域归一化', () => {
    expect(normalizeLainImageUrl('https://img.sda1.dev/pic/user/l/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/user/l/1.jpg'
    )
  })
})

describe('normalizeLainImageUrl - 非 lain 图片路径不处理', () => {
  it.each([
    'https://example.com/img/avatar.jpg',
    'https://example.com/r/400/pic.jpg',
    'https://example.com/pic.jpg',
    'https://example.com/picx/user/l/1.jpg'
  ])('%s', url => {
    expect(normalizeLainImageUrl(url)).toBe(url)
  })
})

describe('normalizeLainImageUrl - 非法入参', () => {
  it('空值原样返回', () => {
    expect(normalizeLainImageUrl('')).toBe('')
    expect(normalizeLainImageUrl(undefined as unknown as string)).toBeUndefined()
    expect(normalizeLainImageUrl(null as unknown as string)).toBeNull()
    expect(normalizeLainImageUrl(123 as unknown as string)).toBe(123)
  })

  it('相对路径无域名时原样返回', () => {
    expect(normalizeLainImageUrl('/pic/user/l/1.jpg')).toBe('/pic/user/l/1.jpg')
    expect(normalizeLainImageUrl('pic/user/l/1.jpg')).toBe('pic/user/l/1.jpg')
  })
})

describe('isTrustedImageDomain', () => {
  it('官方域与既有图源为受信', () => {
    expect(isTrustedImageDomain('lain.bgm.tv')).toBe(true)
    expect(isTrustedImageDomain('LAIN.BGM.TV')).toBe(true)
    expect(isTrustedImageDomain('lain.bangumi.tv')).toBe(true)
    expect(isTrustedImageDomain('cdn-avatar.example.com')).toBe(true)
  })

  it('主站域为受信 (按精确域名匹配, 不靠子串)', () => {
    expect(isTrustedImageDomain('bgm.tv')).toBe(true)
    expect(isTrustedImageDomain('BGM.TV')).toBe(true)
    expect(isTrustedImageDomain('bangumi.tv')).toBe(true)
    expect(isTrustedImageDomain('chii.in')).toBe(true)
  })

  it('未知域名为非受信', () => {
    expect(isTrustedImageDomain('lain.bangumi.pro')).toBe(false)
    expect(isTrustedImageDomain('')).toBe(false)
  })
})

describe('normalizeLainImageUrl - 主站域不被改写', () => {
  it.each([
    'https://bgm.tv/pic/user/l/1.jpg',
    'https://bangumi.tv/pic/user/l/1.jpg',
    'https://chii.in/pic/user/l/1.jpg',
    '//bgm.tv/pic/cover/l/1.jpg'
  ])('%s', url => {
    expect(normalizeLainImageUrl(url)).toBe(url)
  })

  it('主站伪域 (子串命中但域名不相等) 不被豁免', () => {
    expect(normalizeLainImageUrl('https://bgm.tv-proxy.example.com/pic/user/l/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/user/l/1.jpg'
    )
  })
})

describe('normalizeLainImageUrl - 协议保真', () => {
  it('http 地址保留 http, 不降级为协议相对', () => {
    expect(normalizeLainImageUrl('http://old-node.example.com/pic/user/l/1.jpg?v=abcd')).toBe(
      'http://lain.bgm.tv/pic/user/l/1.jpg'
    )
  })

  it('https 地址保留 https', () => {
    expect(normalizeLainImageUrl('https://old-node.example.com/pic/user/l/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/user/l/1.jpg'
    )
  })

  it('协议相对地址维持协议相对', () => {
    expect(normalizeLainImageUrl('//old-node.example.com/pic/user/l/1.jpg')).toBe(
      '//lain.bgm.tv/pic/user/l/1.jpg'
    )
  })
})

describe('normalizeLainImageUrl - /pic/ 短路等价', () => {
  it('仅 query 含 /pic/ 时按原样返回 (pathname 判定不被短路破坏)', () => {
    const url = 'https://old-node.example.com/img/x.jpg?next=/pic/1.jpg'
    expect(normalizeLainImageUrl(url)).toBe(url)
  })

  it('完全不含 /pic/ 的地址原样返回', () => {
    const url = 'https://old-node.example.com/assets/default.png'
    expect(normalizeLainImageUrl(url)).toBe(url)
  })
})
