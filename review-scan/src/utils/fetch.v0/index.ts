/*
 * @Doc: https://bangumi.github.io/api
 * @Author: czy0729
 * @Date: 2022-01-30 22:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 20:33:17
 */
import dayjs from 'dayjs'
import { getTimestamp } from '@utils'
import { Subject as BaseSubject, SubjectId, UserId } from '@types'
import { syncSystemStore } from '../async'
import { request } from './utils'
import { API_COLLECTION, API_COLLECTIONS, API_EPS_COLLECTION, API_ME, HOST_API_V0 } from './ds'
import { Collection, CollectionItem, UserCollection, UserCollectionItem } from './types'

export { HOST_API_V0, request }

/**
 * 获取条目信息, 测试中的新 API 接口
 * 旧版接口不再返回 NSFW 条目信息, 但是新版也不返回用户相关信息
 * */
export async function fetchSubjectV0(config: { url: string }) {
  const subjectId = Number(config.url.split('/subject/')[1])
  const subject = await request<any>(`${HOST_API_V0}/subjects/${subjectId}`)
  const eps = await request<any>(`${HOST_API_V0}/episodes?subject_id=${subjectId}`)
  const data = {
    id: subjectId,
    url: `https://bgm.tv/subject/${subjectId}`,
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
    const crt = await request<any[]>(`${HOST_API_V0}/subjects/${subjectId}/characters`)
    const staff = await request<any[]>(`${HOST_API_V0}/subjects/${subjectId}/persons`)
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

    return data
  } catch (error) {
    return data
  }
}

/** 获取所有类型的在看收藏 */
async function fetchCollectionAll(userId: UserId) {
  const all: Collection['data'] = []

  // 动画请求最多 3 页
  let collection = await request<Collection>(API_COLLECTIONS(userId, '2'))
  if (Array.isArray(collection?.data)) all.push(...collection.data)

  // 高级会员才开放 3 页
  const systemStore = syncSystemStore()
  if (systemStore.advance) {
    if (collection?.total > 100) {
      collection = await request<Collection>(API_COLLECTIONS(userId, '2', 2))
      if (Array.isArray(collection?.data)) all.push(...collection.data)
    }

    if (collection?.total > 200) {
      collection = await request<Collection>(API_COLLECTIONS(userId, '2', 3))
      if (Array.isArray(collection?.data)) all.push(...collection.data)
    }
  }

  // 书籍 1 页
  collection = await request<Collection>(API_COLLECTIONS(userId, '1'))
  if (Array.isArray(collection?.data)) all.push(...collection.data)

  // 三次元 1 页
  collection = await request<Collection>(API_COLLECTIONS(userId, '6'))
  if (Array.isArray(collection?.data)) all.push(...collection.data)

  return all
}

/** 获取在看收藏 */
export async function fetchCollectionV0(args: { userId: UserId }): Promise<UserCollection> {
  const { userId } = args || {}
  const data: UserCollection = {
    list: [],
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _loaded: getTimestamp()
  }

  try {
    const all = await fetchCollectionAll(userId)
    // devLog(`fetchv0 | all.length: ${all.length}`)

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

      // const fetchs = []
      // const cache = await get('collectionSubject')
      // all.forEach((item, index) => {
      //   fetchs.push(async () => {
      //     const cItem = all[index]

      //     // 有缓存就不请求
      //     if (cache[item.subject_id]) {
      //       const subject = cache[item.subject_id]
      //       data.list.push({
      //         name: subject.name_cn || subject.name,
      //         subject_id: subject.id,
      //         ep_status: cItem.ep_status,
      //         vol_status: cItem.vol_status,
      //         lasttouch: dayjs(cItem.updated_at).valueOf() / 1000,
      //         subject: omit(subject, ['_loaded'])
      //       })
      //     } else {
      //       const subject = await request<Subject>(
      //         `${HOST_API_V0}/subjects/${item.subject_id}`
      //       )
      //       devLog(`fetchv0 | fetch subject: ${item.subject_id}`)

      //       if (subject?.id) {
      //         const _subject: BaseSubject = {
      //           id: subject.id,
      //           url: `//lain.bgm.tv/subject/${subject.id}`,
      //           type: cItem.subject_type,
      //           name: subject.name,
      //           name_cn: subject.name_cn,
      //           summary: '',
      //           eps: subject.eps,
      //           eps_count: subject.total_episodes,
      //           air_date: subject.date,
      //           air_weekday: dayjs(subject.date).day() || 0,
      //           images: subject.images,
      //           collection: subject.collection
      //         }

      //         // 缓存条目结果
      //         cache[item.subject_id] = {
      //           ..._subject,
      //           _loaded: getTimestamp()
      //         }
      //         data.list.push({
      //           name: _subject.name_cn || _subject.name,
      //           subject_id: _subject.id,
      //           ep_status: cItem.ep_status,
      //           vol_status: cItem.vol_status,
      //           lasttouch: dayjs(cItem.updated_at).valueOf() / 1000,
      //           subject: _subject
      //         })
      //         return true
      //       } else {
      //         devLog(`fetchv0 | no subject id: ${item.subject_id}`)
      //       }
      //     }

      //     return false
      //   })
      // })

      // devLog(`fetchv0 | fetch subjects: ${fetchs.length}`)
      // await queue(fetchs)
      // set('collectionSubject', cache)
    }
    return data
  } catch (error) {
    return data
  }
}

/** 获取在看收藏 */
export async function fetchCollectionSingleV0(args: {
  subjectId: SubjectId
  userId: UserId
}): Promise<UserCollectionItem> {
  const { subjectId, userId } = args || {}
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
  } catch (error) {
    return null
  }
}

/** 获取登录用户信息 */
export async function fetchMeV0() {
  try {
    return request(API_ME())
  } catch (error) {
    return null
  }
}

/** 获取登录用户条目章节收藏状态 */
export async function fetchUserProgressV0(args: { subjectId: SubjectId }) {
  const { subjectId } = args || {}
  try {
    return request(API_EPS_COLLECTION(subjectId))
  } catch (error) {
    return null
  }
}
