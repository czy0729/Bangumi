/*
 * @Author: czy0729
 * @Date: 2026-09-02 23:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 01:08:23
 */
import React from 'react'
import { CLICK_LOCK_MS } from '../ds'
import { useCallOnceInInterval } from '../hooks'

import type { GestureResponderEvent } from 'react-native'

// RNTL 的 renderHook 因 ensure-peer-deps 严格校验 react-test-renderer 版本不可用
// (要求与 react 19.1.0 完全一致, 实装 19.2.0), 故直接用 react-test-renderer 手写最小 harness;
// 该包无 TS 类型, requireActual 返回 any 规避
const TestRenderer = jest.requireActual('react-test-renderer')

// React 19 要求显式声明 act 测试环境, 否则 act 内状态更新不生效
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

// 屏蔽 react-test-renderer 官方弃用告警 (React 19 起弃用但仍可用), 保留其余错误输出
// eslint-disable-next-line no-console
const originalConsoleError = console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    if (String(args[0]).includes('react-test-renderer is deprecated')) return
    originalConsoleError(...args)
  })
})

function renderHook<T>(useHook: () => T) {
  const result = { current: undefined as T }

  function Probe() {
    result.current = useHook()
    return null
  }

  TestRenderer.act(() => {
    TestRenderer.create(React.createElement(Probe))
  })

  return {
    result
  }
}

function act(fn: () => void) {
  TestRenderer.act(fn)
}

async function actAsync(fn: () => Promise<void>) {
  await TestRenderer.act(fn)
}

function press(handlePress: (event: GestureResponderEvent) => void, pageX: number, pageY: number) {
  act(() => {
    handlePress({ nativeEvent: { pageX, pageY } } as GestureResponderEvent)
  })
}

describe('useCallOnceInInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    // 执行遗留的解锁计时并复位滚动状态, 保证用例间隔离
    act(() => {
      jest.runAllTimers()
    })
    jest.useRealTimers()
    ;(global as any).__mockStoreState__.isScrolling = false
  })

  it('滚动过程中不响应点击', async () => {
    ;(global as any).__mockStoreState__.isScrolling = true
    const onPress = jest.fn()
    const { result } = renderHook(() => useCallOnceInInterval(onPress))

    press(result.current.handlePress, 1, 2)
    await actAsync(async () => {
      await Promise.resolve()
    })

    expect(onPress).not.toHaveBeenCalled()
    expect(result.current.handleDisabled).toBe(false)
  })

  it('点击后立即锁定, 回调在微任务中携带坐标执行', async () => {
    const onPress = jest.fn()
    const { result } = renderHook(() => useCallOnceInInterval(onPress))

    press(result.current.handlePress, 10, 20)
    expect(result.current.handleDisabled).toBe(true)

    await actAsync(async () => {
      await Promise.resolve()
    })
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith({ pageX: 10, pageY: 20 })
    expect(result.current.handleDisabled).toBe(true)
  })

  it('CLICK_LOCK_MS 后解锁', async () => {
    const onPress = jest.fn()
    const { result } = renderHook(() => useCallOnceInInterval(onPress))

    press(result.current.handlePress, 0, 0)
    await actAsync(async () => {
      await Promise.resolve()
    })

    act(() => {
      jest.advanceTimersByTime(CLICK_LOCK_MS - 1)
    })
    expect(result.current.handleDisabled).toBe(true)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.handleDisabled).toBe(false)
  })

  it('锁定期间重复调用 handlePress 被忽略, 只触发第一次的 onPress', async () => {
    const onPress = jest.fn()
    const { result } = renderHook(() => useCallOnceInInterval(onPress))

    press(result.current.handlePress, 1, 1)
    press(result.current.handlePress, 2, 2)

    await actAsync(async () => {
      await Promise.resolve()
    })
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith({ pageX: 1, pageY: 1 })
  })
})
