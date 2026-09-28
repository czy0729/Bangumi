/*
 * @Author: czy0729
 * @Date: 2026-09-28 20:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 20:00:00
 *
 * OSS 条目快照提炼: info 正则提取日期 (tag 兜底), staff 提取原作与导演 (职位降级)
 */
import { fixedSubjectInfo } from '@utils/app/helpers'
import { pick } from '@utils/utils'

import type { OssSubject } from '../types'

/** 快照拉取时选择保留的原始字段 (展示字段为提炼产出) */
export const OSS_SUBJECT_PICKER = [
  'name',
  'name_cn',
  'image',
  'rank',
  'rating',
  'totalEps',
  'info',
  'staff',
  'tags'
] as const

/** 从 OSS 快照提炼展示字段, 中间字段 info / tags / staff 提炼后删除 */
export function normalizeOssSubject(item: OssSubject, timestamp: number): OssSubject {
  const entry: OssSubject = pick(item, [...OSS_SUBJECT_PICKER])

  if (entry.info) {
    entry.date =
      fixedSubjectInfo(entry.info).match(
        /<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/
      )?.[2] || ''
  }
  delete entry.info

  if (!entry.date && Array.isArray(entry.tags)) {
    const find = entry.tags.find(tag => /^\d+年\d+月$/.test(tag.name))
    if (find) {
      entry.date = find.name
    } else {
      const findYear = entry.tags.find(tag => /^\d{4}$/.test(tag.name))
      if (findYear) entry.date = findYear.name
    }
  }
  delete entry.tags

  if (Array.isArray(entry.staff)) {
    const { staff } = entry

    // 原作
    const origin = staff.find(item => item.desc === '原作')
    entry.origin = origin?.name || origin?.nameJP || ''

    // 导演
    let director = staff.find(item => item.desc === '导演')
    entry.director = director?.name || director?.nameJP || ''

    if (!entry.director) {
      director = staff.find(
        item => item.desc === '作者' || item.desc === '开发' || item.desc === '音乐'
      )
      entry.director = director?.name || director?.nameJP || ''
    }
  }
  delete entry.staff

  entry._loaded = timestamp
  return entry
}
