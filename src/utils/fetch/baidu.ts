/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:53:26
 */
import { APP_BAIDU_ID, APP_BAIDU_KEY } from '@constants/constants'
import { asc, urlStringify } from '../utils'
import { get, update } from '../kv'
import md5 from '../thirdParty/md5'
import hash from '../thirdParty/hash'
import { xhrCustom } from './xhr'

const CACHE_CHECK_LENGTH = 12

/** 百度翻译 */
export async function baiduTranslate(query: string, to = 'zh') {
  try {
    const q = query.split('\r\n').join('\n')

    // 云缓存, 因每个月免费翻译额度有限, 避免过多调用百度翻译
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

    const appid = APP_BAIDU_ID
    const salt = new Date().getTime()
    const from = 'auto'
    const sign = md5(`${appid}${q}${salt}${APP_BAIDU_KEY}`)
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
