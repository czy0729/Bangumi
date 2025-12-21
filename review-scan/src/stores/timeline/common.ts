/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:11:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 13:25:08
 */
import {
  cData,
  cheerio,
  cText,
  getTimestamp,
  htmlMatch,
  matchAvatar,
  safeObject,
  trim
} from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTML_TIMELINE, LIST_EMPTY, MODEL_TIMELINE_SCOPE } from '@constants'
import { Override, TimeLineScope, TimeLineScopeCn, TimeLineType, UserId } from '@types'
import { Likes } from '../rakuen/types'
import { Timeline } from './types'

const NODE_TYPE_RAW_TEXT = 3

/** 请求时间胶囊 */
export async function fetchTimeline(
  args: {
    scope?: TimeLineScope
    type?: TimeLineType
    userId?: UserId
  } = {},
  refresh?: boolean,
  prevTimeline?: Timeline,
  userInfo?: any
): Promise<
  Override<
    Timeline,
    {
      likes: Likes
    }
  >
> {
  const { scope, type, userId } = args || {}
  const oldData = prevTimeline || LIST_EMPTY
  const page = refresh ? 1 : oldData?.pagination.page + 1
  const scopeCn = MODEL_TIMELINE_SCOPE.getLabel<TimeLineScopeCn>(scope)
  const isSelf = scopeCn === '自己'

  const html = await fetchHTML({
    url: HTML_TIMELINE(scope, type, userId || userInfo?.username, page)
  })
  const list = []
  const $ = cheerio(htmlMatch(html, '<div id="timeline">', '<div id="tmlPager">'))

  $('h4').each((_index: number, element: any) => {
    const $row = cheerio(element)
    const date = cText($row)

    $row
      .next()
      .find('li')
      .each((_index: number, element: any) => {
        try {
          const $row = cheerio(element)
          const $info = $row.find('.info, .info_full')
          const $texts = $info.contents().filter(function () {
            return this.nodeType === NODE_TYPE_RAW_TEXT && this.parent === $info[0]
          })
          const $card = $info.find('.card')
          const $reply = $info.find('a.tml_comment')
          let $p1: any

          // 个人主页中的时间胶囊不存在位置 1
          if (!isSelf) {
            $p1 = $info.find('> a.l:not(.rr)')

            // 小组分类下, 网页结构没发现唯一性, 对具体 href 判断
            if (($p1.eq(0).attr('href') || '').includes('/group/')) {
              $p1 = $p1.eq(1)
            } else {
              $p1 = $p1.eq(0)
            }
          }

          /** 位置 1, 通常是用户信息 */
          const p1 = {
            text: '',
            url: ''
          }
          if ($p1) {
            p1.text = cText($p1)
            p1.url = $p1.attr('href') || ''
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
          $info.find('> a').each((index: number, element: any) => {
            const $row = cheerio(element)
            const text = cText($row)
            const href = $row.attr('href')
            if (text && href && href !== p1.url) {
              // 在个人主页中第一个 a 并不存在用户名字
              // 全局下第一个 a 通常是用户名字, 需要排除
              if (!isSelf && !index) return

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
            src: matchAvatar($row.find('.avatarNeue').attr('style')) || '',
            url: $row.find('a.avatar').attr('href') || ''
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
            subject.subjectId = ($card.find('a').attr('href') || '').split('/subject/')?.[1]
          }

          /** 时间 */
          let time = cText($row.find('.titleTip'))
          const dateText = cText($row.find('.date')).toLocaleLowerCase()
          if (dateText.includes('mobile')) time += ' · mobile'
          if (dateText.includes('api')) time += ' · api'
          time = time.replace('小时', '时').replace('分钟', '分')

          /** 右侧封面或人物头像 */
          const image = []

          // 大卡片
          if ($card) {
            if (($card.attr('class') || '').trim() === 'card') {
              const src = $card.find('img').attr('src')
              if (src) image.push(src)
            }
          }

          // 多条目, 人物, 好友
          if (!image.length) {
            $row.find('.imgs img, img.rr, .rr img').each((_index: number, element: any) => {
              const $row = cheerio(element)
              const src = $row.attr('src')
              if (src) image.push(src)
            })
          }

          const id = `${page}|${($row.attr('id') || '').replace('tml_', '')}`
          list.push({
            id,
            date,
            avatar,
            p1,
            p2,
            p3,
            p4,
            ...subject,
            time,
            star: ($row.find('.collectInfo .starlight').attr('class') || '').replace(
              'starlight stars',
              ''
            ),
            comment: cText($row.find('.comment')),
            reply: {
              content: cText($row.find('.status')),
              count: cText($reply),
              url: $reply.attr('href') || ''
            },
            like: {
              type: 40,
              mainId: id,
              relatedId: ($row.find('.likes_grid').attr('id') || '').replace('likes_grid_', '')
            },
            image,
            clearHref: $row.find('.tml_del').attr('href') || ''
          })
        } catch (error) {}
      })
  })

  let likes: Likes = {}
  try {
    likes = JSON.parse(html.match(/data_likes_list\s*=\s*(\{.*?\});/)?.[1])
  } catch (error) {}

  return {
    list: page === 1 ? list : [...oldData.list, ...list],
    pagination: {
      page,
      pageTotal: scopeCn === '全站' ? 1 : list.length ? 100 : page
    },
    likes,
    _loaded: getTimestamp()
  }
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
    text: trim($('div.statusContent > p.text').html()),
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
        uid: cData($a, 'id').replace('reply_', '')
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
