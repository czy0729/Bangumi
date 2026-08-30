/*
 * @Author: czy0729
 * @Date: 2024-09-29 18:22:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:34:39
 */
import { cnjp, HTMLDecode, removeHTMLTag, t2s } from '@utils'
import { FILTER_CV, FILTER_TAGS } from './ds'

import type { Id, SubjectId, SubjectType, UserId } from '@types'
import type {
  CollectionsV0Item,
  CutList,
  CutType,
  SelectedCommentItem,
  SnapshotSubjectsItem
} from '../types'

/** 去除 HTML 标签后的纯文本 */
export function getPlainText(str: string, max?: number) {
  if (!str || typeof str !== 'string') return str

  str = HTMLDecode(removeHTMLTag(str, false))
  if (max) str = str.slice(0, max)

  return str
}

/** 去除 Bangumi 楼中回复的 slogan */
export function removeSlogan(str: string, max?: number) {
  if (!str || typeof str !== 'string') return str

  str = str.split('[来自Bangumi')?.[0] || ''
  str = str.replace(/删除了回复/g, '')

  if (max) str = str.slice(0, max)

  return str
}

/** 去除文本中的链接与特殊字符 */
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

/** 词频计数, 首次出现记 first (默认等于 weight), 之后每次累加 weight */
function count(
  temp: Record<string, number>,
  name: string,
  weight: number = 1,
  first: number = weight
) {
  if (temp[name]) {
    temp[name] += weight
  } else {
    temp[name] = first
  }
}

/** 映射选中的吐槽 */
export function mapSelectedComment(
  item: {
    /** 吐槽 ID */
    id: Id

    /** 头像 */
    avatar: string

    /** 用户 ID */
    userId: UserId

    /** 用户名 */
    userName: string

    /** 时间 */
    time: string
  },
  message: string,

  /** 楼层 / 操作信息 */
  action?: string
): SelectedCommentItem {
  return {
    id: item.id,
    avatar: item.avatar,
    userId: item.userId,
    userName: HTMLDecode(item.userName),
    comment: removeSlogan(getPlainText(message)),
    time: item.time,
    action
  }
}

/** 由 kv 快照重建条目数据, 剔除冗余字段; kv 未命中时值为 null, 仅合并 _loaded 避免重复请求 */
export function rebuildSnapshotSubjects(
  data: Record<string, SnapshotSubjectsItem | null | undefined>,
  now: number
): Record<SubjectId, SnapshotSubjectsItem> {
  const subjects: Record<SubjectId, SnapshotSubjectsItem> = {}
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      // 因为数据有冗余, 有必要主动重新构建
      subjects[value.id] = {
        id: value.id,
        image: typeof value.image === 'string' ? value.image : '',
        name: value.name,
        name_cn: value.name_cn,
        rank: value.rank,
        tags: value.tags,
        character: (value.character || []).map(item => ({
          id: item.id,
          name: item.name,
          nameJP: item.nameJP,
          image: typeof item.image === 'string' ? item.image : '',
          desc: item.desc,
          actorId: item.actorId
        })),
        staff: (value.staff || []).map(item => ({
          id: item.id,
          name: item.name,
          nameJP: item.nameJP,
          image: typeof item.image === 'string' ? item.image : '',
          desc: item.desc
        })),
        _loaded: now
      }
    } else {
      // 就算没有快照也需要合并, 能避免重复请求
      const subjectId = (Number(key.replace('subject_', '')) || 0) as SubjectId
      subjects[subjectId] = {
        _loaded: now
      }
    }
  })

  return subjects
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

/** 根据分词类型生成词云数据 */
export function getSubjectCutList(
  cutType: CutType = '标签',
  subCutType: string = '',
  subjectIds: readonly SubjectId[] = [],
  subjectType: SubjectType = 'anime',
  subjects: Record<SubjectId, SnapshotSubjectsItem> = {},
  collections: readonly CollectionsV0Item[]
) {
  const temp: Record<string, number> = {}
  subjectIds.forEach(item => {
    const subject = subjects[item]
    if (!subject?.id) return

    if (cutType === '标签') {
      if (subCutType === '个人') {
        collections.forEach(i => {
          i.tags.forEach(tag => {
            count(temp, t2s(tag))
          })
        })
      } else {
        subject.tags?.forEach(i => {
          if (
            !i.name ||
            (subCutType === '公共' && !i.meta) ||
            (subCutType === '排除公共' && i.meta) ||
            Number(i.count) <= (subjectType === 'anime' ? 20 : 5) ||
            (subjectType === 'anime' && /^\d{4}(年)?$/.test(i.name)) ||
            (subjectType === 'book' && /社$/.test(i.name)) ||
            FILTER_TAGS.includes(i.name)
          ) {
            return
          }

          const value = i.meta ? 2 : 1
          count(temp, t2s(i.name), value, value + 1)
        })
      }
    } else if (cutType === '制作人员') {
      subCutType = subCutType.split(' (')?.[0] || ''

      subject.staff?.forEach(i => {
        const name = cnjp(i.name || i.nameJP, i.nameJP || i.name)
        if (
          !name ||
          (subCutType && i.desc !== subCutType) ||
          (subjectType === 'book' &&
            !subCutType &&
            (i.desc?.includes('出版社') || i.desc?.includes('杂志')))
        ) {
          return
        }

        const value = staffSet.has(i.desc) ? 2 : 1
        count(temp, name, value, value + 1)
      })
    } else if (cutType === '声优') {
      subject.character?.forEach(i => {
        if (!i.desc || FILTER_CV.includes(i.desc)) return

        count(temp, i.desc)
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

      count(temp, name)
    }
  })

  const list: CutList = Object.entries(temp)
    .filter(item => item[1] > (cutType === '标签' ? 1 : 0))
    .sort((a, b) => Number(b[1] || 0) - (Number(a[1]) || 0))
    .filter((_, index) => index < (cutType === '标签' ? 64 : cutType === '制作人员' ? 56 : 48))
    .map(([key, value]) => [key, String(value)])

  return list
}
