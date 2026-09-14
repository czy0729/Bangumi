/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 20:52:58
 */
import { syncSystemStore } from '@utils/async'
import { getSupporterConfig } from '@utils/kv/worker'
import { applyProxyToAxiosConfig, axiosWithProxy, axiosWithProxyRedirect } from '../axios'
import { clearWorkerLogs, getWorkerLogs } from '../worker-log'

import type { ProxyRequestConfig } from '../types'

jest.mock('@utils/async', () => ({
  syncSystemStore: jest.fn()
}))

jest.mock('@constants/host', () => ({
  HOST: 'https://bgm.tv',
  HOST_IMAGE: '//lain.bgm.tv'
}))

jest.mock('../ech', () => ({
  isEchProxyRunning: jest.fn(() => false)
}))

jest.mock('@utils/thirdParty/crypto', () => ({
  // constants/cdn/ds.ts 以命名导入使用 get
  get: (value: string) => value,
  default: { get: (value: string) => value },
  hmacSHA256: jest.fn((message: string, secret: string) => `${secret}${message}`)
}))

jest.mock('@utils/kv/worker', () => ({
  getSupporterConfig: () => ({
    host: 'https://supporter.example.com',
    secret: 'supporter-secret',
    lainHost: 'https://supporter-lain.example.com',
    lainSecret: 'supporter-lain-secret'
  })
}))

/** 内置支持者配置 (与 @utils/kv/worker 的 mock 一致) */
const SUPPORTER = getSupporterConfig()

const WORKER = 'https://my-worker.example.com'

/** 默认设置 (未配置任何地址, 非直连) */
const DEFAULTS = {
  workerProxyDisabled: false,
  workerProxy: '',
  workerSecret: '',
  workerProxyDirect: false,
  workerApiProxy: '',
  workerLainProxy: '',
  workerLainSecret: ''
}

/** 构造可控的 systemStore.setting */
function setSetting(overrides: Record<string, string | boolean> = {}) {
  ;(syncSystemStore as jest.Mock).mockReturnValue({
    setting: { ...DEFAULTS, ...overrides }
  })
}

/** 构造支持者节点场景 (高级会员, 未填写任何地址) */
function setSupporter(overrides: Record<string, string | boolean> = {}) {
  ;(syncSystemStore as jest.Mock).mockReturnValue({
    advance: true,
    setting: { ...DEFAULTS, workerPreset: 'supporter', ...overrides }
  })
}

beforeEach(() => {
  clearWorkerLogs()
  setSetting()
})

describe('applyProxyToAxiosConfig', () => {
  it('未配置 worker 时 config 原样保留', () => {
    const config = { url: 'https://bgm.tv/x', headers: { Cookie: 'a=1' } }

    applyProxyToAxiosConfig(config, true)

    expect(config.url).toBe('https://bgm.tv/x')
    expect(config.headers.Cookie).toBe('a=1')
  })

  it('配置 worker 时改写 url 与 headers', () => {
    setSetting({ workerProxy: WORKER })
    const config = { url: 'https://bgm.tv/x', headers: {} }

    applyProxyToAxiosConfig(config)

    expect(config.url).toBe(`${WORKER}/x`)
    expect(config.headers['x-upstream']).toBeDefined()
  })
})

describe('axiosWithProxy', () => {
  it('应用代理后调用 axiosFn', async () => {
    setSetting({ workerProxy: WORKER })

    const axiosFn = jest.fn(async config => config)
    const config = { url: 'https://bgm.tv/x' }

    await axiosWithProxy(axiosFn, config)

    expect(axiosFn).toHaveBeenCalledTimes(1)
    expect(axiosFn.mock.calls[0][0].url).toBe(`${WORKER}/x`)
  })

  it('未配置 worker 时直接透传原始 config', async () => {
    const axiosFn = jest.fn(async config => config)
    const config = { url: 'https://bgm.tv/x' }

    await axiosWithProxy(axiosFn, config)

    expect(axiosFn.mock.calls[0][0].url).toBe('https://bgm.tv/x')
  })
})

describe('axiosWithProxyRedirect', () => {
  it('worker 非直连模式注入 x-no-redirect 并改写 url', async () => {
    setSetting({ workerProxy: WORKER })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const axiosFn = jest.fn(async (_config: ProxyRequestConfig) => ({
      data: '',
      headers: {},
      request: {}
    }))
    const config: { url: string; headers?: Record<string, string> } = {
      url: 'https://bgm.tv/page/auth'
    }

    await axiosWithProxyRedirect(axiosFn, config)

    expect(config.headers?.['x-no-redirect']).toBe('true')
    expect(config.url).toContain(WORKER)
  })

  it('direct 模式不注入 x-no-redirect', async () => {
    setSetting({ workerProxy: WORKER, workerProxyDirect: true })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const axiosFn = jest.fn(async (_config: ProxyRequestConfig) => ({
      data: '',
      headers: {},
      request: {}
    }))
    const config: { url: string; headers?: Record<string, string> } = {
      url: 'https://bgm.tv/page/auth'
    }

    await axiosWithProxyRedirect(axiosFn, config)

    expect(config.headers?.['x-no-redirect']).toBeUndefined()
  })

  it('全局禁用代理时不注入也不改写', async () => {
    setSetting({ workerProxyDisabled: true, workerProxy: WORKER })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const axiosFn = jest.fn(async (_config: ProxyRequestConfig) => ({
      data: '',
      headers: {},
      request: {}
    }))
    const config: { url: string; headers?: Record<string, string> } = {
      url: 'https://bgm.tv/page/auth'
    }

    await axiosWithProxyRedirect(axiosFn, config)

    expect(config.headers?.['x-no-redirect']).toBeUndefined()
    expect(config.url).toBe('https://bgm.tv/page/auth')
  })

  it('safeConfig 强制 responseType text 且不校验状态码', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const axiosFn = jest.fn(async (_config: ProxyRequestConfig) => ({
      data: '',
      headers: {},
      request: {}
    }))

    await axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/x' })

    const safeConfig = axiosFn.mock.calls[0][0] as {
      responseType?: string
      validateStatus?: (status: number) => boolean
    }
    expect(safeConfig.responseType).toBe('text')
    expect(typeof safeConfig.validateStatus).toBe('function')
    expect(safeConfig.validateStatus(500)).toBe(true)
  })

  it('重定向优先级: body JSON location 最高', async () => {
    const axiosFn = jest.fn(async () => ({
      data: '{"location":"https://bgm.tv/from-body"}',
      headers: { 'x-redirect-url': 'https://bgm.tv/from-header' },
      request: { responseURL: 'https://bgm.tv/from-responseurl' }
    }))

    const { redirectUrl } = await axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/o' })

    expect(redirectUrl).toBe('https://bgm.tv/from-body')
  })

  it('body 无重定向时取响应头, 兼容大小写变体', async () => {
    const cases = [
      { 'x-redirect-url': 'https://bgm.tv/a' },
      { 'X-Redirect-Url': 'https://bgm.tv/b' },
      { location: 'https://bgm.tv/c' },
      { Location: 'https://bgm.tv/d' }
    ]

    for (const headers of cases) {
      const axiosFn = jest.fn(async () => ({ data: '', headers, request: {} }))
      const { redirectUrl } = await axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/o' })

      expect(redirectUrl).toBe(Object.values(headers)[0])
    }
  })

  it('body 与响应头均无重定向时回退 responseURL', async () => {
    const axiosFn = jest.fn(async () => ({
      data: '',
      headers: {},
      request: { responseURL: 'https://bgm.tv/final' }
    }))

    const { redirectUrl } = await axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/o' })

    expect(redirectUrl).toBe('https://bgm.tv/final')
  })

  it('body 含 "location" 字样但非合法 JSON 时降级到响应头', async () => {
    const axiosFn = jest.fn(async () => ({
      data: 'not json but has "location" inside',
      headers: { location: 'https://bgm.tv/header-fallback' },
      request: {}
    }))

    const { redirectUrl } = await axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/o' })

    expect(redirectUrl).toBe('https://bgm.tv/header-fallback')
  })

  it('成功且无任何重定向信息时返回空字符串', async () => {
    const axiosFn = jest.fn(async () => ({ data: '', headers: {}, request: {} }))

    const { redirectUrl } = await axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/o' })

    expect(redirectUrl).toBe('')
  })

  it('请求失败时从 error.response.headers 提取兜底重定向并记录错误日志', async () => {
    const error = Object.assign(new Error('network error'), {
      response: { headers: { location: 'https://bgm.tv/fallback' } }
    })
    const axiosFn = jest.fn(async () => {
      throw error
    })

    const { response, redirectUrl } = await axiosWithProxyRedirect(axiosFn, {
      url: 'https://bgm.tv/o'
    })

    expect(response).toBe(error.response)
    expect(redirectUrl).toBe('https://bgm.tv/fallback')

    const logs = getWorkerLogs()
    expect(logs).toHaveLength(1)
    expect(logs[0].level).toBe('error')
    expect(logs[0].message).toContain('bgm.tv')
  })

  it('失败且无兜底重定向时向上抛出原始错误', async () => {
    const axiosFn = jest.fn(async () => {
      throw new Error('boom')
    })

    await expect(axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/o' })).rejects.toThrow(
      'boom'
    )
  })

  it('提取到重定向时记录 success 日志', async () => {
    const axiosFn = jest.fn(async () => ({
      data: '{"location":"https://bgm.tv/done"}',
      headers: {},
      request: {}
    }))

    await axiosWithProxyRedirect(axiosFn, { url: 'https://bgm.tv/o' })

    const logs = getWorkerLogs()
    expect(logs).toHaveLength(1)
    expect(logs[0].level).toBe('success')
  })
})

describe('axios - 支持者节点', () => {
  it('未填任何地址也不会短路, 改写到内置节点并携带密钥', async () => {
    setSupporter()

    const axiosFn = jest.fn(async config => config)
    const config = { url: 'https://bgm.tv/x' }

    await axiosWithProxy(axiosFn, config)

    const passed = axiosFn.mock.calls[0][0] as { url: string; headers: Record<string, string> }
    expect(passed.url).toBe(`${SUPPORTER.host}/x`)
    expect(passed.headers['x-proxy-key']).toBe(SUPPORTER.secret)
  })

  it('支持者模式 (即使「直接转发」开启) 注入 x-no-redirect 并改写地址', async () => {
    setSupporter({ workerProxyDirect: true })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const axiosFn = jest.fn(async (_config: ProxyRequestConfig) => ({
      data: '',
      headers: {},
      request: {}
    }))
    const config: { url: string; headers?: Record<string, string> } = {
      url: 'https://bgm.tv/page/auth'
    }

    await axiosWithProxyRedirect(axiosFn, config)

    expect(config.headers?.['x-no-redirect']).toBe('true')
    expect(config.url).toContain(SUPPORTER.host)
  })

  it('非高级会员时支持者设置不生效', async () => {
    ;(syncSystemStore as jest.Mock).mockReturnValue({
      advance: false,
      setting: { ...DEFAULTS, workerPreset: 'supporter' }
    })

    const axiosFn = jest.fn(async config => config)
    const config = { url: 'https://bgm.tv/x' }

    await axiosWithProxy(axiosFn, config)

    expect((axiosFn.mock.calls[0][0] as { url: string }).url).toBe('https://bgm.tv/x')
  })
})
