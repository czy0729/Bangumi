/*
 * @Author: czy0729
 * @Date: 2026-09-09 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:17:13
 */
import { MAX_BGM_HISTORY_COUNT, MAX_HISTORY_COUNT, SOURCE_FLAG } from '../ds'
import {
  getBgmLabel,
  getKeyboardSpaceHeight,
  getSubmitValue,
  insertTextAt,
  upsertHistory,
  upsertReplyHistory
} from '../utils'

describe('运行时结构符合类型定义', () => {
  it('getBgmLabel 返回 string', () => {
    expect(typeof getBgmLabel(1)).toBe('string')
  })

  it('getSubmitValue 返回 string', () => {
    expect(typeof getSubmitValue('a', true, true)).toBe('string')
  })

  it('insertTextAt 返回 value 与 cursor', () => {
    const result = insertTextAt('abc', { start: 1, end: 2 }, 'X')
    expect(typeof result.value).toBe('string')
    expect(typeof result.cursor).toBe('number')
  })
})

describe('getBgmLabel', () => {
  it('700 以上返回 blake 表情占位符, 编号补两位零', () => {
    expect(getBgmLabel(700)).toBe('(blake_00)')
    expect(getBgmLabel(705)).toBe('(blake_05)')
    expect(getBgmLabel(799)).toBe('(blake_99)')
  })

  it('600-699 返回 musume 表情占位符', () => {
    expect(getBgmLabel(600)).toBe('(musume_00)')
    expect(getBgmLabel(655)).toBe('(musume_55)')
  })

  it('600 以下返回 bgm 占位符', () => {
    expect(getBgmLabel(1)).toBe('(bgm1)')
    expect(getBgmLabel(123)).toBe('(bgm123)')
  })

  it('[问题] 边界值 599/699/999 不串组', () => {
    expect(getBgmLabel(599)).toBe('(bgm599)')
    expect(getBgmLabel(699)).toBe('(musume_99)')
    expect(getBgmLabel(999)).toBe('(blake_99)')
  })
})

describe('getSubmitValue', () => {
  it('未开启来源时不拼接宣传语', () => {
    expect(getSubmitValue('好文', false, true)).toBe('好文')
  })

  it('来源开关关闭时不拼接宣传语', () => {
    expect(getSubmitValue('好文', true, false)).toBe('好文')
  })

  it('开启来源时在末尾拼接宣传语', () => {
    const value = getSubmitValue('好文', true, true)
    expect(value).toContain('好文')
    expect(value).toContain(SOURCE_FLAG)
  })

  it('文本中已包含宣传语标记时不重复拼接', () => {
    const once = getSubmitValue('好文', true, true)
    expect(getSubmitValue(once, true, true)).toBe(once)
  })

  it('空文本开启来源时仍拼接宣传语', () => {
    expect(getSubmitValue('', true, true)).toContain(SOURCE_FLAG)
  })
})

describe('insertTextAt', () => {
  it('光标重合时在位置前插入并后移光标', () => {
    expect(insertTextAt('abc', { start: 1, end: 1 }, 'X')).toEqual({
      value: 'aXbc',
      cursor: 2
    })
  })

  it('有选区时替换选区内容', () => {
    expect(insertTextAt('abc', { start: 1, end: 3 }, 'X')).toEqual({
      value: 'aX',
      cursor: 2
    })
  })

  it('空文本插入', () => {
    expect(insertTextAt('', { start: 0, end: 0 }, '(bgm20)')).toEqual({
      value: '(bgm20)',
      cursor: 7
    })
  })

  it('插入空字符串仅移动光标', () => {
    expect(insertTextAt('abc', { start: 1, end: 1 }, '')).toEqual({
      value: 'abc',
      cursor: 1
    })
  })
})

describe('upsertHistory', () => {
  it('新项插入头部', () => {
    expect(upsertHistory(['a', 'b'], 'c', 20)).toEqual(['c', 'a', 'b'])
  })

  it('已存在项移动到头部且不重复', () => {
    expect(upsertHistory(['a', 'b', 'c'], 'b', 20)).toEqual(['b', 'a', 'c'])
  })

  it('超出上限从尾部裁剪', () => {
    expect(upsertHistory(['a', 'b'], 'c', 2)).toEqual(['c', 'a'])
  })

  it('上限为 0 返回空数组', () => {
    expect(upsertHistory(['a'], 'b', 0)).toEqual([])
  })

  it('[问题] 不修改原列表引用', () => {
    const list = ['a', 'b']
    upsertHistory(list, 'c', 20)
    expect(list).toEqual(['a', 'b'])
  })
})

describe('upsertReplyHistory', () => {
  it('普通插入后已存在的锁定文本保持原位不重复', () => {
    const result = upsertReplyHistory(['a', 'b'], 'c', 'b', 20)
    expect(result).toEqual(['c', 'a', 'b'])
  })

  it('锁定文本不在列表时补到头部', () => {
    const result = upsertReplyHistory(['a', 'b'], 'c', 'z', 20)
    expect(result).toEqual(['z', 'c', 'a', 'b'])
  })

  it('[问题] 补入锁定文本后不二次裁剪, 可能超出上限一条', () => {
    const result = upsertReplyHistory(['a', 'b'], 'c', 'z', 2)
    expect(result).toEqual(['z', 'c', 'a'])
    expect(result.length).toBe(3)
  })

  it('无锁定文本时按上限裁剪', () => {
    expect(upsertReplyHistory(['a', 'b'], 'c', '', 2)).toEqual(['c', 'a'])
  })

  it('提交文本与锁定文本相同时不重复', () => {
    expect(upsertReplyHistory(['a'], 'z', 'z', 20)).toEqual(['z', 'a'])
  })
})

describe('getKeyboardSpaceHeight', () => {
  it('Android 直接使用键盘高度', () => {
    expect(getKeyboardSpaceHeight(800, false, 0)).toEqual({ height: 800, maxHeight: 800 })
  })

  it('Android 高度取历史最大值, 键盘变矮时保持不变', () => {
    const first = getKeyboardSpaceHeight(800, false, 0)
    expect(first).toEqual({ height: 800, maxHeight: 800 })
    expect(getKeyboardSpaceHeight(700, false, first.maxHeight)).toEqual({
      height: 800,
      maxHeight: 800
    })
  })

  it('iOS 扣除 24 工具条高度', () => {
    expect(getKeyboardSpaceHeight(800, true, 0)).toEqual({ height: 776, maxHeight: 776 })
  })

  it('iOS 第三方键盘弹出慢一拍, 保证不低于 336', () => {
    expect(getKeyboardSpaceHeight(300, true, 0)).toEqual({ height: 336, maxHeight: 276 })
  })

  it('[问题] 高度低于历史最大值时 iOS 也不会回落', () => {
    expect(getKeyboardSpaceHeight(300, true, 776)).toEqual({ height: 776, maxHeight: 776 })
  })
})

describe('与 ds 常量一致性', () => {
  it('上限常量与使用一致', () => {
    expect(MAX_BGM_HISTORY_COUNT).toBe(7)
    expect(MAX_HISTORY_COUNT).toBe(20)
  })
})
