/*
 * @Author: czy0729
 * @Date: 2026-11-12 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 05:23:42
 *
 * 评分缓存与云端快照的 24h 有效期判断
 */
import { isRankFresh, isSnapshotFresh, RANK_TTL } from '../utils'

describe('isRankFresh', () => {
  const now = 1000000

  it('没有 _loaded 视为过期', () => {
    expect(isRankFresh(undefined, now)).toBe(false)
    expect(isRankFresh({ s: 8 }, now)).toBe(false)
  })

  it('有效期边界', () => {
    expect(isRankFresh({ _loaded: now - RANK_TTL + 1 }, now)).toBe(true)
    expect(isRankFresh({ _loaded: now - RANK_TTL }, now)).toBe(false)
    expect(isRankFresh({ _loaded: now - RANK_TTL - 1 }, now)).toBe(false)
  })
})

describe('isSnapshotFresh', () => {
  const now = 1000000

  it('缺少 ts 视为过期', () => {
    expect(isSnapshotFresh(0, now)).toBe(false)
  })

  it('有效期边界', () => {
    expect(isSnapshotFresh(now - RANK_TTL + 1, now)).toBe(true)
    expect(isSnapshotFresh(now - RANK_TTL, now)).toBe(false)
  })
})
