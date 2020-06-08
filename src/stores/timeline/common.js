/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:11:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-16 23:15:13
 */
import { trim, getTimestamp, safeObject } from '@utils'
import {
  cheerio,
  HTMLTrim,
  HTMLToTree,
  findTreeNode,
  HTMLDecode
} from '@utils/html'
import { fetchHTML } from '@utils/fetch'
import { HOST, HOST_NAME } from '@constants'
import { HTML_TIMELINE } from '@constants/html'
import { MODEL_TIMELINE_SCOPE } from '@constants/model'

/**
 * @param {*} config
 * @param {*} refresh
 * @param {*} timelineDS
 * @param {*} userInfo
 */
export async function fetchTimeline(
  { scope, type, userId } = {},
  refresh,
  { list, pagination } = {},
  userInfo
) {
  // 计算下一页的页码
  let page
  if (refresh) {
    page = 1
  } else {
    page = pagination.page + 1
  }

  // -------------------- 请求HTML --------------------
  const res = fetchHTML({
    url: HTML_TIMELINE(scope, type, userId, page)
  })
  const raw = await res
  const HTML = HTMLTrim(raw).match(
    /<div id="timeline">(.+?)<div id="tmlPager">/
  )

  // -------------------- 分析HTML --------------------
  const timeline = []
  if (HTML) {
    const isSelf = MODEL_TIMELINE_SCOPE.getLabel(scope) === '自己'
    const tree = HTMLToTree(HTML[1])
    let node

    // 日期分组
    const dates = findTreeNode(tree.children, 'h4', []).map(
      item => item.text[0]
    )

    // 项
    findTreeNode(tree.children, 'ul', []).forEach((item, index) => {
      findTreeNode(item.children, 'li', []).forEach((i, idx) => {
        const { children } = i

        /**
         * @issue 所有人的场景下, 数据变化非常快, 而且又没有任何手段去保证数据唯一
         * 所以每次获取id时, 先跟历史比较, 假如发现存在, 直接return
         */
        // id
        // @todo 暂时用把page也作为key的一部分排除相同的列
        const id = `${page}|${i.attrs.id.replace('tml_', '')}`

        // 位置1, 通常是用户信息
        const p1 = {
          text: '',
          url: ''
        }
        // 位置2, 通常是动作
        const p2 = {
          text: ''
        }
        // 位置3, 通常是条目
        const p3 = {
          text: [],
          url: []
        }
        // 位置4, 通常是动作补充
        const p4 = {
          text: ''
        }

        // 头像
        const avatar = {
          src: '',
          url: ''
        }
        if (isSelf) {
          if (idx === 0) {
            // 一分组只有第一个才显示头像
            const {
              id,
              avatar: { small }
            } = userInfo
            avatar.src = small
            avatar.url = `${HOST}/user/${id}`
          }
        } else {
          node = findTreeNode(children, 'a > span|style~background')
          avatar.src = node
            ? node[0].attrs.style.replace(/background-image:url\('|'\)/g, '')
            : ''
          node = findTreeNode(children, 'a|class=avatar&href')
          avatar.url = node ? node[0].attrs.href : ''
        }

        // 位置1
        if (!isSelf) {
          node = findTreeNode(
            children,
            `a|text&class=l&href~://${HOST_NAME}/user/`
          )
          if (node) {
            p1.text = node[0].text[0]
            p1.url = node[0].attrs.href
          }
        }

        // 位置2, 位置4
        node = findTreeNode(children, 'span|text&class=info_full clearit')
        if (node) {
          p2.text = trim(node[0].text[0])
        }
        if (!p2.text) {
          const text = i.text.filter(item => item !== '、')
          p2.text = trim(text[0])
          p4.text = trim(text[1])
        }

        // 位置3: case 1 (条目, 角色, 人物, 小组, 目录, 天窗)
        node =
          findTreeNode(
            children,
            `a|text&class=l&href~://${HOST_NAME}/subject/`
          ) ||
          findTreeNode(
            children,
            `a|text&class=l&href~://${HOST_NAME}/character/`
          ) ||
          findTreeNode(
            children,
            `a|text&class=l&href~://${HOST_NAME}/person/`
          ) ||
          findTreeNode(
            children,
            `a|text&class=l&href~://${HOST_NAME}/group/`
          ) ||
          findTreeNode(
            children,
            `a|text&class=l&href~://${HOST_NAME}/index/`
          ) ||
          findTreeNode(
            children,
            `a|text&class=l&href~://doujin.${HOST_NAME}/subject/`
          ) ||
          []
        node.forEach(item => {
          if (item.text[0]) {
            p3.text.push(HTMLDecode(item.text[0]))
            p3.url.push(item.attrs.href)
          }
        })

        // 位置3: case 2 添加为好友
        // @issue 因为有2个一样结构的a造成混淆
        // 因部分吐槽只有p1用户名, 所以重复则跳过
        if (!node.length) {
          node = findTreeNode(
            children.reverse(),
            `a|text&class=l&href~://${HOST_NAME}/user/`
          )
          if (node && node[0].attrs.href !== p1.url) {
            p3.text.push(HTMLDecode(node[0].text[0]))
            p3.url.push(node[0].attrs.href)
          }
        }

        // 条目
        node = findTreeNode(
          children,
          `div > a|text&class=tip&href~://${HOST_NAME}/subject/`
        )
        const subject = node ? HTMLDecode(node[0].text[0]) : ''
        const subjectId = node
          ? node[0].attrs.href.replace(`${HOST}/subject/`, '')
          : 0

        // 时间
        node = findTreeNode(children, 'p|text&class=date')
        let time = node
          ? String(node[0].text[0])
              .replace('小时', '时')
              .replace('分钟', '分')
              .replace('· web', '')
          : ''
        if (time && time.includes('· ') && !time.includes('mobile')) {
          time += 'onAir'
        }

        // 评分
        node = findTreeNode(children, 'div > span|class=starstop-s > span')
        const star = node
          ? node[0].attrs.class.replace(/starlight stars/g, '')
          : ''

        // 评论 | 小组描述
        node =
          findTreeNode(children, 'div > div > q|text') ||
          findTreeNode(children, 'div > span|text&class=tip_j')
        const comment = node ? HTMLDecode(node[0].text[0]) : ''

        // 留言
        const reply = {
          content: '',
          count: '',
          url: ''
        }
        node = findTreeNode(children, 'p|text&class=status')
        if (node) {
          reply.content = HTMLDecode(node[0].text[0])

          // 把改名信息也纳入留言
          if (trim(node[0].text[1]) === '改名为') {
            node = findTreeNode(children, 'p > strong|text')
            if (node) {
              const name1 = node[0] ? HTMLDecode(node[0].text[0]) : ''
              const name2 = node[1] ? HTMLDecode(node[1].text[0]) : ''
              reply.content = `从 ${name1} 改名为 ${name2}`
            }
          }
        }
        node = findTreeNode(children, 'p > a|text&class=tml_comment l')
        if (node) {
          // 回复数
          reply.count = node[0].text[0]
          reply.url = node[0].attrs.href
        }

        // 图片
        const image = (
          findTreeNode(children, 'a > img|class=rr') ||
          findTreeNode(children, 'div > a > img|class=grid') ||
          []
        ).map(item => item.attrs.src)

        // 删除动作
        node = findTreeNode(children, 'a|href&title=删除这条时间线')
        const clearHref = node ? node[0].attrs.href : ''

        const data = {
          date: dates[index],
          id,
          avatar,
          p1,
          p2,
          p3,
          p4,
          subject,
          subjectId,
          time,
          star,
          comment,
          reply,
          image,
          clearHref
        }
        timeline.push(data)
      })
    })
  }

  return Promise.resolve({
    list: page === 1 ? timeline : [...list, ...timeline],
    pagination: {
      page,
      pageTotal: timeline.length ? 100 : page // 页面没有分页信息
    },
    _loaded: getTimestamp()
  })
}

/**
 * 分析吐槽
 * @param {*} HTML
 */
export function analysisSay(HTML) {
  const $ = cheerio(HTML)
  const id = ($('div.statusHeader p.tip').text() || '').replace('@', '')
  const avatar = $('img.avatar').attr('src')
  const main = safeObject({
    id,
    avatar,
    name: $('div.statusHeader h3 > a').text(),
    text: trim($('div.statusContent > p.text').html()),
    date: $('p.date,tip_j').text(),
    formhash: $('input[name=formhash]').attr('value')
  })
  const sub = $('ul.subReply > li.reply_item')
    .map((index, element) => {
      const $tr = cheerio(element)
      const subId = ($tr.find('a.cmt_reply').text() || '').replace('@', '')
      return safeObject({
        id: subId,
        avatar: id === subId ? avatar : '',
        name: $tr.find('a.cmt_reply + a.l').text(),
        text: trim($tr.html()).split('-')[1]
      })
    })
    .get()
  return [main, ...sub]
}

/**
 * 分析吐槽表单授权码
 * @param {*} HTML
 */
export function analysisFormHash(HTML) {
  const $ = cheerio(HTML)
  return $('input[name=formhash]').attr('value') || ''
}
