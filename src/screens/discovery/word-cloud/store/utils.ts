/*
 * @Author: czy0729
 * @Date: 2024-09-29 18:22:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:42:56
 */
import { cnjp, HTMLDecode, removeHTMLTag, t2s } from '@utils'
import { SubjectId, SubjectType } from '@types'
import { CutList, CutType, SnapshotSubjectsItem } from '../types'
import { FILTER_CV, FILTER_TAGS } from './ds'

export function getPlainText(str: string, max?: number) {
  if (!str || typeof str !== 'string') return str

  str = HTMLDecode(removeHTMLTag(str, false))
  if (max) str = str.slice(0, max)

  return str
}

export function removeSlogan(str: string, max?: number) {
  if (!str || typeof str !== 'string') return str

  str = str.split('[来自Bangumi')?.[0] || ''
  str = str.replace(/删除了回复/g, '')

  if (max) str = str.slice(0, max)

  return str
}

export function removeSpec(str: string) {
  if (!str || typeof str !== 'string') return str

  return (
    str
      // 链接
      .replace(/https?:\/\/[^\s]+|www\.[^\s]+/g, '')

      // 特殊字符, 如 emoji
      .replace(/x[a-zA-Z0-9]{5}/g, '')

      // 特殊残留字符
      .replace(/&#;/g, '')
  )
}

const staffSet = new Set([
  '原作',
  '导演',
  '编剧',
  '开发',
  '发行',
  '作者',
  '出版社',
  '艺术家',
  '主演'
])

export function getSubjectCutList(
  cutType: CutType = '标签',
  subjectIds: SubjectId[] = [],
  subjectType: SubjectType = 'anime',
  subjects: Record<SubjectId, SnapshotSubjectsItem> = {}
) {
  const temp: Record<string, number> = {}
  subjectIds.forEach(item => {
    const subject = subjects[item]
    if (subject) {
      if (cutType === '标签') {
        subject.tags?.forEach(i => {
          if (
            !i.name ||
            Number(i.count) <= (subjectType === 'anime' ? 20 : 5) ||
            (subjectType === 'anime' && /^\d{4}(年)?$/.test(i.name)) ||
            (subjectType === 'book' && /社$/.test(i.name)) ||
            FILTER_TAGS.includes(i.name)
          ) {
            return
          }

          const name = t2s(i.name)
          const value = i.meta ? 2 : 1
          if (temp[name]) {
            temp[name] += value
          } else {
            temp[name] = value
          }
        })
      } else if (cutType === '制作人员') {
        subject.staff?.forEach(i => {
          const name = cnjp(i.name || i.nameJP, i.nameJP || i.name)
          if (
            !name ||
            (subjectType === 'book' && (i.desc?.includes('出版社') || i.desc?.includes('杂志')))
          ) {
            return
          }

          const value = staffSet.has(i.desc) ? 2 : 1
          if (temp[name]) {
            temp[name] += value
          } else {
            temp[name] = value
          }
        })
      } else if (cutType === '声优') {
        subject.character?.forEach(i => {
          if (!i.desc || FILTER_CV.includes(i.desc)) return

          const name = i.desc
          if (temp[name]) {
            temp[name] += 1
          } else {
            temp[name] = 1
          }
        })
      } else if (cutType === '排名') {
        const { rank } = subject
        let name = ''
        if (rank) {
          if (rank <= 100) {
            name = ' 前百 '
          } else if (rank < 1000) {
            name = String(` ${Math.floor(rank / 100)}百 `)
          } else {
            name = String(` ${Math.floor(rank / 1000)}千 `)
          }
        } else {
          name = ' N/A '
        }

        if (temp[name]) {
          temp[name] += 1
        } else {
          temp[name] = 1
        }
      }
    }
  })

  const list: CutList = Object.entries(temp)
    .filter(item => item[1] > 1)
    .sort((a, b) => Number(b[1] || 0) - (Number(a[1]) || 0))
    .filter((_, index) => index < (cutType === '标签' ? 60 : 40))
    .map(([key, value]) => [key, String(value)])

  return list
}
