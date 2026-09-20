/*
 * @Author: czy0729
 * @Date: 2026-09-20 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:49
 *
 * 期望值由重构前 (aniep 前置清洗链内联两份) 的输出冻结
 */
jest.mock('../../protobuf', () => ({ get: jest.fn(() => ({})) }))

import { cleaned } from '../../ja'
import { cleanFilename } from '../clean'

/** [输入, ja.cleaned 输出] */
const ROWS: [string, string][] = [
  ['Show 13.mkv', 'show13'],
  ['Show 13v2.mp4', 'show13'],
  ['Show x264 05', 'show05'],
  ['Show 10bit 07', 'show07'],
  ['[c3cafe11] Show 09', 'show09'],
  ['Show [20190301] 11', 'show1'],
  ['2020-01-01 Show 10', 'show10'],
  ['Show 1280x720 06', 'show06'],
  ['[Group] Show 09 [1080p]', 'groupshow09'],
  ['Show 3840-2160 03', 'show03'],
  ['Show 4k 04', 'show04'],
  ['Show 2019 - 04', 'show04'],
  // 已知 quirk: (BD)/(DVD) 规则无 i 标记且入参已 lowercase, 不生效, 非期望语义
  ['Show (BD) 02', 'show(bd)02'],
  ['Show (DVD) 01', 'show(dvd)0'],
  ['[Group] Show [BDRip] 简日 全集 01', 'groupshow0'],
  ['Show 1-26', 'show'],
  ['Show 第03話', 'show第03話'],
  ['Show 第十五集', 'show第十五集'],
  ['第 01-13 話', '第話']
]

describe('cleanFilename', () => {
  it('移除扩展名与版本后缀', () => {
    expect(cleanFilename('Show 13.mkv')).toBe('Show 13')
    expect(cleanFilename('Show 13v2.mp4')).toBe('Show 13')
  })
})

describe('ja.cleaned', () => {
  it('输出不变', () => {
    ROWS.forEach(([input, expected]) => {
      expect(cleaned(input)).toBe(expected)
    })
  })
})
