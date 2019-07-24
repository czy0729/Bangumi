/*
 * @Author: czy0729
 * @Date: 2019-07-24 11:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-24 12:23:06
 */
import cheerio from 'cheerio-without-node-native'

/**
 * 分析好友列表
 * @param {*} HTML
 */
export function analysisFriends(HTML) {
  return cheerio
    .load(HTML)('li.user')
    .map((index, element) => {
      const $li = cheerio(element)
      const $a = $li.find('a.avatar')
      return {
        avatar: $li.find('img.avatar').attr('src'),
        userId: $a.attr('href').replace('/user/', ''),
        userName: $a.text().replace('\r\n ', '')
      }
    })
    .get()
}
