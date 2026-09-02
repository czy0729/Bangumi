/*
 * @Author: czy0729
 * @Date: 2026-09-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 05:44:22
 */
import { platformFix, removeDuplicateStrings } from '../utils'

describe('removeDuplicateStrings', () => {
  it('重复的 string 项只保留首次出现的', () => {
    expect(removeDuplicateStrings(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c'])
  })

  it('[问题] 非 string 项 (divider / 自定义标题) 不被过滤掉', () => {
    const divider = { type: 'divider' }
    const title = { title: '自定义' }
    expect(removeDuplicateStrings(['a', divider, 'a', title])).toEqual(['a', divider, title])
  })

  it('重复的非 string 项不去重', () => {
    const divider = { type: 'divider' }
    expect(removeDuplicateStrings([divider, divider])).toEqual([divider, divider])
  })

  it('空数组返回空数组', () => {
    expect(removeDuplicateStrings([])).toEqual([])
  })
})

describe('platformFix', () => {
  it('非 WEB 平台原样返回标题', () => {
    expect(platformFix('复制链接')).toBe('复制链接')
    expect(platformFix('用浏览器查看原图')).toBe('用浏览器查看原图')
    expect(platformFix('随便一个标题')).toBe('随便一个标题')
  })
})
