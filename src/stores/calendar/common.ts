/*
 * @Author: czy0729
 * @Date: 2019-08-11 20:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 12:21:40
 */
import { cheerio, cMap, cText } from '@utils'

/** 今日收看记录 */
export function cheerioToday(html: string) {
  return String(cheerio(html)('li').text())
    .replace('部。', '部，')
    .replace(/今日番组|。/g, '')
}

export function cheerioRaw(html: string) {
  const $ = cheerio(html)
  return cMap($('table'), $row => ({
    title: cText($row.find('.title_main_r p').eq(0)),
    weekDayCN: cText($row.find('.broadcast_r')),
    timeCN: '',
    type: cText($row.find('.title_main_r + td')),
    tag: cText($row.find('.type_tag_r')),
    origin: cText($row.find('tr').eq(2).find('td').eq(0)).split('动画制作：')?.[1] || ''
  }))
}
