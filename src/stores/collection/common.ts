/*
 * @Author: czy0729
 * @Date: 2025-08-24 06:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-24 10:08:18
 */
import { cData, cHas, cheerio, cMap, cPagination, cText, HTMLDecode, htmlMatch } from '@utils'
import { UserCollections, UserCollectionsTags } from './types'

/** 用户收藏概览 */
export function cheerioUserCollections(html: string) {
  const $ = cheerio(htmlMatch(html, '<ul id="browserItemList"', '<div id="columnSubjectBrowserB"'))
  return {
    pagination: cPagination($),
    list: cMap($('#browserItemList li.item'), $row => {
      const $a = $row.find('h3 a.l')
      const cover = cData($row.find('img.cover'), 'src')
      return {
        collected: cHas($row.find('.collectModify .thickbox')),
        comments: HTMLDecode(cText($row.find('.text_main_even'))),
        cover: cover === '/img/info_only.png' ? '' : cover,
        id: cData($a, 'href').replace('/subject/', ''),
        name: HTMLDecode(cText($row.find('small.grey'))),
        nameCn: HTMLDecode(cText($a)),
        score: cData($row.find('.starlight'), 'class').replace('starlight stars', ''),
        tags: HTMLDecode(cText($row.find('.collectInfo .tip')).replace('标签: ', '')),
        time: cText($row.find('.collectInfo .tip_j')),
        tip: HTMLDecode(cText($row.find('.info.tip')).replace(/\s+/g, ' '))
      }
    })
  } as UserCollections
}

/** 用户收藏概览的标签 */
export function cheerioUserCollectionsTags(html: string) {
  const $ = cheerio(htmlMatch(html, '<ul id="userTagList"', '<div class="menu_inner"'))
  return cMap($('li a.l'), $row => ({
    count: Number(cText($row.find('small')) || 0),
    tag: cText($row, true)
  })) as UserCollectionsTags
}
