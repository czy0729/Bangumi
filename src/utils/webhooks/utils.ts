/*
 * @Author: czy0729
 * @Date: 2023-03-10 14:02:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 10:00:00
 */
import { getMonoCoverSmall, getSubjectCoverCommon } from '../app'
import { removeHTMLTag } from '../thirdParty/html'

import type {
  Catalog,
  Group,
  RawCatalog,
  RawGroup,
  RawMono,
  RawSubject,
  RawUser,
  Subject,
  SubjectType as WebHooksSubjectType,
  User,
  WebHookDataMap
} from './types'

/** 归一化条目信息 */
export function getSubject(subject: RawSubject): Subject {
  return {
    id: Number(subject?.id || 0),
    image: getSubjectCoverCommon(subject?.images?.common || ''),
    name: subject?.name || '',
    name_cn: subject?.name_cn || '',
    type: (Number(subject?.type) || 0) as WebHooksSubjectType,
    rating: {
      rank: subject?.rank || 0,
      total: subject?.rating?.total || 0,
      score: subject?.rating?.score || 0
    },
    eps: subject?.eps_count || 0
  }
}

/** 归一化用户信息 */
export function getUserInfo(userInfo: RawUser): User {
  return {
    id: userInfo?.id || 0,
    username: userInfo?.username || '',
    avatar: userInfo?.avatar?.large || '',
    nickname: userInfo?.nickname || '',
    sign: userInfo?.sign || ''
  }
}

/** 归一化人物信息 (字段原样透传, 可能含 undefined) */
export function getMono(mono: RawMono): WebHookDataMap['mono']['mono'] {
  return {
    // 调用方保证为 person/{id} 或 character/{id} 形式
    id: mono?.id as WebHookDataMap['mono']['mono']['id'],
    name: mono?.name,
    name_cn: mono?.nameCn,
    cover: getMonoCoverSmall(mono?.cover)
  }
}

/** 归一化小组信息 */
export function getGroup(group: RawGroup): Group {
  return {
    id: group?.id || '',
    title: group?.title || '',
    content: (group?.content || '').slice(0, 40),
    cover: group?.cover || '',
    create: group?.create || ''
  }
}

/** 归一化目录信息 */
export function getCatalog(catalog: RawCatalog): Catalog {
  return {
    id: catalog?.id || '',
    title: catalog?.title || '',
    content: removeHTMLTag(catalog?.content || '', false).slice(0, 64)
  }
}
