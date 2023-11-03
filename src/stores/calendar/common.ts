/*
 * @Author: czy0729
 * @Date: 2019-08-11 20:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 12:21:40
 */
import { cheerio } from '@utils'

/** 今日收看记录 */
export function cheerioToday(html: string) {
  return String(cheerio(html)('li').text())
    .replace('部。', '部，')
    .replace(/今日番组|。/g, '')
}
