/*
 * @Author: czy0729
 * @Date: 2020-02-01 22:42:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 06:08:15
 */
import { cData, cheerio, cHtml, cMap, cText, htmlMatch, matchAvatar, safeObject } from '@utils'

/** 收(发) 件箱 */
export function cheerioPM(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="pm_main">', '<div id="pm_sidebar">'))
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

/** 收(发) 件箱 */
export function cheerioPMV2(html: string) {
  // 适配新的最外层容器 pm-conversation-list
  const $ = cheerio(htmlMatch(html, '<div class="pm-conversation-list', '<div id="pm_pager'))

  return (
    $('a.pm-conversation-item')
      .map((_index: number, element: any) => {
        const $row = cheerio(element)

        // 1. 提取会话/消息 ID
        const href = $row.attr('href') || ''
        const idMatch = href.match(/\/conversation\/(\d+)/)
        const id = idMatch ? idMatch[1] : ''
        if (!id) return {}

        // 2. 提取头像 (从 background-image 的 url 中提取)
        const style = $row.find('.avatarNeue').attr('style') || ''
        const avatarMatch = style.match(/url\(['"]?([^'"]+)['"]?\)/)
        const avatar = avatarMatch ? avatarMatch[1] : ''

        // 3. 提取用户名和时间
        const name = $row.find('.pm-conversation-name').text().trim()
        const time = $row.find('.pm-conversation-date').text().trim()

        // 4. 精细化拆分标题与内容 (剥离 Re: 并转移到 content)
        const rawDesc = $row.find('.pm-conversation-desc').text().trim()

        // 检查是否有 Re: 开头
        const hasRe = rawDesc.startsWith('Re:')
        // 如果有，先去掉 Re: 方便后续切分标题
        const cleanDesc = hasRe ? rawDesc.slice(3).trim() : rawDesc

        let title = cleanDesc
        let content = cleanDesc

        if (cleanDesc.includes(' / ')) {
          const parts = cleanDesc.split(' / ')
          title = parts[0].trim()
          content = parts.slice(1).join(' / ').trim()
        }

        // 如果原本带 Re:，将其重新拼接到 content 前面
        if (hasRe) {
          content = `Re: ${content}`
        }

        // 5. 判断是否为新消息
        const isNew = $row.hasClass('pm_new') || !!$row.find('.pm_new').length

        return safeObject({
          id,
          title,
          content,
          avatar,
          name,
          userId: id,
          time,
          new: isNew
        })
      })
      .get() || []
  ).filter((item: { id: any }) => !!item.id)
}

/** 收(发) 件箱内容 */
export function cheerioPMDetail(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject"', '<div id="footer">'))
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

/** 收(发) 件箱内容 */
export function cheerioPMDetailV2(html: string) {
  const $ = cheerio(htmlMatch(html, '<div class="pm-chat-panel', '<div id="footer'))
  const peerName = $('.pm-chat-title strong a.l').text().trim()

  const list: any[] = []

  // 遍历列表容器下的所有直接子节点 (包括 label 和 message)
  $('div.pm-message-list')
    .children()
    .each((_index: number, element: any) => {
      const $el = $(element)

      // 情况 A：如果是主题分割标签
      if ($el.hasClass('pm-thread-label')) {
        list.push({
          type: 'label',
          content: $el.text().trim() // "想让你用codex看看分支ech-proxy"
        })
        return
      }

      // 情况 B：如果是真正的消息气泡
      if ($el.hasClass('pm-message')) {
        const style = $el.find('span.avatarNeue').attr('style') || ''
        const avatarMatch = style.match(/url\(['"]?([^'"]+)['"]?\)/)
        const avatar = avatarMatch ? avatarMatch[1] : ''

        const userHref = $el.find('a.avatar').attr('href') || ''
        const userId = userHref.replace('/user/', '')

        const isSelf = $el.hasClass('pm-message-self')
        const name = isSelf ? '我' : peerName || userId
        const content = $el.find('div.pm-message-body').html() || ''

        const timeRaw = $el.find('div.pm-message-info small').text() || ''
        const time = timeRaw.split(' / ')[0].trim()

        list.push({
          type: 'message', // 标记为消息类型
          name,
          avatar,
          userId,
          content: content.trim(),
          time
        })
      }
    })

  const form = {
    related: $('input[name=related]').attr('value') || '',
    msg_receivers: $('input[name=msg_receivers]').attr('value') || '',
    current_msg_id: '',
    formhash: $('input[name=formhash]').attr('value') || '',
    msg_title: $('input[name=msg_title]').attr('value') || ''
  }

  return {
    list,
    form
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
  const $ = cheerio(htmlMatch(html, '<div id="columnSearchB', '<div id="footer'))
  return {
    sign: $('#newbio').text().trim(),
    nickname: $('input[name=nickname]').attr('value'),
    sign_input: $('input[name=sign_input]').attr('value'),
    formhash: $('input[name=formhash]').attr('value'),
    timeoffsetnew: $('select[name=timeoffsetnew] option[selected=selected]').attr('value') || '8',
    show_nsfw_subject: $('input[name=show_nsfw_subject]').attr('value') === '1'
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
