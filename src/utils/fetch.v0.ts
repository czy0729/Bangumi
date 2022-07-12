/*
 * @Author: czy0729
 * @Date: 2022-01-30 22:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-12 17:25:07
 */
import dayjs from 'dayjs'
import axios from '@utils/thirdParty/axios'
import { getTimestamp, urlStringify } from '@utils'
import { safe, queue } from '@utils/fetch'
import { APP_ID, UA } from '@constants/constants'
import {
  Collection as BaseCollection,
  CollectionStatusValue,
  DeepPartial,
  Images,
  ListEmpty,
  Rating,
  Subject as BaseSubject,
  SubjectId,
  SubjectTypeValue,
  UserId
} from '@types'
import { getUserStoreAsync } from './async'
import { devLog } from '@components'

type Collection = {
  data: {
    updated_at: string
    comment: string
    tags: string[]
    subject_id: SubjectId
    ep_status: number
    vol_status: number
    subject_type: SubjectTypeValue
    type: CollectionStatusValue
    rate: number
    private: boolean
  }[]
  total: number
  limit: number
  offset: number
}

type Subject = {
  date: string
  platform: string
  images: Images
  summary: string
  name: string
  name_cn: string
  tags: {
    name: string
    count: number
  }[]
  infobox: any[]
  rating: Rating
  total_episodes: number
  collection: BaseCollection
  id: SubjectId
  eps: number
  volumes: number
  locked: boolean
  nsfw: boolean
  type: CollectionStatusValue
}

type UserCollection = ListEmpty<
  DeepPartial<{
    name: string
    subject_id: SubjectId
    ep_status: number
    vol_status: number
    lasttouch: number
    subject: BaseSubject
  }>
>

const HOST_API_V0 = 'https://api.bgm.tv/v0'

const API_COLLECTION = (
  userId: UserId,
  subjectType: SubjectTypeValue,
  page = 1,
  limit = 100
) =>
  `${HOST_API_V0}/users/${userId}/collections?subject_type=${subjectType}&type=3&${limit}=100&offset=${
    (page - 1) * limit
  }` as const

export async function request<T>(url: string, data?: object): Promise<T> {
  // @ts-ignore
  axios.defaults.withCredentials = false

  try {
    const { accessToken } = getUserStoreAsync()

    // 随机数防止接口CDN缓存
    url += `${url.includes('?') ? '&' : '?'}${urlStringify({
      app_id: APP_ID,
      state: getTimestamp()
    })}`

    const method = typeof data === 'object' ? 'post' : 'get'
    const config: any = {
      method,
      url,
      headers: {
        Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        'User-Agent': UA
      }
    }
    if (method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = urlStringify(data)
    }

    // @ts-ignore
    const { data: responseData } = await axios(config)
    return safe(responseData) as T
  } catch (ex) {
    return {} as T
  }
}

export async function fetchSubjectV0(config) {
  const subjectId = Number(config.url.split('/subject/')[1])
  const subject = await request<any>(`${HOST_API_V0}/subjects/${subjectId}`)
  const eps = await request<any>(`${HOST_API_V0}/episodes?subject_id=${subjectId}`)

  const data = {
    id: subjectId,
    url: `https://bgm.tv/subject/${subjectId}`,
    type: subject.type,
    name: subject.name,
    name_cn: subject.name_cn,
    summary: subject.summary,
    eps: eps?.data || [],
    eps_count: subject.eps,
    air_date: subject.date,
    // air_weekday: 2,
    rating: subject.rating,
    rank: subject.rating.rank,
    images: subject.images,
    collection: subject.collection,
    crt: [],
    staff: [],
    blog: [],
    topic: []
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

/** 缓存条目请求结果 */
const COLLECTION_SUBJECT_CACHE: {
  [subjectId: SubjectId]: BaseSubject
} = {}

/** 获取在看收藏 */
export async function fetchCollectionV0(args: {
  userId: UserId
}): Promise<UserCollection> {
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
    const all = []

    // 动画请求最多2页
    let collection = await request<Collection>(API_COLLECTION(userId, '2'))
    if (Array.isArray(collection?.data)) all.push(...collection.data)

    if (collection?.total > 100) {
      collection = await request<Collection>(API_COLLECTION(userId, '2', 2))
      if (Array.isArray(collection?.data)) all.push(...collection.data)
    }

    // 书籍1页
    collection = await request<Collection>(API_COLLECTION(userId, '1'))
    if (Array.isArray(collection?.data)) all.push(...collection.data)

    // 三次元1页
    collection = await request<Collection>(API_COLLECTION(userId, '6'))
    if (Array.isArray(collection?.data)) all.push(...collection.data)

    if (all.length) {
      const fetchs = []
      all.forEach((item, index) => {
        fetchs.push(async () => {
          const cItem = all[index]

          // 有缓存就不请求
          if (COLLECTION_SUBJECT_CACHE[item.subject_id]) {
            const subject = COLLECTION_SUBJECT_CACHE[item.subject_id]
            data.list.push({
              name: subject.name_cn || subject.name,
              subject_id: subject.id,
              ep_status: cItem.ep_status,
              vol_status: cItem.vol_status,
              lasttouch: dayjs(cItem.updated_at).valueOf() / 1000,
              subject
            })
          } else {
            const subject = await request<Subject>(
              `${HOST_API_V0}/subjects/${item.subject_id}`
            )

            if (subject?.id) {
              const _subject: BaseSubject = {
                id: subject.id,
                url: `//lain.bgm.tv/subject/${subject.id}`,
                type: cItem.subject_type,
                name: subject.name,
                name_cn: subject.name_cn,
                summary: '',
                eps: subject.eps,
                eps_count: subject.total_episodes,
                air_date: subject.date,
                air_weekday: dayjs(subject.date).day() || 0,
                images: subject.images,
                collection: subject.collection
              }

              // 缓存条目结果
              COLLECTION_SUBJECT_CACHE[item.subject_id] = _subject
              data.list.push({
                name: _subject.name_cn || _subject.name,
                subject_id: _subject.id,
                ep_status: cItem.ep_status,
                vol_status: cItem.vol_status,
                lasttouch: dayjs(cItem.updated_at).valueOf() / 1000,
                subject: _subject
              })
              return true
            }
          }

          return false
        })
      })

      devLog(`fetchs: ${fetchs.length}`)
      await queue(fetchs)
    }
    return data
  } catch (error) {
    return data
  }
}
