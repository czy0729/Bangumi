/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * fetchMediaQueue 测试: 回调按 key 登记、去重命中即时回调、失败信号与队列续跑
 */

// 模块级单例 (IDS/LOADED_IDS/CALLBACKS 等) 每用例经 resetModules 重建, 动态 require 获取
let fetchMediaQueue: typeof import('../media-queue').fetchMediaQueue

const mockFetch = {
  subject: jest.fn(),
  topic: jest.fn(),
  mono: jest.fn()
}

jest.mock(
  '@stores',
  () => ({
    __esModule: true,
    _: {},
    rakuenStore: {
      fetchTopicSnapshot: (...args: unknown[]) => mockFetch.topic(...args)
    },
    subjectStore: {
      fetchSubjectSnapshot: (...args: unknown[]) => mockFetch.subject(...args),
      fetchMono: (...args: unknown[]) => mockFetch.mono(...args)
    },
    systemStore: {}
  }),
  { virtual: true }
)

jest.mock(
  '@utils',
  () => ({
    __esModule: true,
    sleep: () => Promise.resolve()
  }),
  { virtual: true }
)

/** 等待排队链路上的微任务与递归跑完 */
async function flushQueue() {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve()
    await new Promise(resolve => setTimeout(resolve, 0))
  }
}

beforeEach(() => {
  jest.resetModules()
  fetchMediaQueue = require('../media-queue').fetchMediaQueue

  mockFetch.subject.mockReset()
  mockFetch.topic.mockReset()
  mockFetch.mono.mockReset()
})

describe('fetchMediaQueue', () => {
  it('顺序处理排队项并各自回调', async () => {
    mockFetch.subject.mockResolvedValue(true)
    mockFetch.topic.mockResolvedValue(true)

    const cb1 = jest.fn()
    const cb2 = jest.fn()

    await fetchMediaQueue('subject', '1', cb1)
    await fetchMediaQueue('topic', '2', cb2)
    await flushQueue()

    expect(mockFetch.subject).toHaveBeenCalledWith('1')
    expect(mockFetch.topic).toHaveBeenCalledWith('2')
    expect(cb1).toHaveBeenCalledWith(true)
    expect(cb2).toHaveBeenCalledWith(true)
  })

  it('同 key 多个回调全部触发', async () => {
    mockFetch.mono.mockResolvedValue({ _loaded: 1700000000 })

    const cbA = jest.fn()
    const cbB = jest.fn()

    await fetchMediaQueue('mono', '3', cbA)
    await fetchMediaQueue('mono', '3', cbB)
    await flushQueue()

    expect(mockFetch.mono).toHaveBeenCalledTimes(1)
    expect(cbA).toHaveBeenCalledWith(true)
    expect(cbB).toHaveBeenCalledWith(true)
  })

  it('已完结的 key 再次请求时同步回调', async () => {
    mockFetch.subject.mockResolvedValue(true)

    await fetchMediaQueue('subject', '4', jest.fn())
    await flushQueue()

    const cb = jest.fn()
    await fetchMediaQueue('subject', '4', cb)

    expect(cb).toHaveBeenCalledWith(true)
    expect(mockFetch.subject).toHaveBeenCalledTimes(1)
  })

  it('取回失败时回调收到 false 且队列继续', async () => {
    mockFetch.subject.mockRejectedValueOnce(new Error('请求失败'))
    mockFetch.topic.mockResolvedValue(true)

    const failCb = jest.fn()
    const okCb = jest.fn()

    await fetchMediaQueue('subject', 'bad', failCb)
    await fetchMediaQueue('topic', '5', okCb)
    await flushQueue()

    expect(failCb).toHaveBeenCalledWith(false)
    expect(mockFetch.topic).toHaveBeenCalledWith('5')
    expect(okCb).toHaveBeenCalledWith(true)
  })

  it('失败 key 不算已完结, 后续请求重新入队真实重试', async () => {
    mockFetch.subject.mockRejectedValueOnce(new Error('请求失败')).mockResolvedValueOnce(true)

    const failCb = jest.fn()
    const retryCb = jest.fn()

    await fetchMediaQueue('subject', 'retry', failCb)
    await flushQueue()
    expect(failCb).toHaveBeenCalledWith(false)

    // 跳过冷却期
    const now = Date.now()
    const spy = jest.spyOn(Date, 'now').mockReturnValue(now + 60000 + 1)

    await fetchMediaQueue('subject', 'retry', retryCb)
    await flushQueue()

    spy.mockRestore()

    expect(mockFetch.subject).toHaveBeenCalledTimes(2)
    expect(retryCb).toHaveBeenCalledWith(true)
  })

  it('冷却期内的失败 key 不再入队, 回调收到 false', async () => {
    mockFetch.subject.mockRejectedValueOnce(new Error('请求失败'))

    const failCb = jest.fn()
    const cooldownCb = jest.fn()

    await fetchMediaQueue('subject', 'cool', failCb)
    await flushQueue()
    expect(failCb).toHaveBeenCalledWith(false)

    await fetchMediaQueue('subject', 'cool', cooldownCb)
    await flushQueue()

    expect(mockFetch.subject).toHaveBeenCalledTimes(1)
    expect(cooldownCb).toHaveBeenCalledWith(false)
  })
})
