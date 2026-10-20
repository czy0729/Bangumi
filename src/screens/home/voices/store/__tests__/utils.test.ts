/*
 * @Author: czy0729
 * @Date: 2026-10-20 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-20 12:00:00
 *
 * 角色列表排序工具单测
 */
import { sortByOuterOrder, sortSubjects } from '../utils'

import type { MonoVoicesItem, MonoVoicesSubjectItem } from '@stores/subject/types'

/** 构造条目 */
function subject(id: string | number): MonoVoicesSubjectItem {
  return { id } as MonoVoicesSubjectItem
}

/** 构造角色 */
function voice(id: string | number, subjectIds: (string | number)[] = []): MonoVoicesItem {
  return {
    id,
    subject: subjectIds.map(subject)
  } as MonoVoicesItem
}

describe('sortSubjects', () => {
  it('id_asc 按条目 id 升序', () => {
    const result = sortSubjects([subject(3), subject(1), subject(2)], 'id_asc')
    expect(result.map(item => item.id)).toEqual([1, 2, 3])
  })

  it('id_desc 按条目 id 降序', () => {
    const result = sortSubjects([subject('3'), subject('1'), subject('2')], 'id_desc')
    expect(result.map(item => item.id)).toEqual(['3', '2', '1'])
  })

  it('无排序规则时原样返回, 不修改原数组', () => {
    const list = [subject(3), subject(1)]
    expect(sortSubjects(list, '')).toBe(list)

    sortSubjects(list, 'id_asc')
    expect(list.map(item => item.id)).toEqual([3, 1])
  })
})

describe('sortByOuterOrder', () => {
  it('id_asc 按角色 id 升序', () => {
    const result = sortByOuterOrder([voice(3), voice(1), voice(2)], 'id_asc')
    expect(result.map(item => item.id)).toEqual([1, 2, 3])
  })

  it('subject_max_desc 按条目最大 id 降序, 无条目的角色排最后', () => {
    const result = sortByOuterOrder(
      [voice(1, [10]), voice(2, [30, 20]), voice(3)],
      'subject_max_desc'
    )
    expect(result.map(item => item.id)).toEqual([2, 1, 3])
  })

  it('subject_min_asc 按条目最小 id 升序, 无条目的角色排最后', () => {
    const result = sortByOuterOrder(
      [voice(1, [30]), voice(2, [10, 20]), voice(3)],
      'subject_min_asc'
    )
    expect(result.map(item => item.id)).toEqual([2, 1, 3])
  })

  it('不修改原数组', () => {
    const list = [voice(2), voice(1)]
    sortByOuterOrder(list, 'id_asc')
    expect(list.map(item => item.id)).toEqual([2, 1])
  })
})
