/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-03 00:44:01
 */
import Constants from 'expo-constants'
import { HOST } from '@constants/constants'
import { EventKeys } from '@types'
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
        website: WEBSITE,
        hostname: 'bgm.tv',
        screen: SCREEN,
        language: 'zh-CN',
        title: title || TITLE,
        url: url.replace(HOST, ''),
        referrer: ''
      },
      type: 'event'
    })
  )
}

export async function umamiEvent(
  eventId: EventKeys,
  data: EventData = {},
  url: string = '',
  title: string = ''
) {
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
        name: eventId,
        data,
        website: WEBSITE,
        hostname: 'bgm.tv',
        screen: SCREEN,
        language: 'zh-CN',
        title: title || TITLE,
        url: url.replace(HOST, ''),
        referrer: ''
      },
      type: 'event'
    })
  )
}
