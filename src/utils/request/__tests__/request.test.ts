/*
 * @Author: czy0729
 * @Date: 2026-09-19 09:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:33:55
 *
 * request 行为锁定 + fetch.v0 / fetch.p1 包装器对拍
 */

// jest.mock 提升到 import 之前, 工厂不可引用外部 const (TDZ); 用例内用 requireMock 改属性
jest.mock('@constants', () => ({ WEB: false }))

jest.mock('@constants/app', () => ({
  APP_ID: 'app_id_test'
}))

jest.mock('@constants/env', () => ({
  UA: 'UA_TEST'
}))

// 仅保留所需导出, 避免拉起真实依赖
jest.mock('@utils/utils', () => ({
  getTimestamp: () => 1700000000,
  urlStringify: (data?: Record<string, string | number | boolean>) => {
    if (!data) return ''

    return Object.entries(data)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
  }
}))

jest.mock('@utils/proxy', () => ({
  applyProxy: jest.fn(),
  logProxy: jest.fn()
}))

jest.mock('@utils/async', () => ({
  syncUserStore: jest.fn()
}))

jest.mock('@utils/fetch', () => ({
  safe: jest.fn()
}))

jest.mock('@utils/fetch/utils', () => ({
  checkDenied: jest.fn()
}))

jest.mock('@utils/thirdParty', () => ({
  axios: jest.fn()
}))

import { syncUserStore } from '@utils/async'
import { safe } from '@utils/fetch'
import { checkDenied } from '@utils/fetch/utils'
import { applyProxy, logProxy } from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { request as requestP1 } from '../../fetch.p1/utils'
import { request as requestV0 } from '../../fetch.v0/utils'
import { DEFAULT_TIMEOUT, request } from '../index'

const mockConstants = jest.requireMock('@constants') as { WEB: boolean }

const mockApplyProxy = applyProxy as jest.Mock
const mockLogProxy = logProxy as jest.Mock
const mockSyncUserStore = syncUserStore as jest.Mock
const mockSafe = safe as jest.Mock
const mockCheckDenied = checkDenied as jest.Mock
const mockAxios = axios as jest.Mock

/** 取第 n 次 axios 调用的请求配置 */
function axiosConfig(index: number = 0) {
  return mockAxios.mock.calls[index][0]
}

beforeEach(() => {
  jest.clearAllMocks()

  mockConstants.WEB = false
  mockApplyProxy.mockImplementation((url: string, headers: Record<string, string>) => ({
    url,
    headers,
    proxyType: ''
  }))
  mockSyncUserStore.mockReturnValue({ accessToken: {} })
  mockSafe.mockImplementation((data: unknown) => data)
  mockAxios.mockResolvedValue({ data: { ok: 1 } })
})

describe('request 核心', () => {
  it('checkDenied 在最前被调用, 且第二个参数为 true', async () => {
    await request('https://api.bgm.tv/v0/me')

    expect(mockCheckDenied).toHaveBeenCalledWith('https://api.bgm.tv/v0/me', true)
  })

  it('state=true: 拼 app_id / state, 但 logProxy 仍收到原始地址', async () => {
    await request('https://api.bgm.tv/v0/collections', undefined, undefined, {
      tag: 'test',
      state: true,
      html: false
    })

    expect(axiosConfig().url).toBe(
      'https://api.bgm.tv/v0/collections?app_id=app_id_test&state=1700000000'
    )
    expect(mockLogProxy).toHaveBeenCalledWith(
      'test',
      '',
      'https://api.bgm.tv/v0/collections',
      'https://api.bgm.tv/v0/collections?app_id=app_id_test&state=1700000000'
    )
  })

  it('state=true 且已有 query: 用 & 连接', async () => {
    await request('https://api.bgm.tv/v0/collections?limit=1', undefined, undefined, {
      tag: 'test',
      state: true,
      html: false
    })

    expect(axiosConfig().url).toBe(
      'https://api.bgm.tv/v0/collections?limit=1&app_id=app_id_test&state=1700000000'
    )
  })

  it('state=false: 不拼任何 query', async () => {
    await request('https://next.bgm.tv/p1/users/1/timeline', undefined, undefined, {
      tag: 'test',
      state: false,
      html: false
    })

    expect(axiosConfig().url).toBe('https://next.bgm.tv/p1/users/1/timeline')
  })

  it('auth 为真值且有 token: 带 Authorization', async () => {
    mockSyncUserStore.mockReturnValue({
      accessToken: { access_token: 'tk', token_type: 'Bearer' }
    })

    await request('https://api.bgm.tv/v0/me', undefined, { auth: true })

    expect(axiosConfig().headers.Authorization).toBe('Bearer tk')
  })

  it('auth 缺省 (调用方传了部分 config): 不带 Authorization', async () => {
    mockSyncUserStore.mockReturnValue({
      accessToken: { access_token: 'tk', token_type: 'Bearer' }
    })

    // auth 只认真值, 不补默认 true
    await request('https://api.bgm.tv/v0/me', undefined, { onError: () => {} })

    expect(axiosConfig().headers.Authorization).toBeUndefined()
  })

  it('WEB=false: 加 User-Agent; WEB=true: 不加', async () => {
    await request('https://api.bgm.tv/v0/me')
    expect(axiosConfig().headers['User-Agent']).toBe('UA_TEST')

    mockConstants.WEB = true
    await request('https://api.bgm.tv/v0/me')
    expect(axiosConfig(1).headers['User-Agent']).toBeUndefined()
  })

  it('data 为对象: method=post, 带表单 Content-Type 且 body 已编码', async () => {
    await request('https://api.bgm.tv/v0/collections', { a: 1, b: '中文' })

    expect(axiosConfig().method).toBe('post')
    expect(axiosConfig().headers['Content-Type']).toBe('application/x-www-form-urlencoded')
    expect(axiosConfig().data).toBe(`a=1&b=${encodeURIComponent('中文')}`)
  })

  it('data 为空: method=get 且不带 Content-Type', async () => {
    await request('https://api.bgm.tv/v0/me')

    expect(axiosConfig().method).toBe('get')
    expect(axiosConfig().headers['Content-Type']).toBeUndefined()
  })

  it('timeout 透传给 axios', async () => {
    await request('https://api.bgm.tv/v0/me', undefined, { timeout: 1234 })

    expect(axiosConfig().timeout).toBe(1234)
  })

  it('applyProxy 每次请求实时调用且不做缓存, 返回值写回 url 与 headers', async () => {
    mockApplyProxy
      .mockReturnValueOnce({ url: 'proxied-1', headers: { h: '1' }, proxyType: 'worker' })
      .mockReturnValueOnce({ url: 'proxied-2', headers: { h: '2' }, proxyType: 'worker' })

    await request('https://api.bgm.tv/v0/me')
    await request('https://api.bgm.tv/v0/me')

    expect(mockApplyProxy).toHaveBeenCalledTimes(2)
    expect(axiosConfig(0).url).toBe('proxied-1')
    expect(axiosConfig(0).headers).toEqual({ h: '1' })
    expect(axiosConfig(1).url).toBe('proxied-2')
    expect(mockLogProxy).toHaveBeenNthCalledWith(
      1,
      '',
      'worker',
      'https://api.bgm.tv/v0/me',
      'proxied-1'
    )
  })

  it('响应交给 safe 包装后返回', async () => {
    mockAxios.mockResolvedValue({ data: { value: 1 } })
    mockSafe.mockReturnValue({ value: 'safe' })

    const result = await request('https://api.bgm.tv/v0/me')

    expect(mockSafe).toHaveBeenCalledWith({ value: 1 })
    expect(result).toEqual({ value: 'safe' })
  })

  it('请求抛错: 回调 onError 且返回 {}, 不向外抛 (撑住 _ok 语义)', async () => {
    const onError = jest.fn()
    mockAxios.mockRejectedValue(new Error('network'))

    const result = await request('https://api.bgm.tv/v0/me', undefined, { onError })

    expect(onError).toHaveBeenCalledWith(expect.any(Error))
    expect(result).toEqual({})
  })

  it('抛错且未给 onError: 返回 {} 且不崩', async () => {
    mockAxios.mockRejectedValue(new Error('network'))

    await expect(request('https://api.bgm.tv/v0/me')).resolves.toEqual({})
  })
})

describe('fetch.v0 包装器', () => {
  it('拼 app_id/state, 带 token, tag=fetch.v0, html=false, 默认超时 8000', async () => {
    mockSyncUserStore.mockReturnValue({
      accessToken: { access_token: 'tk', token_type: 'Bearer' }
    })

    await requestV0('https://api.bgm.tv/v0/collections')

    expect(axiosConfig().url).toBe(
      'https://api.bgm.tv/v0/collections?app_id=app_id_test&state=1700000000'
    )
    expect(axiosConfig().headers.Authorization).toBe('Bearer tk')
    expect(axiosConfig().timeout).toBe(DEFAULT_TIMEOUT)
    expect(mockApplyProxy.mock.calls[0][2]).toBe(false)
    expect(mockLogProxy.mock.calls[0][0]).toBe('fetch.v0')
  })

  it('调用方部分 config 时 timeout 保持 undefined (与合并前一致, 未补默认值)', async () => {
    await requestV0('https://api.bgm.tv/v0/me', undefined, { onError: () => {} })

    expect(axiosConfig().timeout).toBeUndefined()
  })

  it('抛错时返回 {}', async () => {
    mockAxios.mockRejectedValue(new Error('network'))
    const onError = jest.fn()

    const result = await requestV0('https://api.bgm.tv/v0/me', undefined, { onError })

    expect(onError).toHaveBeenCalled()
    expect(result).toEqual({})
  })
})

describe('fetch.p1 包装器', () => {
  it('不拼 app_id/state, 不带 token, tag=fetch.p1, html=false', async () => {
    mockSyncUserStore.mockReturnValue({
      accessToken: { access_token: 'tk', token_type: 'Bearer' }
    })

    await requestP1('https://next.bgm.tv/p1/users/1/timeline?limit=1')

    expect(axiosConfig().url).toBe('https://next.bgm.tv/p1/users/1/timeline?limit=1')
    expect(axiosConfig().headers.Authorization).toBeUndefined()
    expect(mockApplyProxy.mock.calls[0][2]).toBe(false)
    expect(mockLogProxy.mock.calls[0][0]).toBe('fetch.p1')
  })

  it('调用方即使传 auth: true 也不会带 token (安全口径)', async () => {
    mockSyncUserStore.mockReturnValue({
      accessToken: { access_token: 'tk', token_type: 'Bearer' }
    })

    await requestP1('https://next.bgm.tv/p1/users/1/timeline', undefined, { auth: true })

    expect(axiosConfig().headers.Authorization).toBeUndefined()
  })

  it('默认超时 8000 补齐透传 (合并前声明但从未传给 axios, 属有意修正)', async () => {
    await requestP1('https://next.bgm.tv/p1/users/1/timeline')

    expect(axiosConfig().timeout).toBe(DEFAULT_TIMEOUT)
  })

  it('抛错时返回 {}', async () => {
    mockAxios.mockRejectedValue(new Error('network'))

    await expect(requestP1('https://next.bgm.tv/p1/users/1/timeline')).resolves.toEqual({})
  })
})

describe('两个包装器对拍', () => {
  it('除 state 与 auth 外, 请求构造完全一致', async () => {
    const url = 'https://api.bgm.tv/v0/me'

    await requestV0(url, { a: 1 })
    await requestP1(url, { a: 1 }, { timeout: DEFAULT_TIMEOUT })

    const v0Config = axiosConfig(0)
    const p1Config = axiosConfig(1)

    expect(v0Config.method).toBe(p1Config.method)
    expect(v0Config.headers['User-Agent']).toBe(p1Config.headers['User-Agent'])
    expect(v0Config.headers['Content-Type']).toBe(p1Config.headers['Content-Type'])
    expect(v0Config.data).toBe(p1Config.data)
    expect(v0Config.timeout).toBe(p1Config.timeout)
    expect(mockApplyProxy.mock.calls[0][2]).toBe(mockApplyProxy.mock.calls[1][2])
  })
})
