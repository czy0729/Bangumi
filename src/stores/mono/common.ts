/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 21:03:29
 */
import { $, cData, cMap, cText } from '@utils'

/** 条目更多角色 */
export function cheerioCharacters(html: string) {
  return cMap(
    $(html, '<div id="columnInSubjectA"', '<div id="columnInSubjectB"')('div.light_odd'),
    $row => {
      const $a = $row.find('> div.clearit > h2 > a')
      const cover = cData($row.find('img.avatar'), 'src')
      const position = cText($row.find('span.badge_job'))
      return {
        id: cData($a, 'href').replace('/character/', ''),
        cover: cover !== '/img/info_only.png' ? String(cover).split('?')[0] : '',
        name: cText($a),
        nameCn: cText($row.find('> div.clearit > h2 > span.tip')).replace('/ ', ''),
        replies: cText($row.find('small.na')).replace(/\(|\)/g, ''),
        position,
        info: cText($row.find('div.crt_info span.tip'))
          .replace(position, '')
          .replace(/\s+/g, ' ')
          .trim(),
        actors: cMap($row.find('.actorBadge'), $a => {
          const cover = cData($a.find('img.avatar'), 'src')
          return {
            id: cData($a.find('a.avatar'), 'href').replace('/person/', ''),
            cover: cover !== '/img/info_only.png' ? String(cover).split('?')?.[0] : '',
            name: cText($a.find('small.grey')),
            nameCn: cText($a.find('a.l'))
          }
        })
      }
    }
  )
}

/** 条目更多制作人员 */
export function cheerioPersons(html: string) {
  return cMap(
    $(html, '<div id="columnInSubjectA"', '<div id="columnInSubjectB"')('div.light_odd'),
    $row => {
      const $a = $row.find('h2 > a')
      const cover = cData($row.find('img.avatar'), 'src')
      return {
        id: cData($a, 'href').replace('/character/', ''),
        name: cText($a, true),
        nameCn: cText($a.find('.tip')),
        cover: cover !== '/img/info_only.png' ? cover.split('?')?.[0] : '',
        replies: cText($row.find('small.orange')),
        info: cText($row.find('div.prsn_info').last()),
        positions: cMap($row.find('span.badge_job'), $span => cText($span)),
        positionDetails: cMap($row.find('span.badge_job + span.tip'), $span => cText($span))
      }
    }
  )
}
