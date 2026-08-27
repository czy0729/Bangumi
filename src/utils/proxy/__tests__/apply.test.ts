/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 10:00:00
 */
import { syncSystemStore } from '@utils/async'
import { API_HOST, API_HOST_BACKUP, API_P1 } from '@constants/api'
import { HOST_PROXY } from '@src/config'
import { applyProxy } from '../apply'
import { clearWorkerLogs, getWorkerLogs } from '../worker-log'

jest.mock('@utils/async', () => ({
  syncSystemStore: jest.fn()
}))

jest.mock('@constants/constants', () => ({
  HOST: 'https://bgm.tv',
  HOST_IMAGE: '//lain.bgm.tv'
}))

jest.mock('@constants/device', () => ({
  WEB: true
}))

jest.mock('../ech', () => ({
  isEchProxyRunning: jest.fn(() => false)
}))

jest.mock('@utils/crypto', () => ({
  // constants/cdn/ds.ts 以命名导入使用 get
  get: (value: string) => value,
  default: { get: (value: string) => value },
  hmacSHA256: jest.fn((message: string, secret: string) => `${secret}${message}`)
}))

const WORKER = 'https://my-worker.example.com'
const API_PROXY = 'https://my-api.example.com'

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
  setSetting()
})

describe('applyProxy', () => {
  it('空入参 (undefined / 空串) 直接原样返回, 不触发 includes 崩溃', () => {
    setSetting({ workerProxy: WORKER, workerApiProxy: API_PROXY })

    expect(applyProxy(undefined as never).url).toBeUndefined()
    expect(applyProxy(null as never).url).toBeNull()
    expect(applyProxy('').url).toBe('')
  })

  it('ECH 代理运行时原样返回并标记 ech', () => {
    getEchMock().mockReturnValue(true)

    const headers = { Cookie: 'a=1' }
    const result = applyProxy('https://bgm.tv/x', headers)

    expect(result).toEqual({
      url: 'https://bgm.tv/x',
      headers: { Cookie: 'a=1' },
      proxyType: 'ech'
    })
  })

  it('全局禁用代理时原样返回, 即使配置了 worker', () => {
    setSetting({ workerProxyDisabled: true, workerProxy: WORKER })

    const result = applyProxy('https://bgm.tv/x')

    expect(result.proxyType).toBe('')
    expect(result.url).toBe('https://bgm.tv/x')
  })

  it('api 分支替换主 API 域名', () => {
    setSetting({ workerApiProxy: `${API_PROXY}/` })

    const result = applyProxy(`${API_HOST}/v0/me`)

    expect(result.url).toBe(`${API_PROXY}/v0/me`)
    expect(result.proxyType).toBe('api')
  })

  it('api 分支替换备用域名, 且去掉代理地址末尾斜杠', () => {
    setSetting({ workerApiProxy: `${API_PROXY}/` })

    const result = applyProxy(`${API_HOST_BACKUP}/v0/search`)

    expect(result.url).toBe(`${API_PROXY}/v0/search`)
    expect(result.proxyType).toBe('api')
  })

  it('p1 域名不走 api 分支, next api 无代理可用', () => {
    setSetting({ workerApiProxy: API_PROXY })

    const result = applyProxy(`${API_P1}/timeline`)

    expect(result.url).toBe(`${API_P1}/timeline`)
    expect(result.proxyType).toBe('')
  })

  it('worker 模式改写 bgm.tv 并按 isHtml 设置 x-upstream', () => {
    setSetting({ workerProxy: WORKER })

    const result = applyProxy('https://bgm.tv/subject/1', {}, true)

    expect(result.url).toBe(`${WORKER}/subject/1`)
    expect(result.headers['x-upstream']).toBe('bgm.tv')
    expect(result.proxyType).toBe('worker')
  })

  it('worker 模式 x-upstream 按 api 与 next 目标区分', () => {
    setSetting({ workerProxy: WORKER })

    const apiResult = applyProxy(`${API_HOST}/v0/me`)
    const nextResult = applyProxy(`${API_P1}/timeline`)

    expect(apiResult.headers['x-upstream']).toBe('api.bgm.tv')
    expect(nextResult.headers['x-upstream']).toBe('next.bgm.tv')
  })

  it('worker 模式配置 secret 时携带 x-proxy-key', () => {
    setSetting({ workerProxy: WORKER, workerSecret: 'my-secret' })

    const result = applyProxy('https://bgm.tv/x')

    expect(result.headers['x-proxy-key']).toBe('my-secret')
  })

  it('worker 模式转发 Cookie/User-Agent 为 X-Cookie/x-user-agent 并删除原 header', () => {
    setSetting({ workerProxy: WORKER })

    const result = applyProxy('https://bgm.tv/x', {
      Cookie: 'sid=1',
      'User-Agent': 'ua'
    })

    expect(result.headers['X-Cookie']).toBe('sid=1')
    expect(result.headers['x-user-agent']).toBe('ua')
    expect(result.headers.Cookie).toBeUndefined()
    expect(result.headers['User-Agent']).toBeUndefined()
  })

  it('worker 模式删除 host/origin hop-by-hop header', () => {
    setSetting({ workerProxy: WORKER })

    const result = applyProxy('https://bgm.tv/x', {
      host: 'bgm.tv',
      Host: 'bgm.tv',
      origin: 'https://bgm.tv',
      Origin: 'https://bgm.tv',
      Referer: 'https://bgm.tv'
    })

    expect(result.headers.host).toBeUndefined()
    expect(result.headers.Host).toBeUndefined()
    expect(result.headers.origin).toBeUndefined()
    expect(result.headers.Origin).toBeUndefined()
    expect(result.headers.Referer).toBe('https://bgm.tv')
  })

  it('direct 模式仅替换 host, Host header 与代理域名一致以避免 CDN 拒绝', () => {
    setSetting({ workerProxy: WORKER, workerProxyDirect: true })

    const result = applyProxy('https://bgm.tv/subject/1')

    expect(result.url).toBe(`${WORKER}/subject/1`)
    expect(result.headers.Host).toBe('my-worker.example.com')
    expect(result.proxyType).toBe('host')
  })

  it('web_proxy 分支对 html 页面替换为 HOST_PROXY', () => {
    const result = applyProxy('https://bgm.tv/rakuen', {}, true)

    expect(result.url).toBe(`${HOST_PROXY}/rakuen`)
    expect(result.proxyType).toBe('web_proxy')
  })

  it('web_proxy 分支非 html 不生效', () => {
    const result = applyProxy('https://bgm.tv/x', {}, false)

    expect(result.proxyType).toBe('')
    expect(result.url).toBe('https://bgm.tv/x')
  })

  it('无关域名不做任何代理', () => {
    setSetting({ workerProxy: WORKER })

    const result = applyProxy('https://example.com/other')

    expect(result.proxyType).toBe('')
    expect(result.url).toBe('https://example.com/other')
  })

  it('替换发生时写入 worker 日志, api 与 host 类型正确', () => {
    setSetting({ workerApiProxy: API_PROXY })
    applyProxy(`${API_HOST}/v0/me`)

    setSetting({ workerProxy: WORKER })
    applyProxy('https://bgm.tv/x')

    const logs = getWorkerLogs()
    expect(logs).toHaveLength(2)
    expect(logs[0].type).toBe('api')
    expect(logs[1].type).toBe('host')
  })

  it('未发生替换时不写日志', () => {
    setSetting({ workerProxy: WORKER })
    applyProxy('https://example.com/other')

    expect(getWorkerLogs()).toHaveLength(0)
  })

  it('不修改传入的 headers 对象', () => {
    setSetting({ workerProxy: WORKER })

    const headers = { Cookie: 'sid=1', host: 'bgm.tv' }
    applyProxy('https://bgm.tv/x', headers)

    expect(headers).toEqual({ Cookie: 'sid=1', host: 'bgm.tv' })
  })
})
