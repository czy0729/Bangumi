/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 05:14:27
 */
import { htmlMatch, safeObject } from '@utils'
import {
  HTMLDecode,
  HTMLToTree,
  HTMLTrim,
  cheerio,
  findTreeNode,
  getCoverMedium,
  matchAvatar,
  matchCover,
  matchStar,
  matchSubjectId,
  matchUserId
} from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HOST, HTML_MONO } from '@constants'
import { AnyObject, MonoId, SubjectTypeValue } from '@types'
import { cheerioComments } from '../rakuen/common'
import { INIT_MONO } from './init'
import { SubjectComments, SubjectFromHTML } from './types'

export async function fetchMono({ monoId }: { monoId: MonoId }) {
  // -------------------- 请求HTML --------------------
  const raw = await fetchHTML({
    url: HTML_MONO(monoId)
  })
  const HTML = HTMLTrim(raw)

  // -------------------- 分析内容 --------------------
  let node
  let matchHTML

  // 人物信息
  const mono: typeof INIT_MONO = {
    ...INIT_MONO
  }
  let monoComments = [] // 人物吐槽箱

  if (HTML) {
    const $ = cheerio(raw)
    mono.eraseCollectUrl = $('li.collect > span.collect > a.break').attr('href') || ''
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
    matchHTML = HTML.match(/<img src="(.+?)" class="cover"/)
    if (matchHTML) mono.cover = String(matchHTML[1]).split('?')[0]

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
      const $ = cheerio(matchHTML[1])
      $('li.item').each((index: number, element: any) => {
        const $row = cheerio(element)
        const $a = $row.find('a.l')
        mono.works.push({
          href: $a.attr('href'),
          name: HTMLDecode($row.find('small.grey').text().trim() || $a.text().trim()),
          cover: $row.find('img.cover').attr('src'),
          staff: $row.find('span.badge_job').text().trim(),
          type: $row.find('span.ico_subject_type').attr('class').substring(30, 31)
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

        node = findTreeNode(children, 'div > div > h3 > span')
        const type = node ? String(node[0].attrs.class).substring(30, 31) : ''

        // 20210216 适配第二个声优, 第三个不适配了
        const cast2: AnyObject = {}
        node = findTreeNode(children, 'ul > li > a')
        if (node) {
          const cast = node?.[1]?.attrs?.title || ''
          if (cast) {
            cast2.cast = cast
            cast2.castHref = node?.[1]?.attrs?.href || ''

            node = findTreeNode(children, 'ul > li > div > small')
            cast2.castTag = node?.[1]?.text[0] || ''

            node = findTreeNode(children, 'ul > li > a > img')
            cast2.castCover = String(node?.[1]?.attrs?.src).split('?')[0] || ''
          }
        }

        mono.jobs.push({
          href,
          name: HTMLDecode(name),
          nameCn,
          cover,
          staff,
          cast,
          castHref,
          castTag,
          castCover,
          cast2,
          type
        })
      })
    }

    // 谁收藏了
    mono.collected = []
    matchHTML = HTML.match(/<\/h2><ul class="groupsLine">(.+?)<\/ul>/)
    if (matchHTML) {
      const $ = cheerio(matchHTML[1])
      $('li.clearit').each((index: number, element: any) => {
        const $row = cheerio(element)
        const $a = $row.find('.innerWithAvatar .avatar')
        mono.collected.push({
          avatar: matchAvatar($row.find('span.avatarSize32').attr('style')),
          name: HTMLDecode($a.text()),
          userId: matchUserId($a.attr('href')),
          last: $row.find('small.grey').text().trim()
        })
      })
    }

    // 合作
    mono.collabs = []
    matchHTML = HTML.match(/<ul class="coversSmall">(.+?)<\/ul>/)
    if (matchHTML) {
      const $ = cheerio(matchHTML[1])
      $('li.clearit').each((index: number, element: any) => {
        const $row = cheerio(element)
        const $a = $row.find('a.l')
        mono.collabs.push({
          href: $row.find('a.avatar').attr('href'),
          name: HTMLDecode($a.text().trim()),
          cover: matchAvatar($row.find('span.avatarNeue').attr('style')),
          count: $row.find('small').text().trim().replace(/\(|\)/g, '')
        })
      })
    }

    // 吐槽箱
    monoComments = cheerioComments(HTML)
  }

  return {
    mono,
    monoComments: monoComments.reverse()
  }
}

/** 条目信息 */
export function cheerioSubjectFromHTML(html: string): SubjectFromHTML {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject"', '<div id="footer">'))
  let relationsType: SubjectTypeValue

  const disc = []
  $('div.line_detail ul.line_list_music li').each((index: number, element: any) => {
    const $row = cheerio(element)
    if ($row.attr('class') === 'cat') {
      disc.push(
        safeObject({
          title: $row.text().trim(),
          disc: []
        })
      )
    } else {
      const $a = $row.find('h6 > a')
      disc[disc.length - 1].disc.push(
        safeObject({
          title: $a.text().trim(),
          href: $a.attr('href')
        })
      )
    }
  })

  let type = ''
  $('.nameSingle small.grey').each((index: number, element: any) => {
    type += cheerio(element).text().trim()
  })

  const info = $('#infobox')
    .html()
    .replace(/\n| class="(.+?)"| title="(.+?)"> +</g, '')
    .trim()

  let totalEps = info.match(/<li><span>话数: <\/span>(\d+)<\/li>/)
  if (totalEps) {
    totalEps = totalEps[1]
  } else {
    totalEps = $('div.prgText').text().trim().replace('/ ', '')
  }

  const crtCounts = {}
  $('#browserItemList li').each((index: number, element: any) => {
    const $row = cheerio(element)
    const id = String($row.find('a.avatar').attr('href')).replace('/character/', '')
    const num =
      $row
        .find('small.rr')
        .text()
        .trim()
        .replace(/\(|\)|\+/g, '') || 0
    if (id && num) crtCounts[id] = Number(num)
  })

  return {
    type,
    watchedEps: $('#watchedeps').attr('value') || 0,
    totalEps,
    info,
    tags:
      $('div.subject_tag_section div.inner a.l')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          return safeObject({
            name: $row.find('span').text().trim(),
            count: $row.find('small').text().trim()
          })
        })
        .get() || [],
    relations:
      $('div.content_inner ul.browserCoverMedium li')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const $title = $row.find('a.title')
          const id = matchSubjectId($title.attr('href'))
          const type = $row.find('span.sub').text().trim()
          if (type) relationsType = type
          return safeObject({
            id,
            image: matchCover($row.find('span.avatarNeue').attr('style')),
            title: HTMLDecode($title.text().trim()),
            type: relationsType,
            url: `${HOST}/subject/${id}`
          })
        })
        .get() || [],
    friend: {
      score: $('div.frdScore span.num').text().trim() || 0,
      total: $('div.frdScore a.l').text().replace(' 人评分', '') || 0
    },
    disc,
    book: {
      chap: $('#watchedeps').attr('value') || 0,
      vol: $('#watched_vols').attr('value') || 0,
      totalChap: $('#watchedeps').parent().text().trim().replace('Chap.  / ', ''),
      totalVol: $('#watched_vols').parent().text().trim().replace('Vol.  / ', '')
    },
    comic:
      $('div.subject_section ul.browserCoverSmall li')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const $a = $row.find('a')
          return safeObject({
            id: matchSubjectId($a.attr('href')),
            name: $a.attr('title') || $row.find('a.title').text().trim(),
            image: getCoverMedium(matchCover($row.find('span').attr('style')))
          })
        })
        .get() || [],
    like:
      $('div.content_inner ul.coversSmall li')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const $a = $row.find('a')
          return safeObject({
            id: matchSubjectId($a.attr('href')),
            name: $a.attr('title') || $row.find('a.l').text().trim(),
            image: matchCover($row.find('span').attr('style'))
          })
        })
        .get() || [],
    who:
      $('#subjectPanelCollect li')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const $a = $row.find('a.avatar')
          return safeObject({
            avatar: matchAvatar($row.find('span.avatarNeue').attr('style')),
            name: HTMLDecode($a.text().trim()),
            userId: matchUserId($a.attr('href')),
            star: matchStar($row.find('span.starlight').attr('class')),
            status: $row
              .find('small.grey')
              .text()
              .trim()
              .replace('小时', '时')
              .replace('分钟', '分')
          })
        })
        .get() || [],
    catalog:
      $('#subjectPanelIndex li')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const $user = $row.find('small.grey a.avatar')
          const $catalog = $row.find('.innerWithAvatar > a.avatar')
          return safeObject({
            avatar: matchAvatar($row.find('span.avatarNeue').attr('style')),
            name: $user.text().trim(),
            userId: $user.attr('href').replace('/user/', ''),
            id: parseInt($catalog.attr('href').replace('/index/', '')),
            title: $catalog.text().trim()
          })
        })
        .get() || [],
    crtCounts,
    lock: $('div.tipIntro div.inner h3').text().trim(),
    formhash: String($('#collectBoxForm').attr('action')).split('?gh=')?.[1] || ''
  }
}

/** 条目留言 */
export function cheerioSubjectComments(html: string): SubjectComments {
  const $ = cheerio(
    htmlMatch(html, '<div id="columnInSubjectA"', '<div id="columnInSubjectB"')
  )
  const page = Number($('.page_inner .p_cur').text().trim() || 1)
  const pagination = $('.page_inner .p_edge').text().trim().match(/\d+/g)
  const pageTotal = Number(
    pagination?.[1] || pagination?.[0] || $('.page_inner a.p').length || 1
  )
  return {
    pagination: {
      page,
      pageTotal: pageTotal
    },
    list:
      $('#comment_box .item')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          return {
            id: `${page}|${index}`,
            userId: matchUserId($row.find('a.avatar').attr('href')),
            userName: $row.find('a.l').text().trim(),
            avatar: matchAvatar($row.find('span.avatarNeue').attr('style')),
            time: $row.find('small.grey').text().trim().replace('@ ', ''),
            star: ($row.find('span.starlight').attr('class') || '').replace(
              'starlight stars',
              ''
            ),
            comment: $row.find('p').text().trim()
          }
        })
        .get() || []
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
        .map((index: number, element: any) => {
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
        .map((index: number, element: any) => {
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
            type: _type[
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
        .map((index: number, element: any) => {
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
        .map((index: number, element: any) => {
          const $li = cheerio(element)
          const $leftItem = $li.find('div.innerLeftItem')
          return safeObject({
            id: $leftItem.find('h3 > a.l').attr('href').replace('/character/', ''),
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

/**
 * 分析评分
 * @param {*} HTML
 */
export function cheerioRating(HTML) {
  const $ = cheerio(HTML)
  const counts = {
    wishes: 0,
    collections: 0,
    doings: 0,
    on_hold: 0,
    dropped: 0
  }
  $('ul.secTab li')
    .map((index: number, element: any) => {
      const text = cheerio(element).text()
      const count = parseInt((text.match(/\d+/g) || [])[0]) || 0
      if (text.includes('想')) {
        counts.wishes = count
      } else if (text.includes('过')) {
        counts.collections = count
      } else if (text.includes('在')) {
        counts.doings = count
      } else if (text.includes('搁置')) {
        counts.on_hold = count
      } else {
        counts.dropped = count
      }
      return count
    })
    .get()

  const list =
    $('#memberUserList li')
      .map((index: number, element: any) => {
        const $li = cheerio(element)
        const $user = $li.find('a.avatar')
        const avatar = matchAvatar($li.find('.avatarNeue').attr('style'))
        const starText = $li.find('span.starlight').attr('class')
        const name = $user.text().trim()
        const time = $li.find('p.info').text().trim()
        return safeObject({
          id: $user.attr('href').replace('/user/', ''),
          avatar,
          name,
          time,
          star: starText ? parseInt(starText.match(/\d+/)[0]) : 0,
          comment: HTMLDecode(
            $li.find('div.userContainer').text().trim().replace(`${name}\n${time}`, '')
          )
        })
      })
      .get() || []

  return {
    counts,
    list
  }
}

/**
 * 分析评分
 * @param {*} HTML
 */
export function cheerioSubjectCatalogs(HTML) {
  const $ = cheerio(HTML)
  return {
    list:
      $('li.tml_item')
        .map((index: number, element: any) => {
          const $li = cheerio(element)
          const $title = $li.find('h3 a.l')
          const $user = $li.find('span.tip_j a.l')
          const avatar = matchAvatar($li.find('span.avatarNeue').attr('style'))
          return safeObject({
            id: parseInt($title.attr('href').replace('/index/', '')),
            title: $title.text().trim(),
            userId: $user.attr('href').replace('/user/', ''),
            userName: $user.text().trim(),
            avatar,
            time: $li.find('span.tip').text().trim()
          })
        })
        .get() || []
  }
}

export function cheerioWikiEdits(HTML) {
  const $ = cheerio(HTML)
  return {
    list:
      $('#pagehistory li')
        .map((index: number, element: any) => {
          const $li = cheerio(element)
          const $a = $li.find('a')
          const $time = $a.eq(0)
          const $user = $a.eq(1)
          return safeObject({
            id: index,
            time: $time.text().trim(),
            userId: $user.attr('href').replace('/user/', ''),
            userName: $user.text().trim(),
            comment: $li.find('.comment').text().trim().replace(/\(|\)/g, ''),
            sub: $li.find('.alarm').text().trim().replace(/\(|\)/g, '')
          })
        })
        .get() || []
  }
}

export function cheerioWikiCovers(HTML) {
  const $ = cheerio(HTML)
  return {
    list:
      $('.photoList li')
        .map((index: number, element: any) => {
          const $li = cheerio(element)
          const $user = $li.find('.tip_j a.l')
          return safeObject({
            id: index,
            cover: $li.find('img.grid').attr('src'),
            userId: $user.attr('href').replace('/user/', ''),
            userName: $user.text().trim()
          })
        })
        .get() || []
  }
}
