/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 07:27:19
 */
import React from 'react'
import { UIManager } from 'react-native'
import { globalWarn } from '@utils/dev'
import { ANDROID_DELAY_PRESS_IN, MENU_CLOSE_DELAY } from '../ds'
import { usePopoverDropdown, usePopoverItems, usePopoverPress } from '../hooks'

import type { GestureResponderEvent } from 'react-native'
import type { TouchablePressEvent } from '../../touchable'

// 该子路径不被全局 @utils mock 覆盖, 局部 mock 保证转换结果可断言
jest.mock('@utils/thirdParty/open-cc', () => ({
  s2t: (text: string) => `T:${text}`
}))

// RNTL 的 renderHook 因 ensure-peer-deps 严格校验 react-test-renderer 版本不可用, 手写最小 harness
const TestRenderer = jest.requireActual('react-test-renderer')

// React 19 要求显式声明 act 测试环境, 否则 act 内状态更新不生效
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

// 屏蔽 react-test-renderer 官方弃用告警
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
  let renderer: any

  function Probe() {
    result.current = useHook()
    return null
  }

  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Probe))
  })

  return {
    result,
    /** 触发一次重渲染, 用于模拟外部状态 (如 store 设置) 变化 */
    rerender: () => {
      TestRenderer.act(() => {
        renderer.update(React.createElement(Probe))
      })
    }
  }
}

function act(fn: () => void) {
  TestRenderer.act(fn)
}

const state = () => (global as any).__mockStoreState__

describe('usePopoverItems', () => {
  afterEach(() => {
    state().s2t = false
  })

  it('按数据顺序生成菜单项', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['买入', '卖出'] }))

    expect(result.current.items.map(item => item.text)).toEqual(['买入', '卖出'])
  })

  it('数据为空且无标题时菜单项为空', () => {
    const { result } = renderHook(() => usePopoverItems({}))

    expect(result.current.items).toEqual([])
  })

  it('标题项置顶且标记为标题, 不可选中', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['买入'], title: 'ep1' }))

    expect(result.current.items).toHaveLength(2)
    expect(result.current.items[0]).toMatchObject({ text: 'ep1', isTitle: true })
    expect(result.current.items[0].onPress).toBeUndefined()
  })

  it('开启简繁转换后菜单文案被转换', () => {
    state().s2t = true
    const { result } = renderHook(() => usePopoverItems({ data: ['买入'], title: 'ep1' }))

    expect(result.current.items.map(item => item.text)).toEqual(['T:ep1', 'T:买入'])
  })

  it('简繁开关切换后菜单文案重新派生', () => {
    const { result, rerender } = renderHook(() => usePopoverItems({ data: ['买入'] }))
    expect(result.current.items.map(item => item.text)).toEqual(['买入'])

    state().s2t = true
    rerender()
    expect(result.current.items.map(item => item.text)).toEqual(['T:买入'])
  })

  it('选中后延迟 MENU_CLOSE_DELAY 才回调, 且回传原始数据与索引', () => {
    jest.useFakeTimers()

    const onSelect = jest.fn()
    const { result } = renderHook(() => usePopoverItems({ data: ['买入', '卖出'], onSelect }))

    act(() => {
      result.current.items[1].onPress({ pageX: 1, pageY: 2 })
    })
    // 菜单还在收起动画中, 不应立即回调
    expect(onSelect).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(MENU_CLOSE_DELAY)
    })
    expect(onSelect).toHaveBeenCalledWith('卖出', 1, { pageX: 1, pageY: 2 })

    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  it('默认激活方式为 tap-hold', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['买入'] }))

    expect(result.current.activateOn).toBe('tap-hold')
  })

  it('外部传入 onLongPress 时降级为纯点击激活, 不抢占长按', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['买入'], onLongPress: () => {} }))

    expect(result.current.activateOn).toBe('tap')
  })

  it('外部指定激活方式时以外部为准', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['买入'], activateOn: 'hold' }))

    expect(result.current.activateOn).toBe('hold')
  })
})

describe('usePopoverPress', () => {
  let showPopupMenu: jest.Mock

  /**
   * Touchable 传给 onPress 的事件已被归一化为坐标对象
   *  - 用同一引用可以在断言选中透传时直接比对身份
   * */
  const pressEvent: TouchablePressEvent = { pageX: 1, pageY: 2 }

  beforeEach(() => {
    state().s2t = false
    showPopupMenu = jest.fn()
    ;(UIManager as any).showPopupMenu = showPopupMenu
  })

  afterEach(() => {
    delete (UIManager as any).showPopupMenu
  })

  it('tap 模式: 点击打开菜单并带按压延迟', () => {
    const { result } = renderHook(() => usePopoverPress({ data: ['买入'] }))

    expect(result.current.delayPressIn).toBe(ANDROID_DELAY_PRESS_IN)
    expect(result.current.onLongPress).toEqual(expect.any(Function))

    act(() => {
      result.current.onPress(pressEvent)
    })
    expect(showPopupMenu).toHaveBeenCalledTimes(1)
    expect(showPopupMenu.mock.calls[0][1]).toEqual(['买入'])
  })

  it('hold 模式: 长按打开菜单, 无点击回调与按压延迟', () => {
    const { result } = renderHook(() => usePopoverPress({ data: ['买入'], activateOn: 'hold' }))

    expect(result.current.delayPressIn).toBeUndefined()
    expect(result.current.onPress).toBeUndefined()

    act(() => {
      result.current.onLongPress({
        nativeEvent: { pageX: 1, pageY: 2 }
      } as GestureResponderEvent)
    })
    expect(showPopupMenu).toHaveBeenCalledTimes(1)
  })

  it('tap 模式下长按透传外部回调', () => {
    const onLongPress = jest.fn()
    const { result } = renderHook(() => usePopoverPress({ data: ['买入'], onLongPress }))

    expect(result.current.onLongPress).toBe(onLongPress)
  })

  it('选中菜单项后回传原始数据与索引', () => {
    const onSelect = jest.fn()
    const { result } = renderHook(() => usePopoverPress({ data: ['买入', '卖出'], onSelect }))

    act(() => {
      result.current.onPress(pressEvent)
    })

    // 系统弹窗回调的 index 为字符串, 需要归一成数字索引
    const success = showPopupMenu.mock.calls[0][3]
    act(() => {
      success('卖出', '1')
    })
    // 触发点击的事件对象应原样透传给选中回调
    expect(onSelect).toHaveBeenCalledWith('卖出', 1, pressEvent)
  })

  it('开启简繁转换后传给系统的文案被转换', () => {
    state().s2t = true
    const { result } = renderHook(() => usePopoverPress({ data: ['买入'] }))

    act(() => {
      result.current.onPress(pressEvent)
    })
    expect(showPopupMenu.mock.calls[0][1]).toEqual(['T:买入'])
  })

  it('环境缺失弹窗能力时告警一次且不抛错', () => {
    delete (UIManager as any).showPopupMenu
    ;(globalWarn as jest.Mock).mockClear()

    const { result } = renderHook(() => usePopoverPress({ data: ['买入'] }))

    expect(() => {
      act(() => {
        result.current.onPress(pressEvent)
      })
    }).not.toThrow()
    expect(globalWarn).toHaveBeenCalledTimes(1)

    // 模块级标记保证只提示一次, 不刷屏
    act(() => {
      result.current.onPress(pressEvent)
    })
    expect(globalWarn).toHaveBeenCalledTimes(1)
  })
})

describe('usePopoverDropdown', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  it('初始不可见', () => {
    const { result } = renderHook(() => usePopoverDropdown({}))

    expect(result.current.visible).toBe(false)
  })

  it('onVisibleChange 切换可见状态', () => {
    const { result } = renderHook(() => usePopoverDropdown({}))

    act(() => {
      result.current.onVisibleChange(true)
    })
    expect(result.current.visible).toBe(true)

    act(() => {
      result.current.onVisibleChange(false)
    })
    expect(result.current.visible).toBe(false)
  })

  it('选中后先收起下拉再回调', () => {
    const onSelect = jest.fn()
    const { result } = renderHook(() => usePopoverDropdown({ onSelect }))

    act(() => {
      result.current.onVisibleChange(true)
    })
    act(() => {
      result.current.handleSelect('买入', 0)
    })
    expect(result.current.visible).toBe(false)
    expect(onSelect).not.toHaveBeenCalled()

    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(onSelect).toHaveBeenCalledWith('买入', 0)
  })

  it('未传 onSelect 时选中不报错', () => {
    const { result } = renderHook(() => usePopoverDropdown({}))

    expect(() => {
      act(() => {
        result.current.handleSelect('买入', 0)
      })
    }).not.toThrow()
  })
})
