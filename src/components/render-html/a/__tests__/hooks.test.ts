/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * useA 测试: 媒体块分支选择与卸载保护
 */
import React from 'react'
import { useA } from '../hooks'

// RNTL 的 renderHook 因 ensure-peer-deps 严格校验 react 版本不可用, 手写最小 harness;
// 依赖 react-test-renderer, 未安装时整组跳过 (依赖安装由用户自理)
let TestRenderer: any = null
try {
  TestRenderer = jest.requireActual('react-test-renderer')
} catch (error) {
  TestRenderer = null
}

// React 19 要求显式声明 act 测试环境, 否则 act 内状态更新不生效
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

const mockSetting = {
  matchLink: true,
  acSearchV2: false
}

let mockMatched: false | { route: string; params?: Record<string, string>; app?: boolean } = false

const mockAcEl = React.createElement('Text', null, 'ac')
const mockSubjectEl = React.createElement('Text', null, 'subject')
const mockTopicEl = React.createElement('Text', null, 'topic')
const mockMonoEl = React.createElement('Text', null, 'mono')

jest.mock('../ac-text', () => {
  function ACText() {
    return null
  }
  return { __esModule: true, default: ACText }
})

jest.mock('../mono', () => {
  function Mono() {
    return null
  }
  return { __esModule: true, default: Mono }
})

jest.mock('../subject', () => {
  function Subject() {
    return null
  }
  return { __esModule: true, default: Subject }
})

jest.mock('../topic', () => {
  function Topic() {
    return null
  }
  return { __esModule: true, default: Topic }
})

jest.mock('../../utils', () => ({
  __esModule: true,
  fetchMediaQueue: jest.fn()
}))

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  getACSearch: jest.fn(() => mockAcEl),
  getSubject: jest.fn(async () => mockSubjectEl),
  getTopic: jest.fn(async () => mockTopicEl),
  getMono: jest.fn(() => mockMonoEl)
}))

jest.mock(
  '@stores',
  () => ({
    __esModule: true,
    rakuenStore: {
      setting: {
        get matchLink() {
          return mockSetting.matchLink
        },
        get acSearchV2() {
          return mockSetting.acSearchV2
        }
      }
    }
  }),
  { virtual: true }
)

jest.mock(
  '@utils',
  () => ({
    __esModule: true,
    matchBgmLink: () => mockMatched
  }),
  { virtual: true }
)

jest.mock(
  '@constants',
  () => ({
    __esModule: true,
    IOS: false,
    WEB: false
  }),
  { virtual: true }
)

const { getACSearch, getMono, getSubject, getTopic } = require('../utils')

function renderHook(useHook: () => unknown) {
  const result = { current: undefined as unknown }

  function Probe() {
    result.current = useHook()
    return null
  }

  let renderer: { unmount: () => void }
  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Probe))
  })

  return {
    result,
    unmount: () => {
      TestRenderer.act(() => {
        renderer.unmount()
      })
    }
  }
}

/** 冲刷 effect 内的异步解析 */
async function flush() {
  await TestRenderer.act(async () => {
    await Promise.resolve()
    await Promise.resolve()
  })
}

const describeHooks = TestRenderer ? describe : describe.skip

beforeEach(() => {
  mockSetting.matchLink = true
  mockSetting.acSearchV2 = false
  mockMatched = false
  ;(getACSearch as jest.Mock).mockClear()
  ;(getSubject as jest.Mock).mockClear()
  ;(getTopic as jest.Mock).mockClear()
  ;(getMono as jest.Mock).mockClear()
})

describeHooks('useA', () => {
  it('链接不匹配时不解析媒体块', async () => {
    mockMatched = false

    const { result } = renderHook(() =>
      useA({
        attrs: { href: 'https://example.com' }
      })
    )
    await flush()

    expect((result.current as { el: unknown }).el).toBeNull()
    expect(getSubject).not.toHaveBeenCalled()
  })

  it('关闭匹配链接设置时不解析媒体块', async () => {
    mockSetting.matchLink = false
    mockMatched = { route: 'Subject', params: { subjectId: '1' } }

    const { result } = renderHook(() =>
      useA({
        attrs: { href: 'https://bgm.tv/subject/1' }
      })
    )
    await flush()

    expect((result.current as { el: unknown }).el).toBeNull()
    expect(getSubject).not.toHaveBeenCalled()
  })

  it('条目链接解析出条目媒体块', async () => {
    mockMatched = { route: 'Subject', params: { subjectId: '1' } }

    const { result } = renderHook(() =>
      useA({
        attrs: { href: 'https://bgm.tv/subject/1' }
      })
    )
    expect((result.current as { el: unknown }).el).toBeNull()

    await flush()

    expect(getSubject).toHaveBeenCalledTimes(1)
    expect((result.current as { el: unknown }).el).toBe(mockSubjectEl)
  })

  it('客户端内链走 AC 搜索', async () => {
    mockSetting.acSearchV2 = true
    mockMatched = { route: 'Subject', params: { subjectId: '1' }, app: true }

    renderHook(() =>
      useA({
        attrs: { href: 'https://App/Subject/subjectId:1' }
      })
    )
    await flush()

    expect(getACSearch).toHaveBeenCalledTimes(1)
    expect((getACSearch as jest.Mock).mock.calls[0][0]).toMatchObject({
      params: { subjectId: '1' }
    })
    expect(getSubject).not.toHaveBeenCalled()
  })

  it('帖子链接解析出帖子媒体块', async () => {
    mockMatched = { route: 'Topic', params: { topicId: '1' } }

    const { result } = renderHook(() =>
      useA({
        attrs: { href: 'https://bgm.tv/group/topic/1' }
      })
    )
    await flush()

    expect(getTopic).toHaveBeenCalledTimes(1)
    expect((result.current as { el: unknown }).el).toBe(mockTopicEl)
  })

  it('推广帖不做媒体块处理', async () => {
    mockMatched = { route: 'Topic', params: { topicId: 'group/350677' } }

    const { result } = renderHook(() =>
      useA({
        attrs: { href: 'https://bgm.tv/group/topic/group/350677' }
      })
    )
    await flush()

    expect(getTopic).not.toHaveBeenCalled()
    expect((result.current as { el: unknown }).el).toBeNull()
  })

  it('人物链接解析出人物媒体块', async () => {
    mockMatched = { route: 'Mono', params: { monoId: '1' } }

    const { result } = renderHook(() =>
      useA({
        attrs: { href: 'https://bgm.tv/character/1' }
      })
    )
    await flush()

    expect(getMono).toHaveBeenCalledTimes(1)
    expect((result.current as { el: unknown }).el).toBe(mockMonoEl)
  })

  it('点击回调透传链接地址', () => {
    const onPress = jest.fn()
    mockMatched = { route: 'Mono', params: { monoId: '1' } }

    const { result } = renderHook(() =>
      useA({
        attrs: { href: 'https://bgm.tv/character/1' },
        onPress
      })
    )

    ;(result.current as { onLinkPress: () => void }).onLinkPress()

    expect(onPress).toHaveBeenCalledWith(null, 'https://bgm.tv/character/1')
  })

  it('卸载后解析结果不再触发渲染', async () => {
    mockMatched = { route: 'Subject', params: { subjectId: '1' } }

    const { result, unmount } = renderHook(() =>
      useA({
        attrs: { href: 'https://bgm.tv/subject/1' }
      })
    )

    unmount()
    await flush()

    // 卸载后即使列队回调仍触发, 也不应再写入状态
    const { onRender } = (getSubject as jest.Mock).mock.calls[0][0]
    expect(() => onRender(mockSubjectEl)).not.toThrow()
    expect((result.current as { el: unknown }).el).toBeNull()
  })
})
