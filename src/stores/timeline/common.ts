/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:11:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-09 07:18:20
 */
import {
  cData,
  cEach,
  cFind,
  cheerio,
  cHtml,
  cMap,
  cParse,
  cText,
  htmlMatch,
  matchAvatar,
  relativeToEpoch,
  safeObject
} from '@utils'
import { LIKE_TYPE_TIMELINE } from '@constants'

import type { TimeLineScopeCn, TopicId } from '@types'
import type { Likes } from '../rakuen/types'
import type { TimelineItem } from './types'

const NODE_TYPE_RAW_TEXT = 3

/**
 * 解析时间胶囊 HTML
 * @param html    时间胶囊页面 HTML
 * @param page    当前页码
 * @param scopeCn 范围中文 ('自己' | '好友' | '全站' | ...)
 * @param _loaded 数据加载时的时间戳（毫秒），传入会给每项补 _time 字段（epoch 秒）
 */
export function cheerioTimeline(
  html: string,
  { page, scopeCn }: { page: number; scopeCn: TimeLineScopeCn },
  _loaded?: number
) {
  const isSelf = scopeCn === '自己'
  const $ = cParse(html, '<div id="timeline', '<div id="tmlPager')

  const list = cMap<TimelineItem | null>($('li'), $li => {
    try {
      const date = cText($li.closest('ul').prev('h4'))
      const item = cheerioTimelineItem($li, { date, page, isSelf })
      if (item && _loaded) {
        const epoch = relativeToEpoch(item.time, _loaded)
        if (epoch !== undefined) item.epoch = epoch
      }
      return item
    } catch (error) {
      return null
    }
  }).filter((item): item is TimelineItem => !!item?.id)

  let likes: Likes = {}
  try {
    const rawMatch =
      html.match(/data_likes_list\s*=\s*(\{[\s\S]*?\})\s*var\s+data/) ||
      html.match(/data_likes_list\s*=\s*(\{.*?\});/)
    if (rawMatch) {
      const raw = rawMatch[1]
        .replace(/'/g, '"')
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
        .replace(/,\s*([}\]])/g, '$1')
      likes = JSON.parse(raw)
    }
  } catch {}

  return {
    list,
    pagination: {
      page,
      pageTotal: scopeCn === '全站' ? 1 : list.length ? 100 : page
    },
    likes
  }
}

/** 解析单条时间胶囊 */
function cheerioTimelineItem(
  $row: any,
  { date, page, isSelf }: { date: string; page: number; isSelf: boolean }
): TimelineItem {
  const $info = cFind($row, '.info, .info_full')
  const $texts = $info.contents().filter(function () {
    return (
      this.nodeType === NODE_TYPE_RAW_TEXT &&
      this.parent === $info[0] &&
      String(this.data || '').trim()
    )
  })
  const $card = cFind($info, '.card')
  const $reply = cFind($info, 'a.tml_comment')
  let $p1: any

  // 个人主页中的时间胶囊不存在位置 1
  if (!isSelf) {
    const $p1List = $info.find('> a.l:not(.rr)')

    // 小组分类下, 网页结构没发现唯一性, 对具体 href 判断
    if (($p1List.eq(0).attr('href') || '').includes('/group/')) {
      $p1 = $p1List.eq(1)
    } else {
      $p1 = $p1List.eq(0)
    }
  }

  /** 位置 1, 通常是用户信息 */
  const p1 = {
    text: $p1 ? cText($p1) : '',
    url: $p1 ? cData($p1, 'href') : ''
  }

  /** 位置 2, 通常是动作 */
  const p2 = {
    text: cText($texts.eq(0))
  }

  /** 位置 3, 通常是条目 */
  const p3 = {
    text: [],
    url: []
  }
  cEach($info.find('> a'), ($a, index) => {
    const text = cText($a)
    const href = cData($a, 'href')
    if (text && href && href !== p1.url) {
      // 在个人主页中第一个 a 并不存在用户名字
      // 全局下第一个 a 通常是用户名字, 需要排除
      if (!isSelf && index === 0) return

      p3.text.push(text)
      p3.url.push(href)
    }
  })

  /** 位置 4, 通常是动作补充 */
  const p4 = {
    text: cText($texts.eq(1))
  }
  if (p4.text === '、') {
    p4.text = cText($texts.last())

    // 收藏了多个人物的情况
    if (!p4.text) p4.text = cText($texts.eq($texts.length - 3))
  }

  /** 头像 */
  const avatar = {
    src: matchAvatar(cData(cFind($row, '.avatarNeue'), 'style')),
    url: cData(cFind($row, 'a.avatar'), 'href')
  }

  /** 主条目文字 (只有 ep 才显示) */
  const subject = {
    subject: '',
    subjectId: ''
  }
  if (p3.text?.[0]?.includes('ep.')) {
    subject.subject = cText(
      $card
        .find('.title a')
        .contents()
        .filter(function () {
          return this.nodeType === NODE_TYPE_RAW_TEXT
        })
    )
    subject.subjectId = cData(cFind($card, 'a'), 'href').split('/subject/')?.[1]
  }

  /** 时间 */
  let time = cText(cFind($row, '.titleTip'))
  const dateText = cText(cFind($row, '.date')).toLocaleLowerCase()
  if (dateText.includes('mobile')) time += ' · mobile'
  if (dateText.includes('api')) time += ' · api'
  time = time.replace('小时', '时').replace('分钟', '分')

  /** 右侧封面或人物头像 */
  const image = []
  if (cData($card, 'class').trim() === 'card') {
    const src = cData(cFind($card, 'img'), 'src')
    if (src) image.push(src)
  }
  if (!image.length) {
    cEach($row.find('.imgs img, img.rr, .rr img'), $img => {
      const src = cData($img, 'src')
      if (src) image.push(src)
    })
  }

  const id = `${page}|${cData($row, 'id').replace('tml_', '')}`
  return safeObject({
    id,
    date,
    avatar,
    p1,
    p2,
    p3,
    p4,
    ...subject,
    time,
    star: cData(cFind($row, '.collectInfo .starlight'), 'class').replace('starlight stars', ''),
    comment: cText(cFind($row, '.comment')),
    reply: {
      content: cHtml(cFind($row, '.status')),
      count: cText($reply),
      url: cData($reply, 'href')
    },
    like: {
      type: Number(cData(cFind($row, 'a.like_dropdown'), 'data-like-type')) || LIKE_TYPE_TIMELINE,
      mainId: id as TopicId,
      relatedId: cData(cFind($row, '.likes_grid'), 'id').replace('likes_grid_', '')
    },
    image,
    clearHref: cData(cFind($row, '.tml_del'), 'href')
  })
}

/** 吐槽 */
export function cheerioSay(html: string) {
  const $ = cheerio(htmlMatch(html, '<div class="columnsApp', '<div id="footer">'))
  const id = cText($('div.statusHeader p.tip')).replace('@', '')
  const avatar = $('img.avatar').attr('src')
  const main = safeObject({
    id,
    avatar,
    name: cText($('div.statusHeader h3 > a')),
    text: cHtml($('div.statusContent > p.text')) || cHtml($('.sub_info .comment')),
    date: cText($('p.date.tip_j')),
    formhash: $('input[name=formhash]').attr('value')
  })

  const sub = $('ul.subReply > li.reply_item')
    .map((_index: number, element: any) => {
      const $tr = cheerio(element)
      const $a = $tr.find('a.cmt_reply')
      const subId = cText($a).replace('@', '')
      let tr = $tr.html().trim()
      tr = tr.slice(tr.indexOf('-</span> ') + 9, tr.length)
      return safeObject({
        id: subId,
        avatar: id === subId ? avatar : '',
        name: cText($tr.find('a.cmt_reply + a.l')),
        text: tr,
        uid: (cData($a, 'id') || '').replace('reply_', '')
      })
    })
    .get()

  return [main, ...sub]
}

/** 吐槽表单授权码 */
export function cheerioFormHash(html: string) {
  const $ = cheerio(htmlMatch(html, '<form id="SayFrom"', '</form>'))
  return $('input[name=formhash]').attr('value') || ''
}
