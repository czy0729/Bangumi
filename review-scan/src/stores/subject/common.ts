/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-12 15:31:25
 */
import {
  cData,
  cEach,
  cFilter,
  cheerio,
  cHtml,
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
import { Cover, Id, Override, SubjectTypeValue } from '@types'
import { cheerioComments } from '../rakuen/common'
import { Likes } from '../rakuen/types'
import {
  MonoVoices,
  MonoWorks,
  Rating,
  SubjectCatalogs,
  SubjectComments,
  SubjectFromHTML,
  Wiki
} from './types'

/** 条目信息 */
export function cheerioSubjectFromHTML(html: string): SubjectFromHTML {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject"', '<div id="footer">'))
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
    const id = cData($row.find('a.avatar'), 'href').replace('/character/', '')
    const num = cText($row.find('small.rr')).replace(/\(|\)|\+/g, '') || 0
    if (id && num) crtCounts[id] = Number(num)
  })

  return {
    type,
    watchedEps: cData($('#watchedeps'), 'value') || 0,
    totalEps,
    info: rawInfo,
    tags: cMap($('div.subject_tag_section div.inner a.l'), $row => ({
      name: cText($row.find('span')),
      count: cText($row.find('small')),
      meta: cData($row, 'class').includes('meta')
    })),
    relations: cMap($('div.content_inner ul.browserCoverMedium li'), $row => {
      const $title = $row.find('a.title')
      const id = matchSubjectId(cData($title, 'href')) as Id
      const type = cText($row.find('span.sub')) as SubjectTypeValue
      if (type) relationsType = type
      return {
        id,
        image: matchCover(cData($row.find('span.avatarNeue'), 'style')) as Cover<'m'>,
        title: cText($title),
        type: relationsType,
        url: `${HOST}/subject/${id}`
      }
    }),
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
        const $a = $row.find('a')
        return {
          id: matchSubjectId(cData($a, 'href')),
          name: cData($a, 'title') || cText($row.find('a.title')),
          image: getCoverMedium(matchCover(cData($row.find('span'), 'style')))
        }
      }
    ),
    like: cMap($('div.content_inner ul.coversSmall li'), $row => {
      const $a = $row.find('a')
      return {
        id: matchSubjectId(cData($a, 'href')),
        name: cData($a, 'title') || cText($row.find('a.l')),
        image: matchCover(cData($row.find('span'), 'style')) as Cover<'m'>
      }
    }),
    who: cMap($('#subjectPanelCollect li'), $row => {
      const $a = $row.find('a.avatar')
      return {
        avatar: matchAvatar(cData($row.find('span.avatarNeue'), 'style')),
        name: cText($a),
        userId: matchUserId(cData($a, 'href')),
        star: matchStar(cData($row.find('span.starlight'), 'class')),
        status: cText($row.find('small.grey')).replace('小时', '时').replace('分钟', '分')
      }
    }),
    catalog: cMap($('#subjectPanelIndex li'), $row => {
      const $user = $row.find('small.grey a.avatar')
      const $catalog = $row.find('.innerWithAvatar > a.avatar')
      return {
        avatar: matchAvatar(cData($row.find('span.avatarNeue'), 'style')),
        name: cText($user),
        userId: cData($user, 'href').replace('/user/', ''),
        id: parseInt(cData($catalog, 'href').replace('/index/', '')),
        title: cText($catalog)
      }
    }),
    crtCounts,
    lock: cText($('div.tipIntro div.inner h3')),
    formhash: String(cData($('#collectBoxForm'), 'action')).split('?gh=')?.[1] || ''
  }
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
export function cheerioMonoWorks(html: string): MonoWorks {
  const $ = cheerio(htmlMatch(html, '<div id="columnCrtB"', '<div id="footer">'))
  return {
    filters:
      $('div.subjectFilter > ul.grouped')
        .map((_index: number, element: any) => {
          const $li = cheerio(element)
          return safeObject({
            title: $li.find('li.title').text().trim(),
            data:
              $li
                .find('a.l')
                .map((_idx: number, el: any) => {
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
        .map((_index: number, element: any) => {
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
                .map((_idx: number, el: any) => cheerio(el).text().trim())
                .get() || [],
            score: $li.find('small.fade').text().trim(),
            total: $li.find('span.tip_j').text().trim(),
            rank: $li.find('span.rank').text().trim().replace('Rank ', ''),
            collected: !!$li.find('p.collectModify').text(),
            type: TYPE[
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

/** 人物角色 */
export function cheerioMonoVoices(html: string): MonoVoices {
  const $ = cheerio(htmlMatch(html, '<div id="columnCrtB"', '<div id="footer">'))
  return {
    filters:
      $('div.subjectFilter > ul.grouped')
        .map((_index: number, element: any) => {
          const $li = cheerio(element)
          return safeObject({
            title: $li.find('li.title').text().trim(),
            data:
              $li
                .find('a.l')
                .map((_idx: number, el: any) => {
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
        .map((_index: number, element: any) => {
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
                .map((_idx: number, el: any) => {
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
  const $ = cheerio(htmlMatch(html, '<div id="columnInSubjectA"', '<div id="columnInSubjectB"'))
  return {
    list:
      $('li.tml_item')
        .map((_index: number, element: any) => {
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
  const string = htmlMatch(html, '<div id="chartVIB"', '<div id="footer">', false)
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

/** 人物信息和吐槽箱 */
export function cheerioMono(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="headerSubject"', '<div class="crtCommentList">'))
  const $name = $('h1.nameSingle a')
  const eraseCollectUrl = cData($('.collect a.break'), 'href')
  const trimHtml = HTMLTrim(html)

  let detail = cText($('#columnCrtB .detail'))
  const sub = cText($('#columnCrtB div.clearit h2.subtitle')).replace(/[\r\n]+/g, ' ')
  if (sub) detail = `${sub}\n\n${detail}`

  /** 出演 */
  let jobs: ReturnType<typeof mapJobs>[] = []
  const jobsHtml = trimHtml.match(
    /<h2 class="subtitle">出演<\/h2><ul class="browserList">(.+?)<\/ul><div class="section_line clear">/
  )?.[1]
  if (jobsHtml) jobs = cMap(cheerio(jobsHtml)('li.item'), mapJobs)

  /** 最近演出角色 */
  let voice: ReturnType<typeof mapVoice>[] = []
  const voiceHtml = trimHtml.match(
    /<h2 class="subtitle">最近演出角色<\/h2><ul class="browserList">(.+?)<\/ul><a href=/
  )?.[1]
  if (voiceHtml) voice = cMap(cheerio(voiceHtml)('li.item'), mapVoice)

  /** 最近参与 */
  let works: ReturnType<typeof mapWorks>[] = []
  const worksHtml = trimHtml.match(
    /<h2 class="subtitle">最近参与<\/h2><ul class="browserList">(.+?)<\/ul><a href=/
  )?.[1]
  if (worksHtml) works = cMap(cheerio(worksHtml)('li.item'), mapWorks)

  return {
    mono: {
      name: cText($name),
      nameCn: cData($name, 'title'),
      cover: fixedCover(cData($('.infobox img.cover'), 'src')),
      detail,
      info: cHtml($('#infobox')),
      collectUrl: eraseCollectUrl ? '' : cData($('.collect a'), 'href'),
      eraseCollectUrl,
      jobs,
      voice,
      works,

      /** 合作 */
      collabs: cMap($('ul.coversSmall li'), mapCollabs),

      /** 谁收藏了 */
      collected: cMap($('#crtPanelCollect .groupsLine li'), mapCollected),

      /** @deprecated */
      workes: []
    },
    monoComments: cheerioComments(trimHtml).reverse()
  }
}

function mapJobs($row: any) {
  const $name = $row.find('.innerLeftItem h3 a')
  const $lis = $row.find('.innerRightList li')

  const $li = $lis.eq(0)
  const $cast = $li.find('a').eq(0)

  const $li2 = $lis.eq(1)
  const $cast2 = $li2.find('a').eq(0)
  const cast2: {
    cast?: string
    castCover?: string
    castHref?: string
    castTag?: string
  } = {}
  const cast = cData($cast2, 'title')
  if (cast) {
    cast2.cast = cast
    cast2.castCover = fixedCover(cData($cast2.find('img'), 'src'))
    cast2.castHref = cData($cast2, 'href')
    cast2.castTag = cText($li2.find('small.grey'))
  }

  return {
    cover: fixedCover(cData($row.find('.innerLeftItem img'), 'src')),
    name: cText($name),
    nameCn: cText($row.find('.innerLeftItem small.grey')),
    staff: cText($row.find('.badge_job').eq(0)),
    href: cData($name, 'href'),
    type: cData($row.find('.ico_subject_type'), 'class').substring(30, 31),
    cast: cData($cast, 'title'),
    castCover: fixedCover(cData($cast.find('img'), 'src')),
    castHref: cData($cast, 'href'),
    castTag: cText($li.find('small.grey')),
    cast2
  }
}

function mapVoice($row: any) {
  const $name = $row.find('.innerLeftItem h3 a')
  const $subject = $row.find('.innerRightList li').eq(0)
  const $a = $subject.find('h3 a.l')
  return {
    cover: fixedCover(cData($row.find('.innerLeftItem img'), 'src')),
    href: cData($name, 'href'),
    name: cText($name),
    nameCn: cText($row.find('.innerLeftItem .tip')),
    staff: cText($subject.find('.badge_job')),
    subjectCover: fixedCover(cData($subject.find('img'), 'src')),
    subjectHref: cData($a, 'href'),
    subjectName: cText($a),
    subjectNameCn: cText($subject.find('small.grey'))
  }
}

function mapWorks($row: any) {
  const $name = $row.find('h3 a.l')
  return {
    cover: fixedCover(cData($row.find('.innerLeftItem img'), 'src')),
    href: cData($name, 'href'),
    name: cText($name),
    staff: cText($row.find('.badge_job')),
    type: cData($row.find('.ico_subject_type'), 'class').substring(30, 31)
  }
}

function mapCollabs($row: any) {
  return {
    href: cData($row.find('a.avatar'), 'href'),
    name: cText($row.find('a.l')),
    cover: fixedCover(matchAvatar(cData($row.find('span.avatarNeue'), 'style'))).replace(
      '/crt/m/',
      '/crt/g/'
    ),
    count: cText($row.find('small')).replace(/\(|\)/g, '')
  }
}

function mapCollected($row: any) {
  const $a = $row.find('.innerWithAvatar .avatar')
  return {
    avatar: fixedCover(matchAvatar(cData($row.find('span.avatarSize32'), 'style'))),
    name: cText($a),
    userId: matchUserId(cData($a, 'href')),
    last: cText($row.find('small.grey'))
  }
}

function fixedCover(src: string) {
  return src.includes('/img/info_only') ? '' : src.split('?')[0]
}
