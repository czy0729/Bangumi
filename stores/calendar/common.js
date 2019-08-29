/*
 * @Author: czy0729
 * @Date: 2019-08-11 20:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-29 00:52:16
 */
import { cheerio } from '@utils/html'

/**
 * 分析今日收看记录
 * @param {*} HTML
 */
export function cheerioToday(HTML) {
  return cheerio(HTML)('li').text()
}
