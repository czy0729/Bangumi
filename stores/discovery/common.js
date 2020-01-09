/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-06 20:11:18
 */
import { safeObject } from '@utils'
import { cheerio } from '@utils/html'
import { matchAvatar, matchUserId } from '@utils/match'

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

/**
 * 分析目录
 * @param {*} HTML
 */
export function analysisCatalog(HTML) {
  const $ = cheerio(HTML)
  return $('li.tml_item')
    .map((index, element) => {
      const $li = cheerio(element)
      const $tip = $li.find('span.tip_i > a.l')
      const $title = $li.find('h3 > a.l')
      return safeObject({
        avatar: matchAvatar($li.find('img.avatar').attr('src'), 0),
        name: $tip.text(),
        userId: matchUserId($tip.attr('href')),
        last: $li.find('span.tip_j').text(),
        title: $title.text(),
        id: ($title.attr('href') || '').replace('/index/', ''),
        info: $li
          .find('span.info > p')
          .text()
          .replace(/\n/g, ' '),
        book: $li.find('span.subject_type_1').text(),
        anime: $li.find('span.subject_type_2').text(),
        music: $li.find('span.subject_type_3').text(),
        game: $li.find('span.subject_type_4').text(),
        real: $li.find('span.subject_type_6').text()
      })
    })
    .get()
}

/**
 * 分析目录详情
 * @param {*} HTML
 */
export function analysisCatalogDetail(HTML) {
  const $ = cheerio(HTML)
  const list = $('li.item')
    .map((index, element) => {
      const $li = cheerio(element)
      const $a = $li.find('a.l')
      const _type = $li.find('span.ico_subject_type').attr('class')
      let type
      if (_type.includes('subject_type_2')) {
        type = '动画'
      } else if (_type.includes('subject_type_1')) {
        type = '书籍'
      } else if (_type.includes('subject_type_4')) {
        type = '游戏'
      } else if (_type.includes('subject_type_6')) {
        type = '三次元'
      }

      return safeObject({
        id: ($a.attr('href') || '').replace('/subject/', ''),
        image: $li.find('img.cover').attr('src'),
        title: ($a.text() || '').replace('修改删除', ''),
        type,
        info: $li.find('p.info').text(),
        comment: $li.find('div.text_main_even > div.text').text(),
        isCollect: !!$li.find('p.collectModify').text()
      })
    })
    .get()

  const $a = $('div.grp_box > a.l')
  const [time = '', collect = ''] = (
    $('div.grp_box > span.tip_j').text() || ''
  ).split('\n/')

  const href = $('div.rr > a').attr('href') || ''
  let joinUrl = ''
  let byeUrl = ''
  if (href.includes('erase_collect')) {
    byeUrl = href
  } else {
    joinUrl = href
  }
  return {
    list: list.filter(item => !item.id.includes('ep/')),
    title: $('div#header > h1').text(),
    avatar: matchAvatar($('img.avatar').attr('src'), 0),
    progress: $('div.progress small').text(),
    nickname: $a.text(),
    userId: ($a.attr('href') || '').replace('/user/', ''),
    time: time.replace('创建于 ', ''),
    collect: collect.match(/\d+/) && collect.match(/\d+/)[0],
    content: $('div.line_detail > span.tip').html(),
    joinUrl,
    byeUrl
  }
}
