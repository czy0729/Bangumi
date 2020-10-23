/*
 * @Author: czy0729
 * @Date: 2020-10-23 10:49:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-23 12:15:18
 */
import { cheerio, HTMLDecode } from '@utils/html'

/**
 * @param {*} HTML
 */
export function cheerioSearchRakuen(HTML) {
  const $ = cheerio(HTML)
  const list =
    $('#hits-list .item')
      .map((index, element) => {
        const $item = cheerio(element)
        const splits = $item.find('a.path').text().trim().split('/')
        return {
          topicId: `group/${splits[splits.length - 1].replace('.html', '')}`,
          content: HTMLDecode(
            $item.find('code').text().trim().replace(/\t/g, '　')
          ).replace(/ {2,100}/g, ' ')
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
