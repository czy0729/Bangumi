/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 19:59:04
 */
import { cheerioComments } from '@stores/rakuen/common'
import {
  cData,
  cEach,
  cFilter,
  cFind,
  cHas,
  cheerio,
  cHtml,
  cList,
  cMap,
  cText,
  fixedSubjectInfo,
  getCoverMedium,
  HTMLDecode,
  htmlMatch,
  HTMLTrim,
  matchAvatar,
  matchCover,
  matchStar,
  matchSubjectId,
  matchUserId,
  safeObject
} from '@utils'
import { HOST } from '@constants'

import type { Id, MonoId, Override, SubjectId, SubjectTypeValue, UserId } from '@types'
import type { Likes } from '../rakuen/types'
import type {
  EpStatus,
  Mono,
  MonoCommentsItem,
  MonoFiltersItem,
  MonoVoicesItem,
  MonoWorksItem,
  Rating,
  SubjectCatalogs,
  SubjectCatalogsItem,
  SubjectComments,
  SubjectFromHTML,
  Wiki
} from './types'

/** 条目信息 */
export function cheerioSubjectFromHTML(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject', '<div id="footer'))
  let relationsType: SubjectTypeValue

  const disc: SubjectFromHTML['disc'] = []
  cEach($('div.line_detail ul.line_list_music li'), $row => {
    if (cData($row, 'class') === 'cat') {
      disc.push({
        title: cText($row),
        disc: []
      })
    } else {
      const $a = $row.find('h6 > a')
      disc[disc.length - 1].disc.push({
        title: cText($a),
        href: cData($a, 'href') as `/ep/${number}`
      })
    }
  })

  let type = ''
  cEach($('.nameSingle small.grey'), $row => {
    type += cText($row)
  })

  const rawInfo = cHtml($('#infobox'))
  const info = fixedSubjectInfo(rawInfo.replace(/\n| class="(.+?)"| title="(.+?)"> +</g, '').trim())

  let totalEps: string
  const temp = info.match(/<li><span>话数: <\/span>(\d+)<\/li>/)
  if (temp?.[1]) {
    totalEps = temp[1]
  } else {
    totalEps = cText($('div.prgText')).replace('/ ', '')
  }

  const crtCounts: SubjectFromHTML['crtCounts'] = {}
  cEach($('#browserItemList li'), $row => {
    const id = cData(cFind($row, 'a.title'), 'href').replace('/character/', '')
    const num = cText(cFind($row, 'small.primary')).replace(/\(|\)|\+/g, '') || 0
    if (id && num) crtCounts[id] = Number(num)
  })

  return {
    type,
    watchedEps: cData($('#watchedeps'), 'value') || 0,
    totalEps,
    info: rawInfo,
    tags: cMap($('div.subject_tag_section div.inner a.l'), $row => ({
      name: cText(cFind($row, 'span')),
      count: cText(cFind($row, 'small')),
      meta: cData($row, 'class').includes('meta')
    })),
    relations: cMap(
      cFilter($('h2.subtitle'), '关联条目')
        .parent()
        .next('.content_inner')
        .find('ul.browserCoverMedium li'),
      $row => {
        const $title = cFind($row, 'a.title')
        const id = matchSubjectId(cData($title, 'href')) as Id
        const type = cText(cFind($row, 'span.sub')) as SubjectTypeValue
        if (type) relationsType = type
        return {
          id,
          image: matchCover(cData(cFind($row, '.coverNeue'), 'style')),
          title: cData(cFind($row, 'a.avatar'), 'title') || cText($title),
          type: relationsType,
          url: `${HOST}/subject/${id}` as const
        }
      }
    ),
    friend: {
      score: cText($('div.frdScore span.num')) || '0',
      total: cText($('div.frdScore a.l')).replace(' 人评分', '') || '0'
    },
    disc,
    book: {
      chap: cData($('#watchedeps'), 'value') || '0',
      vol: cData($('#watched_vols'), 'value') || '0',
      totalChap: cText($('#watchedeps').parent()).replace('Chap.  / ', ''),
      totalVol: cText($('#watched_vols').parent()).replace('Vol.  / ', '')
    },
    comic: cMap(
      cFilter($('h2.subtitle'), '单行本').next('ul.browserCoverMedium').find('li'),
      $row => {
        const $a = cFind($row, 'a')
        return {
          id: matchSubjectId(cData($a, 'href')),
          name: cData($a, 'title') || cText(cFind($row, 'a.title')),
          image: getCoverMedium(matchCover(cData(cFind($row, 'span'), 'style')))
        }
      }
    ),
    like: cMap($('div.content_inner ul.coversSmall li'), $row => {
      const $a = cFind($row, 'a')
      return {
        id: matchSubjectId(cData($a, 'href')),
        name: cData($a, 'title') || cText(cFind($row, 'a.l')),
        image: matchCover(cData(cFind($row, 'span'), 'style'))
      }
    }),
    who: cMap($('#subjectPanelCollect li'), $row => {
      const $a = cFind($row, '.innerWithAvatar a.avatar')
      return {
        avatar: matchAvatar(cData(cFind($row, 'span.avatarNeue'), 'style')),
        name: cText($a),
        userId: matchUserId(cData($a, 'href')),
        star: matchStar(cData(cFind($row, 'span.starlight'), 'class')),
        status: cText(cFind($row, 'small.grey')).replace('小时', '时').replace('分钟', '分')
      }
    }),
    catalog: cMap($('#subjectPanelIndex li'), $row => {
      const $user = cFind($row, 'small.grey a.avatar')
      const $catalog = cFind($row, '.innerWithAvatar > a.avatar')
      return {
        avatar: matchAvatar(cData(cFind($row, 'span.avatarNeue'), 'style')),
        name: cText($user),
        userId: cData($user, 'href').replace('/user/', ''),
        id: parseInt(cData($catalog, 'href').replace('/index/', '')),
        title: cText($catalog)
      }
    }),
    crtCounts,
    lock: cText($('div.tipIntro div.inner h3')),
    formhash: String(cData($('#collectBoxForm'), 'action')).split('?gh=')?.[1] || '',
    collectedTime: cText($('#panelInterestWrapper .SidePanel > p.tip'), true)
  } as SubjectFromHTML
}

/** 章节操作时间 */
export function cheerioSubjectEpsFromHTML(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject', '<div id="footer'))

  const data: EpStatus = {}
  cEach($('.prg_popup .epBtnCu'), $row => {
    const id = Number(cData($row, 'id').split('_')?.[1] || 0)
    if (id) data[id] = cData($row, 'title')
  })
  return data
}

/** 条目留言 */
export function cheerioSubjectComments(html: string): Override<
  SubjectComments,
  {
    /** 贴贴数据 */
    likes: Likes

    /** 是否有不同版本的评论 */
    version: boolean
  }
> {
  const $ = cheerio(htmlMatch(html, '<div id="columnInSubjectA"', '<div id="columnInSubjectB"'))
  const page = Number($('.page_inner .p_cur').text().trim() || 1)
  const pagination = $('.page_inner .p_edge').text().trim().match(/\d+/g)
  const pageTotal = Number(pagination?.[1] || pagination?.[0] || $('.page_inner a.p').length || 1)

  let likes: Likes = {}
  try {
    likes = JSON.parse(html.match(/data_likes_list\s*=\s*(\{.*?\});/)?.[1])
  } catch (error) {}

  return {
    pagination: {
      page,
      pageTotal
    },
    list:
      $('#comment_box .item')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const $subject = $row.find('.thumbTip')

          /**
           * - 玩过 @ 2024-4-24 23:53
           * - 在玩 オーディンスフィア @ 2024-4-12 17:58
           */
          const text = $row.find('small.grey').text().trim()
          return {
            id: `${page}|${index}`,
            userId: matchUserId($row.find('a.avatar').attr('href')),
            userName: $row.find('a.l').text().trim(),
            avatar: matchAvatar($row.find('span.avatarNeue').attr('style')),
            time: text.split('@ ')?.[1] || '',
            star: ($row.find('span.starlight').attr('class') || '').replace('starlight stars', ''),
            comment: $row.find('p').text().trim(),
            relatedId: ($row.find('.likes_grid').attr('id') || '').match(/\d+/g)?.[0] || '',
            action: text.split(' ')?.[0] || '',
            mainId: String($subject.attr('href') || '').replace('/subject/', ''),
            mainName: $subject.text().trim()
          }
        })
        .get() || [],
    likes,
    version: !!$('#SecTab a.chiiBtn').attr('href')
  }
}

const TYPE = {
  1: 'book',
  2: 'anime',
  3: 'music',
  4: 'game',
  6: 'real'
} as const

/** 人物作品 */
export function cheerioMonoWorks(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnCrtB', '<div id="footer'))
  return {
    list: cMap<MonoWorksItem>($('ul#browserItemList > li.item'), $row => ({
      id: cData(cFind($row, 'a.cover'), 'href') as `/subject/${SubjectId}`,
      cover: getCoverMedium(cData(cFind($row, 'img.cover'), 'src')),
      name: cText(cFind($row, 'small.grey')),
      nameCn: cText(cFind($row, 'h3 a.l')),
      tip: cText(cFind($row, 'p.tip')),
      position: cMap(cList($row, 'span.badge_job'), $row => cText($row)),
      score: cText(cFind($row, 'small.fade')),
      total: cText(cFind($row, 'span.tip_j')),
      rank: cText(cFind($row, 'span.rank')).replace('Rank ', ''),
      collected: cHas(cFind($row, 'p.collectModify')),
      type: TYPE[
        cData(cFind($row, 'span.ico_subject_type'), 'class').replace(
          /ico_subject_type subject_type_| ll/g,
          ''
        )
      ]
    })),
    filters: cMap<MonoFiltersItem>($('div.subjectFilter > ul.grouped'), $row => ({
      title: cText(cFind($row, 'li.title')),
      data: cMap<MonoFiltersItem['data'][number]>(cList($row, 'a.l'), $row => ({
        title: cText($row),
        value: cData($row, 'href').split('/works')?.[1] || ''
      }))
    }))
  }
}

/** 人物角色 */
export function cheerioMonoVoices(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnCrtB', '<div id="footer'))
  return {
    list: cMap<MonoVoicesItem>($('ul.browserList > li.item'), $row => {
      const $left = cFind($row, 'div.innerLeftItem')
      const $a = cFind($left, 'h3 > a.l')
      return {
        id: cData($a, 'href').replace('/character/', ''),
        name: cText($a),
        nameCn: cText(cFind($left, 'h3 > p.tip')),
        cover: cData(cFind($left, 'img.avatar'), 'src').split('?')?.[0] || '',
        subject: cMap<MonoVoicesItem['subject'][number]>(
          cList($row, 'ul.innerRightList > li'),
          $row => {
            const $a = cFind($row, 'h3 > a.l')
            return {
              id: cData($a, 'href').replace('/subject/', ''),
              name: cText($a),
              nameCn: cText(cFind($row, 'div.inner small.grey')),
              cover: cData(cFind($row, 'img.cover'), 'src'),
              staff: cText(cFind($row, 'div.inner span.badge_job'))
            }
          }
        )
      }
    }),
    filters: cMap<MonoFiltersItem>($('div.subjectFilter > ul.grouped'), $row => ({
      title: cText(cFind($row, 'li.title')),
      data: cMap<MonoFiltersItem['data'][number]>(cList($row, 'a.l'), $row => ({
        title: cText($row),
        value: cData($row, 'href').split('/works/voice')?.[1] || ''
      }))
    }))
  }
}

/** 条目评分 */
export function cheerioRating(html: string): Rating {
  const $ = cheerio(htmlMatch(html, '<div id="columnInSubjectA"', '<div id="columnInSubjectB"'))
  const counts = {
    wishes: 0,
    collections: 0,
    doings: 0,
    on_hold: 0,
    dropped: 0
  }
  $('ul.secTab li')
    .map((_index: number, element: any) => {
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
      .map((_index: number, element: any) => {
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

/** 包含条目的目录 */
export function cheerioSubjectCatalogs(html: string): SubjectCatalogs {
  const $ = cheerio(htmlMatch(html, '<div id="columnInSubjectA', '<div id="columnInSubjectB'))

  return {
    list: cMap($('li.tml_item'), $row => {
      const $user = cFind($row, 'a.avatar')
      return {
        id: cData(cFind($row, 'a.l'), 'href').replace('/index/', ''),
        title: cText(cFind($row, 'h3')),
        userId: cData($user, 'href').replace('/user/', ''),
        userName: cText($user),
        avatar: matchAvatar(cData(cFind($row, 'span.avatarNeue'), 'style')),
        time: cText(cFind($row, '.time .tip_j')),
        last: cText(cFind($row, '.time .tip_j', 1))
      } as SubjectCatalogsItem
    })
  }
}

/** wiki 修订历史 */
export function cheerioWikiEdits(html: string): Wiki['edits'] {
  const $ = cheerio(htmlMatch(html, '<div id="columnInSubjectA', '<div id="columnInSubjectB"'))
  return (
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
  )
}

/** wiki 增改封面 */
export function cheerioWikiCovers(html: string): Wiki['covers'] {
  const $ = cheerio(htmlMatch(html, '<div id="columnInSubjectA', '<div id="columnInSubjectB"'))
  return (
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
  )
}

/** 条目 VIB 数据 */
export function cheerioVIB(html: string) {
  const string = htmlMatch(html, '<div id="chartVIB', '<div id="footer', false)
  const pattern = /var CHART_SETS = ({.*});/
  const result = string.match(pattern)

  let data: any
  if (result) {
    try {
      data = JSON.parse(result[1])
    } catch (error) {
      data = {}
    }
  }

  if (Array.isArray(data?.vib?.data)) {
    try {
      const items = data.vib.data as {
        title: number
        vib: number
      }[]
      const totalVib = items.reduce(
        (total, item) => total + (item?.title || 0) * (item?.vib || 0),
        0
      )
      const sumVib = items.reduce((sum, item) => sum + (item?.vib || 0), 0)
      const averageVib = totalVib / sumVib
      return {
        total: sumVib,
        avg: Number(averageVib.toFixed(2))
      }
    } catch (error) {}
  }

  return {
    total: 0,
    avg: 0
  }
}

/** 条目 MAL 数据 */
export function cheerioMAL(html: string) {
  const $ = cheerio(
    htmlMatch(html, '<div class="anime-detail-header-stats', '<div class="user-status-block')
  )
  return {
    mal: $('.score-label').text().trim() || 0,
    malTotal: Number($('.fl-l.score').data('user').replace(' users', '').replace(',', '')) || 0
  }
}

/** 人物信息 */
export function cheerioMono(html: string, monoId: MonoId) {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject', '<div class="crtCommentList'))

  const isPerson = monoId.includes('person')
  const trimHtml = HTMLTrim(html)

  const $h1 = $('h1.nameSingle a')

  const sub = cText($('#columnCrtB div.clearit h2.subtitle')).replace(/[\r\n]+/g, ' ')
  const detail = [sub, cText($('#columnCrtB .detail'))].filter(Boolean).join('\n\n')

  const actionUrl = cData($('.collect.action a.icon'), 'href')
  const collected = cHas($('.collect.action .ico_like'))
  const collectUrl = collected ? '' : actionUrl
  const eraseCollectUrl = collected ? actionUrl : ''

  let jobs: Mono['jobs'] = []
  let voice: Mono['voice'] = []
  let works: Mono['works'] = []
  if (isPerson) {
    const voiceHtml = trimHtml.match(
      /<h2 class="subtitle">最近演出角色<\/h2><ul class="browserList(.+?)<\/ul><a href=/
    )?.[1]
    if (voiceHtml) voice = cMap(cheerio(voiceHtml)('li.item'), mapVoice)

    const worksHtml = trimHtml.match(
      /<h2 class="subtitle">最近参与<\/h2><ul class="browserList(.+?)<\/ul><a href=/
    )?.[1]
    if (worksHtml) works = cMap(cheerio(worksHtml)('li.item'), mapWorks)
  } else {
    jobs = cMap($('.castTypeFilterList li.item'), mapJobs)
  }

  return {
    name: cText($h1),
    nameCn: cData($h1, 'title'),
    cover: fixedCover(cData($('.infobox img.cover'), 'src')),
    detail,
    info: cHtml($('#infobox')),
    collectUrl,
    eraseCollectUrl,
    jobs,
    voice,
    works,
    collected: cMap($('#crtPanelCollect .groupsLine li'), mapCollected),
    collabs: cMap($('ul.coversSmall li'), mapCollabs)
  } as Mono
}

/** 人物吐槽箱 */
export function cheerioMonoComments(html: string) {
  const trimHtml = HTMLTrim(html)
  return cheerioComments(trimHtml).reverse() as MonoCommentsItem[]
}

function mapJobs($row: any) {
  const $name = cFind($row, '.innerLeftItem h3 a')

  const $li = cFind($row, '.innerRightList li')
  const $cast = cFind($li, 'a')

  const $li2 = cFind($row, '.innerRightList li', 1)
  const $cast2 = cFind($li2, 'a')
  const cast2: {
    cast: string
    castCover: string
    castHref: string
    castTag: string
  } = {
    cast: '',
    castCover: '',
    castHref: '',
    castTag: ''
  }
  const cast = cData($cast2, 'title')
  if (cast) {
    cast2.cast = cast
    cast2.castCover = fixedCover(cData(cFind($cast2, 'img'), 'src'))
    cast2.castHref = cData($cast2, 'href')
    cast2.castTag = cText(cFind($li2, 'small.grey'))
  }

  return {
    cover: fixedCover(cData(cFind($row, '.innerLeftItem img'), 'src')),
    name: cText($name),
    nameCn: cText(cFind($row, '.innerLeftItem small.grey')),
    staff: cText(cFind($row, '.badge_job')),
    href: cData($name, 'href'),
    type: cData(cFind($row, '.ico_subject_type'), 'class').substring(30, 31) as SubjectTypeValue,
    cast: cData($cast, 'title'),
    castCover: fixedCover(cData(cFind($cast, 'img'), 'src')),
    castHref: cData($cast, 'href'),
    castTag: cText(cFind($li, 'small.grey')),
    cast2
  }
}

function mapVoice($row: any) {
  const $name = cFind($row, '.innerLeftItem h3 a')
  const $subject = cFind($row, '.innerRightList li')
  const $a = cFind($subject, 'h3 a.l')
  return {
    cover: fixedCover(cData(cFind($row, '.innerLeftItem img'), 'src')),
    href: cData($name, 'href'),
    name: cText($name),
    nameCn: cText(cFind($row, '.innerLeftItem .tip')),
    staff: cText(cFind($subject, '.badge_job')),
    subjectCover: fixedCover(cData(cFind($subject, 'img'), 'src')),
    subjectHref: cData($a, 'href'),
    subjectName: cText($a),
    subjectNameCn: cText(cFind($subject, 'small.grey'))
  }
}

function mapWorks($row: any) {
  const $name = cFind($row, 'h3 a.l')
  return {
    cover: fixedCover(cData(cFind($row, '.innerLeftItem img'), 'src')),
    href: cData($name, 'href'),
    name: cText($name),
    staff: cText(cFind($row, '.badge_job')),
    type: cData(cFind($row, '.ico_subject_type'), 'class').substring(30, 31) as SubjectTypeValue
  }
}

function mapCollabs($row: any) {
  return {
    href: cData(cFind($row, 'a.avatar'), 'href'),
    name: cText(cFind($row, 'a.l')),
    cover: fixedCover(matchAvatar(cData(cFind($row, 'span.coverNeue'), 'style'))).replace(
      '/crt/m/',
      '/crt/g/'
    ),
    count: cText(cFind($row, 'small')).replace(/\(|\)/g, '')
  }
}

function mapCollected($row: any) {
  const $a = cFind($row, '.innerWithAvatar .avatar')
  return {
    avatar: fixedCover(matchAvatar(cData(cFind($row, 'span.avatarSize32'), 'style'))),
    name: cText($a),
    userId: matchUserId(cData($a, 'href')) as UserId,
    last: cText(cFind($row, 'small.grey'))
  }
}

function fixedCover(src: string) {
  return src.includes('/img/info_only') ? '' : src.split('?')[0]
}
