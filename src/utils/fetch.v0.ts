/*
 * @Author: czy0729
 * @Date: 2022-01-30 22:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-10 15:48:25
 */
import dayjs from 'dayjs'
import axios from '@utils/thirdParty/axios'
import { getTimestamp, urlStringify } from '@utils'
import { safe, queue } from '@utils/fetch'
import { APP_ID, UA } from '@constants/constants'
import {
  Collection as SubjectCollection,
  CollectionStatusValue,
  DeepPartial,
  Images,
  ListEmpty,
  Rating,
  SubjectId,
  SubjectTypeValue,
  UrlSubject,
  UserId
} from '@types'
import { getUserStoreAsync } from './async'

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
  collection: SubjectCollection
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
    subject: {
      id: SubjectId
      url: UrlSubject
      type: SubjectTypeValue
      name: string
      name_cn: string
      summary: string
      eps: number
      eps_count: number
      air_date: string
      air_weekday: number
      images: Images
    }
    collection: {
      doing: number
    }
  }>
>

const HOST_API_V0 = 'https://api.bgm.tv/v0'

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

export async function fetchCollectionV0(config: {
  userId: UserId
}): Promise<UserCollection> {
  const data: UserCollection = {
    list: [],
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _loaded: getTimestamp()
  }

  try {
    const collection = await request<Collection>(
      `${HOST_API_V0}/users/${config.userId}/collections?subject_type=2&type=3&limit=100`
    )

    if (Array.isArray(collection?.data)) {
      const fetchs = []
      collection.data.forEach((item, index) => {
        fetchs.push(async () => {
          const subject = await request<Subject>(
            `${HOST_API_V0}/subjects/${item.subject_id}`
          )
          if (subject?.id) {
            const cItem = collection.data[index]
            data.list.push({
              name: subject.name_cn || subject.name,
              subject_id: subject.id,
              ep_status: cItem.ep_status,
              vol_status: cItem.vol_status,
              lasttouch: dayjs(cItem.updated_at).valueOf() / 1000,
              subject: {
                id: subject.id,
                url: `//lain.bgm.tv/subject/${subject.id}`,
                type: cItem.subject_type,
                name: subject.name,
                name_cn: subject.name_cn,
                summary: '', // subject.summary
                eps: subject.eps,
                eps_count: subject.total_episodes,
                air_date: subject.date,
                air_weekday: dayjs(subject.date).day() || 0,
                images: subject.images
              },
              collection: {
                doing: subject.collection.doing
              }
            })
            return true
          }
          return false
        })
      })

      await queue(fetchs)
    }
    return data
  } catch (error) {
    return data
  }
}
