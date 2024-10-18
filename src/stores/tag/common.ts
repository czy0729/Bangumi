/*
 * @Author: czy0729
 * @Date: 2019-07-28 15:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-18 03:40:15
 */
import { cData, cheerio, cMap, cText, findTreeNode, htmlMatch, HTMLToTree, HTMLTrim } from '@utils'
import { Cover } from '@types'
import { INIT_TAG_ITEM } from './init'
import { TagItem } from './types'

/** 标签 */
export function cheerioTags(html: string): {
  list: TagItem[]
  meta: boolean
  pageTotal: number
} {
  return {
    list: cMap(
      cheerio(
        htmlMatch(
          html,
          '<div class="columns clearit">',
          '<div id="columnSubjectBrowserB" class="column">'
        )
      )('li.item'),
      $row => {
        const $a = $row.find('h3 a.l')
        return {
          id: cData($a, 'href'),
          name: cText($row.find('small.grey')),
          nameCn: cText($a),
          cover: cData($row.find('img.cover'), 'src') as Cover<'c'>,
          rank: cText($row.find('.rank')).split(' ')?.[1] || '',
          score: cText($row.find('.rateInfo small')),
          total: cText($row.find('.tip_j')),
          tip: cText($row.find('.info')),
          collected: !!cData($row.find('.collectModify'), 'class')
        }
      }
    ),
    meta: htmlMatch(
      html,
      '<div id="columnSubjectBrowserB" class="column">',
      '<div id="footer">'
    ).includes('公共标签'),

    // ( 1 / 75 )
    pageTotal: Number(
      (
        cText(
          cheerio(htmlMatch(html, '<div class="page_inner">', '<hr class="board"'))('.p_edge')
        ).split('/')?.[1] || ''
      ).replace(/ |\)/g, '') || 0
    )
  }
}

/** 标签 */
export function analysisTags(raw, page, pagination) {
  const HTML = HTMLTrim(raw)

  // -------------------- 分析HTML --------------------
  let node
  const tag = []
  let { pageTotal = 0 } = pagination

  // 条目
  const matchHTML = HTML.match(
    /<ul id="browserItemList" class="browserFull">(.+?)<\/ul><div class="clearit">/
  )
  if (matchHTML) {
    // 总页数
    if (page === 1) {
      const pageHTML =
        HTML.match(/<span class="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/) ||
        HTML.match(
          /<a href="\?.*page=\d+" class="p">(\d+)<\/a><a href="\?.*page=2" class="p">&rsaquo;&rsaquo;<\/a>/
        )
      if (pageHTML) {
        pageTotal = pageHTML[1]
      } else {
        pageTotal = 1
      }
    }

    const tree = HTMLToTree(matchHTML[1])
    tree.children.forEach(item => {
      const { children } = item

      // 条目Id
      node = findTreeNode(children, 'a|href')
      const id = node ? node[0].attrs.href : ''

      // 封面
      node =
        findTreeNode(children, 'a > span > img') || findTreeNode(children, 'a > noscript > img')
      let cover = node ? node[0].attrs.src : ''
      if (cover === '/img/info_only.png') {
        cover = ''
      }

      // 标题
      node = findTreeNode(children, 'div > h3 > small')
      const name = node ? node[0].text[0] : ''

      node = findTreeNode(children, 'div > h3 > a')
      const nameCn = node ? node[0].text[0] : ''

      // 描述
      node = findTreeNode(children, 'div > p|class=info tip')
      const tip = node ? node[0].text[0] : ''

      // 分数
      node = findTreeNode(children, 'div > p > small|class=fade')
      const score = node ? node[0].text[0] : ''

      node = findTreeNode(children, 'div > p > span|class=tip_j')
      const total = node ? node[0].text[0] : ''

      // 排名
      node = findTreeNode(children, 'div > span|class=rank')
      const rank = node ? node[0].text[0] : ''

      // 收藏状态
      node = findTreeNode(children, 'div > div > p > a|title=修改收藏')
      const collected = !!node

      const data = {
        ...INIT_TAG_ITEM,
        id,
        cover,
        name,
        nameCn,
        tip,
        score,
        total,
        rank,
        collected
      }
      tag.push(data)
    })
  }

  return {
    pageTotal,
    tag
  }
}

/** 排行榜 */
export function analysiRank(raw) {
  const HTML = HTMLTrim(raw)

  // -------------------- 分析HTML --------------------
  let node
  const list = []

  // 条目
  const matchHTML = HTML.match(
    /<ul id="browserItemList" class="browserFull">(.+?)<\/ul><div class="clearit">/
  )
  if (matchHTML) {
    const tree = HTMLToTree(matchHTML[1])
    tree.children.forEach(item => {
      const { children } = item

      // 条目Id
      node = findTreeNode(children, 'a|href')
      const id = node ? node[0].attrs.href : ''

      // 封面
      node =
        findTreeNode(children, 'a > span > img') || findTreeNode(children, 'a > noscript > img')
      let cover = node ? node[0].attrs.src : ''
      if (cover === '/img/info_only.png' || cover === '/img/no_icon_subject.png') {
        cover = ''
      }

      // 标题
      node = findTreeNode(children, 'div > h3 > small')
      const name = node ? node[0].text[0] : ''

      node = findTreeNode(children, 'div > h3 > a')
      const nameCn = node ? node[0].text[0] : ''

      // 描述
      node = findTreeNode(children, 'div > p|class=info tip')
      const tip = node ? node[0].text[0] : ''

      // 分数
      node = findTreeNode(children, 'div > p > small|class=fade')
      const score = node ? node[0].text[0] : ''

      node = findTreeNode(children, 'div > p > span|class=tip_j')
      const total = node ? node[0].text[0] : ''

      // 排名
      node = findTreeNode(children, 'div > span|class=rank')
      const rank = node ? node[0].text[0] : ''

      // 收藏状态
      node = findTreeNode(children, 'div > div > p > a|title=修改收藏')
      const collected = !!node

      const data = {
        ...INIT_TAG_ITEM,
        id,
        cover,
        name,
        nameCn,
        tip,
        score,
        total,
        rank,
        collected
      }
      list.push(data)
    })
  }

  return list
}
