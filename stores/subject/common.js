/*
 * @Author: czy0729
 * @Date: 2019-07-15 09:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-15 09:34:26
 */
import { HTML_MONO } from '@constants/html'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
import { fetchHTML } from '@utils/fetch'
import { analysisComments } from '../rakuen/common'
import { INIT_MONO } from './init'

export async function fetchMono({ monoId = 0 }) {
  // -------------------- 请求HTML --------------------
  const raw = await fetchHTML({
    url: `!${HTML_MONO(monoId)}`
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
    matchHTML = HTML.match(/<img src="(.+?)" class="cover" \/>/)
    if (matchHTML) {
      mono.cover = matchHTML[1]
    }

    // 各种详细
    matchHTML = HTML.match(/<ul id="infobox">(.+?)<\/ul>/)
    if (matchHTML) {
      mono.info = matchHTML[1]
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
        const cover = node ? node[0].attrs.src : ''

        node = findTreeNode(children, 'ul > li > div > h3 > a|text&href')
        const subjectHref = node ? node[0].attrs.href : ''
        const subjectName = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > div > small')
        const subjectNameCn = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > div > span')
        const staff = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a > img')
        const subjectCover = node ? node[0].attrs.src : ''

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
        const cover = node ? node[0].attrs.src : ''

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
        const cover = node ? node[0].attrs.src : ''

        node = findTreeNode(children, 'div > div > span')
        const staff = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a')
        const cast = node ? node[0].attrs.title : ''
        const castHref = node ? node[0].attrs.href : ''

        node = findTreeNode(children, 'ul > li > div > small')
        const castTag = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'ul > li > a > img')
        const castCover = node ? node[0].attrs.src : ''

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
    monoComments
  })
}
