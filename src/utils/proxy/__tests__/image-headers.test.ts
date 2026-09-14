/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 20:53:02
 *
 * getProxyImageHeaders 真实实现用例 (不走 @utils/proxy 的全局 mock)
 */
import { syncSystemStore } from '@utils/async'
import { getSupporterConfig } from '@utils/kv/worker'
import { API_HOST } from '@constants/api'
import { getProxyImageHeaders } from '../image-headers'

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

const WORKER = 'https://my-worker.example.com'
const API_PROXY = 'https://my-api.example.com'
const API_IMAGE = `${API_HOST}/img/avatar.jpg`

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
  getEchMock().mockReturnValue(false)
  setSetting()
})

describe('getProxyImageHeaders', () => {
  it('直连时不携带请求头', () => {
    setSetting({ workerProxyDisabled: true })

    expect(getProxyImageHeaders(API_IMAGE)).toEqual({})
  })

  it('ECH 运行时不携带请求头', () => {
    getEchMock().mockReturnValue(true)

    expect(getProxyImageHeaders(API_IMAGE)).toEqual({})
  })

  it('普通反代 (仅替换地址) 不携带请求头, 鉴权由反代方自行处理', () => {
    setSetting({ workerProxy: WORKER, workerApiProxy: API_PROXY, workerProxyDirect: true })

    expect(getProxyImageHeaders(API_IMAGE)).toEqual({})
  })

  it('自建 Worker: api 图片被改写到自填 API 域名时补齐 x-upstream 与密钥', () => {
    setSetting({
      workerProxy: WORKER,
      workerApiProxy: API_PROXY,
      workerSecret: 'custom-secret'
    })

    expect(getProxyImageHeaders(API_IMAGE)).toEqual({
      'x-upstream': 'api.bgm.tv',
      'x-proxy-key': 'custom-secret'
    })
  })

  it('自建 Worker 未填 API 域名时不携带请求头 (lain.ts 不会改写, 避免密钥外泄)', () => {
    setSetting({ workerProxy: WORKER, workerSecret: 'custom-secret' })

    expect(getProxyImageHeaders(API_IMAGE)).toEqual({})
  })

  it('自建 Worker 未填密钥时只带 x-upstream', () => {
    setSetting({ workerProxy: WORKER, workerApiProxy: API_PROXY })

    expect(getProxyImageHeaders(API_IMAGE)).toEqual({
      'x-upstream': 'api.bgm.tv'
    })
  })

  it('支持者节点使用内置密钥', () => {
    setSupporter()

    expect(getProxyImageHeaders(API_IMAGE)).toEqual({
      'x-upstream': 'api.bgm.tv',
      'x-proxy-key': getSupporterConfig().secret
    })
  })

  it('图片节点 (lain) 接管的图片无需请求头, 靠 v= 签名鉴权', () => {
    setSetting({ workerProxy: WORKER, workerApiProxy: API_PROXY, workerSecret: 'custom-secret' })

    expect(getProxyImageHeaders('https://lain.bgm.tv/pic/a.jpg')).toEqual({})
  })

  it('非法入参返回空对象', () => {
    setSetting({ workerProxy: WORKER, workerApiProxy: API_PROXY, workerSecret: 'custom-secret' })

    expect(getProxyImageHeaders('')).toEqual({})
    expect(getProxyImageHeaders(undefined as never)).toEqual({})
  })
})
