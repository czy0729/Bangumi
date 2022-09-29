/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 20:01:52
 */
import { urlStringify, getTimestamp, randomn } from '../utils'

export function xhr(si: string, u: string) {
  const url = `https://hm.baidu.com/hm.gif?${urlStringify({
    rnd: randomn(10),
    lt: getTimestamp(),
    si,
    v: '1.2.51',
    api: '4_0',
    u
  })}`

  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.timeout = 1000
  request.withCredentials = true
  request.send(null)
}
