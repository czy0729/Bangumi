/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:09
 */
import React from 'react'
import { BLUR_HEIGHT_RATIO } from '../ds'
import { useCoverBlur } from '../hooks'

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
    act: (fn: () => void) => {
      TestRenderer.act(fn)
    },
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

const SRC = 'https://lain.bgm.tv/pic/cover/l/1.jpg'
const BLUR_SRC = 'https://lain.bgm.tv/r/100/pic/cover/l/1.jpg'

describe('useCoverBlur', () => {
  it('封面与缩略图地址齐备时给出缩略图地址与三层高度', () => {
    const { result } = renderHook(() => useCoverBlur({ src: SRC, blurSrc: BLUR_SRC, height: 100 }))

    expect(result.current.blurUri).toBe(BLUR_SRC)
    expect(result.current.layout.blur).toBe(Math.round(100 * BLUR_HEIGHT_RATIO))
    expect(result.current.layout.scrim).toBe(result.current.layout.blur)
    expect(result.current.layout.ambient).toBeGreaterThan(result.current.layout.blur)
  })

  it('无封面时 blurUri 为 null (走兜底黑渐变)', () => {
    const { result } = renderHook(() => useCoverBlur({ src: '', blurSrc: BLUR_SRC, height: 100 }))

    expect(result.current.blurUri).toBeNull()
  })

  it('缩略图不是远端字符串时 blurUri 为 null', () => {
    const { result } = renderHook(() => useCoverBlur({ src: SRC, blurSrc: 123, height: 100 }))

    expect(result.current.blurUri).toBeNull()
  })

  it('图片加载失败后 blurUri 变为 null', () => {
    const { result, act } = renderHook(() =>
      useCoverBlur({ src: SRC, blurSrc: BLUR_SRC, height: 100 })
    )
    expect(result.current.blurUri).toBe(BLUR_SRC)

    act(() => {
      result.current.handleError()
    })

    expect(result.current.blurUri).toBeNull()
  })

  it('地址变化后失败标记复位 (列表复用不会永久走兜底)', () => {
    const NEXT = 'https://lain.bgm.tv/pic/cover/l/2.jpg'
    const { result, act, rerender } = renderHook(() =>
      useCoverBlur({ src: SRC, blurSrc: BLUR_SRC, height: 100 })
    )

    act(() => {
      result.current.handleError()
    })
    expect(result.current.blurUri).toBeNull()

    rerender(() => useCoverBlur({ src: NEXT, blurSrc: NEXT, height: 100 }))
    expect(result.current.blurUri).toBe(NEXT)
  })

  it('传入的高度覆盖值会进入 layout', () => {
    const { result } = renderHook(() =>
      useCoverBlur({ src: SRC, blurSrc: BLUR_SRC, height: 100, blurHeight: 30, scrimHeight: 90 })
    )

    expect(result.current.layout).toEqual({ blur: 30, scrim: 90, ambient: 102 })
  })
})
