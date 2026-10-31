/*
 * @Author: czy0729
 * @Date: 2026-11-01 04:32:51
 * @Last Modified by: czy0729
 * @Last Modified time:  2026-11-01 04:38:24
 *
 * 菜单开合状态机: 收起后迟到的激活必须丢弃 (否则会展开空菜单并留下点不掉的遮罩)
 */
import React from 'react'

const TestRenderer = jest.requireActual('react-test-renderer')

;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

// 控制器只用到 shared value 与 animated ref 的读写, 这里给出最小实现
jest.mock('react-native-reanimated', () => ({
  useSharedValue: (initial: unknown) => ({ value: initial }),
  useAnimatedRef: () => ({ current: null })
}))

// mock 必须先于 require 执行
const { useMenuController } = require('../provider/useMenuController')

type Controller = ReturnType<typeof useMenuController>
type OpenParams = Parameters<Controller['contextValue']['open']>[0]

const PARAMS = {
  items: [{ text: '编辑' }],
  anchorX: 0,
  anchorY: 0,
  anchorWidth: 40,
  anchorHeight: 40
} as unknown as OpenParams

function renderHook<T>(useHook: () => T) {
  const result = { current: undefined as T }

  function Probe() {
    result.current = useHook()
    return null
  }

  TestRenderer.act(() => {
    TestRenderer.create(React.createElement(Probe))
  })

  return { result }
}

describe('useMenuController 开合状态', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('先 open 再 activate 正常展开', () => {
    const { result } = renderHook(() => useMenuController())

    TestRenderer.act(() => {
      result.current.contextValue.open(PARAMS)
      result.current.contextValue.activate()
    })

    expect(result.current.show).toBe(true)
    expect(result.current.paramsValue.params).toBe(PARAMS)
  })

  it('close 之后迟到的 activate 不会展开空菜单', () => {
    const { result } = renderHook(() => useMenuController())

    TestRenderer.act(() => {
      result.current.contextValue.open(PARAMS)
      result.current.contextValue.close()
      result.current.contextValue.activate()
    })

    expect(result.current.show).toBe(false)

    // 关闭动画结束后内容被清空, 此时再激活也不应留下遮罩
    TestRenderer.act(() => {
      jest.runAllTimers()
      result.current.contextValue.activate()
    })

    expect(result.current.show).toBe(false)
    expect(result.current.paramsValue.params).toBeNull()
  })

  it('未展开时 close 不产生任何副作用', () => {
    const { result } = renderHook(() => useMenuController())

    TestRenderer.act(() => {
      result.current.contextValue.close()
    })

    expect(result.current.show).toBe(false)
    expect(result.current.paramsValue.params).toBeNull()
    // 短路分支不应排上「清理内容」的定时器
    expect(jest.getTimerCount()).toBe(0)
  })

  it('关闭后重新 open 仍可正常展开', () => {
    const { result } = renderHook(() => useMenuController())

    TestRenderer.act(() => {
      result.current.contextValue.open(PARAMS)
      result.current.contextValue.close()
      jest.runAllTimers()
    })

    TestRenderer.act(() => {
      result.current.contextValue.open(PARAMS)
      result.current.contextValue.activate()
    })

    expect(result.current.show).toBe(true)
  })
})
