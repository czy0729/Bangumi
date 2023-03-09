/*
 * @Author: czy0729
 * @Date: 2023-02-26 02:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 01:54:28
 */
import axios from '@utils/thirdParty/axios'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { runAfter, getTimestamp } from '../utils'
import { t } from '../track'
import {
  WebHooksTypes,
  SubjectType as WebHooksSubjectType,
  CollectionType as WebHooksCollectionType
} from './types'

/** 钩子 */
const webhook: WebHooksTypes = (type, data) => {
  if (!type) return false

  try {
    // 保证这种低优先级的操作在 UI 响应之后再执行
    runAfter(async () => {
      // @ts-expect-error
      const res = await axios({
        method: 'post',
        url: `https://postman-echo.com/post`,
        data: {
          type,
          data: data || {}
        }
      })
      console.info(JSON.stringify(res?.data?.data, null, 2))
    })
  } catch (ex) {}
}

/** 钩子: 更新收藏 */
export const webhookCollection = (
  values: {
    status?: any
    rating?: any
    comment?: any
    privacy?: any
    tags?: string
  },
  subject: any,
  userInfo: any
) => {
  const type = 'collection'
  webhook(type, {
    type: Number(
      MODEL_COLLECTION_STATUS.getTitle<WebHooksCollectionType>(values?.status)
    ) as WebHooksCollectionType,
    rate: Number(values?.rating || 0),
    comment: values?.comment || '',
    private: !!values?.privacy,
    tags: String(values?.tags || '').split(' '),
    subject: {
      id: Number(subject?.id || 0),
      image: subject?.images?.common || '',
      name: subject?.name || '',
      name_cn: subject?.name_cn || '',
      type: Number(subject?.type) as WebHooksSubjectType,
      rating: {
        rank: subject?.rank || 0,
        total: subject?.rating?.total || 0,
        score: subject?.rating?.score || 0
      },
      eps: subject?.eps_count
    },
    user: {
      id: userInfo?.id || 0,
      username: userInfo?.username || '',
      avatar: userInfo?.avatar?.large || '',
      nickname: userInfo?.nickname || '',
      sign: userInfo?.sign || ''
    },
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    subjectId: Number(subject?.id || 0),
    username: userInfo?.username || 0
  })
}

/** 钩子: 更新章节 */
export const webhookEp = (
  values: {
    id?: any
    status?: any
    batch?: boolean
    sort?: any
    vols?: any
  },
  subject: any,
  userInfo: any
) => {
  const type = 'ep'
  let ep = (subject?.eps || []).find(item => item.id === values.id)
  if (!ep) ep = (subject?.eps || []).find(item => item.sort == values.sort)

  const statusUnits = {
    queue: 1,
    watched: 2,
    drop: 3
  } as const
  webhook(type, {
    type: statusUnits[values.status] || 0,
    batch: values.batch || false,
    eps: Number(ep?.sort || values.sort) || undefined,
    vols: Number(values.vols) || undefined,
    ep: {
      id: values.id || ep?.id || 0,
      airdate: ep?.airdate || '',
      name: ep?.name || '',
      name_cn: ep?.name_cn || '',
      duration: ep?.duration || '',
      comment: ep?.comment || 0
    },
    subject: {
      id: Number(subject?.id || 0),
      image: subject?.images?.common || '',
      name: subject?.name || '',
      name_cn: subject?.name_cn || '',
      type: Number(subject?.type) as WebHooksSubjectType,
      rating: {
        rank: subject?.rank || 0,
        total: subject?.rating?.total || 0,
        score: subject?.rating?.score || 0
      },
      eps: subject?.eps_count
    },
    user: {
      id: userInfo?.id || 0,
      username: userInfo?.username || '',
      avatar: userInfo?.avatar?.large || '',
      nickname: userInfo?.nickname || '',
      sign: userInfo?.sign || ''
    },
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    subjectId: Number(subject?.id || 0),
    username: userInfo?.username || 0
  })
}

/** 钩子: 新吐槽 */
export const webhookSay = (
  values: {
    content?: any
    url?: any
  },
  userInfo: any
) => {
  const type = 'say'
  webhook(type, {
    content: values.content || '新吐槽',
    url: values.url || '',
    user: {
      id: userInfo?.id || 0,
      username: userInfo?.username || '',
      avatar: userInfo?.avatar?.large || '',
      nickname: userInfo?.nickname || '',
      sign: userInfo?.sign || ''
    },
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    username: userInfo?.username || 0
  })
}
