/*
 * @Author: czy0729
 * @Date: 2026-05-09 21:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 21:43:27
 */
import type { MonoVoicesItem, MonoVoicesSubjectItem } from '@stores/subject/types'

/** 获取条目ID最大值 */
function getMaxSubjectId(subjects: MonoVoicesSubjectItem[]) {
  if (!subjects?.length) return 0
  return Math.max(...subjects.map(s => Number(s.id)))
}

/** 获取条目ID最小值 */
function getMinSubjectId(subjects: MonoVoicesSubjectItem[]) {
  if (!subjects?.length) return Infinity
  return Math.min(...subjects.map(s => Number(s.id)))
}

/** 对条目数组排序 */
export function sortSubjects(subjects: MonoVoicesSubjectItem[], order: string) {
  if (!order || !subjects?.length) return subjects

  return [...subjects].sort((a, b) => {
    switch (order) {
      case 'id_desc':
        return Number(b.id) - Number(a.id)
      case 'id_asc':
        return Number(a.id) - Number(b.id)
      default:
        return 0
    }
  })
}

/** 按外层排序规则对角色数组排序 */
export function sortByOuterOrder(list: MonoVoicesItem[], order: string) {
  return [...list].sort((a, b) => {
    switch (order) {
      case 'id_desc':
        return Number(b.id) - Number(a.id)
      case 'id_asc':
        return Number(a.id) - Number(b.id)
      case 'subject_max_desc': {
        const maxA = getMaxSubjectId(a.subject)
        const maxB = getMaxSubjectId(b.subject)
        return maxB - maxA
      }
      case 'subject_min_asc': {
        const minA = getMinSubjectId(a.subject)
        const minB = getMinSubjectId(b.subject)
        return minA - minB
      }
      default:
        return 0
    }
  })
}
