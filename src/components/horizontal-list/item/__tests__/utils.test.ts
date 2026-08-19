/*
 * @Author: czy0729
 * @Date: 2026-08-19 08:00:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 08:00:47
 */
import { getTypeCn } from '../utils'

describe('horizontal-list/item/utils', () => {
  it('getTypeCn 通过 name 判定音乐（soundtrack / cd）', () => {
    expect(getTypeCn('Soundtrack')).toBe('音乐')
    expect(getTypeCn('xxx cd', '其他')).toBe('音乐')
  })

  it('getTypeCn 优先使用传入的 typeCn', () => {
    expect(getTypeCn('name', 'desc', '动画')).toBe('动画')
  })

  it('getTypeCn 从描述推断类型', () => {
    expect(getTypeCn('name', '动画')).toBe('动画')
    expect(getTypeCn('name', '唱歌')).toBe('音乐')
    expect(getTypeCn('name', '漫画')).toBe('书籍')
    expect(getTypeCn('name', '游戏')).toBe('游戏')
  })

  it('getTypeCn 使用关联类型（不同演绎/相同世界观/主版本）', () => {
    expect(getTypeCn('name', '不同演绎', '', '书籍')).toBe('书籍')
    expect(getTypeCn('name', '相同世界观', '', '游戏')).toBe('游戏')
    expect(getTypeCn('name', '主版本', '', '音乐')).toBe('音乐')
  })

  it('getTypeCn 无法判断时返回空', () => {
    expect(getTypeCn('name', '随便', '')).toBe('')
  })
})
