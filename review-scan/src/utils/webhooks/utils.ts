/*
 * @Author: czy0729
 * @Date: 2023-03-10 14:02:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 02:42:21
 */
import { observable, runInAction } from 'mobx'
import axios from '@utils/thirdParty/axios'
import { getTimestamp, runAfter } from '../utils'
import { removeHTMLTag } from '../html'
import { getMonoCoverSmall, getSubjectCoverCommon } from '../app'
import { syncSystemStore } from '../async'
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
    const systemStore = syncSystemStore()
    if (!systemStore.setting.webhook) return false

    // 保证这种低优先级的操作在 UI 响应之后再执行
    runAfter(async () => {
      try {
        const { webhookUrl } = systemStore.setting
        let url = webhookUrl || `https://postman-echo.com/post`
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = `http://${url}`
        }

        const params = {
          method: 'post',
          url,
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
        const content: any = {
          status: res?.status
        }
        if (typeof res?.data === 'object') {
          content.data = res.data
        } else {
          content._response = res?.request?._response
        }

        runInAction(() => {
          logs.unshift({
            label: 'RESULT',
            content: JSON.stringify(content, null, 2),
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
