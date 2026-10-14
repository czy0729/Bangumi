/*
 * @Author: czy0729
 * @Date: 2026-10-14 00:00:00
 *
 * getDollarsKey 增量合并去重键
 */
import { getDollarsKey, getDollarsOnline, getDollarsUserId } from '../utils'

import type { DollarsItem } from '../types'

function createItem(overrides: Partial<DollarsItem> = {}): DollarsItem {
  return {
    id: '1791967385',
    avatar: '000/93/80/938070_P01ZC.jpg',
    nickname: 'sai',
    msg: '测试内容',
    color: '#f8b500',
    ...overrides
  }
}

describe('getDollarsKey', () => {
  it('秒级 id 与毫秒级 id 得到同一个键', () => {
    expect(getDollarsKey(createItem({ id: '1791967385' }))).toBe(
      getDollarsKey(createItem({ id: '1791967385938070' }))
    )
  })

  it('同一秒内不同内容不会撞键', () => {
    expect(getDollarsKey(createItem({ msg: '内容1' }))).not.toBe(
      getDollarsKey(createItem({ msg: '内容2' }))
    )
  })

  it('同一秒内不同用户不会撞键', () => {
    expect(getDollarsKey(createItem({ nickname: '用户1' }))).not.toBe(
      getDollarsKey(createItem({ nickname: '用户2' }))
    )
  })

  it('id 缺失时不抛错且键不含 undefined', () => {
    expect(getDollarsKey(createItem({ id: '' }))).toBe('|sai|测试内容')
  })
})

describe('getDollarsUserId', () => {
  it('从头像路径取数字用户 id', () => {
    expect(getDollarsUserId('000/93/80/938070_P01ZC.jpg?r=1&hd=1')).toBe(938070)
  })

  it('无数字时返回 undefined', () => {
    expect(getDollarsUserId('')).toBe(undefined)
  })
})

describe('getDollarsOnline', () => {
  const NOW = 1791967385

  it('只统计 1 小时内的独立用户', () => {
    const list = [
      createItem({ id: String(NOW - 60), avatar: '000/00/01/1_a.jpg' }),
      createItem({ id: String(NOW - 120), avatar: '000/00/01/1_b.jpg' }),
      createItem({ id: String(NOW - 3600 * 2), avatar: '000/00/02/2_a.jpg' })
    ]

    expect(getDollarsOnline(list, NOW)).toBe(1)
  })

  it('id 带毫秒也能识别', () => {
    const list = [createItem({ id: `${NOW - 60}000`, avatar: '000/00/02/2_a.jpg' })]

    expect(getDollarsOnline(list, NOW)).toBe(1)
  })

  it('取不到用户 id 时按昵称去重', () => {
    const list = [
      createItem({ id: String(NOW - 60), avatar: '', nickname: 'a' }),
      createItem({ id: String(NOW - 120), avatar: '', nickname: 'a' }),
      createItem({ id: String(NOW - 180), avatar: '', nickname: 'b' })
    ]

    expect(getDollarsOnline(list, NOW)).toBe(2)
  })

  it('空列表返回 0', () => {
    expect(getDollarsOnline([], NOW)).toBe(0)
  })
})
