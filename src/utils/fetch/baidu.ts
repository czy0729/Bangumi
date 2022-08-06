/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 12:58:57
 */
import { APP_BAIDU_ID, APP_BAIDU_KEY } from '@constants/constants'
import { urlStringify } from '../utils'
import md5 from '../thirdParty/md5'
import { xhrCustom } from './xhr'

/** 百度翻译 */
export async function baiduTranslate(query: string, to = 'zh') {
  try {
    const appid = APP_BAIDU_ID
    const salt = new Date().getTime()
    const from = 'auto'
    const q = query.split('\r\n').join('\n')
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
    return _response
  } catch (error) {
    return false
  }
}
