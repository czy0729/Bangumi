/*
 * @Author: czy0729
 * @Date: 2020-02-01 22:42:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 21:34:19
 */
import { cheerio, htmlMatch, matchAvatar, safeObject } from '@utils'

/** 收(发) 件箱 */
export function cheerioPM(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="pm_main">', '<div id="pm_sidebar">'))
  return (
    $('table.topic_list > tbody > tr')
      .map((index: number, element: any) => {
        const $row = cheerio(element)
        const $a = $row.find('a.avatar')
        const id = $a.attr('href')
        if (!id) return {}

        const $user = $row.find('small.sub_title > a')
        return safeObject({
          id: id ? id.match(/\d+/g)[0] : '',
          title: $a.text().trim(),
          content: $row.find('span.tip').text().trim(),
          avatar: String($row.find('img').attr('src')).split('?')[0],
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
  const $ = cheerio(html)
  return {
    list:
      $('div#comment_box > div.item')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const content = $row.find('div.text_pm').html().split('</a>:')
          content.shift()
          return safeObject({
            name: $row.find('div.rr + a.l').text(),
            avatar: matchAvatar($row.find('span.avatarSize32').attr('style')),
            userId: $row.find('a.avatar').attr('href').replace('/user/', ''),
            content: content.join(''),
            time: $row.find('small.grey').text().replace(' / del', '').slice(2)
          })
        })
        .get() || [],
    form: {
      related: $('input[name=related]').attr('value'),
      msg_receivers: $('input[name=msg_receivers]').attr('value'),
      current_msg_id: $('input[name=current_msg_id]').attr('value'),
      formhash: $('input[name=formhash]').attr('value'),
      msg_title: $('input[name=msg_title]').attr('value')
    }
  }
}

/**
 * @param {*} HTML
 */
export function cheerioPMParams(HTML) {
  const $ = cheerio(HTML)
  return {
    formhash: $('input[name=formhash]').attr('value'),
    msg_receivers: $('input[name=msg_receivers]').attr('value')
  }
}

/**
 * @param {*} HTML
 */
export function cheerioUserSetting(HTML) {
  const $ = cheerio(HTML)
  return {
    sign: $('#newbio').text().trim(),
    nickname: $('input[name=nickname]').attr('value'),
    sign_input: $('input[name=sign_input]').attr('value'),
    formhash: $('input[name=formhash]').attr('value'),
    timeoffsetnew:
      $('select[name=timeoffsetnew] option[selected=selected]').attr('value') || '8'
  }
}

/** 分析我的标签 */
export function cheerioTags(html: string): string[] {
  html = html.split('<span class="tip_j ll">我的标签 </span>')?.[1] || ''
  if (!html) return []

  try {
    const $ = cheerio(html)
    return (
      $('a.btnGray')
        .map((index: number, element: any) => {
          return cheerio(element).text().trim()
        })
        .get() || []
    )
  } catch (error) {
    return []
  }
}
