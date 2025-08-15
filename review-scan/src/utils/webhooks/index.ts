/*
 * @Author: czy0729
 * @Date: 2023-02-26 02:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 17:27:41
 */
import { MODEL_COLLECTION_STATUS } from '@constants'
import { getTimestamp } from '../utils'
import { syncSystemStore } from '../async'
import { t } from '../track'
import {
  getCatalog,
  getGroup,
  getMono,
  getSubject,
  getUserInfo,
  webhook,
  logs
} from './utils'
import { CollectionType as WebHooksCollectionType } from './types'

export { logs }

/** 钩子: 更新收藏 */
export const webhookCollection = (
  values: {
    status?: any
    rating?: any
    comment?: any
    privacy?: any
    tags?: string
  } = {},
  subject: any,
  userInfo: any
) => {
  if (!syncSystemStore().setting.webhook) return false

  const type = 'collection'
  webhook(type, {
    type: Number(
      MODEL_COLLECTION_STATUS.getTitle<WebHooksCollectionType>(values.status)
    ) as WebHooksCollectionType,
    rate: Number(values.rating || 0),
    comment: values.comment || '',
    private: values.privacy == 1 ? true : false,
    tags: String(values.tags || '')
      .split(' ')
      .filter(item => !!item),
    subject: getSubject(subject),
    user: getUserInfo(userInfo),
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
  } = {},
  subject: any,
  userInfo: any
) => {
  if (!syncSystemStore().setting.webhook) return false

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
    subject: getSubject(subject),
    user: getUserInfo(userInfo),
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
  } = {},
  userInfo: any
) => {
  if (!syncSystemStore().setting.webhook) return false

  const type = 'say'
  webhook(type, {
    content: values.content || '新吐槽',
    url: values.url || '',
    user: getUserInfo(userInfo),
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    username: userInfo?.username || 0
  })
}

/** 钩子: 收藏人物 */
export const webhookMono = (mono: any, userInfo: any) => {
  if (!syncSystemStore().setting.webhook) return false

  const type = 'mono'
  webhook(type, {
    mono: getMono(mono),
    user: getUserInfo(userInfo),
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    monoId: mono?.id,
    username: userInfo?.username || ''
  })
}

/** 钩子: 加为好友 */
export const webhookFriend = (user: any, userInfo: any) => {
  if (!syncSystemStore().setting.webhook) return false

  const type = 'friend'
  webhook(type, {
    friend: getUserInfo(user),
    user: getUserInfo(userInfo),
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    friend: user?.username || '',
    username: userInfo?.username || ''
  })
}

/** 钩子: 加入小组 */
export const webhookGroup = (group: any, userInfo: any) => {
  if (!syncSystemStore().setting.webhook) return false

  const type = 'group'
  webhook(type, {
    group: getGroup(group),
    user: getUserInfo(userInfo),
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    group: group?.id || '',
    username: userInfo?.username || ''
  })
}

/** 钩子: 收藏目录 */
export const webhookCatalog = (catalog: any, userInfo: any) => {
  if (!syncSystemStore().setting.webhook) return false

  const type = 'catalog'
  webhook(type, {
    catalog: getCatalog(catalog),
    user: getUserInfo(userInfo),
    ts: getTimestamp()
  })

  t('其他.Webhooks', {
    type,
    catalog: catalog?.id,
    username: userInfo?.username || ''
  })
}
