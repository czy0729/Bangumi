/*
 * @Author: czy0729
 * @Date: 2026-09-02 11:46:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 11:49:21
 */
import aniep from '../index'

/** 期望值由上游 soruly/aniep@0.6.0 差分生成并冻结, 依赖移除后依然可校验 */
const CASES: [string, number | number[] | string | null][] = [
  ['13.mp4', 13],
  ['[Group] Show - 01 [1080p].mkv', 1],
  ['Show 第03话', 3],
  ['Show 第三话', 3],
  ['第 01-13 話', [1, 13]],
  ['S03E13', 13],
  ['[01-13END]', [1, 13]],
  ['【08】', 8],
  ['「12」', 12],
  ['#13', 13],
  ['Show EP 13.5', 13],
  ['Show 13v2', 13],
  ['x264 720p [c3cafe11] Show 09', 9],
  ['Show 2019 - 04', 4],
  ['Show [14(OVA)]', 14],
  ['Show - 13 [720]', 13],
  ['Show [13 s2-01]', '1|13'],
  ['Show - 13-26', [13, 26]],
  ['Show [01_13]', '1|13'],
  ['Show E07', 7],
  ['Show 1280x720 06', 6],
  ['Show 1080i 05', 5],
  ['没有数字的普通文本', null],
  ['Show Episode 12', 12],
  ['Show [20190301] 11', 11],
  ['2020-01-01 Show 10', 10],
  ['Show 第十五集', 15],
  ['Show 13.5', 5],
  ['8bit Show 07', 7],
  ['Show [OVA3]', 3],
  ['Show - 01.5 (s1-13.5)', '1.5|13.5'],
  ['Show [01(ep.14)]', '1|14'],
  ['Show[01-02(13-14)]', '1,2|13,14'],
  ['Show  13 [Group]', 13],
  ['Show 2k 04', 4],
  ['Show [13-xxxx]', 13],
  ['Show_13_xxxx', 13],
  ['Show.13.xxxx', 13],
  ['Show 13 - xxxx', 13],
  ['Show - 13.5xxxx', 13.5],
  ['13.5 - Show', 13.5],
  ['01-13.mkv', [1, 13]],
  ['Show - 13-26xxxx', [13, 26]]
]

describe('aniep', () => {
  it('解析普通集数', () => {
    expect(aniep('13.mp4')).toBe(13)
    expect(aniep('[Group] Show - 01 [1080p].mkv')).toBe(1)
    expect(aniep('S03E13')).toBe(13)
    expect(aniep('Show E07')).toBe(7)
    expect(aniep('Show Episode 12')).toBe(12)
    expect(aniep('#13')).toBe(13)
  })

  it('解析中文数字与「第 N 话」', () => {
    expect(aniep('Show 第03话')).toBe(3)
    expect(aniep('Show 第三话')).toBe(3)
    expect(aniep('Show 第十五集')).toBe(15)
    expect(aniep('第 01-13 話')).toEqual([1, 13])
  })

  it('区间/多版本返回数组或拼接字符串', () => {
    expect(aniep('[01-13END]')).toEqual([1, 13])
    expect(aniep('Show - 13-26')).toEqual([13, 26])
    expect(aniep('01-13.mkv')).toEqual([1, 13])
    expect(aniep('Show [01_13]')).toBe('1|13')
    expect(aniep('Show [13 s2-01]')).toBe('1|13')
    expect(aniep('Show[01-02(13-14)]')).toBe('1,2|13,14')
  })

  it('解析特殊标记 (OVA/【】/「」/720 special case)', () => {
    expect(aniep('Show [OVA3]')).toBe(3)
    expect(aniep('Show [14(OVA)]')).toBe(14)
    expect(aniep('【08】')).toBe(8)
    expect(aniep('「12」')).toBe(12)
    expect(aniep('Show - 13 [720]')).toBe(13)
  })

  it('清洗分辨率/年份/校验码等噪音后仍可解析', () => {
    expect(aniep('x264 720p [c3cafe11] Show 09')).toBe(9)
    expect(aniep('Show 1280x720 06')).toBe(6)
    expect(aniep('Show 2019 - 04')).toBe(4)
    expect(aniep('Show [20190301] 11')).toBe(11)
    expect(aniep('2020-01-01 Show 10')).toBe(10)
    expect(aniep('8bit Show 07')).toBe(7)
    expect(aniep('Show 13v2')).toBe(13)
    expect(aniep('Show 2k 04')).toBe(4)
  })

  it('无法解析时返回 null', () => {
    expect(aniep('没有数字的普通文本')).toBe(null)
    expect(aniep('')).toBe(null)
  })

  it('[上游怪癖] 尾部小数点集数只取末段数字, 与上游一致', () => {
    expect(aniep('Show 13.5')).toBe(5)
    expect(aniep('Show EP 13.5')).toBe(13)
  })

  it('差分冻结用例全部一致', () => {
    CASES.forEach(([input, expected]) => {
      expect(aniep(input)).toEqual(expected)
    })
  })
})
