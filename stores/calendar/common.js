/*
 * @Author: czy0729
 * @Date: 2019-08-11 20:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 21:05:49
 */
import cheerio from 'cheerio-without-node-native'

/**
 * 分析今日收看记录
 * @param {*} HTML
 */
export function cheerioToday(HTML) {
  return cheerio
    .load(HTML)('li')
    .text()
}
