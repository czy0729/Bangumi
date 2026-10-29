/*
 * @Author: czy0729
 * @Date: 2026-10-30 06:13:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-10-30 06:13:52
 *
 * usePopoverItems 查表与勾选派生分支
 *  - setup.js 的 @constants 虚拟 mock 是空表, 这里用 doMock 局部替换为带条目的映射
 */
import React from 'react'

const TestRenderer = jest.requireActual('react-test-renderer')

// React 19 要求显式声明 act 测试环境, 否则 act 内状态更新不生效
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

// 屏蔽 react-test-renderer 官方弃用告警
const originalConsoleError = console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    if (String(args[0]).includes('react-test-renderer is deprecated')) return
    originalConsoleError(...args)
  })
})

// 简繁转换 mock (同 hooks.test.ts)
jest.mock('@utils/thirdParty/open-cc', () => ({
  s2t: (text: string) => `T:${text}`
}))

// 局部 @constants mock: MENU_ICONS_ENABLED 走全局开关, 用例内可动态翻转
jest.doMock('@constants', () => ({
  FROZEN_FN: () => {},
  MENU_ICONS: { 删除: 'md-delete-outline' },
  get MENU_ICONS_ENABLED() {
    return (globalThis as any).__menuIconsEnabled__
  },
  MENU_TYPES: { 删除: 'danger' }
}))

// doMock 必须先于 require 执行, 故此处不能用静态 import
const { usePopoverItems } = require('../hooks')

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

  return { result }
}

describe('usePopoverItems 查表与勾选派生', () => {
  beforeEach(() => {
    ;(globalThis as any).__menuIconsEnabled__ = true
  })

  afterEach(() => {
    ;(globalThis as any).__menuIconsEnabled__ = true
  })

  it('传 value 时命中项自动渲染勾, 未命中项无勾', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['买入', '删除'], value: '删除' }))

    expect(result.current.items[0].checked).toBe(false)
    expect(result.current.items[1].checked).toBe(true)
  })

  it('不传 value 时无勾选态', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['买入'] }))

    expect(result.current.items[0].checked).toBe(false)
  })

  it('对象项显式 checked 优先于 value 推导', () => {
    const { result } = renderHook(() =>
      usePopoverItems({ data: [{ text: '买入', checked: true }], value: '删除' })
    )

    expect(result.current.items[0].checked).toBe(true)
  })

  it('操作型菜单按文案查图标映射', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['删除', '买入'] }))

    expect(result.current.items[0].icon).toBe('md-delete-outline')
    expect(result.current.items[1].icon).toBeUndefined()
  })

  it('选择型菜单 (传 value) 不查图标表', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['删除'], value: '删除' }))

    expect(result.current.items[0].icon).toBeUndefined()
  })

  it('MENU_ICONS_ENABLED 关闭时不查图标表', () => {
    ;(globalThis as any).__menuIconsEnabled__ = false
    const { result } = renderHook(() => usePopoverItems({ data: ['删除'] }))

    expect(result.current.items[0].icon).toBeUndefined()
  })

  it('危险动作查表派生 type=danger', () => {
    const { result } = renderHook(() => usePopoverItems({ data: ['删除', '买入'] }))

    expect(result.current.items[0].type).toBe('danger')
    expect(result.current.items[1].type).toBeUndefined()
  })

  it('显式 icon 与 type 优先于查表', () => {
    const { result } = renderHook(() =>
      usePopoverItems({ data: [{ text: '删除', icon: 'md-edit', type: 'main' }] })
    )

    expect(result.current.items[0].icon).toBe('md-edit')
    expect(result.current.items[0].type).toBe('main')
  })

  it('value 按对象项 text 匹配', () => {
    const { result } = renderHook(() =>
      usePopoverItems({
        data: [{ text: '买入' }, { text: '删除' }],
        value: { text: '删除' }
      })
    )

    expect(result.current.items[0].checked).toBe(false)
    expect(result.current.items[1].checked).toBe(true)
  })
})
