/*
 * API v0 接口
 *  - https://bangumi.github.io/api
 *
 * @Author: czy0729
 * @Date: 2022-01-30 22:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-04 13:28:25
 */
import dayjs from 'dayjs'
import { getTimestamp } from '@utils'
import { API_V0 } from '@constants/api'
import { HOST } from '@constants/constants'
import { syncSystemStore } from '../async'
import { request } from './utils'
import { API_COLLECTION, API_COLLECTIONS, API_EPS_COLLECTION, API_ME, API_USERS } from './ds'

export { request }

import type {
  Subject as BaseSubject,
  CollectionStatusValue,
  SubjectId,
  SubjectType,
  UserId
} from '@types'
import type {
  Collection,
  CollectionItem,
  RequestConfig,
  UserCollection,
  UserCollectionItem,
  Users
} from './types'

/**
 * 获取条目信息, 测试中的新 API 接口
 * 旧版接口不再返回 NSFW 条目信息, 但是新版也不返回用户相关信息
 * */
export async function fetchSubjectV0(config: { url: string }) {
  const subjectId = Number(config.url.split('/subject/')[1])
  const subject = await request<any>(`${API_V0}/subjects/${subjectId}`)
  const eps = await request<any>(`${API_V0}/episodes?subject_id=${subjectId}`)
  const data = {
    id: subjectId,
    url: `${HOST}/subject/${subjectId}` as const,
    type: subject?.type,
    name: subject?.name,
    name_cn: subject?.name_cn,
    summary: subject?.summary,
    eps: eps?.data || [],
    eps_count: subject?.eps,
    air_date: subject?.date,
    // air_weekday: 2,
    rating: subject?.rating,
    rank: subject?.rating?.rank,
    images: subject?.images,
    collection: subject?.collection,

    /** 角色可以从 v0 接口里面获取 */
    crt: [],

    /** 职员可以从 v0 接口里面获取 */
    staff: [],

    /** 评论属于用户相关信息, v0 接口不再提供, 需要根据 v0 表示自行从别的地方获取 */
    blog: [],

    /** 讨论版属于用户相关信息, v0 接口不再提供, 需要根据 v0 表示自行从别的地方获取 */
    topic: [],

    /** 使用了兜底接口的标识 */
    v0: true
  }

  try {
    const crt = await request<any[]>(`${API_V0}/subjects/${subjectId}/characters`)
    const staff = await request<any[]>(`${API_V0}/subjects/${subjectId}/persons`)
    data.crt = (crt || []).map(item => ({
      ...item,
      id: item.id,
      images: item.images,
      name: item.name,
      name_cn: item.name_cn,
      role_name: item.relation
    }))
    data.staff = (staff || []).map(item => ({
      ...item,
      id: item.id,
      images: item.images,
      name: item.name,
      name_cn: item.name_cn,
      role_name: item.relation
    }))
  } catch {}

  return data
}

/** 获取所有类型的在看收藏 */
async function fetchCollectionAll(
  userId: UserId,
  includeTypes: SubjectType[] = ['anime', 'book', 'real'],
  type: CollectionStatusValue = '3',
  config?: RequestConfig
) {
  const all: Collection['data'] = []

  let temp: Collection

  // 动画请求最多 3 页
  if (includeTypes.includes('anime')) {
    temp = await request<Collection>(API_COLLECTIONS(userId, '2', 1, 100, type), null, config)
    if (Array.isArray(temp?.data)) all.push(...temp.data)

    // 高级会员才开放 3 页
    const systemStore = syncSystemStore()
    if (systemStore.advance) {
      if (temp?.total > 100) {
        temp = await request<Collection>(API_COLLECTIONS(userId, '2', 2, 100, type), null, config)
        if (Array.isArray(temp?.data)) all.push(...temp.data)
      }

      if (temp?.total > 200) {
        temp = await request<Collection>(API_COLLECTIONS(userId, '2', 3, 100, type), null, config)
        if (Array.isArray(temp?.data)) all.push(...temp.data)
      }
    }
  }

  // 书籍 1 页
  if (includeTypes.includes('book')) {
    temp = await request<Collection>(API_COLLECTIONS(userId, '1', 1, 100, type), null, config)
    if (Array.isArray(temp?.data)) all.push(...temp.data)
  }

  // 三次元 1 页
  if (includeTypes.includes('real')) {
    temp = await request<Collection>(API_COLLECTIONS(userId, '6', 1, 100, type), null, config)
    if (Array.isArray(temp?.data)) all.push(...temp.data)
  }

  return all
}

/** 获取用户 [在看] 收藏 */
export async function fetchCollectionV0(
  userId: UserId,
  includeTypes: SubjectType[] = ['anime', 'book', 'real'],
  type: CollectionStatusValue = '3',
  config?: RequestConfig
): Promise<UserCollection> {
  const data: UserCollection = {
    list: [],
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _loaded: getTimestamp()
  }

  try {
    const all = await fetchCollectionAll(userId, includeTypes, type, config)
    if (all.length) {
      all.forEach((_item, index) => {
        const cItem = all[index]
        const subject: BaseSubject = {
          id: cItem.subject_id,
          url: `//lain.bgm.tv/subject/${cItem.subject_id}`,
          type: cItem.subject_type,
          name: cItem.subject.name,
          name_cn: cItem.subject.name_cn,
          summary: '',
          eps: cItem.subject.eps,
          eps_count: cItem.subject.total_episodes || cItem.subject.eps,
          air_date: cItem.subject.date,
          air_weekday: dayjs(cItem.subject.date).day() || 0,
          images: cItem.subject.images,
          collection: cItem.subject.collection
        }
        data.list.push({
          name: subject.name_cn || subject.name,
          subject_id: subject.id,
          ep_status: cItem.ep_status,
          vol_status: cItem.vol_status,
          lasttouch: dayjs(cItem.updated_at).valueOf() / 1000,
          subject
        })
      })
    }
  } catch {}

  return data
}

/** 获取用户单个条目收藏信息 */
export async function fetchCollectionSingleV0(
  userId: UserId,
  subjectId: SubjectId
): Promise<UserCollectionItem> {
  try {
    const cItem = await request<CollectionItem>(API_COLLECTION(userId, subjectId))
    const subject: BaseSubject = {
      id: cItem.subject.id,
      url: `//lain.bgm.tv/subject/${cItem.subject.id}`,
      type: cItem.subject_type,
      name: cItem.subject.name,
      name_cn: cItem.subject.name_cn,
      summary: '',
      eps: cItem.subject.eps,
      eps_count: cItem.subject.total_episodes,
      air_date: cItem.subject.date,
      air_weekday: dayjs(cItem.subject.date).day() || 0,
      images: cItem.subject.images,
      collection: cItem.subject.collection
    }

    return {
      name: subject.name_cn || subject.name,
      subject_id: subject.id,
      type: cItem.type,
      ep_status: cItem.ep_status,
      vol_status: cItem.vol_status,
      lasttouch: dayjs(cItem.updated_at).valueOf() / 1000,
      subject
    }
  } catch {
    return null
  }
}

/** 获取用户信息 (需登录) */
export async function fetchMeV0() {
  try {
    return request(API_ME())
  } catch {
    return null
  }
}

/** 获取用户条目章节收藏状态 (需登录) */
export async function fetchUserProgressV0(subjectId: SubjectId) {
  try {
    return request(API_EPS_COLLECTION(subjectId))
  } catch {
    return null
  }
}

/** 获取用户信息 */
export async function fetchUsersV0(userId: UserId, config?: RequestConfig) {
  try {
    return request<Users>(API_USERS(userId), null, config)
  } catch {
    return null
  }
}
