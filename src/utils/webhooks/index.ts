/*
 * @Author: czy0729
 * @Date: 2023-02-26 02:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 07:15:20
 */
import { InteractionManager } from 'react-native'
import axios from '@utils/thirdParty/axios'
import { DEV, MODEL_COLLECTION_STATUS } from '@constants'
import {
  WebHooksTypes,
  SubjectType as WebHooksSubjectType,
  CollectionType as WebHooksCollectionType
} from './types'
import { getTimestamp } from '../utils'
import { t } from '../track'

/** 钩子 */
export const webhooks: WebHooksTypes = (type, data) => {
  if (!type) return false

  try {
    // 保证这种低优先级的操作在 UI 响应之后再执行
    InteractionManager.runAfterInteractions(async () => {
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

/** 钩子: [收藏] 修改用户单个收藏 */
export const webhooksUsersCollections = (values, subject, userInfo) => {
  if (!DEV) return

  const type = 'users_collections'
  webhooks(type, {
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
