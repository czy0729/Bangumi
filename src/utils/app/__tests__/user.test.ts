/*
 * @Author: czy0729
 * @Date: 2026-05-12
 */
const mockTrackBlockedUser = jest.fn()
const mockTrackBlocked = jest.fn()

jest.mock('../../async', () => ({
  syncRakuenStore: () => ({
    trackBlockedUser: mockTrackBlockedUser,
    trackBlocked: mockTrackBlocked
  })
}))

jest.mock('../../scheduler', () => ({
  postTask: (fn: () => void) => fn()
}))

import { getIsBlocked, getIsBlockedUser } from '../user'

describe('getIsBlockedUser', () => {
  beforeEach(() => {
    mockTrackBlockedUser.mockClear()
  })

  it('用户名@用户ID 格式 - 匹配 userId', () => {
    expect(getIsBlockedUser(['baduser@123'], 'other', '123')).toBe(true)
  })

  it('用户名@用户ID 格式 - userId 不匹配', () => {
    expect(getIsBlockedUser(['baduser@123'], 'other', '456')).toBe(false)
  })

  it('仅用户名格式 - 匹配 userName', () => {
    expect(getIsBlockedUser(['baduser'], 'baduser', '999')).toBe(true)
  })

  it('仅用户名格式 - userName 不匹配', () => {
    expect(getIsBlockedUser(['baduser'], 'gooduser', '999')).toBe(false)
  })

  it('空列表不匹配', () => {
    expect(getIsBlockedUser([], 'user', '123')).toBe(false)
  })

  it('即使 userName 不匹配，userId 匹配也返回 true', () => {
    expect(getIsBlockedUser(['baduser@123'], 'gooduser', '123')).toBe(true)
  })

  // 发现隐藏问题：'undefined' 字符串被当作特殊值
  it('[隐藏问题] userId 为 "undefined" 字符串时回退到 userName 匹配', () => {
    expect(getIsBlockedUser(['user@undefined'], 'user', '123')).toBe(true)
    expect(getIsBlockedUser(['user@undefined'], 'other', '123')).toBe(false)
  })

  it('带 trackUUID 时触发追踪', () => {
    getIsBlockedUser(['baduser@123'], 'other', '123', 'track-uuid-1')
    expect(mockTrackBlockedUser).toHaveBeenCalledWith('123')
  })

  it('同一 trackUUID 只追踪一次', () => {
    getIsBlockedUser(['baduser@123'], 'other', '123', 'same-uuid')
    getIsBlockedUser(['baduser@123'], 'other', '123', 'same-uuid')
    expect(mockTrackBlockedUser).toHaveBeenCalledTimes(1)
  })
})

describe('getIsBlocked', () => {
  beforeEach(() => {
    mockTrackBlocked.mockClear()
  })

  it('匹配关键词返回 true', () => {
    expect(getIsBlocked(['spam', 'ad'], 'this is spam content')).toBe(true)
  })

  it('不匹配返回 false', () => {
    expect(getIsBlocked(['spam', 'ad'], 'this is clean')).toBe(false)
  })

  it('空列表不匹配', () => {
    expect(getIsBlocked([], 'anything')).toBe(false)
  })

  it('精确匹配', () => {
    expect(getIsBlocked(['spam'], 'spam')).toBe(true)
  })

  it('部分匹配', () => {
    expect(getIsBlocked(['spam'], 'spammer')).toBe(true)
  })

  // 已修复：空字符串不再匹配所有关键词
  it('空字符串不匹配所有关键词', () => {
    expect(getIsBlocked([''], 'anything at all')).toBe(false)
  })

  it('带 trackUUID 时触发追踪', () => {
    getIsBlocked(['spam'], 'this is spam', 'track-uuid-1')
    expect(mockTrackBlocked).toHaveBeenCalledWith('this is spam')
  })

  it('同一 keyword+trackUUID 只追踪一次', () => {
    getIsBlocked(['spam'], 'this is spam', 'same-uuid')
    getIsBlocked(['spam'], 'this is spam', 'same-uuid')
    expect(mockTrackBlocked).toHaveBeenCalledTimes(1)
  })

  it('不同 trackUUID 分别追踪', () => {
    getIsBlocked(['spam'], 'this is spam', 'uuid-1')
    getIsBlocked(['spam'], 'this is spam', 'uuid-2')
    expect(mockTrackBlocked).toHaveBeenCalledTimes(2)
  })
})
