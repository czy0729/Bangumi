/*
 * @Author: czy0729
 * @Date: 2026-08-25 01:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 20:53:02
 */
import { systemStore, userStore } from '@stores'
import { desc, getTimestamp, lastDate } from '@utils'
import { HOST, HOST_NAME, IMG_INFO_ONLY, URL_DEFAULT_AVATAR } from '@constants'
import { SORT_RELATION_DESC } from '../ds'

import type { BoardItem, ReviewsItem } from '@stores/rakuen/types'
import type { SubjectFromHtmlRelationsItem } from '@stores/subject/types'
import type { DeepReadonly } from '@types'
import type { CrtMapSource, PersonsMapSource, StaffMapSource } from '../../types'

/** 转换关联人物数据格式 */
export function mapCrt(list: CrtMapSource) {
  return list.map(({ id, images, name, name_cn, role_name, actors = [] }) => ({
    id,
    image: images?.grid || IMG_INFO_ONLY,
    _image: images?.medium || IMG_INFO_ONLY,
    name: name_cn || name,
    nameJP: name,
    desc: actors[0]?.name || role_name,
    roleName: role_name,
    actorId: actors[0]?.id
  }))
}

/** 转换制作人员数据格式 */
export function mapStaff(list: StaffMapSource) {
  return list.map(({ id, images, name, name_cn: nameCn, jobs = [] }) => ({
    id,
    image: images?.grid || IMG_INFO_ONLY,
    _image: images?.medium || IMG_INFO_ONLY,
    name: nameCn || name,
    nameJP: name,
    desc: jobs[0]
  }))
}

/** 转换网页抓取的人员数据格式 */
export function mapPersons(list: PersonsMapSource) {
  return list.map(item => ({
    id: item.id.replace('/person/', ''),
    image: item.cover || IMG_INFO_ONLY,
    _image: item.cover || IMG_INFO_ONLY,
    name: (item.nameCn || item.name).trim(),
    nameJP: item.name.trim(),
    desc: item.position
  }))
}

/** 获取关联条目排序权重, 未收录的类型返回 0 */
function getRelationSortWeight(str: string): number {
  const weight = SORT_RELATION_DESC[str as keyof typeof SORT_RELATION_DESC]
  return typeof weight === 'number' ? weight : 0
}

/** 转换关联条目数据格式并排序 */
export function mapRelations(list: readonly SubjectFromHtmlRelationsItem[]) {
  return list
    .map(item => ({
      id: item.id,
      image: item.image,
      name: item.title,
      desc: item.type
    }))
    .sort((a, b) => desc(getRelationSortWeight(a.desc), getRelationSortWeight(b.desc)))
}

/** 按类型查找关联条目 */
export function findRelationByType<T extends { type?: string; title?: string }>(
  list: readonly T[],
  type: string
): T | undefined {
  return list.find(item => item.type === type)
}

/** 按优先级查找关联条目 */
export function findRelationByTypes<T extends { type?: string; title?: string }>(
  list: readonly T[],
  types: readonly string[]
): T | undefined {
  for (const type of types) {
    const find = list.find(item => item.type === type)
    if (find) return find
  }
  return undefined
}

/** 转换 reviews 数据为 blog 格式 */
export function mapReviewsToBlog(list: readonly ReviewsItem[]) {
  return list.map(item => ({
    dateline: item.time,
    id: Number(item.id),
    image: '',
    replies: Number((item.replies || '').replace('+', '') || 0),
    summary: item.content,
    timestamp: getTimestamp(item.time),
    title: item.title,
    url: `//${HOST_NAME}/blog/${item.id}`,
    user: {
      avatar: {
        large: item.avatar,
        medium: item.avatar,
        small: item.avatar
      },
      id: item.userId,
      nickname: item.userName,
      sign: '',
      url: `//${HOST_NAME}/user/${item.userId}` as const,
      username: item.userId
    }
  }))
}

/** 转换 board 数据为 topic 格式 */
export function mapBoardToTopic(list: DeepReadonly<BoardItem[]>, subjectId: string | number) {
  return list.map(item => ({
    id: Number((item.href || '').replace('/subject/topic/', '')),
    lastpost: 0,
    main_id: subjectId,
    replies: Number((item.replies || '').replace(' replies', '')),
    timestamp: getTimestamp(item.time),
    title: item.title,
    url: `${HOST}${item.href}`,
    user: {
      avatar: {
        large: '',
        medium: '',
        small: ''
      },
      id: item.userId,
      nickname: item.userName,
      sign: '',
      url: `//${HOST_NAME}/user/${item.userId}` as const,
      username: item.userId
    }
  }))
}

/** 按优先级从 staff 中查找原作 */
export function findOriginArtist(staff: readonly { desc: string; name: string; nameJP: string }[]) {
  const priority = ['作者', '原作', '艺术家', '开发'] as const
  for (const desc of priority) {
    const find = staff.find(item => item.desc === desc)
    if (find) return find.nameJP || find.name || ''
  }
  return ''
}

/** 过滤包含默认头像的项 */
export function filterDefaultAvatar<T extends { avatar?: string }>(list: readonly T[]) {
  const shouldFilter = systemStore.setting.filterDefault || userStore.isLimit
  if (!shouldFilter) return list
  return list.filter(item => !item.avatar?.includes?.(URL_DEFAULT_AVATAR))
}

/** 过滤包含默认头像的用户项（嵌套 user.avatar.small 结构） */
export function filterUserAvatar<T extends { user?: { avatar?: { small?: string } } }>(
  list: readonly T[]
) {
  return list.filter(item => !item?.user?.avatar?.small?.includes?.(URL_DEFAULT_AVATAR))
}

/**
 * 过滤留言列表
 *  - 主动设置屏蔽默认头像用户相关信息
 *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户
 */
export function filterSubjectComments<T extends { avatar?: string; star?: string | number }>(
  list: T[],
  filterScores: (string | number)[]
) {
  const { showComment } = systemStore.setting
  if (!showComment || showComment === -1) return []

  const shouldFilterDefault = systemStore.setting.filterDefault || userStore.isLimit
  const hasScoreFilter = filterScores.length > 0
  if (!shouldFilterDefault && !hasScoreFilter) return list

  return list.filter(item => {
    if (shouldFilterDefault && item.avatar?.includes(URL_DEFAULT_AVATAR)) return false
    if (hasScoreFilter) {
      const score = Number(item.star)
      return score >= Number(filterScores[0]) && score <= Number(filterScores[1])
    }
    return true
  })
}

/** 合并好友动态列表 (在看 + 看过), 按时间排序取前 16 条 */
export function mapFriendsRating(
  doings: readonly {
    id: string | number
    time?: string
    avatar?: string
    star?: string | number
    name?: string
  }[],
  collections: readonly {
    id: string | number
    time?: string
    avatar?: string
    star?: string | number
    name?: string
  }[],
  action: string
) {
  const doingsWithTag = doings.map(item => ({ ...item, _isDone: false }))
  const collectionsWithTag = collections.map(item => ({ ...item, _isDone: true }))
  const combinedList = [...doingsWithTag, ...collectionsWithTag]

  return combinedList
    .sort((a, b) => getTimestamp(b.time) - getTimestamp(a.time))
    .slice(0, 16)
    .map(item => {
      const ts = getTimestamp(item.time)
      const actionText = item._isDone ? `${action}过` : action
      return {
        userId: item.id,
        name: item.name,
        avatar: item.avatar,
        star: item.star,
        status: `${lastDate(ts)}在${actionText}`
      }
    })
}

/** 提取菜单项名称 */
export function mapNames(list: readonly (string | { name: string })[]) {
  return list.map(item => (typeof item === 'object' ? item.name : item))
}
