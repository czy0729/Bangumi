/*
 * @Author: czy0729
 * @Date: 2019-07-24 11:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-16 21:04:58
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

/**
 * 分析用户
 * @param {*} HTML
 */
export function analysisUsers(HTML) {
  const $ = cheerio.load(HTML)
  const userId = $('.inner small.grey')
    .text()
    .replace('@', '')
  const hobby = $('small.hot')
    .text()
    .match(/\d+/g)

  let disconnectUrl = ''
  const matchDisconnect = $('a.chiiBtn[onclick]').attr('onclick')
  if (matchDisconnect) {
    const [idPath, , , hash] = matchDisconnect.split('\'')
    if (idPath) {
      const id = idPath.split('(')[1].replace(', ', '')
      disconnectUrl = `/disconnect/${id}?gh=${hash}`
    }
  }

  return {
    userId,
    userName: $('.inner > a').text(),
    sign: $('.bio').html() || '',
    join: $('span.tip')
      .first()
      .text(),
    hobby: hobby ? hobby[0] : '0',
    percent: parseFloat(
      $('span.percent_text')
        .text()
        .replace('%', '')
    ),
    recent: $('.timeline small.time')
      .first()
      .text(),
    doing: parseInt(
      $(`a[href='/anime/list/${userId}/do']`)
        .text()
        .replace('部在看', '')
    ),
    collect: parseInt(
      $(`a[href='/anime/list/${userId}/collect']`)
        .text()
        .replace('部看过', '')
    ),
    wish: parseInt(
      $(`a[href='/anime/list/${userId}/wish']`)
        .text()
        .replace('部想看', '')
    ),
    onHold: parseInt(
      $(`a[href='/anime/list/${userId}/on_hold']`)
        .text()
        .replace('部搁置', '')
    ),
    dropped: parseInt(
      $(`a[href='/anime/list/${userId}/dropped']`)
        .text()
        .replace('部抛弃', '')
    ),
    connectUrl: $('#connectFrd').attr('href'),
    disconnectUrl
  }
}
