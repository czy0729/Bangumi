/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-13 11:18:33
 */
import { WEB } from '@constants/device'
import { TEXT_BADGES } from '@constants/text'
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
    const q = query.replace(/\r\n/g, '\n')
    const cacheKey = `fanyi_${hash(q)}`

    // 云缓存 (避免额度浪费)，短文本不缓存
    let cache: Record<string, any> | undefined
    if (q.length >= CACHE_CHECK_LENGTH) {
      try {
        cache = await get(cacheKey)
      } catch (error) {
        console.info(TEXT_BADGES.warning, '[@utils/baiduTranslate/kv]', error)
      }
    }

    if (cache) {
      const response = Object.keys(cache)
        .sort(asc)
        .map(key => cache[key])
        .filter(item => item?.src && item?.dst)

      if (response.length) {
        return JSON.stringify({ trans_result: response })
      }
    }

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

    const salt = Date.now()
    const sign = md5(`${appid}${q}${salt}${appkey}`)

    const { _response } = await xhrCustom({
      url: `https://api.fanyi.baidu.com/api/trans/vip/translate?${urlStringify({
        q,
        appid,
        salt,
        from: 'auto',
        to,
        sign
      })}`
    })

    const { trans_result } = JSON.parse(_response)
    if (Array.isArray(trans_result)) {
      setTimeout(() => update(cacheKey, trans_result), 0)
    }

    return _response
  } catch (error) {
    console.info(TEXT_BADGES.danger, '[@utils/baiduTranslate]', error)
    return ''
  }
}
