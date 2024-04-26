/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 22:09:38
 */
import Constants from 'expo-constants'
import { HOST, IOS } from '@constants/constants'
import { STORYBOOK } from '@constants/device'
import events from '@constants/events'
import { DEV } from '@/config'
import { AnyObject, EventKeys } from '@types'
import { getTimestamp, interceptor, randomn, urlStringify } from '../utils'
import { EventData } from './type'
import {
  API_UMAMI,
  API_XHR,
  REFERRER,
  SCREEN,
  TIMEOUT,
  TITLE,
  WEBSITE,
  WEBSITE_FATAL_ERROR,
  WEBSITE_TINGRAIL,
  WEBSITE_UV
} from './ds'

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

export async function umami(
  url: string = '',
  title: string = '',
  website?: string,
  referrer?: string
) {
  if (interceptor('umami', arguments)) return

  const _url = url.replace(HOST, '')
  if (STORYBOOK) {
    const url = _url.split('?')?.[0]

    // @ts-ignore
    window.umami.track((props: any) => ({
      ...props,
      website: website || (url.includes('tinygrail') ? WEBSITE_TINGRAIL : WEBSITE),
      url,
      title,
      referrer: referrer || REFERRER
    }))

    log('umami', url)
    return
  }

  umamiXhr({
    title: title || TITLE,
    url: _url,
    website,
    referrer
  })
}

export async function umamiEvent(
  eventId: EventKeys,
  data: EventData = {},
  url: string = '',
  title: string = ''
) {
  // 由于已经合并了页面浏览量的计算, 所以此旧事件忽略
  if (/\.查看$/g.test(eventId) || interceptor('umamiEvent', arguments) || !events?.[eventId]) return

  const _url = url.replace(HOST, '')
  if (STORYBOOK) {
    const url = _url.split('?')?.[0]

    // @ts-ignore
    window.umami.track((props: any) => ({
      ...props,
      website: url.includes('tinygrail') ? WEBSITE_TINGRAIL : WEBSITE,
      url,
      title,
      name: eventId,
      data,
      referrer: REFERRER
    }))

    log('umamiEvent', url, eventId, data)
    return
  }

  // console.log(`${events?.[eventId]}/?${urlStringify(data, false, true)}`)
  umamiXhr({
    title: title || TITLE,
    url: _url,
    name: eventId,
    data
  })
  log('umamiEvent', eventId, data)
}

async function umamiXhr(payload: {
  title: string
  url: string
  name?: EventKeys
  data?: AnyObject
  website?: string
  referrer?: string
}) {
  if (payload.name === '其他.启动') return

  if (!userAgent) userAgent = await Constants.getWebViewUserAgentAsync()

  const request = new XMLHttpRequest()
  request.open('POST', API_UMAMI)
  request.setRequestHeader('Content-Type', 'application/json')
  request.setRequestHeader('User-Agent', userAgent)
  request.timeout = TIMEOUT
  request.withCredentials = false

  let website = payload.website || (payload.url.includes('tinygrail') ? WEBSITE_TINGRAIL : WEBSITE)
  let referrer = payload.referrer || REFERRER

  // @ts-expect-error
  if (payload.name === '其他.启动') {
    website = WEBSITE_UV
    referrer = IOS ? 'ios' : 'android'
  } else if (payload.name === '其他.崩溃') {
    website = WEBSITE_FATAL_ERROR
  }

  request.send(
    JSON.stringify({
      payload: {
        ...payload,
        website,
        hostname: 'bgm.tv',
        screen: SCREEN,
        language: 'zh-CN',
        referrer
      },
      type: 'event'
    })
  )
}

/** [DEV] */
function log(method: string, ...others: any[]) {
  if (DEV) {
    console.info(`%c[@utils/track/${method}]`, 'background: #000; color: #fff', ...others)
  }
}
