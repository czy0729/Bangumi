/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:11:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-26 03:13:37
 */
import { HTMLTrim, cheerio, getTimestamp, matchAvatar, safeObject, trim } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY, HTML_TIMELINE, MODEL_TIMELINE_SCOPE } from '@constants'
import { ListEmpty, TimeLineScope, TimeLineScopeCn, TimeLineType, UserId } from '@types'
import { Timeline } from './types'

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
): Promise<ListEmpty<Timeline>> {
  const { scope, type, userId } = args || {}
  const oldData = prevTimeline || LIST_EMPTY
  const page = refresh ? 1 : oldData?.pagination.page + 1
  const scopeCn = MODEL_TIMELINE_SCOPE.getLabel<TimeLineScopeCn>(scope)
  const isSelf = scopeCn === '自己'

  const raw = await fetchHTML({
    url: HTML_TIMELINE(scope, type, userId || userInfo?.username, page)
  })
  const html = HTMLTrim(raw).match(/<div id="timeline">(.+?)<div id="tmlPager">/g)?.[0]
  const list = []
  cheerio(html)('li').each((index: number, element: any) => {
    try {
      const $row = cheerio(element)
      const $info = $row.find('.info, .info_full')
      const $texts = $info.contents().filter(function () {
        return this.nodeType === 3 && this.parent === $info[0]
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
        p1.text = $p1.text().trim()
        p1.url = $p1.attr('href') || ''
      }

      /** 位置 2, 通常是动作 */
      const p2 = {
        text: $texts.eq(0).text().trim()
      }

      /** 位置 3, 通常是条目 */
      const p3 = {
        text: [],
        url: []
      }
      $info.find('> a').each((index: number, element: any) => {
        const $row = cheerio(element)
        const text = $row.text().trim()
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
        text: $texts.eq(1).text().trim()
      }
      if (p4.text === '、') p4.text = $texts.last().text().trim()

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
        subject.subject = $card.find('.title').text().trim()
        subject.subjectId = ($card.find('a').attr('href') || '').split('/subject/')?.[1]
      }

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
        $row.find('.imgs img, img.rr, .rr img').each((index: number, element: any) => {
          const $row = cheerio(element)
          const src = $row.attr('src')
          if (src) image.push(src)
        })
      }

      list.push({
        id: `${page}|${($row.attr('id') || '').replace('tml_', '')}`,
        date: '今天',
        avatar,
        p1,
        p2,
        p3,
        p4,
        ...subject,
        time: $row
          .find('.date')
          .text()
          .trim()
          .split('·')
          .filter(item => !(item.includes('回复') || item.includes('web')))
          .join(' · '),
        star: ($row.find('.comment .starlight').attr('class') || '').replace(
          'starlight stars',
          ''
        ),
        comment: $row.find('.comment').text().trim(),
        reply: {
          content: $row.find('.status').text().trim(),
          count: $reply.text().trim(),
          url: $reply.attr('href') || ''
        },
        image,
        clearHref: ''
      })
    } catch (error) {}
  })

  return {
    list: page === 1 ? list : [...oldData.list, ...list],
    pagination: {
      page,
      pageTotal: scopeCn === '全站' ? 1 : 100
    },
    _loaded: getTimestamp()
  }
}

/** 分析吐槽 */
export function analysisSay(html: string) {
  const $ = cheerio(html)
  const id = ($('div.statusHeader p.tip').text() || '').replace('@', '')
  const avatar = $('img.avatar').attr('src')
  const main = safeObject({
    id,
    avatar,
    name: $('div.statusHeader h3 > a').text(),
    text: trim($('div.statusContent > p.text').html()),
    date: $('p.date.tip_j').text(),
    formhash: $('input[name=formhash]').attr('value')
  })
  const sub = $('ul.subReply > li.reply_item')
    .map((index, element) => {
      const $tr = cheerio(element)
      const subId = ($tr.find('a.cmt_reply').text() || '').replace('@', '')
      let tr = $tr.html().trim()
      tr = tr.slice(tr.indexOf('-</span> ') + 9, tr.length)
      return safeObject({
        id: subId,
        avatar: id === subId ? avatar : '',
        name: $tr.find('a.cmt_reply + a.l').text(),
        text: tr
      })
    })
    .get()

  return [main, ...sub]
}

/**
 * 分析吐槽表单授权码
 * @param {*} HTML
 */
export function analysisFormHash(HTML) {
  const $ = cheerio(HTML)
  return $('input[name=formhash]').attr('value') || ''
}
