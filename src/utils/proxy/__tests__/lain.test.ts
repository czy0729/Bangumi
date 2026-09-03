/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:31:19
 */
import { syncSystemStore } from '@utils/async'
import { API_HOST } from '@constants/api'
import { hmacSHA256 } from '../../crypto'
import { applyLainProxy } from '../lain'
import { clearWorkerLogs, getWorkerLogs } from '../worker-log'

jest.mock('@utils/async', () => ({
  syncSystemStore: jest.fn()
}))

jest.mock('@constants/host', () => ({
  HOST: 'https://bgm.tv',
  HOST_IMAGE: '//lain.bgm.tv'
}))

jest.mock('@utils/crypto', () => ({
  // constants/cdn/ds.ts 以命名导入使用 get
  get: (value: string) => value,
  default: { get: (value: string) => value },
  hmacSHA256: jest.fn((message: string, secret: string) => `${secret}${message}`)
}))

jest.mock('../ech', () => ({
  isEchProxyRunning: jest.fn(() => false)
}))

const LAIN = 'https://lain.bgm.tv'
const LAIN_PROXY = 'https://my-lain.example.com'

/** 统计指定 pathname 的 HMAC 计算次数 */
function hmacCallsFor(pathnamePart: string): number {
  return (hmacSHA256 as jest.Mock).mock.calls.filter(([msg]) => String(msg).includes(pathnamePart))
    .length
}

/** 构造可控的 systemStore.setting */
function setSetting(overrides: Record<string, string | boolean> = {}) {
  ;(syncSystemStore as jest.Mock).mockReturnValue({
    setting: {
      workerProxyDisabled: false,
      workerProxy: '',
      workerSecret: '',
      workerProxyDirect: false,
      workerApiProxy: '',
      workerLainProxy: '',
      workerLainSecret: '',
      ...overrides
    }
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

describe('[问题] 签名缓存缺陷', () => {
  it('更换 secret 后同名路径应重新签名, 而非沿用旧缓存', () => {
    // 预期正确行为: 缓存 key 应包含 secret, 换 secret 后旧签名立即失效
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k1' })
    const before = applyLainProxy(`${LAIN}/r/400/secret-change/pic.jpg`)

    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'k2' })
    const after = applyLainProxy(`${LAIN}/r/400/secret-change/pic.jpg`)

    // 当前实现: signCache 仅以 pathname 为 key, 返回相同旧签名, 断言失败
    expect(after).not.toBe(before)
  })

  it('签名缓存应有上限, 淘汰后旧路径需重新计算 HMAC', () => {
    // 预期正确行为: 缓存有界 (上限 ≤ 1000 条), 灌满后最早条目被淘汰
    setSetting({ workerLainProxy: LAIN_PROXY, workerLainSecret: 'evict-secret' })

    const first = `${LAIN}/r/400/evict/p0.jpg`
    applyLainProxy(first)
    applyLainProxy(first)
    expect(hmacCallsFor('/evict/p0.jpg')).toBe(1) // 命中缓存

    for (let i = 0; i < 1000; i++) {
      applyLainProxy(`${LAIN}/r/400/evict/flood-${i}.jpg`)
    }
    applyLainProxy(first)

    // 当前实现: 缓存无淘汰机制, p0 仍命中, 计算次数保持 1, 断言失败
    expect(hmacCallsFor('/evict/p0.jpg')).toBe(2)
  })
})
