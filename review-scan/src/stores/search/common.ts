/*
 * @Author: czy0729
 * @Date: 2020-10-23 10:49:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 12:22:36
 */
import { cheerio, HTMLDecode, htmlMatch } from '@utils'
import { SearchItem } from './types'

export function cheerioSearch(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnSearchB"', '<div id="footer">'))

  // ( 1 / 17 )
  const pageTotalRawText = HTMLDecode($('.page_inner .p_edge').text().trim())
  let pageTotal: number = 1
  if (pageTotalRawText) {
    pageTotal = Number(pageTotalRawText.split('/')?.[1].match(/\d+/)?.[0] || 1)
  } else {
    const $page = $('.page_inner a.p')
    pageTotal = $page.length || 1
  }

  const list: SearchItem[] =
    $('#browserItemList .item')
      .map((index: number, element: any) => {
        const $item = cheerio(element)
        const $title = $item.find('h3 a')
        return {
          collected: !!$item.find('.collectModify').text().trim(),
          comments: '',
          cover: $item.find('img.cover').attr('src') || '',
          id: $title.attr('href') || '',
          name: HTMLDecode($item.find('h3 small').text().trim()),
          nameCn: HTMLDecode($title.text().trim()),
          rank: $item.find('.rank').text().trim().replace('Rank ', ''),
          score: $item.find('.fade').text().trim(),
          tip: HTMLDecode($item.find('.tip').text().trim()),
          total: $item.find('.tip_j').text().trim(),
          type: ($item.find('.ico_subject_type').attr('class') || '').replace(
            /ico_subject_type subject_type_| ll/g,
            ''
          )
        }
      })
      .get() || []

  return {
    pageTotal,
    list
  }
}

export function cheerioSearchMono(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnSearchB"', '<div id="footer">'))

  // ( 1 / 17 )
  const pageTotalRawText = HTMLDecode($('.page_inner .p_edge').text().trim())
  let pageTotal: number = 1
  if (pageTotalRawText) {
    pageTotal = Number(pageTotalRawText.split('/')?.[1].match(/\d+/)?.[0] || 1)
  } else {
    const $page = $('.page_inner a.p')
    pageTotal = $page.length || 1
  }

  const list: SearchItem[] =
    $('#columnSearchB .light_odd')
      .map((index: number, element: any) => {
        const $item = cheerio(element)
        const $title = $item.find('h2 a')
        const title = HTMLDecode($title.text().trim())
        const cn = HTMLDecode($item.find('h2 a .tip').text().trim())
        return {
          collected: false,
          comments: $item.find('.na').text().trim(),
          cover: $item.find('img.avatar').attr('src') || '',
          id: $title.attr('href') || '',
          name: title.replace(` / ${cn}`, ''),
          nameCn: HTMLDecode($item.find('h2 a .tip').text().trim()),
          rank: '',
          score: '',
          tip: HTMLDecode($item.find('.prsn_info').text().trim()),
          total: '',
          type: ''
        }
      })
      .get() || []

  return {
    pageTotal,
    list
  }
}

export function cheerioSearchRakuen(html: string) {
  const $ = cheerio(html)
  const list =
    $('#hits-list .item')
      .map((index: number, element: any) => {
        const $item = cheerio(element)
        const splits = $item.find('a.path').text().trim().split('/')
        return {
          topicId: `group/${splits[splits.length - 1].replace('.html', '')}`,
          content: HTMLDecode($item.find('code').text().trim().replace(/\t/g, '　')).replace(
            / {2,100}/g,
            ' '
          )
        }
      })
      .get() || []

  const $lis = $('ul.pagination li')
  let pageTotal = 1
  if ($lis.length >= 2) {
    pageTotal = parseInt(
      cheerio($lis[$lis.length - 2])
        .text()
        .trim()
    )
  }

  return {
    list,
    pageTotal
  }
}
