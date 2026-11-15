/*
 * @Author: czy0729
 * @Date: 2026-11-14 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-14 00:00:00
 *
 * toMenuEntries 的查表与勾选派生分支
 *  - 参考 hooks.menu.test.ts 的 doMock 写法, 但不依赖 react-test-renderer, 本地可直接跑
 *  - 常量表从 hooks.ts 移到 utils.ts 后, 这条链路仍需保证 doMock 时机正确
 */
jest.mock('@utils/thirdParty/open-cc', () => ({
  s2t: (text: string) => `T:${text}`
}))

// doMock 必须先于 require 执行, 故此处不能用静态 import
jest.doMock('@constants', () => ({
  FROZEN_FN: () => {},
  MENU_ICONS: { 删除: 'md-delete-outline' },
  get MENU_ICONS_ENABLED() {
    return (globalThis as any).__menuIconsEnabled__
  },
  MENU_TYPES: { 删除: 'danger' }
}))

const { toMenuEntries } = require('../utils')

describe('toMenuEntries 查表与勾选派生', () => {
  beforeEach(() => {
    ;(globalThis as any).__menuIconsEnabled__ = true
  })

  afterEach(() => {
    ;(globalThis as any).__menuIconsEnabled__ = true
  })

  it('传 value 时命中项自动渲染勾, 未命中项无勾', () => {
    const entries = toMenuEntries(['买入', '删除'], '删除')

    expect(entries[0].checked).toBe(false)
    expect(entries[1].checked).toBe(true)
  })

  it('不传 value 时无勾选态', () => {
    expect(toMenuEntries(['买入'])[0].checked).toBe(false)
  })

  it('对象项显式 checked 优先于 value 推导', () => {
    const [entry] = toMenuEntries([{ text: '买入', checked: true }], '删除')

    expect(entry.checked).toBe(true)
  })

  it('操作型菜单按文案查图标映射', () => {
    const entries = toMenuEntries(['删除', '买入'])

    expect(entries[0].icon).toBe('md-delete-outline')
    expect(entries[1].icon).toBeUndefined()
  })

  it('选择型菜单 (传 value) 不查图标表', () => {
    expect(toMenuEntries(['删除'], '删除')[0].icon).toBeUndefined()
  })

  it('MENU_ICONS_ENABLED 关闭时不查图标表', () => {
    ;(globalThis as any).__menuIconsEnabled__ = false

    expect(toMenuEntries(['删除'])[0].icon).toBeUndefined()
  })

  it('危险动作查表派生 type=danger', () => {
    const entries = toMenuEntries(['删除', '买入'])

    expect(entries[0].type).toBe('danger')
    expect(entries[1].type).toBeUndefined()
  })

  it('显式 icon 与 type 优先于查表', () => {
    const [entry] = toMenuEntries([{ text: '删除', icon: 'md-edit', type: 'main' }])

    expect(entry.icon).toBe('md-edit')
    expect(entry.type).toBe('main')
  })

  it('value 按对象项 text 匹配', () => {
    const entries = toMenuEntries(
      [{ text: '买入' }, { text: '删除' }],
      { text: '删除' }
    )

    expect(entries[0].checked).toBe(false)
    expect(entries[1].checked).toBe(true)
  })

  it('开启简繁转换后查表仍按原始文案命中', () => {
    ;(global as any).__mockStoreState__.s2t = true
    const [entry] = toMenuEntries(['删除'])

    expect(entry.text).toBe('T:删除')
    expect(entry.raw).toBe('删除')
    expect(entry.icon).toBe('md-delete-outline')
    expect(entry.type).toBe('danger')
    ;(global as any).__mockStoreState__.s2t = false
  })
})
