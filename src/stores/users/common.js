/*
 * @Author: czy0729
 * @Date: 2019-07-24 11:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-07 14:13:11
 */
import { safeObject, trim } from '@utils'
import { cheerio } from '@utils/html'
import { matchAvatar } from '@utils/match'

/**
 * 分析好友列表
 * @param {*} HTML
 */
export function cheerioFriends(HTML) {
  return cheerio(HTML)('li.user')
    .map((index, element) => {
      const $li = cheerio(element)
      const $a = $li.find('a.avatar')
      return safeObject({
        avatar: $li.find('img.avatar').attr('src'),
        userId: $a.attr('href').replace('/user/', ''),
        userName: $a.text().replace('\r\n ', '')
      })
    })
    .get()
}

/**
 * 分析用户
 * @param {*} HTML
 */
export function cheerioUsers(HTML) {
  const $ = cheerio(HTML)
  const userId = $('.inner small.grey').text().replace('@', '')
  const hobby = $('small.hot').text().match(/\d+/g)

  let disconnectUrl = ''
  const matchDisconnect = $('a.chiiBtn[onclick]').attr('onclick')
  if (matchDisconnect) {
    // eslint-disable-next-line quotes
    const [idPath, , , hash] = matchDisconnect.split("'")
    if (idPath) {
      const id = idPath.split('(')[1].replace(', ', '')
      disconnectUrl = `/disconnect/${id}?gh=${hash}`
    }
  }
  return safeObject({
    userId,
    userName: $('div.headerAvatar + .inner > a').text().trim(),
    sign: $('.bio').html() || '',
    join: $('span.tip').first().text(),
    hobby: hobby ? hobby[0] : '0',
    percent: parseFloat($('span.percent_text').text().replace('%', '')),
    recent: $('.timeline small.time').first().text(),
    doing: parseInt(
      $(`a[href='/anime/list/${userId}/do']`).text().replace('部在看', '')
    ),
    collect: parseInt(
      $(`a[href='/anime/list/${userId}/collect']`).text().replace('部看过', '')
    ),
    wish: parseInt(
      $(`a[href='/anime/list/${userId}/wish']`).text().replace('部想看', '')
    ),
    onHold: parseInt(
      $(`a[href='/anime/list/${userId}/on_hold']`).text().replace('部搁置', '')
    ),
    dropped: parseInt(
      $(`a[href='/anime/list/${userId}/dropped']`).text().replace('部抛弃', '')
    ),
    connectUrl: $('#connectFrd').attr('href'),
    disconnectUrl
  })
}

/**
 * 分析用户收藏的人物
 * @param {*} HTML
 */
export function cheerioCharacters(HTML) {
  const $ = cheerio(HTML)
  const pagination = {
    page: 1,
    pageTotal: $('div.page_inner > a.p').length
  }

  const list = $('ul.coversSmall > li.clearit')
    .map((index, element) => {
      const $li = cheerio(element)
      const $a = $li.find('a[title]')
      return safeObject({
        avatar: $li.find('img').attr('src').split('?')[0],
        id: $a.attr('href'),
        name: $a.attr('title')
      })
    })
    .get()

  return {
    pagination,
    list
  }
}

/**
 * 分析我收藏人物的最近作品
 * @param {*} HTML
 */
export function cheerioRecents(HTML) {
  const $ = cheerio(HTML)
  const pagination = {
    page: 1,
    pageTotal: 100
  }

  const list = $('ul.browserFull > li.item')
    .map((index, element) => {
      const $li = cheerio(element)
      const $a = $li.find('h3 > a.l')
      return safeObject({
        id: ($li.attr('id') || '').replace('item_', ''),
        cover: $li.find('img.cover').attr('src'),
        type: ($li.find('h3 > span.ll').attr('class') || '').replace(
          /ico_subject_type subject_type_| ll/g,
          ''
        ),
        href: $a.attr('href'),
        name: $a.text(),
        nameJP: $li.find('h3 > small.grey').text(),
        info: trim($li.find('p.info').text()),
        star: ($li.find('span.starlight').attr('class') || '').replace(
          'starlight stars',
          ''
        ),
        starInfo: $li.find('span.tip_j').text(),
        actors: $li
          .find('div.actorBadge')
          .map((index, element) => {
            const $li = cheerio(element)
            return safeObject({
              id: ($li.find('a.avatar').attr('href') || '')
                .replace('/person', 'person')
                .replace('/character', 'character'),
              avatar: ($li.find('img.avatar').attr('src') || '').split('?')[0],
              name: $li.find('a.l').text(),
              info: trim($li.find('small.grey').text())
            })
          })
          .get()
      })
    })
    .get()

  return {
    pagination,
    list
  }
}

/**
 * 分析用户日志列表
 * @param {*} HTML
 */
export function cheerioBlogs(HTML) {
  const $ = cheerio(HTML)
  return (
    $('div#entry_list > div.item')
      .map((index, element) => {
        const $li = cheerio(element)
        const $a = $li.find('h2.title a')
        return safeObject({
          id: $a.attr('href').replace('/blog/', ''),
          title: $a.text(),
          cover: $li.find('span.pictureFrameGroup img').attr('src'),
          time: $li.find('div.time .time').text(),
          replies: $li.find('div.time .orange').text().replace(/\(|\)/g, ''),
          content: $li
            .find('div.content')
            .text()
            .replace(' (more)', '')
            .replace(/^\n/, ''),
          tags: $li
            .find('div.tags')
            .text()
            .replace('Tags: ', '')
            .split(' ')
            .filter(item => !!item)
        })
      })
      .get() || []
  )
}

/**
 * 分析用户目录列表
 * @param {*} HTML
 * @param {*} isCollect
 */
export function cheerioCatalogs(HTML, isCollect) {
  const $ = cheerio(HTML)
  if (isCollect) {
    return (
      $('div#timeline li')
        .map((index, element) => {
          const $li = cheerio(element)
          const $catalog = $li.find('h3 a.l')
          const $user = $li.find('span.tip_j a.l')
          return safeObject({
            id: $catalog.attr('href').replace('/index/', ''),
            title: $catalog.text(),
            userId: $user.attr('href').replace('/user/', ''),
            userName: $user.text(),
            avatar: matchAvatar($li.find('span.avatarSize32').attr('style')),
            time: $li.find('span.tip').text(),
            num: ''
          })
        })
        .get() || []
    )
  }

  return (
    $('ul.line_list > li')
      .map((index, element) => {
        const $li = cheerio(element)
        const $a = $li.find('a')
        return safeObject({
          id: $a.attr('href').replace('/index/', ''),
          title: $a.text(),
          userId: '',
          userName: '',
          avatar: '',
          time: $li.find('small.grey').text(),
          num: $li.find('span.tip_j').text().replace(/\(|\)/g, '')
        })
      })
      .get() || []
  )
}
