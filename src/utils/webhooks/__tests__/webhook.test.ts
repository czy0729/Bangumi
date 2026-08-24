/*
 * @Author: czy0729
 * @Date: 2026-08-24 05:40:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-24 05:40:40
 *
 * webhook 发送器测试, mock axios 与低优先级调度
 */

// 全局 setup 仅提供 isObservableArray, 这里补充本文件需要的最小实现
jest.mock('mobx', () => ({
  isObservableArray: () => false,

  /** 用普通数组模拟 observable 数组 */
  observable: (initial: any) => {
    const arr = [...initial]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(arr as any).replace = (items: any[]) => arr.splice(0, arr.length, ...items)
    return arr
  },

  runInAction: (fn: () => void) => fn()
}))

jest.mock('../../thirdParty', () => ({
  axios: jest.fn()
}))

jest.mock('../../async', () => ({
  syncSystemStore: jest.fn()
}))

jest.mock('../../utils', () => ({
  // 立即执行, 便于同步断言 POST 日志
  runAfter: jest.fn(fn => fn()),
  getTimestamp: jest.fn(() => 1700000000)
}))

import { logs, webhook } from '../webhook'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosMock: any = require('../../thirdParty').axios
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const syncSystemStoreMock: any = require('../../async').syncSystemStore

/** 等待 axios Promise 链完成 */
const flush = () => new Promise(resolve => setTimeout(resolve, 0))

/**
 * 发送器不读取字段内容, 统一以 say 类型完整形状的最小负载驱动
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const send = (content: string) =>
  (webhook as (...args: any) => any)('say', {
    content,
    url: '',
    user: {},
    ts: 0
  })

beforeEach(() => {
  jest.clearAllMocks()
  syncSystemStoreMock.mockImplementation(() => ({
    setting: { webhook: true, webhookUrl: '' }
  }))
  logs.replace([])
})

describe('开关控制', () => {
  it('关闭时不发送不记日志', async () => {
    syncSystemStoreMock.mockImplementation(() => ({ setting: { webhook: false } }))

    expect(send('测试')).toBe(false)
    await flush()

    expect(axiosMock).not.toHaveBeenCalled()
    expect(logs.length).toBe(0)
  })

  it('开启时返回 undefined', () => {
    expect(send('测试')).toBeUndefined()
  })
})

describe('URL 处理', () => {
  it('未配置时使用默认地址', async () => {
    axiosMock.mockResolvedValue({ status: 200, data: {} })

    send('测试')
    await flush()

    const params = axiosMock.mock.calls[0][0]
    expect(params.method).toBe('post')
    expect(params.url).toBe('https://postman-echo.com/post')
    expect(params.data.type).toBe('say')
  })

  it('无协议前缀时补 http://', async () => {
    syncSystemStoreMock.mockImplementation(() => ({
      setting: { webhook: true, webhookUrl: 'example.com/hook' }
    }))
    axiosMock.mockResolvedValue({ status: 200, data: {} })

    send('测试')
    await flush()

    expect(axiosMock.mock.calls[0][0].url).toBe('http://example.com/hook')
  })
})

describe('日志记录', () => {
  beforeEach(() => {
    axiosMock.mockResolvedValue({ status: 200, data: { ok: 1 } })
  })

  it('POST 与 RESULT 日志依次写入且 ts 来自 getTimestamp', async () => {
    send('测试')
    await flush()

    expect(logs.length).toBe(2)
    expect(logs[1].label).toBe('POST')
    expect(logs[1].content).toContain('"type": "say"')
    expect(logs[1].ts).toBe(1700000000)
    expect(logs[0].label).toBe('RESULT')
    expect(logs[0].content).toContain('"status": 200')
    expect(logs[0].content).toContain('"ok": 1')
  })

  it('响应为字符串时走 _response 分支', async () => {
    axiosMock.mockResolvedValue({
      status: 201,
      data: 'plain text',
      request: { _response: 'RAWTEXT' }
    })

    send('测试')
    await flush()

    expect(logs[0].content).toContain('"_response": "RAWTEXT"')
  })

  it('请求失败时写入 ERROR 日志', async () => {
    axiosMock.mockRejectedValue(new Error('网络错误'))

    send('测试')
    await flush()

    expect(logs.length).toBe(2)
    expect(logs[0].label).toBe('ERROR')
    expect(logs[0].content).toBe('网络错误')
  })

  it('store 同步异常时写入 unknow error', () => {
    syncSystemStoreMock.mockImplementationOnce(() => {
      throw new Error('boom')
    })

    send('测试')

    expect(logs.length).toBe(1)
    expect(logs[0].label).toBe('ERROR')
    expect(logs[0].content).toBe('unknow error')
  })

  it('超过上限时丢弃最早的日志', async () => {
    for (let i = 0; i < 17; i += 1) {
      axiosMock.mockResolvedValueOnce({ status: 200 + i, data: {} })
      send(`第${i}条`)
    }
    await flush()

    expect(logs.length).toBe(16)
    // 同步写入的 17 条 POST 先入队, 随后的 RESULT 把最早的记录挤出
    expect(logs.every(item => item.label === 'RESULT')).toBe(true)
    // 缓存内最早为第 1 条的结果, 最新为第 16 条的结果, 第 0 条已被丢弃
    expect(logs[15].content).toContain('"status": 201')
    expect(logs[0].content).toContain('"status": 216')
  })
})
