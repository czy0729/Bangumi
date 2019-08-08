/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:59:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-08 12:11:53
 */
import cheerio from 'cheerio-without-node-native'
import { fetchHTML } from '@utils/fetch'
import { HTMLTrim, HTMLToTree, findTreeNode, HTMLDecode } from '@utils/html'
import { matchAvatar, matchUserId } from '@utils/match'
import { IOS } from '@constants'
import { HTML_RAKUEN, HTML_TOPIC } from '@constants/html'
import { INIT_COMMENTS_ITEM } from './init'

export async function fetchRakuen({ scope, type } = {}) {
  // -------------------- 请求HTML --------------------
  const res = fetchHTML({
    url: HTML_RAKUEN(scope, type)
  })
  const raw = await res
  const HTML = HTMLTrim(raw).match(
    /<div id="eden_tpc_list"><ul>(.+?)<\/ul><\/div>/
  )

  // -------------------- 分析HTML --------------------
  const rakuen = []
  if (HTML) {
    const tree = HTMLToTree(HTML[1])
    tree.children.forEach(item => {
      const avatar = item.children[0].children[0].attrs.style.replace(
        /background-image:url\('|'\)/g,
        ''
      )

      const { children } = item.children[1]
      const title = children[0].text[0]
      const { href = '' } = children[0].attrs
      const replies = children[1].text[0]

      // 小组有可能是没有的
      let group = ''
      let groupHref = ''
      let time = ''
      if (children.length === 3) {
        time = children[2].children[0].text[0]
      } else {
        group = children[3].text[0]
        groupHref = children[3].attrs.href
        time = children[4] ? children[4].text[0] : children[3].text[0]
      }

      const data = {
        title: HTMLDecode(title),
        avatar,
        userName: HTMLDecode(item.children[0].attrs.title),
        href,
        replies,
        group: HTMLDecode(group),
        groupHref,
        time
      }
      rakuen.push(data)
    })
  }

  return Promise.resolve(rakuen)
}

export async function fetchTopic({ topicId = 0 }, reverse) {
  // -------------------- 请求HTML --------------------
  const raw = await fetchHTML({
    // @todo 这统一帖子内容的接口IOS带cookie访问直接掉线, 需解决
    url: IOS ? `!${HTML_TOPIC(topicId)}` : HTML_TOPIC(topicId)
  })
  const HTML = HTMLTrim(raw)

  // -------------------- 分析内容 --------------------
  let node
  let matchHTML

  // 帖子
  let topic = {}

  // 回复表单凭据
  matchHTML = HTML.match(
    /<input type="hidden" name="formhash" value="(.+?)" \/>/
  )
  if (matchHTML) {
    topic.formhash = matchHTML[1]
  }

  // 分组信息
  matchHTML = HTML.match(
    /<div id="pageHeader">(.+?)<\/div><hr class="board" \/>/
  )
  if (matchHTML) {
    const tree = HTMLToTree(matchHTML[1])
    topic.title = tree.children[0].text[1] || ''

    node = findTreeNode(tree.children, 'h1 > a > img')
    topic.groupThumb = node ? node[0].attrs.src : ''

    node = findTreeNode(tree.children, 'h1 > a|class=avatar')
    topic.group = node ? node[0].text[0] : ''
    topic.groupHref = node ? node[0].attrs.href : ''
  }

  // 楼主层信息
  matchHTML = HTML.match(
    /<div id="post_\d+" class="postTopic light_odd clearit">(.+?)<\/div><div id="sliderContainer"/
  )
  if (matchHTML) {
    const tree = HTMLToTree(matchHTML[1])
    topic = {
      ...topic,
      ...getTopFloorAttrs(tree)
    }
  }

  // 帖子内容
  matchHTML = HTML.match(
    /<div class="topic_content">(.+?)<\/div><\/div><\/div><div id="sliderContainer"/
  )
  if (matchHTML) {
    topic.message = matchHTML[1]
  }

  // -------------------- 分析留言 --------------------
  // 留言层信息
  matchHTML =
    // 登陆的情况
    HTML.match(
      /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><hr/
    ) ||
    // 没登陆的情况
    HTML.match(
      /<div id="comment_list" class="commentList borderNeue">(.+?)<\/div><\/div><div style="margin-top/
    )

  const comments = analysisComments(matchHTML, reverse)

  return Promise.resolve({
    topic,
    comments: comments.filter(item => !!item.userId)
  })
}

/**
 * 分析留言层信息
 * @param {*} HTML
 */
export function analysisComments(HTML, reverse) {
  const comments = []
  if (!HTML) {
    return comments
  }
  // 回复内容需要渲染html就不能使用node查找了, 而且子回复也在里面
  let messageHTML = HTML[1]
    .match(/<div class="reply_content">(.+?)<\/div><\/div><\/div><\/div>/g)
    .map(item => item.replace(/^<div class="reply_content">|<\/div>$/g, ''))

  if (reverse && messageHTML.length) {
    messageHTML = messageHTML.reverse()
  }

  const tree = HTMLToTree(HTML[1])
  let { children } = tree
  if (reverse && children.length) {
    children = children.reverse()

    // 会有一个评论被折叠的提示
    if (children.length > messageHTML.length) {
      children.shift()
    }
  }
  children.forEach((item, index) => {
    // @todo 暂时只显示前160楼, 因为写法是一次性计算的, 计算太大会爆栈闪退, 待优化
    if (index >= 160) {
      return
    }

    const sub = [] // 存放子回复
    const subHTML =
      messageHTML[index] &&
      messageHTML[index].match(
        /<div class="topic_sub_reply" id="topic_reply_\d+">(.+?)$/
      )
    if (subHTML) {
      const subMessageHTML = subHTML[1]
        .match(/<div id="post_\d+"(.+?)<\/div><\/div><\/div>/g)
        .map(item =>
          item.replace(
            /<div id="post_\d+" class="sub_reply_bgclearit">|<\/div>$/g,
            ''
          )
        )

      const subTree = HTMLToTree(subHTML[1])
      subTree.children.forEach((item, index) => {
        // 子楼层回复内容
        if (subMessageHTML[index]) {
          const message = subMessageHTML[index].match(
            /<div class="cmt_sub_content">(.+?)<\/div><\/div>/
          )[1]
          sub.push({
            ...getCommentAttrs(item),
            message
          })
        }
      })
    }

    // 楼层回复内容
    let message
    if (sub.length) {
      // 某些界面class="message clearit"不一致, 抹平差异
      const match =
        messageHTML[index] &&
        messageHTML[index]
          .replace('class="message clearit"', 'class="message"')
          .match(
            /<div class="message">(.+?)<\/div><div class="topic_sub_reply"/
          )
      message = match ? match[1] : ''
    } else {
      const match =
        messageHTML[index] &&
        messageHTML[index]
          .replace('class="message clearit"', 'class="message"')
          .match(/<div class="message">(.+?)<\/div><\/div>/)
      message = match ? match[1] : ''
    }

    comments.push({
      ...getCommentAttrs(item),
      message,
      sub
    })
  })

  return comments
}

/**
 * 分析楼主层信息
 * @param {*} tree
 */
function getTopFloorAttrs(tree) {
  try {
    let node
    const { children } = tree
    const id = ''

    node = findTreeNode(children, 'div > small|text')
    const time = node ? node[0].text[0].replace(/#1 - | \/ /g, '') : ''
    const floor = '#1'

    node = findTreeNode(children, 'a > span|style~background-image')
    const avatar = node
      ? node[0].attrs.style.replace(/background-image:url\('|'\)/g, '')
      : ''

    node = findTreeNode(children, 'div > a|text&class~l&href~/user/')
    const userId = node ? node[0].attrs.href.replace('/user/', '') : ''
    const userName = node ? node[0].text[0] : ''

    node = findTreeNode(children, 'div > span|text&class=tip_j')
    const userSign = node ? node[0].text[0] : ''

    return {
      id,
      time,
      floor,
      avatar,
      userId,
      userName: HTMLDecode(userName),
      userSign: HTMLDecode(userSign)
    }
  } catch (error) {
    // do nothing
  }

  return INIT_COMMENTS_ITEM
}

/**
 * 分析留言层信息
 * @param {*} tree
 */
function getCommentAttrs(tree) {
  try {
    let node
    const { children } = tree
    const id = tree.attrs.id.replace('post_', '')

    node = findTreeNode(children, 'div|text&class=re_info')
    const time = node ? node[0].text[0].replace(/ - |\/ /g, '') : ''

    node = findTreeNode(children, 'div > a|class=floor-anchor')
    const floor = node ? node[0].text[0] : ''

    node = findTreeNode(children, 'a > span|style~background-image')
    const avatar = node
      ? node[0].attrs.style.replace(/background-image:url\('|'\)/g, '')
      : ''

    node = findTreeNode(children, 'div > a|text&class~l&href~/user/')
    const userId = node ? node[0].attrs.href.replace('/user/', '') : ''
    const userName = node ? node[0].text[0] : ''

    node = findTreeNode(children, 'div > span|text&class=tip_j')
    const userSign = node ? node[0].text[0] : ''

    // sub reply
    node = findTreeNode(children, 'div > a|onclick')
    const replySub = node ? node[0].attrs.onclick : ''

    return {
      id,
      time,
      floor,
      avatar,
      userId,
      userName: HTMLDecode(userName),
      userSign: HTMLDecode(userSign),
      replySub
    }
  } catch (error) {
    // do nothing
  }

  return INIT_COMMENTS_ITEM
}

/**
 * 分析小组信息
 * @param {*} HTML
 */
export function analysisGroupInfo(HTML) {
  const el = cheerio.load(HTML)
  return {
    title: el('.SecondaryNavTitle').text(),
    cover: el('.port.ll').attr('src'),
    content: el('.line_detail .tip')
      .text()
      .replace(/\r\n\r\n|\r\n\r\n\r\n/g, '\r\n')
  }
}

/**
 * 分析小组帖子列表
 * @param {*} HTML
 */
export function analysisGroup(HTML) {
  return cheerio
    .load(HTML)('tr.topic')
    .map((index, element) => {
      const $tr = cheerio(element)
      const $title = $tr.find('.subject > a')
      const $user = $tr.find('.author > a')
      return {
        href: $title.attr('href'),
        title: $title.attr('title'),
        userId: $user.attr('href').replace('/user/', ''),
        userName: $user.text(),
        replies: $tr.find('.posts').text(),
        time: $tr.find('.time').text()
      }
    })
    .get()
}

/**
 * 分析电波提醒列表
 * @param {*} HTML
 */
export function cheerioNotify(HTML) {
  return cheerio
    .load(HTML)('div.tml_item')
    .map((index, element) => {
      const $tr = cheerio(element)
      const $name = $tr.find('a.l')
      const $title = $tr.find('a.nt_link')
      const title = $title.text()
      let message
      let message2

      if (title) {
        // eslint-disable-next-line no-extra-semi
        ;[message, message2] = $tr
          .find('div.reply_content')
          .text()
          .split(title)
      } else {
        message = $tr.find('div.reply_content').text()
      }

      return {
        avatar: matchAvatar($tr.find('span.avatarNeue').attr('style')) || '',
        userName: $name.text() || '',
        userId: matchUserId($name.attr('href')) || '',
        title: title || '',
        href: $title.attr('href') || '',
        message: message || '',
        message2: message2 || ''
      }
    })
    .get()
}
