/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-28 00:55:16
 */
import { safeObject } from '@utils'
import { getCoverMedium } from '@utils/app'
import {
  HTMLTrim,
  HTMLToTree,
  findTreeNode,
  HTMLDecode,
  cheerio
} from '@utils/html'
import { fetchHTML } from '@utils/fetch'
import {
  matchSubjectId,
  matchCover,
  matchAvatar,
  matchUserId,
  matchStar
} from '@utils/match'
import { HOST } from '@constants'
import { HTML_MONO } from '@constants/html'
import { analysisComments } from '../rakuen/common'
import { INIT_MONO } from './init'

export async function fetchMono({ monoId = 0 }) {
  // -------------------- 请求HTML --------------------
  const raw = await fetchHTML({
    url: HTML_MONO(monoId)
  })
  const HTML = HTMLTrim(raw)

  // -------------------- 分析内容 --------------------
  let node
  let matchHTML

  // 人物信息
  const mono = {
    ...INIT_MONO
  }
  let monoComments = [] // 人物吐槽箱

  if (HTML) {
    const $ = cheerio(raw)
    mono.eraseCollectUrl =
      $('li.collect > span.collect > a.break').attr('href') || ''
    if (!mono.eraseCollectUrl) {
      mono.collectUrl = $('li.collect > span.collect > a').attr('href') || ''
    }

    // 标题
    matchHTML = HTML.match(/<h1 class="nameSingle">(.+?)<\/h1>/)
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      node = findTreeNode(tree.children, 'a|text&title')
      if (node) {
        mono.name = node[0].text[0]
        mono.nameCn = node[0].attrs.title
      }
    }

    // 封面
    // @issue
    matchHTML =
      HTML.match(/<img src="(.+?)" class="cover"\/>/) ||
      HTML.match(/<img src="(.+?)" class="cover" \/>/)
    if (matchHTML) {
      mono.cover = String(matchHTML[1]).split('?')[0]
    }

    // 各种详细
    matchHTML = HTML.match(/<ul id="infobox">(.+?)<\/ul>/)
    if (matchHTML) {
      mono.info = String(matchHTML[1])
        .replace(/\n/g, '')
        .replace(/ class="(.+?)"/g, '')
        .replace(/ title="(.+?)"/g, '')
        .replace(/>( +)</g, '><')
        .trim()
    }

    // 详情
    matchHTML = HTML.match(/<div class="detail">(.+?)<\/div>/)
    if (matchHTML) {
      mono.detail = matchHTML[1]
    }

    // 最近演出角色
    mono.voice = []
    matchHTML = HTML.match(
      /<h2 class="subtitle">最近演出角色<\/h2><ul class="browserList">(.+?)<\/ul><a href=/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        node = findTreeNode(children, 'div > a|href&title')
        const href = node ? node[0].attrs.href : ''
        const name = node ? node[0].attrs.title : ''

        node = findTreeNode(children, 'div > div > h3 > p')
        const nameCn = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > a > img')
        const cover = node ? String(node[0].attrs.src).split('?')[0] : ''

        node = findTreeNode(children, 'ul > li > div > h3 > a|text&href')
        const subjectHref = node ? node[0].attrs.href : ''
        const subjectName = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > div > small')
        const subjectNameCn = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > div > span')
        const staff = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a > img')
        const subjectCover = node ? String(node[0].attrs.src).split('?')[0] : ''

        mono.voice.push({
          href,
          name: HTMLDecode(name),
          nameCn: HTMLDecode(nameCn),
          cover,
          subjectHref,
          subjectName: HTMLDecode(subjectName),
          subjectNameCn: HTMLDecode(subjectNameCn),
          staff,
          subjectCover
        })
      })
    }

    // 最近参与
    mono.works = []
    matchHTML = HTML.match(
      /<h2 class="subtitle">最近参与<\/h2><ul class="browserList">(.+?)<\/ul><a href=/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        node = findTreeNode(children, 'div > a|href&title')
        const href = node ? node[0].attrs.href : ''
        const name = node ? node[0].attrs.title : ''

        node = findTreeNode(children, 'div > a > img')
        const cover = node ? String(node[0].attrs.src).split('?')[0] : ''

        node = findTreeNode(children, 'div > div > span')
        const staff = node ? node[0].text[0] : ''

        mono.works.push({
          href,
          name: HTMLDecode(name),
          cover,
          staff
        })
      })
    }

    // 出演
    mono.jobs = []
    matchHTML = HTML.match(
      /<h2 class="subtitle">出演<\/h2><ul class="browserList">(.+?)<\/ul><div class="section_line clear">/
    )
    if (matchHTML) {
      const tree = HTMLToTree(matchHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        node = findTreeNode(children, 'div > div > h3 > a')
        const href = node ? node[0].attrs.href : ''
        const name = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > div > small')
        const nameCn = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > a > img')
        const cover = node ? String(node[0].attrs.src).split('?')[0] : ''

        node = findTreeNode(children, 'div > div > span')
        const staff = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a')
        const cast = node ? node[0].attrs.title : ''
        const castHref = node ? node[0].attrs.href : ''

        node = findTreeNode(children, 'ul > li > div > small')
        const castTag = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a > img')
        const castCover = node ? String(node[0].attrs.src).split('?')[0] : ''

        mono.jobs.push({
          href,
          name: HTMLDecode(name),
          nameCn,
          cover,
          staff,
          cast,
          castHref,
          castTag,
          castCover
        })
      })
    }

    // 吐槽箱
    matchHTML = HTML.match(
      /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><\/div><\/div><div id="footer/
    )
    monoComments = analysisComments(matchHTML)
  }

  return Promise.resolve({
    mono,
    monoComments: monoComments.reverse()
  })
}

/**
 * 条目信息
 * @param {*} HTML
 */
export function cheerioSubjectFormHTML(HTML) {
  const $ = cheerio(HTML)
  let relationsType

  // 曲目列表
  const disc = []
  $('div.line_detail > ul.line_list_music > li').each((index, element) => {
    const $row = cheerio(element)
    if ($row.attr('class') === 'cat') {
      disc.push(
        safeObject({
          title: $row.text(),
          disc: []
        })
      )
    } else {
      const $a = $row.find('h6 > a')
      disc[disc.length - 1].disc.push(
        safeObject({
          title: $a.text(),
          href: $a.attr('href')
        })
      )
    }
  })
  return {
    watchedEps: $('#watchedeps').attr('value') || 0,
    totalEps: $('div.prgText').text().trim().replace('/ ', ''),

    // 标签
    tags:
      $('div.subject_tag_section > div.inner > a.l')
        .map((index, element) => {
          const $row = cheerio(element)
          return safeObject({
            name: $row.find('span').text(),
            count: $row.find('small').text()
          })
        })
        .get() || [],

    // 关联条目
    relations:
      $('div.content_inner > ul.browserCoverMedium > li')
        .map((index, element) => {
          const $row = cheerio(element)
          const $title = $row.find('a.title')
          const id = matchSubjectId($title.attr('href'))
          const type = $row.find('span.sub').text()
          if (type) {
            relationsType = type
          }
          return safeObject({
            id,
            image: matchCover($row.find('span.avatarNeue').attr('style')),
            title: $title.text(),
            type: relationsType,
            url: `${HOST}/subject/${id}`
          })
        })
        .get() || [],

    // 好友评分
    friend: {
      score: $('div.frdScore > span.num').text() || 0,
      total: $('div.frdScore > a.l').text().replace(' 人评分', '') || 0
    },
    disc,

    // 书籍章节信息
    book: {
      chap: $('#watchedeps').attr('value') || 0,
      vol: $('#watched_vols').attr('value') || 0,
      totalChap: String($('#watchedeps').parent().text().trim()).replace(
        'Chap.  / ',
        ''
      ),
      totalVol: String($('#watched_vols').parent().text().trim()).replace(
        'Vol.  / ',
        ''
      )
    },

    // 单行本
    comic:
      $('div.subject_section > ul.browserCoverSmall > li')
        .map((index, element) => {
          const $row = cheerio(element)
          const $a = $row.find('a')
          return safeObject({
            id: matchSubjectId($a.attr('href')),
            name: $a.attr('title') || $row.find('a.title').text(),
            image: getCoverMedium(matchCover($row.find('span').attr('style')))
          })
        })
        .get() || [],

    // 猜你喜欢
    like:
      $('div.content_inner > ul.coversSmall > li.clearit')
        .map((index, element) => {
          const $row = cheerio(element)
          const $a = $row.find('a')
          return safeObject({
            id: matchSubjectId($a.attr('href')),
            name: $a.attr('title') || $row.find('a.l').text(),
            image: matchCover($row.find('span').attr('style'))
          })
        })
        .get() || [],

    who:
      $('#subjectPanelCollect li.clearit')
        .map((index, element) => {
          const $row = cheerio(element)
          const $a = $row.find('a.avatar')
          return safeObject({
            avatar: matchAvatar($row.find('span.avatarNeue').attr('style')),
            name: $a.text(),
            userId: matchUserId($a.attr('href')),
            star: matchStar($row.find('span.starlight').attr('class')),
            status: String($row.find('small.grey').text())
              .replace('小时', '时')
              .replace('分钟', '分')
          })
        })
        .get() || [],

    // 详情
    info: $('#infobox')
      .html()
      .replace(/\n/g, '')
      .replace(/ class="(.+?)"/g, '')
      .replace(/ title="(.+?)"/g, '')
      .replace(/>( +)</g, '><')
      .trim(),

    // 锁定
    lock: $('div.tipIntro > div.inner > h3').text(),

    // hash 比如删除等网页操作需要
    formhash: $('input[name=formhash]').attr('value')
  }
}

/**
 * 分析人物作品
 * @param {*} HTML
 */
const _type = {
  1: 'book',
  2: 'anime',
  3: 'music',
  4: 'game',
  6: 'real'
}
export function cheerioMonoWorks(HTML) {
  const $ = cheerio(HTML)
  return {
    filters:
      $('div.subjectFilter > ul.grouped')
        .map((index, element) => {
          const $li = cheerio(element)
          return safeObject({
            title: $li.find('li.title').text().trim(),
            data:
              $li
                .find('a.l')
                .map((idx, el) => {
                  const $a = cheerio(el)
                  return safeObject({
                    title: $a.text().trim(),
                    value: $a.attr('href').split('/works')[1]
                  })
                })
                .get() || []
          })
        })
        .get() || [],
    list:
      $('ul#browserItemList > li.item')
        .map((index, element) => {
          const $li = cheerio(element)
          return safeObject({
            id: $li.find('a.cover').attr('href'),
            cover: getCoverMedium($li.find('img.cover').attr('src')),
            name: $li.find('small.grey').text().trim(),
            nameCn: $li.find('h3 a.l').text().trim(),
            tip: $li.find('p.tip').text().trim(),
            position:
              $li
                .find('span.badge_job')
                .map((idx, el) => cheerio(el).text().trim())
                .get() || [],
            score: $li.find('small.fade').text().trim(),
            total: $li.find('span.tip_j').text().trim(),
            rank: $li.find('span.rank').text().trim().replace('Rank ', ''),
            collected: !!$li.find('p.collectModify').text(),
            type:
              _type[
                $li
                  .find('span.ico_subject_type')
                  .attr('class')
                  .replace(/ico_subject_type subject_type_| ll/g, '')
              ]
          })
        })
        .get() || []
  }
}

/**
 * 分析人物角色
 * @param {*} HTML
 */
export function cheerioMonoVoices(HTML) {
  const $ = cheerio(HTML)
  return {
    filters:
      $('div.subjectFilter > ul.grouped')
        .map((index, element) => {
          const $li = cheerio(element)
          return safeObject({
            title: $li.find('li.title').text().trim(),
            data:
              $li
                .find('a.l')
                .map((idx, el) => {
                  const $a = cheerio(el)
                  return safeObject({
                    title: $a.text().trim(),
                    value: $a.attr('href').split('/works/voice')[1]
                  })
                })
                .get() || []
          })
        })
        .get() || [],
    list:
      $('ul.browserList > li.item')
        .map((index, element) => {
          const $li = cheerio(element)
          const $leftItem = $li.find('div.innerLeftItem')
          return safeObject({
            id: $leftItem
              .find('h3 > a.l')
              .attr('href')
              .replace('/character/', ''),
            name: $leftItem.find('h3 > a.l').text().trim(),
            nameCn: $leftItem.find('h3 > p.tip').text().trim(),
            cover: $leftItem.find('img.avatar').attr('src').split('?')[0],
            subject:
              $li
                .find('ul.innerRightList > li')
                .map((idx, el) => {
                  const $l = cheerio(el)
                  const $a = $l.find('h3 > a.l')
                  return safeObject({
                    id: $a.attr('href').replace('/subject/', ''),
                    name: $a.text().trim(),
                    nameCn: $l.find('div.inner small.grey').text().trim(),
                    cover: $l.find('img.cover').attr('src'),
                    staff: $l.find('div.inner span.badge_job').text().trim()
                  })
                })
                .get() || []
          })
        })
        .get() || []
  }
}
