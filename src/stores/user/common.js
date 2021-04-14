/*
 * @Author: czy0729
 * @Date: 2020-02-01 22:42:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-10 11:27:39
 */
import { safeObject } from '@utils'
import { cheerio, HTMLTrim } from '@utils/html'
import { matchAvatar } from '@utils/match'

/**
 * @param {*} HTML
 */
export function cheerioPM(HTML) {
  const $ = cheerio(HTMLTrim(HTML))
  return (
    $('table.topic_list > tbody > tr')
      .map((index, element) => {
        const $row = cheerio(element)
        const $a = $row.find('a.avatar')
        const id = $a.attr('href')
        if (!id) {
          return {}
        }

        const $user = $row.find('small.sub_title > a')
        return safeObject({
          id: id ? id.match(/\d+/g)[0] : '',
          title: $a.text(),
          content: $row.find('span.tip').text(),
          avatar: String($row.find('img').attr('src')).split('?')[0],
          name: $user.text(),
          userId: String($user.attr('href')).replace('/user/', ''),
          time: $row.find('small.grey').text(),
          new: !!$row.find('td.pm_new').html()
        })
      })
      .get() || []
  ).filter(item => !!item.id)
}

/**
 * @param {*} HTML
 */
export function cheerioPMDetail(HTML) {
  const $ = cheerio(HTMLTrim(HTML))
  return {
    list:
      $('div#comment_box > div.item')
        .map((index, element) => {
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
  const $ = cheerio(HTMLTrim(HTML))
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
    formhash: $('input[name=formhash]').attr('value')
  }
}
