/*
 * @Author: czy0729
 * @Date: 2019-07-24 11:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:22:36
 */
import { cheerio, htmlMatch, matchAvatar, safeObject, trim } from '@utils'
import { Users } from './types'

/** 好友列表 */
export function cheerioFriends(html: string) {
  return cheerio(htmlMatch(html, '<div id="columnUserSingle"', '<div id="footer">'))('li.user')
    .map((_index: number, element: any) => {
      const $li = cheerio(element)
      const $a = $li.find('a.avatar')
      return safeObject({
        avatar: matchAvatar($li.find('.avatarNeue').attr('style')),
        userId: $a.attr('href').replace('/user/', ''),
        userName: $a.text().trim()
      })
    })
    .get()
}

/** 用户 */
export function cheerioUsers(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="headerProfile"', '<div id="footer">'))
  const userId = (
    $('.inner small.grey')
      .text()
      .match(/@([a-zA-Z0-9]+)/g)?.[0] || ''
  ).replace('@', '')

  const hobby = $('small.hot').text().match(/\d+/g)
  const matchDisconnect = $('a.chiiBtn[onclick]').attr('onclick')
  let disconnectUrl = ''
  let formhash = ''
  if (matchDisconnect) {
    const [idPath, , , hash] = matchDisconnect.split("'")
    if (idPath) {
      const id = idPath.split('(')[1].replace(', ', '')
      disconnectUrl = `/disconnect/${id}?gh=${hash}`
    }
    if (hash) formhash = hash
  }

  const $gridItems = $('.gridStats .item')
  const $chartItems = $('.horizontalChart li .count')
  let avatar: string = matchAvatar($('.headerAvatar .avatarNeue').attr('style'))
  if (avatar.includes('icon.jpg')) avatar = ''

  const counts = $('#anime .horizontalOptions').text().trim()
  return safeObject<Users>({
    userId,
    userName: $('.nameSingle .name a').text().trim(),
    avatar,
    sign: $('.bio').html() || '',
    join: $('span.tip').first().text().trim(),
    hobby: hobby?.[0] || '0',
    percent: parseFloat($('span.percent_text').text().trim().replace('%', '')),
    recent: $('.timeline small.time').first().text().trim(),
    doing: Number(counts.match(/(\d+)部在看/)?.[1] || 0),
    collect: Number(counts.match(/(\d+)部看过/)?.[1] || 0),
    wish: Number(counts.match(/(\d+)部想看/)?.[1] || 0),
    onHold: Number(counts.match(/(\d+)部搁置/)?.[1] || 0),
    dropped: Number(counts.match(/(\d+)部抛弃/)?.[1] || 0),
    connectUrl: $('#connectFrd').attr('href') || '',
    disconnectUrl,
    formhash,
    ban: $('.tipIntro .tip').text().trim(),
    userStats: {
      total: $gridItems.eq(0).find('.num').text().trim(),
      collect: $gridItems.eq(1).find('.num').text().trim(),
      percent: $gridItems.eq(2).find('.num').text().trim(),
      avg: $gridItems.eq(3).find('.num').text().trim(),
      std: $gridItems.eq(4).find('.num').text().trim(),
      scored: $gridItems.eq(5).find('.num').text().trim(),
      chart: {
        10: $chartItems.eq(0).text().trim().replace(/\(|\)/g, ''),
        9: $chartItems.eq(1).text().trim().replace(/\(|\)/g, ''),
        8: $chartItems.eq(2).text().trim().replace(/\(|\)/g, ''),
        7: $chartItems.eq(3).text().trim().replace(/\(|\)/g, ''),
        6: $chartItems.eq(4).text().trim().replace(/\(|\)/g, ''),
        5: $chartItems.eq(5).text().trim().replace(/\(|\)/g, ''),
        4: $chartItems.eq(6).text().trim().replace(/\(|\)/g, ''),
        3: $chartItems.eq(7).text().trim().replace(/\(|\)/g, ''),
        2: $chartItems.eq(8).text().trim().replace(/\(|\)/g, ''),
        1: $chartItems.eq(9).text().trim().replace(/\(|\)/g, '')
      }
    },
    networkService: $('.network_service li')
      .map((_index: number, element: any) => {
        const $li = cheerio(element)
        const $label = $li.find('.service')
        const $a = $li.find('a.l')
        return safeObject({
          label: $label.text().trim(),
          value: $li.find('.tip').text().trim() || $a.text().trim(),
          color: (($label.attr('style') || '').split(':')?.[1] || '').replace(';', '').trim(),
          href: $a.attr('href') || ''
        })
      })
      .get()
      .filter((item: { label: string }) => item.label !== 'Bangumi')
  })
}

/** 用户收藏的人物 */
export function cheerioCharacters(html: string) {
  const $ = cheerio(htmlMatch(html, '<div class="mainWrapper">', '<div id="footer">'))
  return {
    pagination: {
      page: 1,
      pageTotal: $('div.page_inner > a.p').length
    },
    list: $('ul.coversSmall > li.clearit')
      .map((_index: number, element: any) => {
        const $li = cheerio(element)
        const $a = $li.find('a[title]')
        return safeObject({
          id: $a.attr('href'),
          avatar: $li.find('img').attr('src').split('?')[0],
          name: $a.attr('title')
        })
      })
      .get()
  }
}

/** 我收藏人物的最近作品 */
export function cheerioRecents(html: string) {
  const $ = cheerio(htmlMatch(html, '<div class="mainWrapper">', '<div id="footer">'))
  return {
    pagination: {
      page: 1,
      pageTotal: 100
    },
    list: $('ul.browserFull > li.item')
      .map((_index: number, element: any) => {
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
          star: ($li.find('span.starlight').attr('class') || '').replace('starlight stars', ''),
          starInfo: $li.find('span.tip_j').text(),
          actors: $li
            .find('div.actorBadge')
            .map((_index: number, element: any) => {
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
  }
}

/** 用户日志列表 */
export function cheerioBlogs(html: string) {
  const $ = cheerio(
    htmlMatch(html, '<div id="columnA" class="column">', '<div id="columnB" class="column">')
  )
  return (
    $('div#entry_list > div.item')
      .map((_index: number, element: any) => {
        const $li = cheerio(element)
        const $a = $li.find('h2.title a')
        return safeObject({
          id: $a.attr('href').replace('/blog/', ''),
          title: $a.text(),
          cover: $li.find('span.pictureFrameGroup img').attr('src'),
          time: $li.find('div.time .time').text(),
          replies: $li.find('div.time .orange').text().replace(/\(|\)/g, ''),
          content: $li.find('div.content').text().replace(' (more)', '').replace(/^\n/, ''),
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

/** 用户目录列表 */
export function cheerioCatalogs(html: string, isCollect: boolean) {
  const $ = cheerio(htmlMatch(html, '<div class="mainWrapper">', '<div class="homeBg">'))
  if (isCollect) {
    return (
      $('div#timeline li')
        .map((_index: number, element: any) => {
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
      .map((_index: number, element: any) => {
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
