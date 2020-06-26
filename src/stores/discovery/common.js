/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 01:06:40
 */
import { safeObject } from '@utils'
import { cheerio } from '@utils/html'
import { getCoverMedium } from '@utils/app'
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
        info: $li.find('span.info > p').text().replace(/\n/g, ' '),
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
    time: time.replace('创建于 ', '').trim(),
    collect: collect.match(/\d+/) && collect.match(/\d+/)[0],
    content: $('div.line_detail > span.tip').html(),
    joinUrl,
    byeUrl
  }
}

/**
 * 分析全站日志
 * @param {*} HTML
 */
export function cheerioBlog(HTML) {
  const $ = cheerio(HTML)
  return (
    $('div#news_list > div.item')
      .map((index, element) => {
        const $li = cheerio(element)
        const $a = $li.find('h2.title a')
        const times = $li.find('div.time').text().split('/ ')
        return safeObject({
          id: $a.attr('href').replace('/blog/', ''),
          title: $a.text(),
          cover: $li.find('span.pictureFrameGroup img').attr('src'),
          time: String(times[times.length - 1]).replace('\n', ''),
          replies: $li.find('div.content .blue').text().replace(/\(|\)/g, ''),
          content: `${$li.find('div.content').text().split('...')[0]}...`,
          username: String($li.find('div.time small.blue a').text()).replace(
            '\n',
            ''
          ),
          subject: String($li.find('div.time small.grey a').text()).replace(
            '\n',
            ''
          ),
          tags: ''
        })
      })
      .get() || []
  ).filter(item => item.cover !== '//lain.bgm.tv/pic/user/l/icon.jpg')
}

/**
 * 分析频道聚合
 * @param {*} HTML
 */
export function cheerioChannel(HTML) {
  const $ = cheerio(HTML)
  return {
    rankTop:
      $('table.mediumImageChart tr')
        .map((index, element) => {
          const $li = cheerio(element)
          const $a = $li.find('span.subject a')
          return safeObject({
            id: $a.attr('href').replace('/subject/', ''),
            name: $a.text().trim(),
            cover: getCoverMedium($li.find('img').attr('src')),
            follow: $li.find('div.chartbar').text().trim()
          })
        })
        .get() || [],
    rank:
      $('div#chl_subitem li')
        .map((index, element) => {
          const $li = cheerio(element)
          const $a = $li.find('strong a')
          return safeObject({
            id: $a.attr('href').replace('/subject/', ''),
            name: $a.text().trim(),
            cover: getCoverMedium($li.find('img').attr('src')),
            follow: $li.find('small.feed').text().trim()
          })
        })
        .get() || [],
    friends:
      $('ul.coversSmall > li')
        .map((index, element) => {
          const $li = cheerio(element)
          const $subject = $li.find('> a')
          const $user = $li.find('a.l')
          return safeObject({
            id: $subject.attr('href').replace('/subject/', ''),
            name: $subject.attr('title'),
            cover: $subject.find('img').attr('src'),
            userId: $user.attr('href').replace('/user/', ''),
            userName: $user.text().trim(),
            action: $li.find('p.info').text().trim().split(' ')[1]
          })
        })
        .get() || [],
    tags:
      $('a.level8')
        .map((index, element) => {
          const $a = cheerio(element)
          return $a.text().trim()
        })
        .get() || [],
    discuss: (
      $('table.topic_list tr')
        .map((index, element) => {
          if (index === 0) {
            return {}
          }

          const $li = cheerio(element)
          const $a = $li.find(' > td > a.l')
          const $subject = $li.find(' > td > small.feed > a')
          const $user = $li.find(' > td[align=right] > a')
          return safeObject({
            id: $a.attr('href').replace('/subject/topic', 'subject'),
            title: $a.text().trim(),
            replies: $li
              .find(' > td > a.l + small.grey')
              .text()
              .trim()
              .replace(/\(|\)/g, ''),
            subjectId: $subject.attr('href').replace('/subject/', ''),
            subjectName: $subject.text().trim().replace(/"/g, ''),
            userId: $user.attr('href').replace('/user/', ''),
            userName: $user.text().trim(),
            time: $li.find(' > td[align=right] > small').text().trim()
          })
        })
        .get() || []
    ).filter(item => !!item.id),
    blog:
      $('div#news_list > div.item')
        .map((index, element) => {
          const $li = cheerio(element)
          const $a = $li.find('h2.title a')
          const times = $li.find('div.time').text().trim().split('/ ')
          return safeObject({
            id: $a.attr('href').replace('/blog/', ''),
            title: $a.text().trim(),
            cover: $li.find('span.pictureFrameGroup img').attr('src'),
            time: String(times[times.length - 1]).replace('\n', ''),
            replies: $li
              .find('div.content .blue')
              .text()
              .trim()
              .replace(/\(|\)/g, ''),
            content: `${
              $li.find('div.content').text().trim().split('...')[0]
            }...`,
            username: $li.find('div.time small.blue a').text().trim(),
            subject: $li.find('div.time small.grey a').text().trim(),
            tags: ''
          })
        })
        .get() || []
  }
}
