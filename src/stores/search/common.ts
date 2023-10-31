/*
 * @Author: czy0729
 * @Date: 2020-10-23 10:49:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 12:22:36
 */
import { cheerio, HTMLDecode } from '@utils'

export function cheerioSearchRakuen(html: string) {
  const $ = cheerio(html)
  const list =
    $('#hits-list .item')
      .map((index: number, element: any) => {
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
