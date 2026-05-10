/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:23:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-10 17:23:34
 */
import { extractIdFromAvatar, getAge } from '../ages'

describe('extractIdFromAvatar', () => {
  it('从标准头像 URL 提取 ID', () => {
    const avatar = 'https://lain.bgm.tv/pic/user/l/000/000/000/12345.jpg?r=1234567890'
    const result = extractIdFromAvatar(avatar)
    expect(result).toBe(12345)
  })

  it('从带下划线的头像 URL 提取 ID', () => {
    const avatar = 'https://lain.bgm.tv/pic/user/l/000/000/000/67890_thumb.jpg'
    const result = extractIdFromAvatar(avatar)
    expect(result).toBe(67890)
  })

  it('非头像 URL 返回 undefined', () => {
    expect(extractIdFromAvatar('https://example.com/image.jpg')).toBeUndefined()
  })

  it('空字符串返回 undefined', () => {
    expect(extractIdFromAvatar('')).toBeUndefined()
  })

  it('不包含 pic/user 的 URL 返回 undefined', () => {
    expect(extractIdFromAvatar('https://lain.bgm.tv/pic/album/12345.jpg')).toBeUndefined()
  })
})

describe('getAge', () => {
  it('已知早期用户返回站龄', () => {
    // ID 1 是最早的用户之一
    const age = getAge('1')
    // getAge 返回 string | number | null
    expect(age).not.toBeNull()
    expect(age).not.toBe(0)
  })

  it('较大 ID 返回较小站龄', () => {
    const age = getAge('1200000')
    // getAge 返回 string，转为数字比较
    const numAge = Number(age)
    expect(numAge).toBeLessThan(5)
  })

  it('无效 ID 返回 0 或 null', () => {
    const age = getAge('abc')
    // 非数字 ID，且无头像，formatNumber(0) 返回 "0.0"
    expect(age === 0 || age === '0.0' || age === null).toBe(true)
  })

  it('带小数的站龄', () => {
    const age = getAge('500000')
    expect(age).toBeDefined()
  })
})
