/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 16:55:06
 */
import { WEB } from '@constants/device'
import { syncSystemStore } from '../async'
import Crypto from '../crypto'
import { get, update } from '../kv'
import hash from '../thirdParty/hash'
import md5 from '../thirdParty/md5'
import { asc, urlStringify } from '../utils'
import { xhrCustom } from './xhr'

const balancing = new Date().getSeconds() % 2

/** 百度翻译 App ID */
export const APP_BAIDU_ID = Crypto.get(
  balancing
    ? 'U2FsdGVkX1/PgfGcvWiRli4uwkj4v2Zo5B8sxnVSCxZiKQt+z9eDURCS+EEvIomH'
    : 'U2FsdGVkX19bwyf/ZvZiDMdnB4nRHPF554e9ZN93Shthw9bUszYQFzU1qJ0WasgF'
) as string

/** 百度翻译 App Key */
export const APP_BAIDU_KEY = Crypto.get(
  balancing
    ? 'U2FsdGVkX1+4+Bn6mVxpU2dYn05udk5XYq0OBQraqtuD7IpYvPtxCT9MaSIbga6c'
    : 'U2FsdGVkX19ba4ukVC6zTHsld0T9vUEVF3uPRuM9FsN4SWhMY/BiHywAMXfHvRIW'
) as string

const CACHE_CHECK_LENGTH = 12

/** 百度翻译 */
export async function baiduTranslate(query: string, to = 'zh') {
  try {
    const q = query.split('\r\n').join('\n')

    // 云缓存, 因每个月免费翻译额度有限, 避免过多调用
    let cache: { [x: string]: any }
    const k = `fanyi_${hash(q)}`

    // 因片假名终结者也使用本函数, 所以对长度短的翻译不进行缓存
    if (q.length >= CACHE_CHECK_LENGTH) cache = await get(k)

    if (cache) {
      const response = []
      Object.keys(cache)
        .sort((a, b) => asc(a, b))
        .forEach(index => {
          if (cache[index]?.dst && cache[index]?.src) response.push(cache[index])
        })
      if (response.length) {
        return JSON.stringify({
          trans_result: response
        })
      }
    }

    // 网页版暂时不允许直接调用百度翻译
    if (WEB) {
      console.info('[@utils/baidu]', 'baiduTranslate denied')
      return ''
    }

    const { baiduAppId, baiduKey } = syncSystemStore().setting
    let appid = APP_BAIDU_ID
    let appkey = APP_BAIDU_KEY
    if (baiduAppId && baiduKey) {
      appid = baiduAppId
      appkey = baiduKey
    }

    const salt = new Date().getTime()
    const from = 'auto'
    const sign = md5(`${appid}${q}${salt}${appkey}`)
    const { _response } = await xhrCustom({
      url: `https://api.fanyi.baidu.com/api/trans/vip/translate?${urlStringify({
        q,
        appid,
        salt,
        from,
        to,
        sign
      })}`
    })

    const { trans_result } = JSON.parse(_response)
    if (Array.isArray(trans_result)) {
      setTimeout(() => {
        update(k, trans_result)
      }, 0)
    }

    return _response
  } catch (error) {
    return ''
  }
}
