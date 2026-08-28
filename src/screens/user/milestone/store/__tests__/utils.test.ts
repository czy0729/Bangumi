/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:57:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-29 04:57:01
 */
import { filterByCover, filterByScore, parseBool, parseTip } from '../utils'

import type { UserCollectionsItem } from '@stores/collection/types'

/** 构造收藏条目 */
function item(partial: Partial<UserCollectionsItem> = {}): UserCollectionsItem {
  return {
    id: 1,
    cover: '/cover/1.jpg',
    name: 'Name',
    nameCn: '中文名',
    tip: '',
    tags: '',
    comments: '',
    score: '0',
    time: '2024-05-20',
    collected: false,
    ...partial
  }
}

describe('parseBool', () => {
  it("'true' 返回 true", () => {
    expect(parseBool('true')).toBe(true)
  })

  it("'false' 返回 false", () => {
    expect(parseBool('false')).toBe(false)
  })

  it('其他值返回 undefined', () => {
    expect(parseBool('1')).toBeUndefined()
    expect(parseBool(true)).toBeUndefined()
    expect(parseBool(undefined)).toBeUndefined()
  })
})

describe('filterByCover', () => {
  it('nsfw 时不过滤', () => {
    const list = [item(), item({ cover: '' })]
    expect(filterByCover(list, true)).toEqual(list)
  })

  it('非 nsfw 时过滤无封面与占位封面', () => {
    const list = [
      item(),
      item({ id: 2, cover: '' }),
      item({ id: 3, cover: '/img/no_icon_subject.png' })
    ]
    expect(filterByCover(list, false)).toEqual([item()])
  })
})

describe('filterByScore', () => {
  it("'全部' 或空值时直通返回原数组", () => {
    const list = [item()]
    expect(filterByScore(list, '全部')).toBe(list)
    expect(filterByScore(list, '')).toBe(list)
  })

  it("'未评分' 过滤无评分条目", () => {
    const list = [
      item({ id: 1, score: '0' }),
      item({ id: 2, score: '8' }),
      item({ id: 3, score: '' })
    ]
    expect(filterByScore(list, '未评分')).toEqual([
      item({ id: 1, score: '0' }),
      item({ id: 3, score: '' })
    ])
  })

  it('精确值过滤', () => {
    const list = [item({ id: 1, score: '7' }), item({ id: 2, score: '8' })]
    expect(filterByScore(list, '7')).toEqual([item({ id: 1, score: '7' })])
  })

  it("区间 '8-9' 过滤", () => {
    const list = [
      item({ id: 1, score: '7' }),
      item({ id: 2, score: '8' }),
      item({ id: 3, score: '9' }),
      item({ id: 4, score: '10' })
    ]
    expect(filterByScore(list, '8-9')).toEqual([
      item({ id: 2, score: '8' }),
      item({ id: 3, score: '9' })
    ])
  })
})

describe('parseTip', () => {
  it('空描述或无斜杠返回空字符串', () => {
    expect(parseTip('', 'anime')).toBe('')
    expect(parseTip('无斜杠描述', 'anime')).toBe('')
  })

  it('取日期后的部分', () => {
    expect(parseTip('2024年5月20日 / 京都动画', 'anime')).toBe('京都动画')
  })

  it('日期在最后时返回空字符串', () => {
    expect(parseTip('a / b / 2024/11/07', 'anime')).toBe('')
  })

  it('game 类型取最后两段', () => {
    expect(parseTip('a / b / c', 'game')).toBe('b / c')
  })
})
