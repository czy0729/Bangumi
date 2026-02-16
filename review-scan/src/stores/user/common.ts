/*
 * @Author: czy0729
 * @Date: 2020-02-01 22:42:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 19:10:17
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
  const $ = cheerio(htmlMatch(html, '<div id="columnA"', '<div id="footer">'))
  return {
    sign: $('#newbio').text().trim(),
    nickname: $('input[name=nickname]').attr('value'),
    sign_input: $('input[name=sign_input]').attr('value'),
    formhash: $('input[name=formhash]').attr('value'),
    timeoffsetnew: $('select[name=timeoffsetnew] option[selected=selected]').attr('value') || '8'
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
