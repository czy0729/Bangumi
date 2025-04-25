/*
 * @Author: czy0729
 * @Date: 2025-04-25 19:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-25 20:29:16
 */
import { cheerio } from '@utils'

/**
 * 别名提前
 *  - https://github.com/czy0729/Bangumi/issues/216
 */
export const processHtml = (html: string) => {
  try {
    const $ = cheerio(html)
    const subContainer = $('li.sub_container')
    if (subContainer.length > 0) {
      if (subContainer.find('li span.tip').text().includes('别名')) {
        const aliasItems = subContainer.find('li').get()
        aliasItems.sort((a: any, b: any) => {
          const aText = $(a).contents().last().text().trim()
          const bText = $(b).contents().last().text().trim()
          return aText.length - bText.length
        })
        subContainer.find('ul').empty().append(aliasItems)

        const chineseNameLi = $('li')
          .filter((_i: any, el: any) => $(el).find('span.tip').text().includes('中文名'))
          .first()
        if (chineseNameLi.length > 0) subContainer.insertAfter(chineseNameLi)
      }
    }
    return $.html()
  } catch (error) {}

  return html
}
