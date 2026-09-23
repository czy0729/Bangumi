/*
 * @Author: czy0729
 * @Date: 2026-09-23 08:00:00
 * @Last Modified by: czy0729
 */
import React from 'react'
import { usePagerKeep } from '../usePagerKeep'

// RNTL 的 renderHook 因 ensure-peer-deps 严格校验 react-test-renderer 版本不可用,
// 直接用 react-test-renderer 手写最小 harness (参考 touchable/__tests__/hooks.test.ts)
const TestRenderer = jest.requireActual('react-test-renderer')

// React 19 要求显式声明 act 测试环境, 否则 act 内状态更新不生效
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

// 屏蔽 react-test-renderer 官方弃用告警, 保留其余错误输出
// eslint-disable-next-line no-console
const originalConsoleError = console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    if (String(args[0]).includes('react-test-renderer is deprecated')) return
    originalConsoleError(...args)
  })
})

type Options = {
  page: number
  isIdle: boolean
  scrollRange: readonly [number, number]
  distance: number
}

function renderHook(initial: Options) {
  const result = { current: undefined as readonly [number, number] }
  const props = { current: initial }
  let renderer: any

  function Probe() {
    result.current = usePagerKeep(props.current)
    return null
  }

  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Probe))
  })

  return {
    result,
    /** 更新 props 并触发一次渲染 */
    update(next: Partial<Options>) {
      props.current = { ...props.current, ...next }
      TestRenderer.act(() => {
        renderer.update(React.createElement(Probe))
      })
    }
  }
}

describe('usePagerKeep', () => {
  const distance = 1

  it('初始区间以当前页 ± distance', () => {
    const { result } = renderHook({ page: 2, isIdle: true, scrollRange: [2, 2], distance })
    expect(result.current).toEqual([1, 3])
  })

  it('setPage 跨页跳转: 页码变更时与上一次停稳位置取并集', () => {
    const { result, update } = renderHook({
      page: 0,
      isIdle: true,
      scrollRange: [0, 0],
      distance
    })
    expect(result.current).toEqual([-1, 1])

    // setPage(3) 立即把 page 置为 3, 区间应扩到 [0-1, 3+1] 覆盖中间页 1/2
    update({ page: 3, scrollRange: [3, 3] })
    expect(result.current).toEqual([-1, 4])
  })

  it('[修复点] 手势拖动经过中间页: page 不变, scrollRange 实时扩展保活', () => {
    const { result, update } = renderHook({
      page: 0,
      isIdle: true,
      scrollRange: [0, 0],
      distance
    })

    // 拖动开始: isIdle -> false, 视野 [0,1]
    update({ isIdle: false, scrollRange: [0, 1] })
    expect(result.current).toEqual([-1, 2])

    // 继续拖到第 2 页: 视野 [1,2], page 仍是 0 (onPageSelected 未触发)
    update({ isIdle: false, scrollRange: [1, 2] })
    expect(result.current).toEqual([-1, 3])
  })

  it('停稳后收缩到当前页 ± distance', () => {
    const { result, update } = renderHook({
      page: 0,
      isIdle: true,
      scrollRange: [0, 0],
      distance
    })

    // 拖动经过 [0,1] -> [1,2], 停在 page=2
    update({ isIdle: false, scrollRange: [0, 1] })
    update({ isIdle: false, scrollRange: [1, 2] })
    update({ isIdle: false, scrollRange: [2, 2] })
    // 停稳: onPageSelected 触发 page=2, isIdle -> true
    update({ page: 2, isIdle: true, scrollRange: [2, 2] })

    expect(result.current).toEqual([1, 3])
  })

  it('页码变更当帧未开始滚动时不收缩 (movingRef 未置位)', () => {
    const { result, update } = renderHook({
      page: 0,
      isIdle: true,
      scrollRange: [0, 0],
      distance
    })

    // page 变更但 isIdle 仍 true 且未进入过移动态: 不应触发收缩分支
    update({ page: 5, isIdle: true, scrollRange: [5, 5] })
    // 区间应含旧锚点并集而非直接收缩
    expect(result.current).toEqual([-1, 6])
  })
})
