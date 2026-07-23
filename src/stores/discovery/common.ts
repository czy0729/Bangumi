/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-21 22:49:17
 */
import {
  cData,
  cFind,
  cHas,
  cheerio,
  cHtml,
  cMap,
  cParse,
  cText,
  HTMLDecode,
  htmlMatch,
  matchAvatar,
  safeObject
} from '@utils'
import { getBlogItemTime } from './utils'

import type { SubjectTypeCn } from '@types'
import type {
  BlogItem,
  CatalogDetail,
  CatalogDetailBlogItem,
  CatalogDetailEpItem,
  CatalogDetailItem,
  CatalogDetailMonoItem,
  CatalogDetailTopicItem,
  CatalogsItem,
  Channel,
  ChannelBlogItem,
  ChannelDiscussItem,
  ChannelFriendsItem,
  ChannelRankItem,
  DollarsItem
} from './types'

/** 标签 */
export function cheerioTags(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="tagList">', '<hr class="board"'))
  const tags = $('#tagList a.l')
    .map((_index: number, element: any) => {
      const $li = cheerio(element)
      return $li.text().trim() || ''
    })
    .get()
  const nums = $('#tagList small.grey')
    .map((_index: number, element: any) => {
      const $li = cheerio(element)
      return ($li.text().trim() || '').replace(/\(|\)/g, '')
    })
    .get()

  return {
    list: tags.map((item: string, index: number) =>
      safeObject({
        name: item,
        nums: nums[index]
      })
    ),
    pagination: {
      page: 1,
      pageTotal: 100
    }
  }
}

/** 目录 */
export function cheerioCatalog(html: string) {
  const $ = cParse(html, '<div id="columnA', '<div id="columnB')
  return cMap<CatalogsItem>($('li.tml_item'), $row => {
    const $a = cFind($row, '.clearit a.l')
    const $user = cFind($row, '.time a.l')
    return {
      id: cData($a, 'href').replace('/index/', ''),
      title: cText($a),
      userId: cData($user, 'href').replace('/user/', ''),
      name: cText($user),
      avatar: matchAvatar(cData(cFind($row, '.avatar .avatarNeue'), 'style')),
      time: cText(cFind($row, '.time .tip_j')),
      last: cText(cFind($row, '.time .tip_j', 1)),
      info: cText(cFind($row, '.desc')),
      anime: Number(cText(cFind($row, '.subject_type_2 .num')) || 0),
      book: Number(cText(cFind($row, '.subject_type_1 .num')) || 0),
      music: Number(cText(cFind($row, '.subject_type_3 .num')) || 0),
      game: Number(cText(cFind($row, '.subject_type_4 .num')) || 0),
      real: Number(cText(cFind($row, '.subject_type_6 .num')) || 0)
    }
  })
}

/** 目录详情 */
export function cheerioCatalogDetail(html: string) {
  const $ = cParse(html, '<div id="header', '<div id="footer')
  const $grp = $('.grp_box')
  const $a = cFind($grp, '.tip_j a.l')

  const href = cData(cFind($grp, '.btnPink'), 'href') || cData(cFind($grp, '.btnBlue'), 'href')
  let joinUrl = ''
  let byeUrl = ''
  if (href.includes('erase_collect')) {
    byeUrl = href
  } else {
    joinUrl = href
  }

  const mono = cMap<CatalogDetailMonoItem>($('.browserCrtList > div'), $row => ({
    id: cData(cFind($row, 'a.l'), 'href'),
    image: cData(cFind($row, 'img.avatar'), 'src'),
    title: cText(cFind($row, 'a.l')),
    info: cText(cFind($row, 'span.tip')) || cText(cFind($row, 'span.badge_job')),
    comment: cText(cFind($row, '.text_main_even .text'))
  }))

  return {
    title: cText($('#header h1')),
    avatar: cData(cFind($grp, 'img.avatar'), 'src'),
    progress: cText($('.progress small')),
    nickname: cText($a),
    userId: cData($a, 'href').replace('/user/', ''),
    time: cText(cFind($grp, '.tip_j .tip')).replace(' ·', ''),
    last: cText(cFind($grp, '.tip_j .tip', 1)),
    collect: cText(cFind($grp, '.tip_j .tip', 2)),
    content: cHtml(cFind($grp, '.line_detail .tip')),
    replyCount: $('.timeline_img li.clearit').length,
    joinUrl,
    byeUrl,

    /** 条目 */
    list: cMap<CatalogDetailItem>($('#browserItemList li.item'), $row => {
      const $a = cFind($row, 'h3 a.l')

      const _type = cData(cFind($row, 'span.ico_subject_type'), 'class')
      let type: SubjectTypeCn
      if (_type.includes('subject_type_2')) {
        type = '动画'
      } else if (_type.includes('subject_type_1')) {
        type = '书籍'
      } else if (_type.includes('subject_type_4')) {
        type = '游戏'
      } else if (_type.includes('subject_type_6')) {
        type = '三次元'
      }

      const $modify = cFind($row, '.tb_idx_rlt')
      return {
        id: cData($a, 'href').replace('/subject/', ''),
        image: cData(cFind($row, 'img.cover'), 'src'),
        title: cText($a),
        type,
        info: cText(cFind($row, 'p.info')),
        comment: cText(cFind($row, '.text_main_even > .text')),
        isCollect: cHas(cFind($row, 'p.collectModify')),

        // 以下属性自己创建的目录才会存在
        order: cData($modify, 'order') || '0',
        modify: cData($modify, 'id')?.replace('modify_', ''),
        erase: cData(cFind($row, '.erase_idx_rlt'), 'href')
      }
    }),

    /** 角色 */
    crt: mono.filter(item => item.id.includes('character')),

    /** 人物 */
    prsn: mono.filter(item => item.id.includes('person')),

    /** 小组话题 */
    topic: cMap<CatalogDetailTopicItem>($('.topic-list > .row'), $row => ({
      id: cData(cFind($row, 'a.l'), 'href'),
      image: matchAvatar(cData(cFind($row, 'span.avatarNeue'), 'style')),
      title: cText(cFind($row, 'a.l')),
      info: cText(cFind($row, 'p.info'), false, true),
      subId: cData(cFind($row, 'a.avatar'), 'href'),
      comment: cText(cFind($row, '.text_main_even .text'))
    })),

    /** 章节 */
    ep: cMap<CatalogDetailEpItem>($('.browserList > .item'), $row => ({
      id: cData(cFind($row, 'a.l'), 'href'),
      image: cData(cFind($row, 'img.avatar'), 'src'),
      title: cText(cFind($row, 'a.l')),
      info: cText(cFind($row, 'span.tip_j')) || cText(cFind($row, 'span.tip')),
      subId: cData(cFind($row, 'h3 + a'), 'href'),
      comment: cText(cFind($row, '.text_main_even .text'))
    })),

    /** 日志 */
    blog: cMap<CatalogDetailBlogItem>($('#entry_list > .item'), $row => ({
      id: cData(cFind($row, 'a.l'), 'href'),
      image: cData(cFind($row, 'img.avatarCover'), 'src'),
      title: cText(cFind($row, 'a.l')),
      info: cText(cFind($row, '.time'), false, true),
      subId: cData(cFind($row, '.time a.l'), 'href'),
      comment: cText(cFind($row, '.text_main_even .text'))
    }))
  } as CatalogDetail
}

/** 全站日志 */
export function cheerioBlog(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnA', '<div id="columnB'))
  return cMap($('#entry_list .item'), $row => {
    const $a = cFind($row, 'h2.title a')
    const $user = cFind($row, '.time a.l')

    const username = cText($user)
    const userId = (cData($user, 'href') || '').replace('/user/', '')
    let subject = ''
    let subjectId = ''
    let replies = ''
    if (cText(cFind($row, '.time a.l', 2))) {
      const $subject = cFind($row, '.time a.l', 1)
      subject = cText($subject)
      subjectId = (cData($subject, 'href') || '').replace('/subject/', '')
      replies = cText(cFind($row, '.time a.l', 2))
    } else {
      replies = cText(cFind($row, '.time a.l', 1))
    }
    if (replies === '0 回复') replies = ''

    return {
      id: cData($a, 'href').replace('/blog/', ''),
      title: cText($a),
      cover: cData(cFind($row, 'a.avatar img'), 'src'),
      time: getBlogItemTime(cText(cFind($row, '.time'), true)),
      content: cText(cFind($row, '.content')).replace(/\r\n/g, ' '),
      username,
      userId,
      subject,
      subjectId,
      replies,
      tags: ''
    } as BlogItem
  })
}

/** 频道聚合 */
export function cheerioChannel(html: string): Channel {
  const $ = cParse(html, '<div class="columns', '<div id="footer')
  return {
    rankTop: [],
    rank: cMap<ChannelRankItem>($('.featuredItems .mainItem'), $row => {
      const $a = $row.find('> a')
      return {
        id: cData($a, 'href').replace('/subject/', ''),
        name: cData($a, 'title'),
        cover: cData($row.find('.image'), 'style')?.split('url(')?.[1]?.split(')')?.[0],
        follow: cText($row.find('.grey'))
      }
    }),
    friends: cMap<ChannelFriendsItem>($('ul.coversSmall > li'), $li => {
      const $subject = $li.find('> a')
      const $user = $li.find('a.l')
      return {
        id: cData($subject, 'href').replace('/subject/', ''),
        name: cData($subject, 'title'),
        cover: $subject.find('img').attr('src'),
        userId: cData($user, 'href').replace('/user/', ''),
        userName: cText($user),
        action: $li
          .find('p.info')
          .text()
          .replace(cText($li.find('p.info a')), '')
          .trim()
      }
    }),
    tags: cMap($('a.level8'), $a => {
      return cText($a)
    }),
    discuss: cMap<ChannelDiscussItem>($('table.topic_list tr'), $li => {
      const $a = $li.find(' > td > a.l')
      const $subject = $li.find(' > td > small.feed > a')
      const $user = $li.find(' > td[align=right] > a')
      return {
        id: $a.attr('href')?.replace('/subject/topic', 'subject'),
        title: HTMLDecode(cText($a)),
        replies: $li.find(' > td > a.l + small.grey').text().trim().replace(/\(|\)/g, ''),
        subjectId: $subject.attr('href')?.replace('/subject/', ''),
        subjectName: cText($subject).replace(/"/g, ''),
        userId: $user.attr('href')?.replace('/user/', ''),
        userName: cText($user),
        time: $li.find(' > td[align=right] > small').text().trim()
      }
    }).filter(item => !!item.id),
    blog: cMap<ChannelBlogItem>($('#entry_list > div.item'), $li => {
      const $a = $li.find('h2.title a')
      const $timeLinks = $li.find('div.time a')
      const timeText = $li.find('div.time').text()
      const timeMatch = timeText.match(/(\d+[分天].*?前)/)
      return {
        id: $a.attr('href')?.replace('/blog/', ''),
        title: cText($a),
        cover: $li.find('p.cover img').attr('src'),
        time: timeMatch ? timeMatch[1] : '',
        replies: $timeLinks.eq(2).text().trim().replace(/\(|\)/g, ''),
        content: `${$li.find('div.content').text().trim().split('...')[0]}...`,
        username: cText($timeLinks.eq(0)),
        subject: cText($timeLinks.eq(1)),
        tags: ''
      }
    })
  }
}

/** 维基人 */
export function cheerioWiki(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnA"', '<div id="columnB"'))
  const getList = (selector: any) =>
    (
      $(selector)
        .map((_index: number, element: any) => {
          const $li = $(element)
          const $a = $li.find('> a')
          const $small = $li.find('small')
          const $user = $small.find('> a')
          const userId = $user.attr('href')?.replace('/user/', '') || ''
          const userName = HTMLDecode($user.text().trim())
          return {
            id: $a.attr('href') || '',
            name: HTMLDecode($a.text().trim()),
            userId,
            userName: userId === userName ? '' : userName,
            detail: HTMLDecode($small.text().trim().split('by ')[0])
              .trim()
              .replace(/^\(|\)$/g, ''),
            time: $li.find('.rr').text().trim()
          }
        })
        .get() || []
    ).filter((_item: any, index: number) => index < 50)

  return {
    counts:
      $('.wikiStats .num')
        .map((_index: number, element: any) => $(element).text())
        .get() || [],
    timeline: {
      all: getList('#wiki_act-all li'),
      lock: getList('#wiki_act-lock li'),
      merge: getList('#wiki_act-merge li'),
      crt: getList('#wiki_act-crt li'),
      prsn: getList('#wiki_act-prsn li'),
      ep: getList('#wiki_act-ep li'),
      relation: getList('#wiki_act-subject-relation li'),
      subjectPerson: getList('#wiki_act-subject-person li'),
      subjectCrt: getList('#wiki_act-subject-crt li')
    },
    last: {
      all: getList('#latest_all li'),
      anime: getList('#latest_2 li'),
      book: getList('#latest_1 li'),
      music: getList('#latest_3 li'),
      game: getList('#latest_4 li'),
      real: getList('#latest_6 li')
    }
  }
}

/** Dollars */
export function cheerioDollars(html: string) {
  const $ = cheerio(html)
  return {
    list: cMap<DollarsItem>($('#chatList ul li'), $row => ({
      id: cData($row, 'id').split('_')?.[1].slice(0, 10),
      avatar: cData($row.find('img.avatar'), 'src').split('/m/')?.[1] || '',
      nickname: cText($row.find('.icon p')),
      msg: cText($row.find('.content p')),
      color: cData($row.find('.content'), 'style').split(':')?.[1] || ''
    })),
    online: cText($('#toolBox')).split(':')?.[1] || '',
    pagination: {
      page: 1,
      pageTotal: 1
    }
  }
}
