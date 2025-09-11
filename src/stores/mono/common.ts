/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 21:03:29
 */
import { $, cData, cFind, cList, cMap, cText } from '@utils'
import { CharactersItem, PersonsItem } from './types'

/** 条目更多角色 */
export function cheerioCharacters(html: string) {
  return cMap(
    $(html, '<div id="columnInSubjectA', '<div id="columnInSubjectB')('div.light_odd'),
    $row => {
      const $a = cFind($row, '> div.clearit > h2 > a')
      const cover = cData(cFind($row, 'img.avatar'), 'src')
      const position = cText(cFind($row, 'span.badge_job'))
      return {
        id: cData($a, 'href').replace('/character/', ''),
        cover: cover !== '/img/info_only.png' ? String(cover).split('?')[0] : '',
        name: cText($a),
        nameCn: cText(cFind($row, '> div.clearit > h2 > span.tip')).replace('/ ', ''),
        replies: cText(cFind($row, 'small.na')).replace(/\(|\)/g, ''),
        position,
        info: cText(cFind($row, 'div.crt_info span.tip'))
          .replace(position, '')
          .replace(/\s+/g, ' ')
          .trim(),
        actors: cMap(cList($row, '.actorBadge'), $a => {
          const cover = cData(cFind($a, 'img.avatar'), 'src')
          return {
            id: cData(cFind($a, 'a.avatar'), 'href').replace('/person/', ''),
            cover: cover !== '/img/info_only.png' ? String(cover).split('?')?.[0] : '',
            name: cText(cFind($a, 'small.grey')),
            nameCn: cText(cFind($a, 'a.l'))
          }
        })
      } as CharactersItem
    }
  )
}

/** 条目更多制作人员 */
export function cheerioPersons(html: string) {
  return cMap(
    $(html, '<div id="columnInSubjectA', '<div id="columnInSubjectB')('div.light_odd'),
    $row => {
      const $a = cFind($row, 'h2 > a')
      const cover = cData(cFind($row, 'img.avatar'), 'src')
      return {
        id: cData($a, 'href').replace('/character/', ''),
        name: cText($a, true),
        nameCn: cText(cFind($a, '.tip')),
        cover: cover !== '/img/info_only.png' ? cover.split('?')?.[0] : '',
        replies: cText(cFind($row, 'small.orange')),
        info: cText(cFind($row, 'div.prsn_info', 'last')),
        positions: cMap(cList($row, 'span.badge_job'), $span => cText($span)),
        positionDetails: cMap(cList($row, 'span.badge_job + span.tip'), $span => cText($span))
      } as PersonsItem
    }
  )
}
