/*
 * @Author: czy0729
 * @Date: 2026-09-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 02:50:17
 */
import React from 'react'
import { uiStore } from '@stores'
import { useTabViewIndexChange, useTabViewLayout, useTabViewSwipe } from '../tab-view/hooks'

// RNTL 的 renderHook 因 ensure-peer-deps 严格校验 react-test-renderer 版本不可用,
// 故直接用 react-test-renderer 手写最小 harness; 该包无 TS 类型, requireActual 返回 any 规避
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
  let renderer

  function Probe() {
    result.current = useHook()
    return null
  }

  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Probe))
  })

  return {
    result,
    rerender: (useHookNext: () => T) => {
      function ProbeNext() {
        result.current = useHookNext()
        return null
      }
      TestRenderer.act(() => {
        renderer.update(React.createElement(ProbeNext))
      })
    },
    unmount: () => {
      TestRenderer.act(() => {
        renderer.unmount()
      })
    }
  }
}

function act(fn: () => void) {
  TestRenderer.act(fn)
}

/** 构造 onLayout 事件参数 */
function layoutEvent(width: number, height: number) {
  return { nativeEvent: { layout: { width, height } } } as any
}

describe('useTabViewLayout', () => {
  it('初始布局以 initialLayout 为准, 未提供字段回退 0', () => {
    const { result } = renderHook(() => useTabViewLayout({ width: 320 }))
    expect(result.current.layout).toEqual({ width: 320, height: 0 })
  })

  it('onLayout 更新布局尺寸', () => {
    const { result } = renderHook(() => useTabViewLayout())
    act(() => {
      result.current.handleLayout(layoutEvent(375, 812))
    })
    expect(result.current.layout).toEqual({ width: 375, height: 812 })
  })

  it('尺寸未变化时保持引用稳定, 不触发重渲染', () => {
    const { result } = renderHook(() => useTabViewLayout())
    act(() => {
      result.current.handleLayout(layoutEvent(375, 812))
    })
    const layout = result.current.layout
    act(() => {
      result.current.handleLayout(layoutEvent(375, 812))
    })
    expect(result.current.layout).toBe(layout)
  })
})

describe('useTabViewIndexChange', () => {
  it('相同页码不触发回调', () => {
    const onIndexChange = jest.fn()
    const { result } = renderHook(() => useTabViewIndexChange(1, onIndexChange))
    act(() => {
      result.current(1)
    })
    expect(onIndexChange).not.toHaveBeenCalled()
  })

  it('页码变化时携带新页码调用回调', () => {
    const onIndexChange = jest.fn()
    const { result } = renderHook(() => useTabViewIndexChange(1, onIndexChange))
    act(() => {
      result.current(2)
    })
    expect(onIndexChange).toHaveBeenCalledTimes(1)
    expect(onIndexChange).toHaveBeenCalledWith(2)
  })

  it('回调基于最新 index 判断, 不残留旧闭包', () => {
    const onIndexChange = jest.fn()
    const { result, rerender } = renderHook(() => useTabViewIndexChange(0, onIndexChange))
    rerender(() => useTabViewIndexChange(1, onIndexChange))
    act(() => {
      result.current(1)
    })
    expect(onIndexChange).not.toHaveBeenCalled()
  })
})

describe('useTabViewSwipe', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    // 执行遗留的放行计时, 保证用例间隔离
    TestRenderer.act(() => {
      jest.runAllTimers()
    })
    jest.useRealTimers()
    ;(uiStore.setScrolling as jest.Mock).mockClear()
  })

  it('滑动开始置位拦截点击并锁定滚动', () => {
    const onSwipeStart = jest.fn()
    const { result } = renderHook(() => useTabViewSwipe({ onSwipeStart }))

    act(() => {
      result.current.handleSwipeStart()
    })

    expect(result.current.isSwiping).toBe(true)
    expect(onSwipeStart).toHaveBeenCalledTimes(1)
    expect(uiStore.setScrolling).toHaveBeenCalledWith(true)
  })

  it('settle 后 150ms 解除点击拦截', () => {
    const { result } = renderHook(() => useTabViewSwipe({}))

    act(() => {
      result.current.handleSwipeStart()
      result.current.handleSwipeSettle()
    })
    act(() => {
      jest.advanceTimersByTime(149)
    })
    expect(result.current.isSwiping).toBe(true)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.isSwiping).toBe(false)
  })

  it('end 后 300ms 触发结束回调并复位滚动状态', () => {
    const onSwipeEnd = jest.fn()
    const { result } = renderHook(() => useTabViewSwipe({ onSwipeEnd }))

    act(() => {
      result.current.handleSwipeStart()
      result.current.handleSwipeEnd()
    })
    act(() => {
      jest.advanceTimersByTime(299)
    })
    expect(onSwipeEnd).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(onSwipeEnd).toHaveBeenCalledTimes(1)
    expect(result.current.isSwiping).toBe(false)

    // 内层延后一帧的滚动复位
    act(() => {
      jest.runAllTimers()
    })
    expect(uiStore.setScrolling).toHaveBeenLastCalledWith(false)
  })

  it('[问题] 快速连续滑动时, 上一轮收尾放行计时不应打断新一轮的点击保护', () => {
    const onSwipeEnd = jest.fn()
    const { result } = renderHook(() => useTabViewSwipe({ onSwipeEnd }))

    act(() => {
      // 上一轮手势完整走完 start/settle/end, 收尾定时器仍挂起
      result.current.handleSwipeStart()
      result.current.handleSwipeSettle()
      result.current.handleSwipeEnd()
      // 300ms 内立即开始新一轮滑动
      result.current.handleSwipeStart()
    })

    // 上一轮结束回调被同步放行, 不再遗留旧定时器
    expect(onSwipeEnd).toHaveBeenCalledTimes(1)

    act(() => {
      jest.runAllTimers()
    })

    // 新一轮滑动期间 isSwiping 始终保持 true, 滚动锁不被旧计时误释放
    expect(result.current.isSwiping).toBe(true)
    expect(uiStore.setScrolling).toHaveBeenLastCalledWith(true)
  })

  it('[问题] 卸载后清理收尾定时器, 不再触发回调与滚动复位', () => {
    const onSwipeEnd = jest.fn()
    const { result, unmount } = renderHook(() => useTabViewSwipe({ onSwipeEnd }))

    act(() => {
      result.current.handleSwipeStart()
      result.current.handleSwipeEnd()
    })
    unmount()
    act(() => {
      jest.runAllTimers()
    })

    expect(onSwipeEnd).not.toHaveBeenCalled()
    expect(uiStore.setScrolling).not.toHaveBeenCalledWith(false)
  })
})
