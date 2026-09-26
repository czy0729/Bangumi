/*
 * @Author: czy0729
 * @Date: 2026-09-26 22:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 23:22:46
 */
import React from 'react'
import { useCatalogData } from '../hooks'

import type { CatalogDetail } from '@stores/discovery/types'

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

afterAll(() => {
  jest.restoreAllMocks()
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

describe('useCatalogData', () => {
  afterEach(() => {
    // 恢复 mock store 默认状态, 避免用例间串扰
    global.__mockStoreState__.myUserId = undefined
    global.__mockStoreState__.myId = undefined
    global.__mockStoreState__.catalogDetail = { _loaded: false, list: [] }
    global.__mockStoreState__.catalogDetailFromOSS = { _loaded: false, total: 0, list: [] }
  })

  it('默认读取 store 的详情与云快照', () => {
    const { result } = renderHook(() => useCatalogData(44079))
    expect(result.current.detailValue).toBe(global.__mockStoreState__.catalogDetail)
    expect(result.current.oss).toBe(global.__mockStoreState__.catalogDetailFromOSS)
    expect(result.current.data).toBe(global.__mockStoreState__.catalogDetail)
  })

  it('外部传入 detail 时优先使用, 不再读 store', () => {
    const detail = { _loaded: true, list: [{ id: 1 }], title: '传入' } as CatalogDetail
    const { result } = renderHook(() => useCatalogData(44079, detail))
    expect(result.current.detailValue).toBe(detail)
    expect(result.current.data).toBe(detail)
  })

  it('selfIds 同时包含数字 Id 与改过的用户名 ID', () => {
    global.__mockStoreState__.myUserId = 123
    global.__mockStoreState__.myId = 'renamed'
    const { result } = renderHook(() => useCatalogData(44079))
    expect(result.current.selfIds).toEqual(['123', 'renamed'])
  })

  it('[问题] 未登录时 selfIds 为空串占位而不是 undefined', () => {
    const { result } = renderHook(() => useCatalogData(44079))
    expect(result.current.selfIds).toEqual(['', ''])
  })
})
