/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-05 04:16:49
 */
import Constants from 'expo-constants'
import { STORYBOOK } from '@constants/device'
import { HOST } from '@constants/constants'
import { AnyObject, EventKeys } from '@types'
import { urlStringify, getTimestamp, randomn } from '../utils'
import { API_UMAMI, API_XHR, SCREEN, TIMEOUT, TITLE, WEBSITE } from './ds'
import { EventData } from './type'

let userAgent = ''

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

export async function umami(url: string = '', title: string = '') {
  const _url = url.replace(HOST, '')

  if (STORYBOOK) {
    // @ts-ignore
    window.umami.track((props: any) => ({
      ...props,
      website: WEBSITE,
      url: _url.split('?')?.[0],
      title,
      referrer: ''
    }))
    return
  }

  if (!userAgent) userAgent = await Constants.getWebViewUserAgentAsync()

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
  const _url = url.replace(HOST, '')

  if (STORYBOOK) {
    // @ts-ignore
    window.umami.track((props: any) => ({
      ...props,
      website: WEBSITE,
      url: _url.split('?')?.[0],
      title,
      name: eventId,
      data,
      referrer: ''
    }))
    return
  }

  if (!userAgent) userAgent = await Constants.getWebViewUserAgentAsync()

  umamiXhr({
    title: title || TITLE,
    url: _url,
    name: eventId,
    data
  })
}

function umamiXhr(payload: {
  title: string
  url: string
  name?: string
  data?: AnyObject
}) {
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
