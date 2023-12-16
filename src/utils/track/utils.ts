/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-15 13:45:45
 */
import Constants from 'expo-constants'
import { STORYBOOK } from '@constants/device'
import { HOST } from '@constants/constants'
import { AnyObject, EventKeys } from '@types'
import { DEV } from '@/config'
import { urlStringify, getTimestamp, randomn, interceptor } from '../utils'
import { API_UMAMI, API_XHR, SCREEN, TIMEOUT, TITLE, WEBSITE } from './ds'
import { EventData } from './type'

export function xhr(si: string, u: string) {
  const url = `${API_XHR}?${urlStringify({
    rnd: randomn(10),
    lt: getTimestamp(),
    si,
    v: '1.2.51',
    api: '4_0',
    u
  })}`

  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.timeout = TIMEOUT
  request.withCredentials = true
  request.send(null)
}

let userAgent = ''

export async function umami(url: string = '', title: string = '') {
  if (interceptor('umami', arguments)) return

  const _url = url.replace(HOST, '')
  if (STORYBOOK) {
    const url = _url.split('?')?.[0]

    // @ts-ignore
    window.umami.track((props: any) => ({
      ...props,
      website: WEBSITE,
      url,
      title,
      referrer: ''
    }))

    log('umami', url)
    return
  }

  umamiXhr({
    title: title || TITLE,
    url: _url
  })
}

export async function umamiEvent(
  eventId: EventKeys,
  data: EventData = {},
  url: string = '',
  title: string = ''
) {
  // 由于已经合并了页面浏览量的计算, 所以此旧事件忽略
  if (/\.查看$/g.test(eventId) || interceptor('umamiEvent', arguments)) return

  const _url = url.replace(HOST, '')
  if (STORYBOOK) {
    const url = _url.split('?')?.[0]

    // @ts-ignore
    window.umami.track((props: any) => ({
      ...props,
      website: WEBSITE,
      url,
      title,
      name: eventId,
      data,
      referrer: ''
    }))

    log('umamiEvent', url, eventId, data)
    return
  }

  umamiXhr({
    title: title || TITLE,
    url: _url,
    name: eventId,
    data
  })
}

async function umamiXhr(payload: {
  title: string
  url: string
  name?: string
  data?: AnyObject
}) {
  if (!userAgent) userAgent = await Constants.getWebViewUserAgentAsync()

  const request = new XMLHttpRequest()
  request.open('POST', API_UMAMI)
  request.setRequestHeader('Content-Type', 'application/json')
  request.setRequestHeader('User-Agent', userAgent)
  request.timeout = TIMEOUT
  request.withCredentials = false
  request.send(
    JSON.stringify({
      payload: {
        ...payload,
        website: WEBSITE,
        hostname: 'bgm.tv',
        screen: SCREEN,
        language: 'zh-CN',
        referrer: ''
      },
      type: 'event'
    })
  )
}

/** [DEV] */
function log(method: string, ...others: any[]) {
  if (DEV) console.info(`[@utils/track/${method}]`, ...others)
}
