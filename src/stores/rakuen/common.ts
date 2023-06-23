/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:59:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 13:01:09
 */
import {
  HTMLDecode,
  HTMLToTree,
  HTMLTrim,
  cheerio,
  getCoverSmall,
  safeObject,
  trim
} from '@utils'
import { fetchHTML } from '@utils/fetch'
import { matchAvatar, matchUserId } from '@utils/match'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HTML_RAKUEN } from '@constants'
import { RakuenScope, RakuenType, RakuenTypeGroup, RakuenTypeMono } from '@types'
import { INIT_TOPIC, INIT_COMMENTS_ITEM, INIT_BLOG } from './init'
import { Likes, CommentsItem, CommentsItemWithSub, Topic } from './types'

export async function fetchRakuen(args: {
  scope: RakuenScope
  type: RakuenType | RakuenTypeMono | RakuenTypeGroup
}) {
  const { scope, type } = args || {}

  // -------------------- 请求HTML --------------------
  const res = fetchHTML({
    url: HTML_RAKUEN(scope, type)
  })
  const raw = await res
  const HTML = HTMLTrim(raw).match(/<div id="eden_tpc_list"><ul>(.+?)<\/ul><\/div>/)

  // -------------------- 分析HTML --------------------
  const rakuen = []
  if (HTML) {
    const tree = HTMLToTree(HTML[1])
    tree.children.forEach(item => {
      const avatar = item.children[0].children[0].attrs.style.replace(
        /background-image:url\('|'\)/g,
        ''
      )
      const userId = item.children[0].children[0].attrs?.['data-user']

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
        userId,
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

/** 分析留言层信息 */
export function cheerioComments(html: string, reverse?: boolean) {
  if (!html) return []

  try {
    const list =
      cheerio(html)('.commentList .row_replyclearit')
        .map((index: number, element: any) => {
          const $row = cheerio(element)
          const info = $row.find('div.action small').text().trim().split(' - ')
          const $name = $row.find('a.l')
          return {
            id: $row.attr('id').replace('post_', ''),
            time: info?.[1] || '',
            floor: info?.[0] || '',
            avatar: matchAvatar($row.find('span.avatarNeue').attr('style')) || '',
            userId: matchUserId($name.attr('href')) || '',
            userName: HTMLDecode($name.text().trim()),
            userSign: HTMLDecode($row.find('span.sign').text().trim()),
            replySub: $row.find('a.icon[onclick]').attr('onclick'),
            message: decoder(HTMLTrim($row.find('.reply_content > .message').html())),
            sub:
              $row
                .find('.sub_reply_bgclearit')
                .map((index: number, element: any) => {
                  const $row = cheerio(element)
                  const info = $row.find('div.action small').text().trim().split(' - ')
                  const $name = $row.find('a.l')
                  return {
                    id: $row.attr('id').replace('post_', ''),
                    time: info?.[1] || '',
                    floor: info?.[0] || '',
                    avatar:
                      matchAvatar($row.find('span.avatarNeue').attr('style')) || '',
                    userId: matchUserId($name.attr('href')) || '',
                    userName: HTMLDecode($name.text().trim()),
                    userSign: HTMLDecode($row.find('span.sign').text().trim()),
                    replySub: $row.find('a.icon[onclick]').attr('onclick'),
                    message: decoder(HTMLTrim($row.find('.cmt_sub_content').html()))
                  }
                })
                .get() || []
          }
        })
        .get() || []
    return reverse ? list.reverse() : list
  } catch (error) {
    return []
  }
}

/**
 * 分析小组信息
 * @param {*} HTML
 */
export function cheerioGroupInfo(HTML) {
  const $ = cheerio(HTML)

  let joinUrl
  let byeUrl
  const url = $('#groupJoinAction > a.chiiBtn').attr('href') || ''
  if (url.includes('/join?')) {
    joinUrl = url
  } else if (url.includes('/bye?')) {
    byeUrl = url
  }

  return safeObject({
    title: $('.SecondaryNavTitle').text(),
    cover: $('.port.ll').attr('src'),
    content: $('.line_detail .tip')
      .text()
      .replace(/\r\n\r\n|\r\n\r\n\r\n/g, '\r\n'),
    create: $('div.grp_box > span.tip').text(),
    joinUrl,
    byeUrl
  })
}

/**
 * 分析小组帖子列表
 * @param {*} HTML
 */
export function analysisGroup(HTML) {
  return cheerio(HTML)('tr.topic')
    .map((index, element) => {
      const $tr = cheerio(element)
      const $title = $tr.find('.subject > a')
      const $user = $tr.find('.author > a')
      return {
        href: $title.attr('href'),
        title: $title.attr('title'),
        userId: $user.attr('href').replace('/user/', ''),
        userName: HTMLDecode($user.text().trim()),
        replies: $tr.find('.posts').text().trim(),
        time: $tr.find('.time').text().trim()
      }
    })
    .get()
}

/**
 * 分析电波提醒列表
 * @param {*} HTML
 */
export function cheerioNotify(HTML) {
  return cheerio(HTML)('div.tml_item')
    .map((index, element) => {
      const $tr = cheerio(element)
      const $name = $tr.find('a.l')
      const $title = $tr.find('a.nt_link')
      const title = $title.text()
      let message
      let message2

      if (title) {
        ;[message, message2] = $tr.find('div.reply_content').text().split(title)
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

/** 分析帖子和留言 */
export function cheerioTopic(HTML: string) {
  let topic: Topic = INIT_TOPIC
  let comments: CommentsItem[] = []
  let likes: Likes = {}

  try {
    const $ = cheerio(HTML)

    // 主楼
    const $group = $('#pageHeader a.avatar')
    const $user = $('div.postTopic strong > a.l')
    const [floor, time] = ($('div.postTopic div.re_info small').text().trim() || '')
      .split('/')[0]
      .split(' - ')
    const titleText = $('#pageHeader > h1').text().trim() || ''

    let title: string
    if (titleText.includes(' &raquo; ')) {
      title = String(titleText.split(' &raquo; ')[1]).replace(/讨论|章节/, '')
    } else {
      title = String(titleText.split(' / ')[1])
    }

    topic = safeObject<Topic>({
      id: String($('div.postTopic').attr('id') || '').substring(5),
      avatar: getCoverSmall(
        matchAvatar($('div.postTopic span.avatarNeue').attr('style'))
      ),
      floor,
      formhash: $('input[name=formhash]').attr('value'),
      likeType: $('a.like_dropdown').data('like-type') || '',
      group: $group.text().trim().replace(/\n/g, ''),
      groupHref: $group.attr('href'),
      groupThumb: getCoverSmall($('a.avatar > img.avatar').attr('src')),
      lastview: '',
      message: HTMLTrim($('div.topic_content').html()),
      time,
      title,
      userId: matchUserId($user.attr('href')),
      userName: $user.text().trim(),
      userSign: HTMLDecode($('div.postTopic span.tip_j').text().trim()),
      tip: $('#reply_wrapper span.tip.rr').text().trim(),
      close: $('div.row_state span.tip_j').text().trim(),
      delete: HTML.includes(
        '<p class="text">数据库中没有查询到指定话题，话题可能正在审核或已被删除。</p>'
      )
    })

    // 回复
    comments =
      $('#comment_list > div.row_reply')
        .map((index: number, element: any) => {
          /** 回复主楼层块 */
          const $row = cheerio(element)

          /** 左上角头像块 */
          const $avatar = $row.find('> a.avatar')

          /** 左上角用户信息块 */
          const $user = $row.find('> div.inner > span.userInfo')

          /** 右上角楼层时间块 */
          const $info = $row.find('> div.re_info')

          /** 主楼层内容块 */
          const $floor = $row.find('> div.inner > div.reply_content')

          const [floor, time] = $info.find('small').text().trim().split(' - ')

          return safeObject<CommentsItemWithSub>({
            id: $row.attr('id').substring(5),
            avatar: getCoverSmall(
              matchAvatar($avatar.find('span.avatarNeue').attr('style'))
            ),
            floor,
            message: decoder(HTMLTrim($floor.find('> div.message').html())),
            replySub: $info.find('> div.action a.icon').attr('onclick'),
            time,
            userId: matchUserId($avatar.attr('href')),
            userName:
              $user.find('strong > a.l').text().trim() ||
              $row.find('> div.inner > strong > a.l').text().trim(),
            userSign: HTMLDecode($user.find('span.tip_j').text().trim()),
            erase: $info.find('a.erase_post').attr('href'),

            // 子回复
            sub:
              $row
                .find('div.sub_reply_bg')
                .map((index: number, element: any) => {
                  const $row = cheerio(element)
                  const [floor, time] = ($row.find('small').text().trim() || '').split(
                    ' - '
                  )
                  return safeObject<CommentsItem>({
                    avatar: getCoverSmall(
                      matchAvatar($row.find('span.avatarNeue').attr('style'))
                    ),
                    floor,
                    id: $row.attr('id').substring(5),
                    message: decoder(HTMLTrim($row.find('div.cmt_sub_content').html())),
                    replySub: $row.find('a.icon').attr('onclick'),
                    time: trim(time),
                    userId: matchUserId($row.find('a.avatar').attr('href')),
                    userName: $row.find('strong > a.l').text().trim(),
                    userSign: HTMLDecode($row.find('span.tip_j').text().trim()),
                    erase: $row.find('a.erase_post').attr('href')
                  })
                })
                .get() || []
          })
        })
        .get() || []

    try {
      likes = JSON.parse(HTML.match(/data_likes_list\s*=\s*(\{.*?\});/)?.[1])
    } catch (error) {}
  } catch (ex) {
    console.log(ex)
  }

  return {
    topic,
    comments,
    likes
  }
}

/**
 * 分析日志和留言
 * @param {*} HTML
 */
export function cheerioBlog(HTML) {
  let blog: any = INIT_BLOG
  let blogComments = []

  try {
    const $ = cheerio(HTML)
    const titleText = $('#pageHeader > h1').text() || ''
    let title
    if (titleText.includes(' » ')) {
      title = String(titleText.split(' » ')[1]).replace('日志', '')
    } else {
      title = String(titleText.split(' / ')[1])
    }
    const $user = $('#pageHeader a.avatar')
    const related =
      $('ul#related_subject_list > li')
        .map((index, element) => {
          const $row = cheerio(element)
          const $a = $row.find('> a.avatar')
          return safeObject({
            id: String($a.attr('href')).replace('/subject/', ''),
            name: $a.attr('title'),
            image: $row.find('img.avatar').attr('src')
          })
        })
        .get() || []

    blog = safeObject({
      avatar: getCoverSmall($('#pageHeader img.avatar').attr('src').split('?')[0]),
      floor: '#0',
      formhash: $('input[name=formhash]').attr('value'),
      message: HTMLTrim($('div#entry_content').html()),
      time: $('hr + div.re_info').text().replace(' / ', '').replace('del / edit', ''),
      title,
      userId: matchUserId($user.attr('href')),
      userName: $user.text().replace(' ', '').replace('\n\n', ''),
      userSign: '',
      related
    })

    // 回复
    blogComments =
      $('#comment_list > div.row_reply')
        .map((index, element) => {
          const $row = cheerio(element)
          const [floor, time] = (
            $row.find('> div.re_info small').text().trim() || ''
          ).split(' - ')
          return safeObject({
            ...INIT_COMMENTS_ITEM,
            avatar: getCoverSmall(
              matchAvatar($row.find('span.avatarNeue').attr('style'))
            ),
            floor,
            id: $row.attr('id').substring(5),
            message: HTMLTrim(
              $row.find('> div.inner > div.reply_content > div.message').html()
            ),
            replySub: $row.find('> div.re_info > div.action a.icon').attr('onclick'),
            time,
            userId: matchUserId($row.find('a.avatar').attr('href')),
            userName:
              $row.find('> div.inner > span.userInfo > strong > a.l').text() ||
              $row.find('> div.inner > strong > a.l').text(),
            userSign: HTMLDecode($row.find('span.tip_j').text()),
            erase: $row.find('> div.re_info a.erase_post').attr('href'),

            // 子回复
            sub:
              $row
                .find('div.sub_reply_bg')
                .map((index, element) => {
                  const $row = cheerio(element, {
                    decodeEntities: false
                  })
                  const [floor, time] = ($row.find('small').text() || '').split(' - ')
                  return safeObject({
                    ...INIT_COMMENTS_ITEM,
                    avatar: getCoverSmall(
                      matchAvatar($row.find('span.avatarNeue').attr('style'))
                    ),
                    floor,
                    id: $row.attr('id').substring(5),
                    message: HTMLTrim($row.find('div.cmt_sub_content').html()),
                    replySub: $row.find('a.icon').attr('onclick'),
                    time: trim(time),
                    userId: matchUserId($row.find('a.avatar').attr('href')),
                    userName: $row.find('strong > a.l').text(),
                    userSign: HTMLDecode($row.find('span.tip_j').text()),
                    erase: $row.find('a.erase_post').attr('href')
                  })
                })
                .get() || []
          })
        })
        .get() || []
  } catch (ex) {}

  return {
    blog,
    blogComments
  }
}

/**
 * 分析我的小组
 * @param {*} HTML
 */
export function cheerioMine(HTML) {
  const $ = cheerio(HTML)
  return {
    list:
      $('ul.browserMedium > li.user')
        .map((index, element) => {
          const $li = cheerio(element)
          const $a = $li.find('a.avatar')
          return safeObject({
            id: String($a.attr('href')).replace('/group/', ''),
            cover: $li.find('img.avatar').attr('src').split('?')[0],
            name: $a.text().trim(),
            num: $li.find('small.feed').text().trim().replace(' 位成员', '')
          })
        })
        .get() || []
  }
}

/**
 * 分析条目讨论版
 * @param {*} HTML
 */
export function cheerioBoard(HTML) {
  return (
    cheerio(HTML)('.topic_list tr')
      .map((index, element) => {
        const $tr = cheerio(element)
        const $title = $tr.find('.subject > a')
        const $user = $tr.find('td').eq(1).find('a')
        return {
          href: $title.attr('href'),
          title: $title.attr('title'),
          userId: $user.attr('href').replace('/user/', ''),
          userName: HTMLDecode($user.text().trim()),
          replies: $tr.find('td').eq(2).text().trim(),
          time: $tr.find('td').eq(3).text().trim()
        }
      })
      .get() || []
  )
}

/**
 * 分析条目影评
 * @param {*} HTML
 */
export function cheerioReviews(HTML) {
  return (
    cheerio(HTML)('#entry_list .item')
      .map((index, element) => {
        const $tr = cheerio(element)
        const $title = $tr.find('.title > a')
        const $user = $tr.find('.tip_j a')
        return {
          id: $title.attr('href').replace('/blog/', ''),
          title: $title.text().trim(),
          avatar: $tr.find('img').attr('src').split('?')[0],
          userId: $user.attr('href').replace('/user/', ''),
          userName: HTMLDecode($user.text().trim()),
          replies: $tr.find('.orange').text().trim().replace(/\(|\)/g, ''),
          time: $tr.find('small.time').text().trim(),
          content: $tr.find('.content').text().trim()
        }
      })
      .get() || []
  )
}

/**
 * 分析超展开热门
 * @param {*} HTML
 */
export function cheerioHot(HTML) {
  return (
    cheerio(HTML)('.sideTpcList li')
      .map((index, element) => {
        const $tr = cheerio(element)
        const $avatar = $tr.find('img')
        const $title = $tr.find('a.l')
        const $topic = $tr.find('a.tip')
        const $subject = $tr.find('p > small.grey > a')
        return {
          title: HTMLDecode($title.text().trim()),
          avatar: $avatar.attr('src') || '',
          userName: HTMLDecode($avatar.attr('title') || ''),
          href: $title.attr('href') || '',
          replies: $tr.find('.inner > small.grey').text().trim(),
          group: HTMLDecode($topic.text().trim() || $subject.text().trim()),
          groupHref: $topic.attr('href') || $subject.attr('href') || '',
          time: ''
        }
      })
      .get() || []
  ).filter(item => !!item.group)
}
