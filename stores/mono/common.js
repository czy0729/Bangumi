/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 20:20:02
 */
import { safeObject } from '@utils'
import { cheerio } from '@utils/html'

/**
 * 分析更多角色
 * @param {*} HTML
 */
export function cheerioCharacters(HTML) {
  const $ = cheerio(HTML)
  return (
    $('div.light_odd')
      .map((index, element) => {
        const $li = cheerio(element)
        const $a = $li.find('> div.clearit > h2 > a')
        const $actorA = $li.find('div.actorBadge a.l')
        const cover = $li.find('img.avatar').attr('src')
        const actorCover = $li.find('div.actorBadge img').attr('src')
        return safeObject({
          id: $a.attr('href').replace('/character/', ''),
          cover:
            cover !== '/img/info_only.png' ? String(cover).split('?')[0] : '',
          name: $a.text().trim(),
          nameCn: $li
            .find('> div.clearit > h2 > span.tip')
            .text()
            .trim()
            .replace('/ ', ''),
          replies: $li.find('small.na').text().trim(),
          position: $li.find('span.badge_job').text().trim(),
          info: $li.find('div.crt_info span.tip').text().trim(),
          actorId: $actorA.attr('href').replace('/person/', ''),
          actorCover:
            actorCover !== '/img/info_only.png'
              ? String(actorCover).split('?')[0]
              : '',
          actor: $actorA.text().trim(),
          actorCn: $li.find('div.actorBadge small.grey').text().trim()
        })
      })
      .get() || []
  )
}

/**
 * 分析更多制作人员
 * @param {*} HTML
 */
export function cheerioPersons(HTML) {
  const $ = cheerio(HTML)
  return (
    $('div.light_odd')
      .map((index, element) => {
        const $li = cheerio(element)
        const $a = $li.find('h2 > a')
        const [name, nameCn] = String($a.text().trim()).split('/')
        const cover = $li.find('img.avatar').attr('src')
        return safeObject({
          id: $a.attr('href').replace('/character/', ''),
          cover:
            cover !== '/img/info_only.png' ? String(cover).split('?')[0] : '',
          name,
          nameCn,
          replies: $li.find('small.na').text().trim(),
          position: $li.find('span.badge_job').text().trim(),
          info: $li.find('div.crt_info span.tip').text().trim()
        })
      })
      .get() || []
  )
}
