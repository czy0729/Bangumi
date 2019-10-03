/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-03 16:01:34
 */
import { safeObject } from '@utils'
import { cheerio } from '@utils/html'

/**
 * 分析标签
 * @param {*} HTML
 */
export function analysisTags(HTML) {
  const $ = cheerio(HTML)
  const tags = $('#tagList a.level1')
    .map((index, element) => {
      const $li = cheerio(element)
      return $li.text() || ''
    })
    .get()
  const nums = $('#tagList small.grey')
    .map((index, element) => {
      const $li = cheerio(element)
      return ($li.text() || '').replace(/\(|\)/g, '')
    })
    .get()

  return {
    list: tags.map((item, index) =>
      safeObject({
        name: item,
        nums: nums[index]
      })
    ),
    pagination: {
      page: 1,
      pageTotal: 100
    }
  }
}
