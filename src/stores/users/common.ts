/*
 * @Author: czy0729
 * @Date: 2019-07-24 11:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:43:17
 */
import { cData, cFind, cheerio, cHtml, cMap, cText, htmlMatch, matchAvatar } from '@utils'
import { getBlogItemTime } from '../discovery/utils'

import type { MonoId, SubjectTypeValue } from '@types'
import type { BlogsItem, CatalogsItem, CharactersItem, Friend, RecentsItem, Users } from './types'

/** 好友列表 */
export function cheerioFriends(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnUserSingle', '<div id="footer'))

  return cMap($('li.user'), $row => {
    const $a = cFind($row, '.avatar')

    return {
      avatar: matchAvatar(cData(cFind($row, '.avatarNeue'), 'style')),
      userId: cData($a, 'href').replace('/user/', ''),
      userName: cText($a)
    } as Friend
  })
}

/** 用户 */
export function cheerioUsers(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="headerSearchWrapper', '<div id="footer'))

  /** ==================== 基础信息 ==================== */
  const userId = cText(cFind($('.inner'), 'small.grey')).match(/@([a-zA-Z0-9]+)/)?.[1] || ''
  const avatar = matchAvatar(cData(cFind($('.headerAvatar'), '.avatarNeue'), 'style'))
  const hobby = cText($('small.hot')).match(/\d+/)?.[0] || '0'

  /** ==================== 好友 ==================== */
  let disconnectUrl = ''
  let formhash = ''
  const onclick = cData($('a.chiiBtn[onclick]'), 'onclick')
  if (onclick) {
    const [idPath, , , hash] = onclick.split("'")
    if (idPath && hash) {
      const id = idPath.split('(')[1]?.replace(', ', '')
      if (id) disconnectUrl = `/disconnect/${id}?gh=${hash}`
      formhash = hash
    }
  }

  /** ==================== 统计 ==================== */
  const countsText = cText(cFind($('#anime'), '.horizontalOptions'))
  const getCount = (reg: RegExp) => Number(countsText.match(reg)?.[1] || 0)

  const gridNums = cMap($('.gridStats .item'), $row => cText(cFind($row, '.num')))
  const chartNums = cMap($('.horizontalChart li'), $row =>
    cText(cFind($row, '.count')).replace(/[()]/g, '')
  )

  /** ==================== 徽章 ==================== */
  const networkService = cMap($('.network_service li'), $row => {
    const $label = cFind($row, '.service')
    const $a = cFind($row, 'a.l')

    return {
      label: cText($label),
      value: cText(cFind($row, '.tip')) || cText($a),
      color: cData($label, 'style').split(':')?.[1]?.replace(';', '').trim() || '',
      href: cData($a, 'href')
    }
  }).filter(item => item.label !== 'Bangumi')

  return {
    userId,
    userName: cText(cFind($('.nameSingle .name'), 'a')),
    avatar: avatar.includes('icon.jpg') ? '' : avatar,
    sign: cHtml($('.bio')),
    join: cText($('span.tip').eq(0)),
    hobby,
    percent: parseFloat(cText($('span.percent_text')).replace('%', '')) || 0,
    recent: cText(cFind($('.timeline'), 'small.time')),

    doing: getCount(/(\d+)部在看/),
    collect: getCount(/(\d+)部看过/),
    wish: getCount(/(\d+)部想看/),
    onHold: getCount(/(\d+)部搁置/),
    dropped: getCount(/(\d+)部抛弃/),

    connectUrl: cData($('#connectFrd'), 'href'),
    disconnectUrl,
    formhash,
    ban: cText(cFind($('.tipIntro'), '.tip')).replace(/\s*\n\s*/g, ''),

    userStats: {
      total: gridNums[0] || '',
      collect: gridNums[1] || '',
      percent: gridNums[2] || '',
      avg: gridNums[3] || '',
      std: gridNums[4] || '',
      scored: gridNums[5] || '',
      chart: {
        10: chartNums[0] || '',
        9: chartNums[1] || '',
        8: chartNums[2] || '',
        7: chartNums[3] || '',
        6: chartNums[4] || '',
        5: chartNums[5] || '',
        4: chartNums[6] || '',
        3: chartNums[7] || '',
        2: chartNums[8] || '',
        1: chartNums[9] || ''
      }
    },

    networkService
  } as Users
}

/** 用户收藏的人物 */
export function cheerioCharacters(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnA', '<div id="footer'))
  return cMap<CharactersItem>($('.coverList li'), $row => {
    const $a = cFind($row, 'a.title')
    const avatar = cData(cFind($row, 'img'), 'src')
    return {
      id: cData($a, 'href').replace(/^\/+/, '') as MonoId,
      avatar: avatar === '/img/info_only.png' ? '' : avatar,
      name: cText($a)
    }
  })
}

/** 我收藏人物的最近作品 */
export function cheerioRecents(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnCrtBrowserB', '<div id="footer'))
  return cMap($('#browserItemList li.item'), $row => {
    const $a = cFind($row, 'h3 a.l')
    return {
      id: cData($row, 'id').replace('item_', '') as MonoId,
      cover: cData(cFind($row, 'img.cover'), 'src'),
      type: (cData(cFind($row, 'h3 span.ll'), 'class').match(/subject_type_(\d+)/)?.[1] ||
        '') as SubjectTypeValue,
      href: cData($a, 'href'),
      name: cText($a),
      nameJP: cText(cFind($row, 'h3 small.grey')),
      info: cText(cFind($row, 'p.info')),
      star: cData(cFind($row, 'span.starlight'), 'class').match(/stars(\d+)/)?.[1] || '',
      starInfo: cText(cFind($row, '.rateInfo .tip_j')),
      actors: cMap($row.find('.actorBadge'), $row => ({
        id: cData(cFind($row, 'a.avatar'), 'href').replace(/^\/+/, '') as MonoId,
        avatar: cData(cFind($row, 'img'), 'src'),
        name: cText(cFind($row, 'a.l')),
        info: cText(cFind($row, 'small.grey'))
      }))
    } as RecentsItem
  })
}

/** 用户日志列表 */
export function cheerioBlogs(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnA"', '<div id="columnB"'))
  return cMap($('#entry_list .item'), $row => {
    const $a = cFind($row, 'h2.title a')

    let subject = ''
    let subjectId = ''
    let replies = ''
    if (cText(cFind($row, '.time a.l', 1))) {
      const $subject = cFind($row, '.time a.l')
      subject = cText($subject)
      subjectId = (cData($subject, 'href') || '').replace('/subject/', '')
      replies = cText(cFind($row, '.time a.l', 1))
    } else {
      replies = cText(cFind($row, '.time a.l'))
    }
    if (replies === '0 回复') replies = ''

    return {
      id: cData($a, 'href').replace('/blog/', ''),
      title: cText($a),
      cover: cData(cFind($row, 'a.avatar img'), 'src'),
      time: getBlogItemTime(cText(cFind($row, '.time'), true)),
      subject,
      subjectId,
      replies,
      content: cText(cFind($row, '.content')).replace(/\r\n/g, ' '),
      tags: cText(cFind($row, '.tags'))
        .split(' ')
        .filter(item => !!item)
    } as BlogsItem
  })
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
