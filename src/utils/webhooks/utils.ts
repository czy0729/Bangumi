/*
 * @Author: czy0729
 * @Date: 2023-03-10 14:02:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 20:19:51
 */
import { observable, runInAction } from 'mobx'
import axios from '@utils/thirdParty/axios'
import { getTimestamp, runAfter } from '../utils'
import { removeHTMLTag } from '../html'
import { getMonoCoverSmall, getSubjectCoverCommon } from '../app'
import { getSystemStoreAsync } from '../async'
import { WebHooksTypes, SubjectType as WebHooksSubjectType } from './types'

export const logs = observable<{
  label: string
  content: string
  ts: number
}>([])

const MAX_LENGTH = 16

/** 钩子 */
export const webhook: WebHooksTypes = (type: string, data: any) => {
  if (!type) return false

  try {
    const systemStore = getSystemStoreAsync()
    if (!systemStore.setting.webhook) return false

    // 保证这种低优先级的操作在 UI 响应之后再执行
    runAfter(async () => {
      try {
        const { webhookUrl } = systemStore.setting
        const params = {
          method: 'post',
          url: webhookUrl || `https://postman-echo.com/post`,
          data: {
            type,
            data: data || {}
          }
        }

        runInAction(() => {
          logs.unshift({
            label: 'POST',
            content: JSON.stringify(params, null, 2),
            ts: getTimestamp()
          })
          if (logs.length > MAX_LENGTH) logs.pop()
        })

        // @ts-expect-error
        const res = await axios(params)
        runInAction(() => {
          logs.unshift({
            label: 'RESULT',
            content: JSON.stringify(res?.data?.data, null, 2),
            ts: getTimestamp()
          })
          if (logs.length > MAX_LENGTH) logs.pop()
        })
      } catch (error) {
        runInAction(() => {
          logs.unshift({
            label: 'ERROR',
            content: error?.message || '',
            ts: getTimestamp()
          })
          if (logs.length > MAX_LENGTH) logs.pop()
        })
      }
    })
  } catch (error) {
    runInAction(() => {
      logs.unshift({
        label: 'ERROR',
        content: 'unknow error',
        ts: getTimestamp()
      })
      if (logs.length > MAX_LENGTH) logs.pop()
    })
  }
}

export function getSubject(subject: any) {
  return {
    id: Number(subject?.id || 0),
    image: getSubjectCoverCommon(subject?.images?.common || ''),
    name: subject?.name || '',
    name_cn: subject?.name_cn || '',
    type: Number(subject?.type) as WebHooksSubjectType,
    rating: {
      rank: subject?.rank || 0,
      total: subject?.rating?.total || 0,
      score: subject?.rating?.score || 0
    },
    eps: subject?.eps_count || 0
  }
}

export function getUserInfo(userInfo: any) {
  return {
    id: userInfo?.id || 0,
    username: userInfo?.username || '',
    avatar: userInfo?.avatar?.large || '',
    nickname: userInfo?.nickname || '',
    sign: userInfo?.sign || ''
  }
}

export function getMono(mono: any) {
  return {
    id: mono?.id,
    name: mono?.name,
    name_cn: mono?.nameCn,
    cover: getMonoCoverSmall(mono?.cover)
  }
}

export function getGroup(group: any) {
  return {
    id: group?.id || '',
    title: group?.title || '',
    content: (group?.content || '').slice(0, 40),
    cover: group?.cover || '',
    create: group?.create || ''
  }
}

export function getCatalog(catalog: any) {
  return {
    id: catalog?.id || '',
    title: catalog?.title || '',
    content: removeHTMLTag(catalog?.content || '', false).slice(0, 64)
  }
}
