/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-11 16:14:58
 */
import { safeObject } from '@utils'
import { cheerio } from '@utils/html'

/** 分析更多角色 */
export function cheerioCharacters(HTML: string) {
  const $ = cheerio(HTML)
  return (
    $('div.light_odd')
      .map((index: number, element: any) => {
        const $li = cheerio(element)
        const $a = $li.find('> div.clearit > h2 > a')
        const cover = $li.find('img.avatar').attr('src') || ''
        return safeObject({
          id: $a.attr('href').replace('/character/', ''),
          cover: cover !== '/img/info_only.png' ? String(cover).split('?')[0] : '',
          name: $a.text().trim(),
          nameCn: $li
            .find('> div.clearit > h2 > span.tip')
            .text()
            .trim()
            .replace('/ ', ''),
          replies: $li.find('small.na').text().trim().replace(/\(|\)/g, ''),
          position: $li.find('span.badge_job').text().trim(),
          info: $li.find('div.crt_info span.tip').text().trim(),
          actors: $li
            .find('.actorBadge')
            .map((index: number, element: any) => {
              const $a = cheerio(element)
              const cover = String($a.find('img.avatar').attr('src') || '')
              return {
                id: String($a.find('a.avatar').attr('href') || '').replace(
                  '/person/',
                  ''
                ),
                cover:
                  cover !== '/img/info_only.png' ? String(cover).split('?')?.[0] : '',
                name: $a.find('small.grey').text().trim(),
                nameCn: $a.find('a.l').text().trim()
              }
            })
            .get()
        })
      })
      .get() || []
  )
}

/**
 * 分析更多制作人员
 * @param {*} HTML
 */
export function cheerioPersons(HTML: string) {
  const $ = cheerio(HTML)
  return (
    $('div.light_odd')
      .map((index: number, element: any) => {
        const $li = cheerio(element)
        const $a = $li.find('h2 > a')
        const [name, nameCn] = String($a.text().trim()).split('/')
        const cover = $li.find('img.avatar').attr('src')
        const position = []
        $li.find('span.badge_job').each((idx: number, ele: any) => {
          const $item = cheerio(ele)
          position.push($item.text().trim())
        })
        return safeObject({
          id: $a.attr('href').replace('/character/', ''),
          cover: cover !== '/img/info_only.png' ? String(cover).split('?')[0] : '',
          name,
          nameCn,
          replies: $li.find('small.na').text().trim(),
          position: position.join('、'),
          info: $li.find('div.crt_info span.tip').text().trim()
        })
      })
      .get() || []
  )
}
