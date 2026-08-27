/*
 * @Author: czy0729
 * @Date: 2026-08-27 18:40:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-27 18:40:57
 */
import { LIKE_TYPE_RAKUEN, LIKE_TYPE_SAY, LIKE_TYPE_TIMELINE } from '@constants'
import { getVisibleLikes, isTimelineLike } from '../utils'

import type { LikesItem } from '../types'

/** 构造贴贴列表项 */
function item(partial: Partial<LikesItem> = {}): LikesItem {
  return {
    emoji: '15',
    main_id: 379975,
    total: '1',
    type: LIKE_TYPE_RAKUEN,
    value: '54',
    ...partial
  }
}

describe('运行时结构符合类型定义', () => {
  it('getVisibleLikes 返回 VisibleLikes 结构', () => {
    const result = getVisibleLikes([], false, 12)

    expect(result).toEqual({
      visible: expect.any(Array),
      hasHidden: expect.any(Boolean)
    })
  })

  it('isTimelineLike 返回 boolean', () => {
    expect(isTimelineLike(LIKE_TYPE_TIMELINE)).toEqual(expect.any(Boolean))
  })
})

describe('isTimelineLike', () => {
  it('时间线与说说是时间线类', () => {
    expect(isTimelineLike(LIKE_TYPE_TIMELINE)).toBe(true)
    expect(isTimelineLike(LIKE_TYPE_SAY)).toBe(true)
  })

  it('帖子等其他类型不是时间线类', () => {
    expect(isTimelineLike(LIKE_TYPE_RAKUEN)).toBe(false)
    expect(isTimelineLike(0)).toBe(false)
  })

  it('入参为数字字符串时弱相等判定为 true (调用方需先 Number 转换)', () => {
    // [问题] 弱相等依赖调用方保证类型, 若直接传 HTML 解析出的字符串会误判
    expect(isTimelineLike(String(LIKE_TYPE_TIMELINE))).toBe(true)
  })

  it('undefined / null 返回 false', () => {
    expect(isTimelineLike(undefined)).toBe(false)
    expect(isTimelineLike(null)).toBe(false)
  })
})

describe('getVisibleLikes', () => {
  it('空列表返回空且无隐藏项', () => {
    const result = getVisibleLikes([], false, 2)

    expect(result.visible).toHaveLength(0)
    expect(result.hasHidden).toBe(false)
  })

  it('少于 limit 时全部可见', () => {
    const list = [item({ value: '54' }), item({ value: '118' })]

    expect(getVisibleLikes(list, false, 12).visible).toHaveLength(2)
    expect(getVisibleLikes(list, false, 12).hasHidden).toBe(false)
  })

  it('超过 limit 时只显示前 limit 个, 并标记有隐藏项', () => {
    const list = [
      item({ value: '54' }),
      item({ value: '118' }),
      item({ value: '127' }),
      item({ value: '85' })
    ]
    const result = getVisibleLikes(list, false, 2)

    expect(result.visible.map(i => i.value)).toEqual(['54', '118'])
    expect(result.hasHidden).toBe(true)
  })

  it('选中项不受 limit 名额限制, 始终可见', () => {
    const list = [
      item({ value: '54' }),
      item({ value: '118' }),
      item({ value: '127' }),
      item({ value: '85', selected: true })
    ]
    const result = getVisibleLikes(list, false, 2)

    expect(result.visible.map(i => i.value)).toEqual(['54', '118', '85'])
    expect(result.hasHidden).toBe(true)
  })

  it('state 为 true 时全部可见且无隐藏标记', () => {
    const list = [
      item({ value: '54' }),
      item({ value: '118' }),
      item({ value: '127' }),
      item({ value: '85' })
    ]
    const result = getVisibleLikes(list, true, 2)

    expect(result.visible).toHaveLength(4)
    expect(result.hasHidden).toBe(false)
  })

  it('[问题] 全部选中时列表可能远超 limit 但无任何折叠提示入口', () => {
    // 极端场景: 用户把所有贴贴都点了, state=false 且 length > limit 时,
    // 列表全量渲染但 hasHidden === false, 没有展开按钮收起
    const list = [item({ value: '54', selected: true }), item({ value: '118', selected: true })]
    const result = getVisibleLikes(list, false, 1)

    expect(result.visible).toHaveLength(2)
    expect(result.hasHidden).toBe(false)
  })

  it('不修改传入的 likesList 数组', () => {
    const list = [item({ value: '54' }), item({ value: '118', selected: true })]
    getVisibleLikes(list, false, 0)

    expect(list).toHaveLength(2)
    expect(list[0].selected).toBeUndefined()
  })
})
