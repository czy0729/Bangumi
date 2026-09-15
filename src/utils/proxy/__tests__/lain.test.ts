/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 05:40:00
 */
import { syncSystemStore } from '@utils/async'
import { getSupporterConfig } from '@utils/kv/worker'
import { API_HOST } from '@constants/api'
import { hmacSHA256 } from '../../thirdParty/crypto'
import { applyLainProxy } from '../lain'
import { clearWorkerLogs, getWorkerLogs } from '../worker-log'

jest.mock('@utils/async', () => ({
  syncSystemStore: jest.fn()
}))

jest.mock('@constants/host', () => ({
  HOST: 'https://bgm.tv',
  HOST_NAME: 'bgm.tv',
  HOST_2: 'https://bangumi.tv',
  HOST_3: 'https://chii.in',
  HOST_IMAGE: '//lain.bgm.tv',
  HOST_CDN: 'https://cdn.jsdelivr.net',
  HOST_IMAGE_UPLOAD: 'https://p.sda1.dev',
  HOST_IMAGE_UPLOAD_RYMK: 'https://lsky.ry.mk',
  HOST_NETABA: 'https://netaba.re'
}))

jest.mock('@constants/cdn/ds', () => ({
  HOST_CDN_AVATAR: 'https://cdn-avatar.example.com',
  HOST_DOGE: 'https://doge.example.com'
}))

jest.mock('@utils/kv/worker', () => ({
  getSupporterConfig: () => ({
    host: 'https://supporter.example.com',
    secret: 'supporter-secret',
    lainHost: 'https://supporter-lain.example.com',
    lainSecret: 'supporter-lain-secret'
  })
}))

jest.mock('@utils/thirdParty/crypto', () => ({
  // constants/cdn/ds.ts 以命名导入使用 get
  get: (value: string) => value,
  default: { get: (value: string) => value },
  hmacSHA256: jest.fn((message: string, secret: string) => `${secret}${message}`)
}))

jest.mock('../ech', () => ({
  isEchProxyRunning: jest.fn(() => false)
}))

/** 内置支持者配置 (与 @utils/kv/worker 的 mock 一致) */
const SUPPORTER = getSupporterConfig()

const LAIN = 'https://lain.bgm.tv'
const LAIN_PROXY = 'https://my-lain.example.com'

/** 默认设置 (直连以外, 未配置任何地址) */
const DEFAULTS = {
  workerProxyDisabled: false,
  workerProxy: '',
  workerSecret: '',
  workerProxyDirect: false,
  workerApiProxy: '',
  workerLainProxy: '',
  workerLainSecret: ''
}

/** 统计指定 pathname 的 HMAC 计算次数 */
function hmacCallsFor(pathnamePart: string): number {
  return (hmacSHA256 as jest.Mock).mock.calls.filter(([msg]) => String(msg).includes(pathnamePart))
    .length
}

/** 构造可控的 systemStore.setting */
function setSetting(overrides: Record<string, string | boolean> = {}) {
  ;(syncSystemStore as jest.Mock).mockReturnValue({
    setting: { ...DEFAULTS, ...overrides }
  })
}

/** 构造支持者节点场景 (高级会员) */
function setSupporter(overrides: Record<string, string | boolean> = {}) {
  ;(syncSystemStore as jest.Mock).mockReturnValue({
    advance: true,
    setting: { ...DEFAULTS, workerPreset: 'supporter', ...overrides }
  })
}

/** 获取 ech mock 以便控制运行状态 */
function getEchMock(): jest.Mock {
  const { isEchProxyRunning } = require('../ech') as {
    isEchProxyRunning: jest.Mock
  }
  return isEchProxyRunning
}

beforeEach(() => {
  clearWorkerLogs()
  getEchMock().mockReturnValue(false)
  ;(hmacSHA256 as jest.Mock).mockClear()
  setSetting()
})

describe('applyLainProxy', () => {
  it('空入参 (undefined / 空串) 直接原样返回, 不触发 includes 崩溃', () => {
    setSetting({
      workerApiProxy: 'https://my-api.example.com',
      workerLainProxy: LAIN_PROXY,
      workerLainSecret: 'k1'
    })

    expect(applyLainProxy(undefined as never)).toBeUndefined()
    expect(applyLainProxy(null as never)).toBeNull()
    expect(applyLainProxy('')).toBe('')
  })

  it('ECH 代理运行时原样返回', () => {
    getEchMock().mockReturnValue(true)
    setSetting({ workerLainProxy: LAIN_PROXY })

    expect(applyLainProxy(`${LAIN}/r/400/pic.jpg`)).toBe(`${LAIN}/r/400/pic.jpg`)
  })

  it('全局禁用代理时原样返回', () => {
    setSetting({ workerProxyDisabled: true, workerLainProxy: LAIN_PROXY })

    expect(applyLainProxy(`${LAIN}/r/400/pic.jpg`)).toBe(`${LAIN}/r/400/pic.jpg`)
  })

  it('未配置 workerLainProxy 时原样返回', () => {
    expect(applyLainProxy(`${LAIN}/r/400/pic.jpg`)).toBe(`${LAIN}/r/400/pic.jpg`)
  })

  it('非 lain 域名原样返回', () => {
    setSetting({ workerLainProxy: LAIN_PROXY })

    expect(applyLainProxy('https://example.com/pic.jpg')).toBe('https://example.com/pic.jpg')
  })

  it('旧代理域名的存量地址: 归一化后按当前节点改写, 业务参数保留且重新签名', () => {
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })

    const result = applyLainProxy(
      'https://lain.bangumi.pro/pic/user/l/000/83/30/833068.jpg?r=1754799711&hd=1&v=old'
    )

    expect(result).toBe(`${LAIN_PROXY}/pic/user/l/000/83/30/833068.jpg?r=1754799711&hd=1&v=k1/p`)
  })

  it('全局禁用代理时: 旧代理域名仍归一化为官方域, 不再请求已失效节点', () => {
    setSetting({ workerProxyDisabled: true })

    expect(applyLainProxy('https://lain.bangumi.pro/pic/user/l/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/user/l/1.jpg'
    )
  })

  it('ECH 运行时: 旧代理域名同样归一化', () => {
    getEchMock().mockReturnValue(true)

    expect(applyLainProxy('//lain.bangumi.pro/pic/user/l/1.jpg?v=old')).toBe(
      '//lain.bgm.tv/pic/user/l/1.jpg'
    )
  })

  it('替换 lain 域名为代理域名', () => {
    setSetting({ workerLainProxy: LAIN_PROXY })

    const result = applyLainProxy(`${LAIN}/r/400/pic/a.jpg`)

    expect(result).toBe(`${LAIN_PROXY}/r/400/pic/a.jpg`)
  })

  it('无 secret 时不追加 v= 签名并记录 lain 日志', () => {
    setSetting({ workerLainProxy: LAIN_PROXY })

    const result = applyLainProxy(`${LAIN}/r/400/pic/a.jpg`)

    expect(result).toBe(`${LAIN_PROXY}/r/400/pic/a.jpg`)
    expect(getWorkerLogs()).toHaveLength(1)
    expect(getWorkerLogs()[0].type).toBe('lain')
  })

  it('有 secret 时用 ? 追加 v= 签名', () => {
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })

    const result = applyLainProxy(`${LAIN}/r/400/pic/a.jpg`)

    // mock 实现: hmac(pathname, secret) => `${secret}${pathname}`, 生产代码截取前 4 位
    expect(result).toBe(`${LAIN_PROXY}/r/400/pic/a.jpg?v=k1/r`)
  })

  it('url 已含 query 时用 & 追加签名', () => {
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })

    const result = applyLainProxy(`${LAIN}/r/400/pic/a.jpg?size=full`)

    expect(result).toContain('&v=')
  })

  it('签名只对 pathname 计算, 不包含 query string', () => {
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })

    applyLainProxy(`${LAIN}/r/400/pathname-check/pic.jpg?x=1`)

    expect((hmacSHA256 as jest.Mock).mock.calls[0][0]).toBe('/r/400/pathname-check/pic.jpg')
  })

  it('api.bgm.tv 的 redirect 图片走 API proxy 且不加 lain 签名', () => {
    setSetting({
      workerApiProxy: 'https://my-api.example.com/',
      workerLainProxy: LAIN_PROXY,
      workerLainSecret: 'k1'
    })

    const result = applyLainProxy(`${API_HOST}/img/avatar.jpg`)

    expect(result).toBe('https://my-api.example.com/img/avatar.jpg')
    expect(hmacSHA256).not.toHaveBeenCalled()
  })

  it('同一 pathname 第二次请求命中缓存, 不重复计算 HMAC', () => {
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })

    applyLainProxy(`${LAIN}/r/400/cache/pic.jpg`)
    applyLainProxy(`${LAIN}/r/400/cache/pic.jpg`)

    expect(hmacCallsFor('/cache/pic.jpg')).toBe(1)
  })
})

describe('applyLainProxy - 支持者节点', () => {
  it('图片走内置图片节点并带 v= 签名', () => {
    setSupporter()

    const result = applyLainProxy(`${LAIN}/r/400/pic/a.jpg`)

    expect(result.startsWith(`${SUPPORTER.lainHost}/`)).toBe(true)
    expect(result).toContain('v=')
  })

  it('api 图片由内置主节点接管, 无需用户填写任何地址', () => {
    setSupporter()

    expect(applyLainProxy(`${API_HOST}/img/avatar.jpg`)).toBe(`${SUPPORTER.host}/img/avatar.jpg`)
  })

  it('用户自填的图片地址与密钥在支持者模式下不生效', () => {
    setSupporter({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })

    const result = applyLainProxy(`${LAIN}/r/400/pic/a.jpg`)

    expect(result.startsWith(`${SUPPORTER.lainHost}/`)).toBe(true)
    expect(result).not.toContain(LAIN_PROXY)
  })

  it('非高级会员时支持者设置不生效', () => {
    ;(syncSystemStore as jest.Mock).mockReturnValue({
      advance: false,
      setting: { ...DEFAULTS, workerPreset: 'supporter' }
    })

    expect(applyLainProxy(`${LAIN}/r/400/pic/a.jpg`)).toBe(`${LAIN}/r/400/pic/a.jpg`)
  })
})

describe('applyLainProxy - 签名缓存', () => {
  it('更换 secret 后同名路径重新签名, 不沿用旧缓存', () => {
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })
    const before = applyLainProxy(`${LAIN}/r/400/secret-change/pic.jpg`)

    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k2' })
    const after = applyLainProxy(`${LAIN}/r/400/secret-change/pic.jpg`)

    expect(after).not.toBe(before)
  })

  it('缓存有上限, 灌满后最早条目被淘汰并重新计算', () => {
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'evict-secret' })

    const first = `${LAIN}/r/400/evict/p0.jpg`
    applyLainProxy(first)
    applyLainProxy(first)
    expect(hmacCallsFor('/evict/p0.jpg')).toBe(1) // 命中缓存

    for (let i = 0; i < 1000; i++) {
      applyLainProxy(`${LAIN}/r/400/evict/flood-${i}.jpg`)
    }
    applyLainProxy(first)

    expect(hmacCallsFor('/evict/p0.jpg')).toBe(2)
  })
})
