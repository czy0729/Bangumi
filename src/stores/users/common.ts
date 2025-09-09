/*
 * @Author: czy0729
 * @Date: 2019-07-24 11:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 21:50:09
 */
import { cData, cFind, cheerio, cMap, cText, htmlMatch, matchAvatar, safeObject } from '@utils'
import { CatalogsItem, CharactersItem, RecentsItem, Users } from './types'

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
  const $ = cheerio(htmlMatch(html, '<div id="columnA', '<div id="footer'))
  return cMap($('.coverList li'), $row => {
    const $a = cFind($row, 'a.title')
    return {
      id: cData($a, 'href').replace(/^\/+/, ''),
      avatar: cData(cFind($row, 'img'), 'src'),
      name: cText($a)
    } as CharactersItem
  })
}

/** 我收藏人物的最近作品 */
export function cheerioRecents(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnCrtBrowserB', '<div id="footer'))
  return cMap($('#browserItemList li.item'), $row => {
    const $a = cFind($row, 'h3 a.l')
    return {
      id: cData($row, 'id').replace('item_', ''),
      cover: cData(cFind($row, 'img.cover'), 'src'),
      type: cData(cFind($row, 'h3 span.ll'), 'class').match(/subject_type_(\d+)/)?.[1] || '',
      href: cData($a, 'href'),
      name: cText($a),
      nameJP: cText(cFind($row, 'h3 small.grey')),
      info: cText(cFind($row, 'p.info')),
      star: cData(cFind($row, 'span.starlight'), 'class').match(/stars(\d+)/)?.[1] || '',
      starInfo: cText(cFind($row, '.rateInfo .tip_j')),
      actors: cMap($row.find('.actorBadge'), $row => ({
        id: cData(cFind($row, 'a.avatar'), 'href').replace(/^\/+/, ''),
        avatar: cData(cFind($row, 'img'), 'src'),
        name: cText(cFind($row, 'a.l')),
        info: cText(cFind($row, 'small.grey'))
      }))
    } as RecentsItem
  })
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
export function cheerioCatalogs(html: string): CatalogsItem[] {
  const $ = cheerio(htmlMatch(html, '<div class="mainWrapper', '<div class="homeBg'))
  return cMap($('#timeline li'), $row => {
    const $a = cFind($row, '.clearit a.l')
    const $user = cFind($row, '.time a.l')
    return {
      id: cData($a, 'href').replace('/index/', ''),
      title: cText($a),
      userId: cData($user, 'href').replace('/user/', ''),
      userName: cText($user),
      avatar: matchAvatar(cData(cFind($row, '.avatar .avatarNeue'), 'style')),
      time: cText(cFind($row, '.time .tip_j')),
      update: cText(cFind($row, '.time .tip_j', 1)),
      tip: cText(cFind($row, '.desc')),
      anime: Number(cText(cFind($row, '.subject_type_2 .num')) || 0),
      book: Number(cText(cFind($row, '.subject_type_1 .num')) || 0),
      music: Number(cText(cFind($row, '.subject_type_3 .num')) || 0),
      game: Number(cText(cFind($row, '.subject_type_4 .num')) || 0),
      real: Number(cText(cFind($row, '.subject_type_6 .num')) || 0)
    }
  })
}
