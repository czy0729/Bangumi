/*
 * @Author: czy0729
 * @Date: 2026-10-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 04:31:19
 *
 * 特殊字符行高检测 (安卓), 文本变化后命中结果必须失效
 */
import { act, renderHook } from '@testing-library/react-native'
import { useVerticalAlignDetection } from '../hooks'

import type { TextLayoutEvent } from 'react-native'

/** 构造首行 ascender 小于等于 2 的布局事件 */
function layoutEvent(ascender: number) {
  return {
    nativeEvent: {
      lines: [{ ascender }]
    }
  } as unknown as TextLayoutEvent
}

describe('useVerticalAlignDetection', () => {
  it('命中后文本变化, flag 失效', () => {
    const { result, rerender } = renderHook(
      ({ text }: { text: string }) => useVerticalAlignDetection({ text }),
      {
        initialProps: { text: 'A' }
      }
    )

    act(() => {
      result.current.handleTextLayout(layoutEvent(0))
    })
    expect(result.current.flag).toBe(true)

    rerender({ text: 'B' })
    expect(result.current.flag).toBe(false)
  })

  it('memo 已命中时新实例直接生效, 不再重复测量', () => {
    const first = renderHook(({ text }: { text: string }) => useVerticalAlignDetection({ text }), {
      initialProps: { text: 'D' }
    })

    act(() => {
      first.result.current.handleTextLayout(layoutEvent(0))
    })
    expect(first.result.current.flag).toBe(true)

    // 新实例 hitText 为空, flag 由模块级 memo 派生, hasMemo 为真时回调不再注册
    const second = renderHook(({ text }: { text: string }) => useVerticalAlignDetection({ text }), {
      initialProps: { text: 'D' }
    })
    expect(second.result.current.flag).toBe(true)
    expect(second.result.current.hasMemo).toBe(true)
  })

  it('未命中时 flag 保持 false', () => {
    const { result } = renderHook(() => useVerticalAlignDetection({ text: 'C' }))

    act(() => {
      result.current.handleTextLayout(layoutEvent(10))
    })
    expect(result.current.flag).toBe(false)
  })
})
