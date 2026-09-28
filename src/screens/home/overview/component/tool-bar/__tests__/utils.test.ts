/*
 * @Author: czy0729
 * @Date: 2026-09-28 20:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 20:00:00
 *
 * 筛选选项构建与解析逻辑单测
 */
jest.mock('../ds', () => ({
  TEXT_ALL: '全部'
}))

import { buildFilterData, parseFilterValue } from '../utils'

import type { ListItem } from '../../../types'

const item = (desc?: string) =>
  ({
    id: 1,
    image: '',
    name: '',
    ...(desc ? { desc } : {})
  } as ListItem)

describe('buildFilterData', () => {
  test('空列表返回空数组', () => {
    expect(buildFilterData([])).toEqual([])
  })

  test('首项为全部计数, 其余按 desc 归并计数', () => {
    const list = [item('TV'), item('TV'), item('剧场版'), item('OVA')]
    expect(buildFilterData(list)).toEqual(['全部〔4〕', 'TV〔2〕', '剧场版〔1〕', 'OVA〔1〕'])
  })

  test('无 desc 的条目不参与归并, 但计入全部', () => {
    const list = [item('TV'), item(), item(undefined)]
    expect(buildFilterData(list)).toEqual(['全部〔3〕', 'TV〔1〕'])
  })

  test('全部无 desc 时返回仅含全部的一项', () => {
    expect(buildFilterData([item(), item()])).toEqual(['全部〔2〕'])
  })

  test('保持 desc 首次出现的顺序', () => {
    const list = [item('B'), item('A'), item('B'), item('C'), item('A')]
    expect(buildFilterData(list)).toEqual(['全部〔5〕', 'B〔2〕', 'A〔2〕', 'C〔1〕'])
  })
})

describe('parseFilterValue', () => {
  test('全部 → 空串', () => {
    expect(parseFilterValue('全部〔12〕')).toBe('')
  })

  test('类型 → desc', () => {
    expect(parseFilterValue('TV〔2〕')).toBe('TV')
  })

  test('与 buildFilterData 生成格式互逆', () => {
    const data = buildFilterData([item('TV'), item('剧场版')])
    expect(data.map(parseFilterValue)).toEqual(['', 'TV', '剧场版'])
  })
})
