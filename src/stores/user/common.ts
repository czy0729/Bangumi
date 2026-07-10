/*
 * @Author: czy0729
 * @Date: 2020-02-01 22:42:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 20:34:32
 */
import {
  cData,
  cFind,
  cHas,
  cHasClass,
  cheerio,
  cHtml,
  cMap,
  cParse,
  cText,
  htmlMatch,
  matchAvatar,
  safeObject
} from '@utils'

import type { PmDetail, PmDetailItem, PmItem } from './types'

/** @deprecated 收(发) 件箱 */
export function cheerioPM(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="pm_main', '<div id="pm_sidebar'))
  return (
    $('table.topic_list > tbody > tr')
      .map((_index: number, element: any) => {
        const $row = cheerio(element)
        const $a = $row.find('a.avatar')
        const id = $a.attr('href')
        if (!id) return {}

        const $user = $row.find('small.sub_title > a')
        return safeObject({
          id: id ? id.match(/\d+/g)[0] : '',
          title: $a.text().trim(),
          content: $row.find('span.tip').text().trim(),
          avatar: $row.find('img').attr('src'),
          name: $user.text().trim(),
          userId: String($user.attr('href')).replace('/user/', ''),
          time: $row.find('small.grey').text().trim(),
          new: !!$row.find('td.pm_new').html()
        })
      })
      .get() || []
  ).filter((item: { id: any }) => !!item.id)
}

/** 收(发)件箱 */
export function cheerioPMV2(html: string): PmItem[] {
  const $ = cParse(html, '<div class="pm-conversation-list', '<div id="pm_pager')
  return cMap<PmItem>($('a.pm-conversation-item'), $row => {
    const id = cData($row, 'href').match(/\/conversation\/(\d+)/)?.[1] || ''
    if (!id) return {} as PmItem

    const avatar =
      cData(cFind($row, '.avatarNeue'), 'style').match(/url\(['"]?([^'"]+)['"]?\)/)?.[1] || ''
    const name = cText(cFind($row, '.pm-conversation-name'))
    const time = cText(cFind($row, '.pm-conversation-date'))
    const rawDesc = cText(cFind($row, '.pm-conversation-desc')).replace(/\s+/g, ' ').trim()
    const isNew =
      cHasClass($row, 'pm_new') ||
      cHas(cFind($row, '.pm_new')) ||
      cHas(cFind($row, '.pm-conversation-unread'))

    const hasRe = rawDesc.startsWith('Re:')
    const cleanDesc = hasRe ? rawDesc.slice(3).trim() : rawDesc
    let title = cleanDesc
    let content = cleanDesc
    if (cleanDesc.includes(' / ')) {
      const parts = cleanDesc.split(' / ')
      title = parts[0].trim()
      content = parts.slice(1).join(' / ').trim()
    }
    if (hasRe) content = `Re: ${content}`

    const userId = avatar.match(/\/(\d+)\.jpg/)?.[1] || '0'

    return {
      id,
      title,
      content,
      avatar,
      name,
      userId,
      time,
      new: isNew
    }
  }).filter(item => !!item.id)
}

/** @deprecated 收(发) 件箱内容 */
export function cheerioPMDetail(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject', '<div id="footer'))
  return {
    list: cMap($('div#comment_box > div.item'), $row => {
      const content = cHtml($row.find('div.text_pm')).split('</a>:')
      content.shift()
      return {
        name: cText($row.find('div.rr + a.l')),
        avatar: matchAvatar(cData($row.find('span.avatarSize32'), 'style')),
        userId: cData($row.find('a.avatar'), 'href').replace('/user/', ''),
        content: content.join(''),
        time: cText($row.find('small.grey')).replace(' / del', '').slice(2)
      }
    }),
    form: {
      related: cData($('input[name=related]'), 'value'),
      msg_receivers: cData($('input[name=msg_receivers]'), 'value'),
      current_msg_id: cData($('input[name=current_msg_id]'), 'value'),
      formhash: cData($('input[name=formhash]'), 'value'),
      msg_title: cData($('input[name=msg_title]'), 'value')
    }
  }
}

/** 收(发)件箱内容 */
export function cheerioPMDetailV2(html: string): PmDetail {
  const $ = cParse(html, '<div class="pm-chat-panel', '<div id="footer')
  const peerName = cText(cFind($('.pm-chat-title'), 'strong a.l'))
  const peerUserId = (cData(cFind($('.pm-chat-title'), 'strong a.l'), 'href') || '').replace('/user/', '')

  // 解析线程列表
  const threads = cMap<{
    id: string
    title: string
    current: boolean
  }>($('.pm-thread-filter a'), $a => ({
    id: (cData($a, 'href').match(/thread=(\d+)/)?.[1] || ''),
    title: cText($a).trim(),
    current: cHasClass($a, 'focus')
  }))

  // 构建线程标题 → ID 映射
  const threadTitleMap: Record<string, string> = {}
  threads.forEach(t => {
    if (t.title) threadTitleMap[t.title] = t.id
  })

  let currentThreadId = ''
  const list = cMap<PmDetailItem>($('div.pm-message-list').children(), $el => {
    if (cHasClass($el, 'pm-thread-label')) {
      const labelText = cText($el).trim()
      currentThreadId = threadTitleMap[labelText] || ''
      return {
        type: 'label',
        content: labelText,
        threadId: currentThreadId,
        threadTitle: labelText
      } as PmDetailItem
    }

    if (cHasClass($el, 'pm-message')) {
      const avatar =
        cData(cFind($el, 'span.avatarNeue'), 'style').match(/url\(['"]?([^'"]+)['"]?\)/)?.[1] || ''
      const userId = cData(cFind($el, 'a.avatar'), 'href').replace('/user/', '')
      const isSelf = cHasClass($el, 'pm-message-self')

      return {
        type: 'message',
        name: isSelf ? '我' : peerName || userId,
        avatar,
        userId,
        content: cHtml(cFind($el, 'div.pm-message-body')),
        time: cText(cFind($el, 'div.pm-message-info small')).replace(/\s*\/\s*del\s*$/, '').trim(),
        threadId: currentThreadId || undefined
      }
    }

    return {} as PmDetailItem
  }).filter(item => !!item.type)

  return {
    list,
    form: {
      related: cData($('input[name=related]'), 'value'),
      msg_receivers: cData($('input[name=msg_receivers]'), 'value'),
      current_msg_id: '',
      formhash: cData($('input[name=formhash]'), 'value'),
      msg_title: cData($('input[name=msg_title]'), 'value'),
      new_topic: cData($('input[name=new_topic]'), 'value') || undefined,
      threads: threads.length > 0 ? threads : undefined,
      peerUserId,
      peerUserName: peerName || undefined
    }
  }
}

/** 新短信参数 */
export function cheerioPMParams(html: string) {
  const $ = cheerio(html)
  return {
    formhash: $('input[name=formhash]').attr('value'),
    msg_receivers: $('input[name=msg_receivers]').attr('value')
  }
}

/** 个人设置 */
export function cheerioUserSetting(html: string) {
  const $ = cParse(html, '<div id="columnSearchB', '<div id="footer')
  return {
    sign: cText($('#newbio')),
    nickname: cData($('input[name=nickname]'), 'value'),
    sign_input: cData($('input[name=sign_input]'), 'value'),
    formhash: cData($('input[name=formhash]'), 'value'),
    timeoffsetnew: cData($('select[name=timeoffsetnew] option[selected=selected]'), 'value') || '8',
    show_nsfw_subject: cHas($('input[name=show_nsfw_subject][checked]'))
  }
}

/** 我的标签 */
export function cheerioTags(html: string): string[] {
  html = html.split('<span class="tip_j ll">我的标签 </span>')?.[1] || ''
  if (!html) return []

  try {
    const $ = cheerio(html)
    return (
      $('a.btnGray')
        .map((_index: number, element: any) => {
          return cheerio(element).text().trim()
        })
        .get() || []
    )
  } catch (error) {
    return []
  }
}
